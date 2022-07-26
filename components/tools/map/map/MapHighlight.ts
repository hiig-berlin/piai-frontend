import { PointLike } from "maplibre-gl";
import type { MapController } from "./MapController";
import type { MapPopupOptions } from "./MapPopup";

import { MapPopup } from "./MapPopup";

const HIGHLIGHT_POPUP_OFFSET: PointLike = [0, 0];
const HIGHLIGHT_POPUP_TIMINGS = {
  fadeIn: 1020,
  fadeOut: 1060,
};

type MapHighlightOptions = MapPopupOptions & {
  panTo?: boolean;
  jumpTo?: boolean;
  animationOffset?: PointLike;
};

export class MapHighlight {
  controller;

  constructor(mapController: MapController) {
    this.controller = mapController;
  }

  addPin(
    id: string,
    lng: number,
    lat: number,
    content: string,
    options: MapHighlightOptions
  ) {
    const self = this;

    const popupId = `highlight-${id}`;

    self.controller.popups.hideAllInScopeButKeepId("highlight-", popupId);

    if (self.controller.popups.exists(popupId)) {
      self.controller.popups.show(popupId);
    } else {
      const popup = new MapPopup(
        popupId,
        self.controller,
        [lng, lat],
        content,
        {
          offset: HIGHLIGHT_POPUP_OFFSET,
          timings: HIGHLIGHT_POPUP_TIMINGS,
          onClick: options?.onClick,
        }
      );
      
      self.controller.popups.add(popupId, popup);

      if (options?.panTo)
        self.controller.panTo(lng, lat, {
          offset: options?.animationOffset,
        });

      if (options?.jumpTo)
        self.controller.jumpTo(lng, lat, {
          offset: options?.animationOffset,
        });
    }
  }
}
