import { MapController } from "./MapController";
import { MapPopup } from "./MapPopup";

export class MapPopupManager {
  popups: Record<string | number, MapPopup> = {};

  controller: MapController | null = null;

  constructor(mapController: MapController) {
    const self = this;
    this.controller = mapController;
  }

  add(id: string, popup: MapPopup) {
    const self = this;
    self.popups[id] = popup;
    popup.show();
  }

  remove(id: string) {
    const self = this;

    if (id in self.popups) {
      self.popups[id].remove();
      delete self.popups[id];
    }
  }

  exists(id: string) {
    const self = this;

    return id in self.popups;
  }

  show(id: string) {
    const self = this;
    if (id in self.popups) {
      self.popups[id].show();
    }
  }

  hide(id: string) {
    const self = this;
    if (id in self.popups) {
      self.popups[id].hide();
    }
  }

  hideAll() {
    const self = this;

    Object.keys(self.popups).forEach((key) => {
      self.popups[key].hide();
    });
  }

  hideAllInScope(scopePrefix: string) {
    const self = this;

    Object.keys(self.popups).forEach((key) => {
      if (key.indexOf(scopePrefix) > -1) {
        self.popups[key].hide();
      }
    });
  }

  hideAllInScopeButKeepId(scopePrefix: string, id: string) {
    const self = this;

    Object.keys(self.popups).forEach((key) => {
      if (key !== id && key.indexOf(scopePrefix) > -1) {
        self.popups[key].hide();
      }
    });
  }

  hideAllInScopeButKeepIds(scopePrefix: string, arrIds: string[]) {
    const self = this;

    Object.keys(self.popups).forEach((key) => {
      if (!arrIds.includes(key) && key.indexOf(scopePrefix) > -1) {
        self.popups[key].hide();
      }
    });
  }
}
