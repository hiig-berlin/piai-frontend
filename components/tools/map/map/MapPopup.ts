import { Popup } from "maplibre-gl";
import type { LngLatLike, Offset } from "maplibre-gl";
import type { MapController } from "./MapController";

const TIMING_FADE_IN = 150;
const TIMING_FADE_OUT = 200;

export type MapPopupOptions = {
  offset?: Offset;
  onClick?: Function;
  minZoom?: number;
  timings?: {
    fadeIn?: number;
    fadeOut?: number;
  };
};

export class MapPopup {
  popup: Popup | null = null;

  id;

  options: MapPopupOptions | null = null;

  content: HTMLDivElement | null = null;

  timeout1: ReturnType<typeof setTimeout> | null = null;

  timeout2: ReturnType<typeof setTimeout> | null = null;

  isFadingIn = false;

  isFadingOut = false;

  controller;

  timingFadeOut;

  timingFadeIn;

  constructor(
    id: string,
    mapController: MapController,
    coordinates: LngLatLike,
    content: string,
    options?: MapPopupOptions
  ) {
    this.id = id;

    this.controller = mapController;
    this.options = options ?? null;

    this.timingFadeIn = options?.timings?.fadeIn ?? TIMING_FADE_IN;
    this.timingFadeOut = options?.timings?.fadeOut ?? TIMING_FADE_OUT;

    if (!this?.controller?.map) return;

    this.popup = new Popup({
      closeButton: false,
      closeOnClick: false,
    });

    if (typeof window === "undefined") return;

    try {
      this.content = document.createElement("div");
      this.content.innerHTML = content;

      if (typeof options?.onClick === "function") {
        this.content.addEventListener("click", options.onClick as any);
        this.content.classList.add("has-on-click");
      }
      this.content.classList.add("popup");

      this.popup
        .setLngLat(coordinates)
        .setDOMContent(this.content)
        .addTo(this.controller.map);

      if (this.options?.offset) {
        this.popup.setOffset(this.options.offset);
      }
    } catch (err) {
      console.log(err);
    }
  }

  show() {
    const self = this;
    if (!self?.controller?.map || self.isFadingIn) return;

    if (
      self.options?.minZoom &&
      self.options?.minZoom > self.controller.map.getZoom()
    )
      return;

    if (self.timeout1) clearTimeout(self.timeout1);

    if (self.timeout2) clearTimeout(self.timeout2);

    self.isFadingIn = true;
    self.isFadingOut = false;

    if (self.content) {
      self.timeout1 = setTimeout(() => {
        self.content?.classList.add("fade-in");
      }, 20);

      self.timeout2 = setTimeout(() => {
        self.isFadingIn = false;
        self.content?.classList.remove("fade-in");
        self.content?.classList.add("faded-in");
      }, TIMING_FADE_IN);
    }
  }

  remove() {
    const self = this;
    self.popup?.remove();
  }

  hide() {
    const self = this;
    if (!this?.controller?.map || self.isFadingOut) return;

    if (self.timeout1) clearTimeout(self.timeout1);

    if (self.timeout2) clearTimeout(self.timeout2);

    self.isFadingIn = false;
    self.isFadingOut = true;

    self.timeout1 = setTimeout(() => {
      self.content?.classList.remove("faded-in");
      self.content?.classList.add("fade-out");
    }, 60);

    self.timeout2 = setTimeout(() => {
      self.isFadingOut = false;
      this.controller.popups.remove(this.id);
    }, TIMING_FADE_OUT);
  }
}
