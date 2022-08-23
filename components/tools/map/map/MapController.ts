import { Map, LngLatBounds, LngLatLike } from "maplibre-gl";
import type {
  PointLike,
  FilterSpecification,
  CameraForBoundsOptions,
} from "maplibre-gl";

import "maplibre-gl/dist/maplibre-gl.css";

import type { NextRouter } from "next/router";

import type { AppConfig } from "~/types";
import { MapHighlight } from "./MapHighlight";
import { MapPopupManager } from "./MapPopupManager";
import { MapClusterDetail } from "./MapClusterDetail";
import { MapViewClustered } from "./MapViewClustered";

import { breakpointEMs } from "~/theme/breakpoints";
import { EMPTY_GEOJSON } from "./utils";
import { themeSpace } from "~/theme/theme";
import { GeoJson } from "./types";
import type { ToolState, MapState, FilterState } from "../state/ToolState";

export type MapFitToBoundingBoxOptions = CameraForBoundsOptions & {
  minZoom?: number;
};

export type MapViews = {
  clustered: MapViewClustered | null;
};

export type MapAnimationOptions = {
  animate?: boolean;
  duration?: number;
  offset?: number[] | PointLike;
};

export class MapController {
  POPUP_OFFSET = {
    x: 0,
    y: -28,
  };

  ZOOM_LEVEL_HIDE_ADJUSTOR = 0.5;

  MAX_BOUNDS_ZOOM = 14;

  clusterDetail: MapClusterDetail;

  styleUrl: string = "";

  isInit = false;

  isAnimating = false;

  isLoaded = false;

  isStyleLoaded = false;

  isBaseDataLoaded = false;

  isReady = false;

  clickBlock = false;

  intitiallyFitToBounds = true;

  toolConfig: any = {};

  id: string | null = null;

  map: Map | null;

  mapContainerRef: HTMLDivElement | null = null;

  router: NextRouter;

  config: AppConfig;

  popups;

  highlight;

  views: MapViews = {
    clustered: null,
  };

  currentView: keyof MapViews | null = null;

  geoJsonAllData: GeoJson | null = null;

  overlayZoomLevel: number = 0;

  onLoadJobs: Function[] = [];

  getState: () => ToolState;
  updateMapState: (mapState: Partial<MapState>) => void;
  updateFilterState: (filterState: Partial<FilterState>) => void;

  constructor(
    router: NextRouter,
    config: AppConfig,
    styleUrl: string,
    getState: () => ToolState,
    updateMapState: (mapState: Partial<MapState>) => void,
    updateFilterState: (filterState: Partial<FilterState>) => void
  ) {
    this.config = config;
    this.router = router;
    this.styleUrl = styleUrl;
    this.isInit = false;
    this.map = null;

    this.getState = getState;
    this.updateMapState = updateMapState;
    this.updateFilterState = updateFilterState;

    const mapTool = this.config?.tools?.find((t) => t.slug === "map");
    this.toolConfig = mapTool?.config ?? {};

    this.popups = new MapPopupManager(this);
    this.highlight = new MapHighlight(this);
    this.clusterDetail = new MapClusterDetail(this);
    this.views.clustered = new MapViewClustered(this);
  }

  processOnLoadJobs = async () => {
    const self = this;
    if (self.isReady) return;
    self.isReady = true;

    self.onLoadJobs.forEach(async (f) => {
      await new Promise(f as any);
    });
  };

  maybeProcessOnLoadJobs = async () => {
    const self = this;
    if (self.isBaseDataLoaded && self.isStyleLoaded && self.isLoaded) {
      await self.processOnLoadJobs();
    }
  };

