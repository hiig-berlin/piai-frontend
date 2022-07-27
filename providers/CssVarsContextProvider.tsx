import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
  startTransition,
} from "react";
import useIsMounted from "~/hooks/useIsMounted";
import { breakpointEMs } from "~/theme/theme";
import debounce from "lodash/debounce";

type CssVarContextVars = {
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

export type CssVarContextType = {
  vars: CssVarContextVars;
  getVars: () => CssVarContextVars;
};

const cssVarContextVarsDefault: CssVarContextVars = {
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
};

const cssVarContextDefault: CssVarContextType = {
  vars: cssVarContextVarsDefault,
  getVars: () => cssVarContextVarsDefault,
};

// create context
const CssVarsContext = createContext<CssVarContextType>(cssVarContextDefault);

export const useCssVarsContext = () => useContext(CssVarsContext);

// context provider
export const CssVarsContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const cssVarsRef = useRef<CssVarContextVars>(cssVarContextVarsDefault);
  const [cssVars, setCssVars] = useState<CssVarContextVars>(
    cssVarContextVarsDefault
  );

  const currentOrientationRef = useRef("");
  const isMounted = useIsMounted();

  const getVars = useCallback(() => cssVarsRef.current, []);

  const onResize = useCallback(() => {
    if (!isMounted) return;

    let update = false;

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

    if ((isBase && !isMobile) !== cssVarsRef.current.isBase) {
      cssVarsRef.current.isBase = isBase && !isMobile;
      update = true;
    }

    if (
      ((isMobile || isMobileLandscape) && !isTablet) !==
      cssVarsRef.current.isMobile
    ) {
      cssVarsRef.current.isMobile =
        (isMobile || isMobileLandscape) && !isTablet;
      update = true;
    }

    if (
      (isMobile && !isMobileLandscape) !== cssVarsRef.current.isMobilePortrait
    ) {
      cssVarsRef.current.isMobilePortrait = isMobile && !isMobileLandscape;
      update = true;
    }

    if (
      (isMobileLandscape && !isTablet) !== cssVarsRef.current.isMobileLandscape
    ) {
      cssVarsRef.current.isMobileLandscape = isMobileLandscape && !isTablet;
      update = true;
    }

    if (
      ((isTablet || isTabletLandscape) && !isDesktop) !==
      cssVarsRef.current.isTablet
    ) {
      cssVarsRef.current.isTablet =
        (isTablet || isTabletLandscape) && !isDesktop;
      update = true;
    }

    if (
      (isTablet && !isTabletLandscape) !== cssVarsRef.current.isTabletPortrait
    ) {
      cssVarsRef.current.isTabletPortrait = isTablet && !isTabletLandscape;
      update = true;
    }

    if (
      (isTabletLandscape && !isDesktop) !== cssVarsRef.current.isTabletLandscape
    ) {
      cssVarsRef.current.isTabletLandscape = isTabletLandscape && !isDesktop;
      update = true;
    }

    if ((isDesktop && !isScreen) !== cssVarsRef.current.isDesktop) {
      cssVarsRef.current.isDesktop = isDesktop && !isScreen;
      update = true;
    }

    if (isScreen !== cssVarsRef.current.isScreen) {
      cssVarsRef.current.isScreen = isScreen;
      update = true;
    }

    const isDesktopAndUp = isDesktop || isScreen;
    if (isDesktopAndUp !== cssVarsRef.current.isDesktopAndUp) {
      cssVarsRef.current.isDesktopAndUp = isDesktopAndUp;
      update = true;
    }

    const isTabletLandscapeAndUp = isTabletLandscape || isDesktopAndUp;
    if (isTabletLandscapeAndUp !== cssVarsRef.current.isTabletLandscapeAndUp) {
      cssVarsRef.current.isTabletLandscapeAndUp = isTabletLandscapeAndUp;
      update = true;
    }

    const isTabletAndUp = isTablet || isTabletLandscapeAndUp;
    if (isTabletAndUp !== cssVarsRef.current.isTabletAndUp) {
      cssVarsRef.current.isTabletAndUp = isTabletAndUp;
      update = true;
    }

    let currentBreakpoint = "base";
    if ((isMobile || isMobileLandscape) && !isTablet)
      currentBreakpoint = "mobile";
    if ((isTablet || isTabletLandscape) && !isDesktop)
      currentBreakpoint = "tablet";
    if (isDesktop && !isScreen) currentBreakpoint = "desktop";
    if (isScreen) currentBreakpoint = "screen";

    if (cssVarsRef.current.currentBreakpoint !== currentBreakpoint) {
      cssVarsRef.current.currentBreakpoint = currentBreakpoint;
      update = true;
    }

    const orientation =
      window.innerWidth > window.innerHeight ? "landscape" : "portrait";

    if (orientation !== currentOrientationRef.current) {
      update = true;
      currentOrientationRef.current = orientation;
      const outer = document.createElement("div");
      try {
        document.body.appendChild(outer);

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

        cssVarsRef.current = {
          ...cssVarsRef.current,
          sbw: 0,
          lbh: 0,
          h100vh: window.innerHeight,
          h100percent: window.innerHeight,
        };
      } catch (err) {
        cssVarsRef.current = {
          ...cssVarsRef.current,
          sbw: 0,
          lbh: 0,
          h100vh: window.innerHeight,
          h100percent: window.innerHeight,
        };
      }
    }

    if (update && isMounted) {
      startTransition(() => {
        setCssVars({ ...cssVarsRef.current });
      });
    }
  }, [isMounted]);
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

  return (
    <CssVarsContext.Provider
      value={{
        vars: { ...cssVarsRef.current },
        getVars,
      }}
    >
      {children}
    </CssVarsContext.Provider>
  );
};
