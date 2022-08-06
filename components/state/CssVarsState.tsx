import React, {
  useCallback,
  useEffect,
  useRef,
  startTransition,
} from "react";
import create from "zustand";

import useIsMounted from "~/hooks/useIsMounted";
import { breakpointEMs } from "~/theme/theme";
import debounce from "lodash/debounce";

export type CssVarsState = {
  isInitializing: boolean;
  sbw: number;
  lbh: number;
  h100percent: number;
  h100vh: number;
  currentBreakpoint: string;
  isBase: boolean;
  isMobile: boolean;
  isMobilePortrait: boolean;
  isMobileLandscape: boolean;
  isTablet: boolean;
  isTabletAndUp: boolean;
  isTabletPortrait: boolean;
  isTabletLandscape: boolean;
  isTabletLandscapeAndUp: boolean;
  isDesktop: boolean;
  isDesktopAndUp: boolean;
  isScreen: boolean;
};

export type CssVarsStateActions = {
  getCssVarsState: () => CssVarsState;
  setCssVarsState: (state: CssVarsState) => void;
  updateCssVarsState: (state: Partial<CssVarsState>) => void;
};

export type CssVarsStateStore = CssVarsState & CssVarsStateActions;

export const useCssVarsStateStore = create<CssVarsStateStore>((set, get) => ({
  isInitializing: true,
  sbw: 0,
  lbh: 0,
  h100percent: 0,
  h100vh: 0,
  currentBreakpoint: "mobile",
  isBase: true,
  isMobile: true,
  isMobilePortrait: true,
  isMobileLandscape: false,
  isTablet: false,
  isTabletAndUp: false,
  isTabletPortrait: false,
  isTabletLandscape: false,
  isTabletLandscapeAndUp: false,
  isDesktop: false,
  isDesktopAndUp: false,
  isScreen: false,
  getCssVarsState: () => get(),
  setCssVarsState: (state: CssVarsState) =>
    set(() => ({
      ...state,
    })),
  updateCssVarsState: (state: Partial<CssVarsState>) =>
    set(() => ({
      ...state,
    })),
}));

export const useCssVarsStateStoreActions = () => {
  return useCssVarsStateStore(
    (state) =>
      Object.keys(state).reduce(
        (carry: Partial<CssVarsStateStore>, key: string) => {
          if (
            key.startsWith("get") ||
            key.startsWith("set") ||
            key.startsWith("update")
          ) {
            carry = {
              ...carry,
              [key]: state[key as keyof CssVarsStateStore],
            };
          }
          return carry;
        },
        {}
      ) as CssVarsStateActions
  );
};

export const useCssVarsStateIsInitializingState = () =>
  useCssVarsStateStore((state) => state.isInitializing);
export const useCssVarsStateSbwState = () =>
  useCssVarsStateStore((state) => state.sbw);
export const useCssVarsStateLbhState = () =>
  useCssVarsStateStore((state) => state.lbh);
export const useCssVarsStateH100percentState = () =>
  useCssVarsStateStore((state) => state.h100percent);
export const useCssVarsStateH100vhState = () =>
  useCssVarsStateStore((state) => state.h100vh);
export const useCssVarsStateCurrentBreakpointState = () =>
  useCssVarsStateStore((state) => state.currentBreakpoint);
export const useCssVarsStateIsBaseState = () =>
  useCssVarsStateStore((state) => state.isBase);
export const useCssVarsStateIsMobileState = () =>
  useCssVarsStateStore((state) => state.isMobile);
export const useCssVarsStateIsMobilePortraitState = () =>
  useCssVarsStateStore((state) => state.isMobilePortrait);
export const useCssVarsStateIsMobileLandscapeState = () =>
  useCssVarsStateStore((state) => state.isMobileLandscape);
export const useCssVarsStateIsTabletState = () =>
  useCssVarsStateStore((state) => state.isTablet);
export const useCssVarsStateIsTabletAndUpState = () =>
  useCssVarsStateStore((state) => state.isTabletAndUp);
export const useCssVarsStateIsTabletPortraitState = () =>
  useCssVarsStateStore((state) => state.isTabletPortrait);
export const useCssVarsStateIsTabletLandscapeState = () =>
  useCssVarsStateStore((state) => state.isTabletLandscape);
export const useCssVarsStateIsTabletLandscapeAndUpState = () =>
  useCssVarsStateStore((state) => state.isTabletLandscapeAndUp);
export const useCssVarsStateIsDesktopState = () =>
  useCssVarsStateStore((state) => state.isDesktop);
export const useCssVarsStateIsDesktopAndUpState = () =>
  useCssVarsStateStore((state) => state.isDesktopAndUp);
export const useCssVarsStateIsScreenState = () =>
  useCssVarsStateStore((state) => state.isScreen);

