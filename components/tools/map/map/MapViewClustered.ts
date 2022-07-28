import { LngLatBounds } from "maplibre-gl";
import type { PointLike } from "maplibre-gl";
import { primaryInput } from "detect-it";
import debounce from "lodash/debounce";

import type { MapController } from "./MapController";
import { MapPopup } from "./MapPopup";
import type { MapState } from "../context/ContextProviders";

const CLUSTER_ZOOM_IN_ANIMATION_TIME = 1000;
const CLUSTER_COUNT_UPDATE_TIMEOUT = 500;

const queryFilteredForDuplicates = (arr: any[], key: any) => {
  if (!Array.isArray(arr) || !arr?.length) return [];

  const result = arr.reduce(
    (carry: any, feature: any) => {
      if (
        feature?.properties?.[key] &&
        !carry.keys.includes(feature?.properties?.[key])
      ) {
        carry.keys.push(feature?.properties?.[key]);
        carry.values.push(feature);
      }
      return carry;
    },
    {
      keys: [],
      values: [],
    }
  );

  return result.values;
};

export class MapViewClustered {
  controller: MapController;
  bounds: maplibregl.LngLatBounds | null = null;
  events: Record<string, any> = {};
  isVisible: boolean = false;
  isDataSet: boolean = false;
  featureCount: number = 0;

  layers: string[] = [
    "locations",
    "clusters",
    "cluster-count",
    "clustered-locations",
  ];

  constructor(controller: MapController) {
    this.controller = controller;

    if (this.controller?.toolConfig?.lng && this.controller?.toolConfig?.lat) {
      this.bounds = new LngLatBounds(
        [this.controller.toolConfig.lng, this.controller.toolConfig.lat],
        [this.controller.toolConfig.lng, this.controller.toolConfig.lat]
      );
    }
  }

  setData(data?: any) {
    const self = this;
    if (self.controller?.map) {
      if (!self.controller?.map) return;

      self.hide();

      const geoJson = data ?? self.controller.geoJsonAllData ?? {};
      self.featureCount = geoJson?.features?.length;
      if (!self.controller.map.getSource("clustered-locations")) {
        self.controller.map.addSource("clustered-locations", {
          type: "geojson",
          data: geoJson,
          cluster: true,
          maxzoom: self.controller.toolConfig.geoJsonMaxZoom,
          clusterMaxZoom: self.controller.toolConfig.maxZoom, // Max zoom to cluster points on
          clusterRadius: self.controller.toolConfig.clusterRadius, // Radius of each cluster when clustering points (defaults to 50)
        });
      } else {
        (
          self.controller?.map?.getSource("clustered-locations") as any
        )?.setData(geoJson);
      }

      if (!self.controller.map.getSource("locations")) {
        self.controller.map.addSource("locations", {
          type: "geojson",
          data: self.controller.geoJsonAllData ?? {},
        });
      }

      let bounds: LngLatBounds | undefined;

      if (geoJson?.features?.length) {
        for (let i = 0; i < geoJson?.features?.length; i++) {
          const coordinates = geoJson?.features[i]?.geometry?.coordinates ?? [
            self.controller.toolConfig.lng,
            self.controller.toolConfig.lat,
          ];

          if (self.controller.inBounds(coordinates)) {
            if (!bounds) {
              bounds = new LngLatBounds(coordinates, coordinates);
            } else {
              bounds.extend(coordinates);
            }
          } else {
            const feature = geoJson?.features[i];
            console.warn(
              `Skipped location as it is out of bounds: ID(${feature.properties.id}) - ${feature?.properties?.name}`
            );
          }
        }
      }
      if (bounds) {
        self.bounds = bounds;
      } else {
        self.bounds = new LngLatBounds(
          [self.controller.toolConfig.lng, self.controller.toolConfig.lat],
          [self.controller.toolConfig.lng, self.controller.toolConfig.lat]
        );
      }
      self.isDataSet = true;
    }
  }

