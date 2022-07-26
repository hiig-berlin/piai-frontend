import {
  Map,
  AttributionControl,
  LngLatBounds,
  PaddingOptions,
} from "maplibre-gl";
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

  geoJsonAllData: any = null;

  overlayZoomLevel: number = 0;

  // xxx clean up
  // clickBlock = false;
  // highlights;
  // // tour: MapTour;
  // intitiallyFitToBounds;

  onLoadJobs: Function[] = [];

  constructor(router: NextRouter, config: AppConfig, styleUrl: string) {
    this.config = config;
    this.router = router;
    this.styleUrl = styleUrl;
    this.isInit = false;
    this.map = null;

    const mapTool = this.config?.tools?.find((t) => t.slug === "map");
    this.toolConfig = mapTool?.config ?? {};

    this.popups = new MapPopupManager(this);
    this.highlight = new MapHighlight(this);
    this.clusterDetail = new MapClusterDetail(this);
    this.views.clustered = new MapViewClustered(this);
  }

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
      minZoom: self.toolConfig?.minZoom,
      maxZoom: self.toolConfig?.maxZoom,
      attributionControl: false,
    });

    self.overlayZoomLevel = self.toolConfig?.zoom ?? 8;

    self.router.events.on("routeChangeStart", () => {
      self.popups.hideAll();
    });

    // xxx better attribution ...
    // where to place it best
    self.map.addControl(
      new AttributionControl({
        customAttribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="nofollow noreferrer">OpenStreetMap contributors</a>',
      }),
      "bottom-right"
    );

    self.isReady = false;
    self.isStyleLoaded = false;
    self.isLoaded = false;
    self.onLoadJobs = [];

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

    const process = async () => {
      if (self.isReady) return;
      self.isReady = true;

      if (typeof setIsLoaded === "function") setIsLoaded.call(null, true);

      self.onLoadJobs.forEach(async (f) => {
        await new Promise(f as any);
      });
    };

    const maybeProcess = async () => {
      if (self.isBaseDataLoaded && self.isStyleLoaded && self.isLoaded) {
        await process();
      }
    };

    self.map.once("style.load", () => {
      self.isStyleLoaded = true;
      maybeProcess();
    });
    self.map.once("load", () => {
      self.isLoaded = true;

      self?.map?.on("movestart", (e) => {
        self.isAnimating = (e as any)?.cMapAnimation === true;
      });

      self?.map?.on("moveend", (e) => {
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

      maybeProcess();
    });

    try {
      fetch(`${self.config.cmsUrl}${self.toolConfig.urlGeoJson}`)
        .then(async (response) => {
          if (response.ok) {
            const data = await response.json();
            if (
              data &&
              data?.type &&
              data?.type === "FeatureCollection" &&
              Array.isArray(data?.features)
            ) {
              self.geoJsonAllData = data;
              self.isBaseDataLoaded = true;

              maybeProcess();
            }
          }
        })
        .catch((err: any) => {
          if (
            typeof window !== "undefined" &&
            window.process.env.NODE_ENV === "development"
          )
            console.error(err);
        });
    } catch (err) {
      if (
        typeof window !== "undefined" &&
        window.process.env.NODE_ENV === "development"
      )
        console.error(err);
    }

    self.isInit = true;
  }

  loadUrl(url: string) {
    const self = this;

    self.popups.hideAll();
    
    console.log(`PUSH: ${url}`);
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
    return 30;

    // xxx improve
    // if (typeof window === "undefined")
    //   return {
    //     top: 0,
    //     right: 0,
    //     bottom: 0,
    //     left: 0,
    //   };

    // const isMobile = window.matchMedia("(max-width: 44.9999em)").matches;
    // const isTablet = window.matchMedia(
    //   "(min-width: 45em) and (max-width: 74.9999em)"
    // ).matches;
    // const isTabletWide = window.matchMedia(
    //   "(min-width: 62em) and (max-width: 74.9999em)"
    // ).matches;
    // const isDesktop = window.matchMedia(
    //   "(min-width: 75em) and (max-width: 119.9999em)"
    // ).matches;

    // if (isMobile) {
    //   return {
    //     top: 80,
    //     right: 40,
    //     bottom: 100,
    //     left: 80,
    //   };
    // } else if (isTablet && !isTabletWide) {
    //   return {
    //     top: 80,
    //     right: 40,
    //     bottom: 40,
    //     left: 120,
    //   };
    // } else if (isTabletWide) {
    //   return {
    //     top: 80,
    //     right: 40,
    //     bottom: 40,
    //     left: 160,
    //   };
    // } else if (isDesktop) {
    //   return {
    //     top: 80,
    //     right: 40,
    //     bottom: 100,
    //     left: 400,
    //   };
    // } else {
    //   return {
    //     top: 80,
    //     right: 40,
    //     bottom: 100,
    //     left: 695 + (window.innerWidth * 0.08 - 55) + 40,
    //   };
    // }
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
    options?: MapFitToBoundingBoxOptions
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

    this.map.easeTo(calculatedOptions);
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
        functionArgs
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

  hideCurrentView() {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.popups.hideAll();

        self.callViewFunction(self.currentView, "hide");

        if (typeof resolve === "function") resolve(true);
      };
      if (!self.isReady) {
        self.onLoadJobs.push(run);
      } else {
        run();
      }
    }
  }

  showCurrentView() {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.popups.hideAll();

        self.callViewFunction(self.currentView, "show");

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

  setCurrentViewData(data: any, show: boolean) {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        self.popups.hideAll();

        self.clusterDetail.hide();

        self.callViewFunction(self.currentView, "hide", [data]);

        if (show) {
          setTimeout(() => {
            self.callViewFunction(self.currentView, "show");
            if (typeof resolve === "function") resolve(true);
          }, 100);
        }
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

  // fitToCurrentViewBounds() {
  //   const self = this;
  //   if (self.map) {
  //     const run = async (resolve?: any) => {
  //       self.popups.hideAll();
  //       self.views[self.currentView].fitToBounds();
  //       if (typeof resolve === "function") resolve(true);
  //     };

  //     if (!self.isReady) {
  //       self.onLoadJobs.push(run);
  //     } else {
  //       run();
  //     }
  //   }
  // }

  // xxx make the following better
  getCenterOffset() {
    if (typeof window === "undefined") return [0, 0];

    return [0, 0];
    // if (window.innerWidth < 740) {
    //   return [window.innerWidth / 2 - 50, 25];
    // }

    // return [442 / 2, 40] as PointLike;
  }

  // getBoundsPadding() {
  //   if (typeof window === "undefined")
  //     return {
  //       top: 0,
  //       right: 0,
  //       bottom: 0,
  //       left: 0,
  //     };

  //   const isMobile = window.matchMedia("(max-width: 44.9999em)").matches;
  //   const isTablet = window.matchMedia(
  //     "(min-width: 45em) and (max-width: 74.9999em)"
  //   ).matches;
  //   const isTabletWide = window.matchMedia(
  //     "(min-width: 62em) and (max-width: 74.9999em)"
  //   ).matches;
  //   const isDesktop = window.matchMedia(
  //     "(min-width: 75em) and (max-width: 119.9999em)"
  //   ).matches;

  //   if (isMobile) {
  //     return {
  //       top: 80,
  //       right: 40,
  //       bottom: 100,
  //       left: 80,
  //     };
  //   }
  //   if (isTablet && !isTabletWide) {
  //     return {
  //       top: 80,
  //       right: 40,
  //       bottom: 40,
  //       left: 120,
  //     };
  //   }
  //   if (isTabletWide) {
  //     return {
  //       top: 80,
  //       right: 40,
  //       bottom: 40,
  //       left: 160,
  //     };
  //   }
  //   if (isDesktop) {
  //     return {
  //       top: 80,
  //       right: 40,
  //       bottom: 100,
  //       left: 400,
  //     };
  //   }
  //   return {
  //     top: 80,
  //     right: 40,
  //     bottom: 100,
  //     left: 695 + (window.innerWidth * 0.08 - 55) + 40,
  //   };
  // }

  panTo(lng: number, lat: number, options: MapAnimationOptions) {
    const self = this;
    if (self.map) {
      const run = async (resolve?: any) => {
        console.log("panto");
        if (Number.isNaN(lng) || Number.isNaN(lat)) return;
        self.map?.stop();
        self.map?.setPadding({
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        });
        self.map?.panTo(
          [lng, lat],
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

  jumpTo(lng: number, lat: number, options: MapAnimationOptions) {
    console.log("jumpto");
    this.panTo(lng, lat, {
      animate: false,
      duration: 0,
      ...options,
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