// context provider
export const CssVarsStateController = () => {
  const isMounted = useIsMounted();

  const currentOrientationRef = useRef("");

  const { getCssVarsState, updateCssVarsState } = useCssVarsStateStoreActions();

  const onResize = useCallback(() => {
    if (!isMounted) return;

    const isBase = window.matchMedia(
      `(max-width: ${breakpointEMs.mobile - 0.001}em)`
    ).matches;

    const isMobile = window.matchMedia(
      `(min-width: ${breakpointEMs.mobile}em)`
    ).matches;

    const isMobileLandscape = window.matchMedia(
      `(min-width: ${breakpointEMs.mobileLandscape}em)`
    ).matches;

    const isTablet = window.matchMedia(
      `(min-width: ${breakpointEMs.tablet}em)`
    ).matches;
    const isTabletLandscape = window.matchMedia(
      `(min-width: ${breakpointEMs.tabletLandscape}em)`
    ).matches;
    const isDesktop = window.matchMedia(
      `(min-width: ${breakpointEMs.desktop}em)`
    ).matches;
    const isScreen = window.matchMedia(
      `(min-width: ${breakpointEMs.screen}em)`
    ).matches;

    let newState: Partial<CssVarsState> = {};
    const currentState = getCssVarsState();
    if (currentState.isInitializing) {
      newState.isInitializing = false;
    }

    if ((isBase && !isMobile) !== currentState.isBase) {
      newState.isBase = isBase && !isMobile;
    }

    if (
      ((isMobile || isMobileLandscape) && !isTablet) !== currentState.isMobile
    ) {
      newState.isMobile = (isMobile || isMobileLandscape) && !isTablet;
    }

    if ((isMobile && !isMobileLandscape) !== currentState.isMobilePortrait) {
      newState.isMobilePortrait = isMobile && !isMobileLandscape;
    }

    if ((isMobileLandscape && !isTablet) !== currentState.isMobileLandscape) {
      newState.isMobileLandscape = isMobileLandscape && !isTablet;
    }

    if (((isTablet || isTabletLandscape) && !isDesktop) !== newState.isTablet) {
      newState.isTablet = (isTablet || isTabletLandscape) && !isDesktop;
    }

    if ((isTablet && !isTabletLandscape) !== currentState.isTabletPortrait) {
      newState.isTabletPortrait = isTablet && !isTabletLandscape;
    }

    if ((isTabletLandscape && !isDesktop) !== currentState.isTabletLandscape) {
      newState.isTabletLandscape = isTabletLandscape && !isDesktop;
    }

    if ((isDesktop && !isScreen) !== currentState.isDesktop) {
      newState.isDesktop = isDesktop && !isScreen;
    }

    if (isScreen !== currentState.isScreen) {
      newState.isScreen = isScreen;
    }

    const isDesktopAndUp = isDesktop || isScreen;
    if (isDesktopAndUp !== currentState.isDesktopAndUp) {
      newState.isDesktopAndUp = isDesktopAndUp;
    }

    const isTabletLandscapeAndUp = isTabletLandscape || isDesktopAndUp;
    if (isTabletLandscapeAndUp !== currentState.isTabletLandscapeAndUp) {
      newState.isTabletLandscapeAndUp = isTabletLandscapeAndUp;
    }

    const isTabletAndUp = isTablet || isTabletLandscapeAndUp;
    if (isTabletAndUp !== currentState.isTabletAndUp) {
      newState.isTabletAndUp = isTabletAndUp;
    }

    let currentBreakpoint = "base";
    if ((isMobile || isMobileLandscape) && !isTablet)
      currentBreakpoint = "mobile";
    if ((isTablet || isTabletLandscape) && !isDesktop)
      currentBreakpoint = "tablet";
    if (isDesktop && !isScreen) currentBreakpoint = "desktop";
    if (isScreen) currentBreakpoint = "screen";

    if (currentState.currentBreakpoint !== currentBreakpoint) {
      newState.currentBreakpoint = currentBreakpoint;
    }

    const orientation =
      window.innerWidth > window.innerHeight ? "landscape" : "portrait";

    if (orientation !== currentOrientationRef.current) {
      currentOrientationRef.current = orientation;
      const outer = document.createElement("div");
      try {
        document.body.appendChild(outer);
        outer.style.position = "fixed";
        outer.style.visibility = "hidden";
        outer.style.width = "100px";
        outer.style.height = "100vh";
        outer.style.overflow = "scroll";
        const widthNoScroll = outer.offsetWidth;

        const inner = document.createElement("div");
        inner.style.width = "100%";
        outer.appendChild(inner);
        const widthScroll = inner.offsetWidth;

        const h100vh = Math.max(window.innerHeight, outer.offsetHeight);

        const sbw = widthNoScroll - widthScroll;

        outer.style.height = "100%";

        const h100percent = Math.min(window.innerHeight, outer.offsetHeight);
        const lbh = h100vh - h100percent;

        document.documentElement.style.setProperty(
          "--sbw",
          `${sbw.toFixed(0)}px`
        );
        document.documentElement.style.setProperty(
          "--lbh",
          `${lbh.toFixed(0)}px`
        );
        document.body.removeChild(outer);

        newState = {
          ...newState,
          sbw,
          lbh,
          h100vh: Math.max(h100vh, window.innerHeight),
          h100percent: Math.max(h100percent, window.innerHeight),
        };
      } catch (e) {
        // do nothing
      }
    }

    if (Object.keys(newState).length && isMounted) {
      startTransition(() => updateCssVarsState(newState));
    }
  }, [isMounted, updateCssVarsState, getCssVarsState]);
  const onResizeDebounced = debounce(onResize, 120);

  useEffect(() => {
    if (typeof window === "undefined") return;

    onResize();

    window.addEventListener("resize", onResizeDebounced);

    return () => {
      window.removeEventListener("resize", onResizeDebounced);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};