  render() {
    const self = this;
    if (self.controller?.map) {
      if (
        !self.controller?.map ||
        !self.controller.map.getSource("clustered-locations")
      )
        return;

      self.clear();

      self.controller.map.addLayer({
        id: "locations",
        type: "circle",
        source: "locations",
        layout: {
          visibility: "none",
        },
        paint: {
          "circle-color": "transparent",
          "circle-radius": 16,
        },
      });

      self.controller.map.addLayer({
        id: "clusters",
        type: "circle",

        source: "clustered-locations",
        filter: ["has", "point_count"],
        layout: {
          visibility: "none",
        },
        paint: {
          "circle-color": self.controller.toolConfig.colorCluster,
          "circle-radius": 24,
        },
      });

      self.controller.map.addLayer({
        id: "cluster-count",
        type: "symbol",
        source: "clustered-locations",
        filter: ["has", "point_count"],
        layout: {
          "text-field": "{point_count_abbreviated}",
          "text-font": ["Berlin Type Bold"],
          "text-size": 13,
          visibility: "none",
        },
        paint: {
          "text-color": self.controller.toolConfig.colorClusterText,
        },
      });

      self.controller.map.addLayer({
        id: "clustered-locations",
        type: "circle",
        source: "clustered-locations",
        filter: ["!", ["has", "point_count"]],
        layout: {
          visibility: "none",
        },
        paint: {
          "circle-color": self.controller.toolConfig.colorDot,
          "circle-radius": 16,
        },
      });

      self.controller.map.on("click", "clusters", (e) => {
        if (self.controller.clickBlock || !self.controller.map) return;

        const features = self.controller.map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        if (!features?.length) {
          self.controller.clusterDetail.hide();
        }
      });

      // inspect a cluster on click
      self.events["click-clusters"] = (e: any) => {
        if (!self.controller?.map) return;

        var features = self.controller.map.queryRenderedFeatures(e.point, {
          layers: ["clusters"],
        });
        if (!features?.length) return;
        var clusterId = features[0].properties.cluster_id;
        if (!clusterId) return;
        const clusterSource = (self.controller.map as any).getSource(
          "clustered-locations"
        );

        if (!clusterSource) return;

        clusterSource.getClusterChildren(
          clusterId,
          (err: any, children: any) => {
            if (err) return;
            clusterSource.getClusterExpansionZoom(
              clusterId,
              (err: any, zoom: any) => {
                if (err || !self.controller?.map) return;

                if (
                  (children?.length > 1 && children[0].properties?.cluster) ||
                  Math.floor(zoom) < self.controller.toolConfig.maxZoom - 2
                ) {
                  self.controller.map.easeTo(
                    {
                      around: (features[0].geometry as any).coordinates,
                      offset: (self.controller.getCenterOffset() ?? [
                        0, 0,
                      ]) as PointLike,
                      zoom: Math.min(
                        zoom,
                        self.controller.toolConfig.maxZoom - 2
                      ),
                      duration: CLUSTER_ZOOM_IN_ANIMATION_TIME * 0.5,
                    },
                    {
                      cMapAnimation: true,
                    }
                  );

                  setTimeout(() => {
                    if (self.controller.map)
                      self.controller.map.panTo(
                        (features[0].geometry as any).coordinates,
                        {
                          offset: (self.controller.getCenterOffset() ?? [
                            0, 0,
                          ]) as PointLike,
                          duration: CLUSTER_ZOOM_IN_ANIMATION_TIME * 0.5,
                        },
                        {
                          cMapAnimation: true,
                        }
                      );
                  }, CLUSTER_ZOOM_IN_ANIMATION_TIME * 0.55);

                  self.controller.clusterDetail.hide();
                } else {
                  self.controller.map.easeTo(
                    {
                      around: (features[0].geometry as any).coordinates,
                      zoom: Math.min(
                        self.controller.map.getZoom() + 1,
                        self.controller.toolConfig.maxZoom - 1.1
                      ),
                      offset: (self.controller.getCenterOffset() ?? [
                        0, 0,
                      ]) as PointLike,
                      duration: CLUSTER_ZOOM_IN_ANIMATION_TIME * 0.5,
                    },
                    {
                      cMapAnimation: true,
                    }
                  );

                  setTimeout(() => {
                    if (self.controller.map)
                      self.controller.map.panTo(
                        (features[0].geometry as any).coordinates,
                        {
                          offset: (self.controller.getCenterOffset() ?? [
                            0, 0,
                          ]) as PointLike,
                          duration: CLUSTER_ZOOM_IN_ANIMATION_TIME * 0.5,
                        },
                        {
                          cMapAnimation: true,
                        }
                      );
                  }, CLUSTER_ZOOM_IN_ANIMATION_TIME * 0.55);

                  self.controller.overlayZoomLevel =
                    self.controller.map.getZoom();

                  setTimeout(() => {
                    clusterSource.getClusterLeaves(
                      clusterId,
                      100,
                      0,
                      (err: any, leafFeatures: any) => {
                        if (err || !leafFeatures?.length) return;

                        const coordinates = (
                          features[0].geometry as any
                        ).coordinates.slice();

                        self.controller.clusterDetail.show(
                          coordinates,
                          leafFeatures
                        );
                      }
                    );
                  }, CLUSTER_ZOOM_IN_ANIMATION_TIME * 0.75);
                }
              }
            );
          }
        );
      };
      self.controller.map.on(
        "click",
        "clusters",
        self.events["click-clusters"]
      );

      self.events["mouseenter-clusters"] = () => {
        if (!self.controller.map) return;
        self.controller.map.getCanvas().style.cursor = "pointer";
      };
      self.controller.map.on(
        "mouseenter",
        "clusters",
        self.events["mouseenter-clusters"]
      );

      self.events["mouseleave-clusters"] = () => {
        if (!self.controller.map) return;
        self.controller.map.getCanvas().style.cursor = "";
      };
      self.controller.map.on(
        "mouseleave",
        "clusters",
        self.events["mouseleave-clusters"]
      );

      const showMapPop = (e: any) => {
        const feature = e?.features?.[0];
        if (!feature || !feature?.properties?.slug) return;
        const coordinates = feature.geometry.coordinates.slice();
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }
        try {
          self.controller.popups.hideAll();
          self.controller.popups.add(
            feature?.properties?.slug,
            new MapPopup(
              feature?.properties?.slug,
              self.controller,
              coordinates,
              feature?.properties?.name, // xxx the content needs probably to be better ...
              {
                offset: [
                  self.controller.POPUP_OFFSET.x,
                  self.controller.POPUP_OFFSET.y,
                ],
              }
            )
          );
        } catch (err) {}
      };

      self.events["zoom"] = () => {
        if (self.controller.isAnimating) return;

        if (
          self.controller.map &&
          (self.controller.map.getZoom() <
            self.controller.overlayZoomLevel -
              self.controller.ZOOM_LEVEL_HIDE_ADJUSTOR ||
            self.controller.map.getZoom() >
              self.controller.overlayZoomLevel +
                self.controller.ZOOM_LEVEL_HIDE_ADJUSTOR)
        ) {
          self.controller.overlayZoomLevel = 0;
          self.controller.clusterDetail.hide();
          self.controller.popups.hideAll();
        }
      };
      self.controller.map.on("zoom", self.events["zoom"]);

      if (primaryInput !== "touch") {
        self.events["mouseenter-clustered-locations"] = (e: any) => {
          if (self.controller.isAnimating) return;
          if (self.controller.map) {
            // Change the cursor style as a UI indicator.
            self.controller.map.getCanvas().style.cursor = "pointer";
            if (e?.features?.[0]) showMapPop(e);
          }
        };

        self.controller.map.on(
          "mouseenter",
          "clustered-locations",
          self.events["mouseenter-clustered-locations"]
        );

        self.events["mouseleave-clustered-locations"] = () => {
          if (self.controller.map) {
            self.controller.map.getCanvas().style.cursor = "";
            self.controller.popups.hideAll();
          }
        };

        self.controller.map.on(
          "mouseleave",
          "clustered-locations",
          self.events["mouseleave-clustered-locations"]
        );
      }

      self.events["click-clustered-locations"] = (e: any) => {
        if (e?.features?.[0]?.properties?.id) {
          try {
            const coordinates =
              e?.features?.[0]?.geometry?.coordinates?.slice();
            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            self.controller.showQuickView(
              coordinates,
              e?.features?.[0]?.properties?.id
            );
          } catch (err) {}
        }
      };

      self.controller.map.on(
        "click",
        "clustered-locations",
        self.events["click-clustered-locations"]
      );

      const debouncedRenderFunction = debounce(() => {
        if (!self?.controller?.map) return;

        const totalInViewCount = queryFilteredForDuplicates(
          self.controller.map.queryRenderedFeatures(undefined, {
            layers: ["locations"],
          }),
          "id"
        ).length;

        let filteredInViewCount = queryFilteredForDuplicates(
          self.controller.map.querySourceFeatures("clustered-locations", {
            filter: ["!", ["has", "point_count"]],
            sourceLayer: "clustered-locations",
          }),
          "id"
        ).length;

        filteredInViewCount += queryFilteredForDuplicates(
          self.controller.map.queryRenderedFeatures(undefined, {
            filter: ["has", "point_count"],
            sourceLayer: "clustered-locations",
          }),
          "cluster_id"
        ).reduce(
          (count: number, cluster: any) =>
            (count += cluster?.properties?.point_count ?? 0),
          0
        );

        self.controller.updateMapState({
          totalInViewCount,
          filteredInViewCount: Math.min(filteredInViewCount, totalInViewCount),
          filteredCount: self.featureCount,
        });
      }, CLUSTER_COUNT_UPDATE_TIMEOUT);

      self.events["render"] = (e: any) => {
        debouncedRenderFunction();
      };

      self.controller.map.on("render", self.events["render"]);

      self.show();

      const highlights = self.controller.map.getLayer("highlights");
      if (highlights) {
        self.controller.map.moveLayer("highlights", "clustered-locations");
      }
    }
  }

  setFilter(filter: any) {
    const self = this;
    if (self.controller?.map) {
      if (self.controller.map?.getLayer("unclustered-locations"))
        self.controller.map.setFilter("unclustered-locations", filter);
      //["match", ["get", "id"], ["loc-1", "loc-2", "loc-3", "loc-4", "loc-5", "loc-8", "loc-10"], true, false]
    }
  }

  fitToBounds(easeTo?: boolean) {
    const self = this;
    if (self.controller?.map && self.bounds) {
      self.controller.fitToBounds(
        self.bounds,
        {
          maxZoom: self.controller.MAX_BOUNDS_ZOOM,
          padding: self.controller.getBoundsPadding(),
        },
        easeTo
      );
    }
  }

  hide() {
    const self = this;
    if (!self.isVisible) return;

    self.controller.toggleLayersVisibility(self.layers, "none");

    self.isVisible = false;
  }

  show() {
    const self = this;
    if (self.isVisible) return;

    self.controller.toggleLayersVisibility(self.layers, "visible");

    self.isVisible = true;
  }

  clear() {
    const self = this;
    if (self.controller?.map) {
      self.isVisible = false;
      self.isDataSet = true;
      self.controller.removeLayers(self.layers);

      if (Object.keys(self.events).length) {
        Object.keys(self.events).forEach((key) => {
          if (self.controller?.map) {
            const params: string[] = key.split("-");
            if (params.length > 1) {
              self.controller.map.off(
                params[0] as any,
                params[1],
                self.events[key]
              );
            } else {
              self.controller.map.off(key as any, self.events[key]);
            }
          }
        });
        self.events = {};
      }
    }
  }
}
