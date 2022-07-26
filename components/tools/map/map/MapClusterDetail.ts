import { primaryInput } from "detect-it";
import type { MapController } from "./MapController";
import { MapPopup } from "./MapPopup";
import { MapSpiderfier } from "./MapSpiderfier";

export class MapClusterDetail {
  controller: MapController;
  spiderfier: MapSpiderfier | null = null;
  clickBlock = false;
  clusterDetailOpen = false;
  clusterDetail: any = null;
  clusterDetailAnimating = false;
  clusterDetailClusterHash: string | null = null;

  constructor(controller: MapController) {
    this.controller = controller;
  }

  init() {
    const self = this;
    if (!self.controller.map) return;

    self.spiderfier = new MapSpiderfier(self.controller.map, {
      color: self.controller.toolConfig.colorDot,
      dotRadius: 16,
      clusterRadius: 24,
      onClick: (e: any, spiderLeg: any) => {
        self.controller.showQuickView(spiderLeg?.feature?.id);
      },
      initializeLeg: (spiderLeg: any) => {
        const showLegPopup = (e: any) => {
          if (self.controller.isAnimating) return;

          self.controller.clickBlock = true;
          e.preventDefault();

          self.controller.overlayZoomLevel =
            self.controller?.map?.getZoom() ?? 0;

          self.controller.popups.hideAll();
          self.controller.popups.add(
            spiderLeg?.feature?.slug,
            new MapPopup(
              spiderLeg?.feature?.slug,
              self.controller,
              spiderLeg.latLng,
              spiderLeg?.feature?.name, // xxx the content needs probably to be better ...
              {
                offset: [
                  spiderLeg.popupOffset.bottom[0] +
                    self.controller.POPUP_OFFSET.x,
                  spiderLeg.popupOffset.bottom[1] +
                    self.controller.POPUP_OFFSET.y,
                ],
              }
            )
          );

          setTimeout(() => {
            self.controller.clickBlock = false;
          }, 100);
        };

        if (primaryInput === "mouse") {
          spiderLeg.elements.pin.addEventListener("mouseenter", showLegPopup);

          spiderLeg.elements.pin.addEventListener("mouseleave", () => {
            self.controller.popups.hide(spiderLeg?.feature?.slug);
          });
        } else {
          spiderLeg.elements.pin.addEventListener("click", showLegPopup);
        }
      },
    });
  }

  show(coordinates: [number, number], leafFeatures: any) {
    const self = this;
    if (!self.spiderfier) return;

    const newHash = `${coordinates[0].toFixed(6)}-${coordinates[1].toFixed(6)}`;
    if (self.clusterDetailOpen && self.clusterDetailClusterHash !== newHash) {
      self.spiderfier.unspiderfy();
      self.clusterDetailOpen = false;
      self.clusterDetailAnimating = false;
    }

    if (
      !self.clusterDetailClusterHash ||
      (!self.clusterDetailOpen && !self.clusterDetailAnimating)
    ) {
      self.clusterDetail = self.spiderfier.spiderfy(
        coordinates,
        leafFeatures.map((leafFeature: any) => {
          return leafFeature.properties;
        })
      );
      self.clusterDetailClusterHash = newHash;

      setTimeout(() => {
        self.clusterDetail?.map((e: any) =>
          e?.elements?.container?.classList.add("fadeIn")
        );
        setTimeout(() => {
          self.clusterDetailAnimating = true;
        }, 200);
      }, 20);
      self.clusterDetailOpen = true;
    }
  }

  hide() {
    const self = this;
    const currentHash = self.clusterDetailClusterHash;
    if (!self.spiderfier || !self.clusterDetailOpen) return;

    self.clusterDetail?.map((e: any) =>
      e?.elements?.container?.classList.add("fadeOut")
    );

    setTimeout(() => {
      if (self.clusterDetailClusterHash === currentHash) {
        self.clusterDetailAnimating = false;
        self.spiderfier?.unspiderfy();
        self.clusterDetailOpen = false;
        self.clusterDetailClusterHash = null;
        self.clusterDetail = null;
      }
    }, 200);
  }
}