  init(
    id: string,
    defaultView: keyof MapViews,
    ref: HTMLDivElement,
    setIsLoaded: Function
  ) {
    const self = this;

    if (self.isInit) return;

    self.currentView = defaultView;

    self.id = id;

    self.mapContainerRef = ref;

    self.map = new Map({
      container: ref,
      style: this.styleUrl,
      center: [self.toolConfig?.lng ?? 0, self.toolConfig?.lat ?? 0],
      zoom: self.toolConfig?.zoom ?? 8,
      maxBounds: self.toolConfig?.bounds,
      // minZoom: self.toolConfig?.minZoom,
      maxZoom: self.toolConfig?.maxZoom,
      attributionControl: false,
    });

    self.map.dragRotate.disable();

    // disable map rotation using touch rotation gesture
    self.map.touchZoomRotate.disableRotation();

    self.overlayZoomLevel = self.toolConfig?.zoom ?? 8;

    self.router.events.on("routeChangeStart", () => {
      self.popups.hideAll();
    });

    self.isReady = false;
    self.isStyleLoaded = false;
    self.isLoaded = false;
    self.onLoadJobs = [];

    if (typeof setIsLoaded === "function") {
      self.runTask(() => setIsLoaded.call(null, true));
    }

    self.onLoadJobs.push(async (resolve?: any) => {
      if (self.currentView && self.currentView in self.views) {
        self.callViewFunction(self.currentView, "setData");
        setTimeout(() => {
          self.callViewFunction(self.currentView, "render");
          if (self.intitiallyFitToBounds) {
            self.callViewFunction(self.currentView, "fitToBounds");
          }
          self.setInitallyFitToBounds(true);
          if (typeof resolve === "function") resolve(true);
        }, 100);
      }
    });

    self.clusterDetail.init();

    self.map.once("style.load", () => {
      self.isStyleLoaded = true;
      self.maybeProcessOnLoadJobs();
    });
    self.map.once("load", () => {
      if (!self?.map) return;

      self.isLoaded = true;

      self.map.on("movestart", (e) => {
        self.isAnimating = (e as any)?.cMapAnimation === true;
      });

      self.map.on("moveend", () => {
        if (!self.map) return;
        self.isAnimating = false;
        if (self.map.getZoom() > self.toolConfig.maxZoom - 1) {
          self.map.zoomTo(
            self.toolConfig.maxZoom - 1.1,
            {},
            {
              cMapAnimation: true,
            }
          );
        }
      });

      self.maybeProcessOnLoadJobs();
    });

    self.isInit = true;
  }

  setGeoJson(geoJson: GeoJson) {
    const self = this;
    if (
      geoJson &&
      geoJson?.type &&
      geoJson?.type === "FeatureCollection" &&
      Array.isArray(geoJson?.features)
    ) {
      self.geoJsonAllData = geoJson;
      self.isBaseDataLoaded = true;

      self.maybeProcessOnLoadJobs();
    }
  }

  showQuickView(coordinates: LngLatLike, id: number, showSearch?: boolean) {
    const self = this;

    self.popups.hideAll();

    self.updateFilterState({
      ...self.getState().filter,
      isDrawerOpen: true,
      isSearchOpen: !!showSearch,
      quickViewProjectId: id,
    });

    setTimeout(() => {
      self.panTo(coordinates, {});
    }, 250);
  }

  loadUrl(url: string) {
    const self = this;

    self.popups.hideAll();

    self.router.push(url);

    self.popups.hideAll();
  }

  getBounds() {
    if (!this.toolConfig?.maxBounds) return;

    return new LngLatBounds(
      this.toolConfig?.maxBounds?.[0],
      this.toolConfig?.maxBounds?.[1]
    );
  }

  getBoundsPadding() {
    if (typeof window === "undefined")
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      };

    if (window.innerWidth < breakpointEMs.tablet * 16) {
      // all mobiles

      return 40;
    } else if (window.innerWidth < breakpointEMs.tabletLandscape * 16) {
      // tablet portrait

      return {
        top: 100,
        right: 70,
        bottom: 100,
        left: 70,
      };
    } else {
      // tabletLandscape ++

      let sidebarWidth = 0;
      if (window.innerWidth < breakpointEMs.desktop * 16) {
        sidebarWidth = themeSpace("tablet", 6);
      } else if (window.innerWidth < breakpointEMs.screen * 16) {
        sidebarWidth = themeSpace("desktop", 6, 0);
      } else {
        sidebarWidth = themeSpace("screen", 6);
      }

      return {
        top: 50,
        right: 70,
        bottom: 50,
        left: sidebarWidth + 70,
      };
    }
  }

  inBounds = (coordinates: [PointLike, PointLike]) => {
    if (!this.toolConfig?.maxBounds) return true;

    if (
      coordinates[0] < this.toolConfig?.maxBounds[0][0] ||
      coordinates[0] > this.toolConfig?.maxBounds[1][0]
    )
      return false;
    if (
      coordinates[1] < this.toolConfig?.maxBounds[0][1] ||
      coordinates[1] > this.toolConfig?.maxBounds[1][1]
    )
      return false;
    return true;
  };

  fitToBounds = (
    bounds: LngLatBounds,
    options?: MapFitToBoundingBoxOptions,
    useEaseTo?: boolean
  ) => {
    if (!this.map) return;

    let calculatedOptions = this.map.cameraForBounds(bounds, {
      padding: this.getBoundsPadding(),
      ...options,
    });

    if (!calculatedOptions) return;

    calculatedOptions = {
      ...calculatedOptions,
      ...options,
    };

    calculatedOptions.zoom = Math.max(
      calculatedOptions.zoom ?? 0,
      options?.minZoom ?? this.toolConfig.boundingBoxMinZoom
    );

    calculatedOptions.zoom = Math.min(
      calculatedOptions.zoom,
      options?.maxZoom ?? this.toolConfig.boundingBoxMaxZoom
    );

    if (useEaseTo) {
      this.map.easeTo(calculatedOptions);
    } else {
      this.map.zoomTo(calculatedOptions.zoom);
      this.map.jumpTo(calculatedOptions);
    }
  };

  clearOnloadJobs = () => {
    this.onLoadJobs = [];
  };

  setInitallyFitToBounds = (flag: boolean) => {
    this.intitiallyFitToBounds = flag;
  };

  runTask(task: Function) {
    const self = this;
    if (self.map && typeof task === "function") {
      const run = async (resolve?: any) => {
        task.call(self);
        if (typeof resolve === "function") resolve(true);
      };

      if (!self.isReady) {
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  callViewFunction(
    view: string | keyof MapViews | null | undefined,
    functionName: string,
    functionArgs?: any[]
  ) {
    if (
      view &&
      typeof (this.views[view as keyof MapViews] as any)?.[functionName] ===
        "function"
    )
      (this.views[view as keyof MapViews] as any)?.[functionName].call(
        this.views[view as keyof MapViews] as any,
        ...(functionArgs ?? [])
      );
  }

  setView(view: keyof MapViews, onShownCallback: Function) {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        Object.keys(self.views).forEach((v) => {
          self.callViewFunction(v, "clear");
        });
        self.popups.hideAll();

        self.callViewFunction(view, "setData");

        setTimeout(() => {
          self.callViewFunction(view, "render");
          self.callViewFunction(view, "show");

          if (typeof onShownCallback === "function") onShownCallback.call(null);

          if (typeof resolve === "function") resolve(true);
        }, 100);

        self.currentView = view;
      };

      if (view === self.currentView && self.views[view]?.isDataSet) return;

      if (!self.isReady) {
        self.currentView = view;
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  hideView(view?: keyof MapViews) {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.popups.hideAll();

        self.callViewFunction(view ?? self.currentView, "hide");

        if (typeof resolve === "function") resolve(true);
      };
      if (!self.isReady) {
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  showView(view?: keyof MapViews) {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.popups.hideAll();

        self.callViewFunction(view ?? self.currentView, "show");

        if (typeof resolve === "function") resolve(true);
      };
      if (!self.isReady) {
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  renderCurrentView() {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.popups.hideAll();

        self.callViewFunction(self.currentView, "render");

        if (typeof resolve === "function") resolve(true);
      };
      if (!self.isReady) {
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  resetViewData(view: keyof MapViews) {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.popups.hideAll();
        self.clusterDetail.hide();

        self.callViewFunction(view, "setData", [
          self.geoJsonAllData?.features ? self.geoJsonAllData : EMPTY_GEOJSON,
        ]);
        if (typeof resolve !== "undefined") resolve(true);
      };

      if (!self.isReady) {
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  setFilteredViewData(view: keyof MapViews, ids: any[]) {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.popups.hideAll();
        self.clusterDetail.hide();

        let geoJson = EMPTY_GEOJSON;

        if (
          self.geoJsonAllData &&
          self.geoJsonAllData?.features?.length &&
          ids?.length
        ) {
          geoJson = {
            type: "FeatureCollection",
            features: self.geoJsonAllData?.features.filter((f: any) =>
              ids.includes(f?.properties?.id)
            ),
          };
        }

        self.callViewFunction(view, "setData", [geoJson]);

        if (typeof resolve !== "undefined") resolve(true);
      };

      if (!self.isReady) {
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  setFilter(
    view: keyof MapViews,
    filter: FilterSpecification | null | undefined
  ) {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.callViewFunction(view, "setFilter", [filter]);

        if (typeof resolve === "function") resolve(true);
      };

      if (!self.isReady) {
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  getCenterOffset() {
    if (typeof window === "undefined") return [0, 0];

    let sidebarWidth = 0;
    let size3Width = 0;
    if (window.innerWidth < breakpointEMs.desktop * 16) {
      sidebarWidth = themeSpace("tablet", 6);
      size3Width = themeSpace("tablet", 3);
    } else if (window.innerWidth < breakpointEMs.screen * 16) {
      sidebarWidth = themeSpace("desktop", 6, 0);
      size3Width = themeSpace("desktop", 3, 0);
    } else {
      sidebarWidth = themeSpace("screen", 6);
      size3Width = themeSpace("screen", 3);
    }

    let offsetX = 0;
    let offsetY = 0;

    if (window.innerWidth < breakpointEMs.tablet * 16) {
      // all mobiles
      if (this.getState().filter.isDrawerOpen) {
        offsetY = -0.25 * window.innerHeight;
      }
    } else if (window.innerWidth < breakpointEMs.tabletLandscape * 16) {
      // tablet
      offsetX += sidebarWidth * 0.5;
      if (this.getState().filter.isDrawerOpen) {
        offsetY = -0.25 * window.innerHeight;
      }
    } else {
      offsetX += sidebarWidth * 0.5;
      if (
        this.getState().filter.isFilterOpen ||
        this.getState().filter.isSearchOpen
      ) {
        offsetX += (window.innerWidth - sidebarWidth - 2 * size3Width) * 0.15;
      }

      if (this.getState().filter.quickViewProjectId) {
        offsetX += (window.innerWidth - sidebarWidth - 2 * size3Width) * 0.2;
      }
    }

    return [offsetX, offsetY];
  }

  panTo(coordinates: LngLatLike, options?: MapAnimationOptions) {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.map?.stop();
        self.map?.setPadding({
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        });
        self.map?.panTo(
          coordinates,
          {
            animate: options?.animate ?? true,
            duration: options?.duration ?? 1250,
            essential: true,
            offset: (options?.offset as PointLike) ?? self.getCenterOffset(),
          },
          {
            customAnimation: true,
          }
        );
        if (typeof resolve === "function") resolve(true);
      };

      if (!self.isReady) {
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  jumpTo(coordinates: LngLatLike, options?: MapAnimationOptions) {
    this.panTo(coordinates, {
      animate: false,
      duration: 0,
      ...(options ?? {}),
    });
  }

  toggleLayersVisibility = (layers: string[], visibility: string) => {
    const self = this;
    if (!self.map) return;

    layers.forEach((lId) => {
      if (this?.map?.getLayer(lId)) {
        this?.map?.setLayoutProperty(lId, "visibility", visibility);
      }
    });
  };

  removeLayers = (layers: string[]) => {
    const self = this;
    if (!self.map) return;

    layers.forEach((lId) => {
      if (this?.map?.getLayer(lId)) {
        self.map?.removeLayer(lId);
      }
    });
  };
}
