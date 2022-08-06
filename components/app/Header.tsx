import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";

import { useHeaderContext } from "~/providers/HeaderContextProvider";
import {
  useMainMenuActions,
  useMainMenuStateIsOpenState,
} from "~/components/state/MainMenuState";
import { Logo } from "./Logo";
import { useScrollPosition } from "~/hooks/useScrollPosition";
import { SkipToLink } from "../ui/SkipToLink";
import useIsMounted from "~/hooks/useIsMounted";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { MenuButton } from "./MenuButton";
import { LabElement } from "../ui/LabElement";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import Link from "next/link";
import { usePageStateIsLoadingState } from "../state/PageState";

const SCROLL_UP_THRESHOLD_PX = 150;
const SCROLL_DOWN_THRESHOLD_PX = 250;
const SCROLL_UP_REVEAL_TIMEOUT = 2500;

const StyledHeader = styled.header<{
  headerTransform?: string;
  headerPosition?: string;
  headerColor?: string;
  isHidden?: boolean;
}>`
  position: ${({ headerPosition }) => headerPosition ?? "sticky"};
  background-color: ${({ headerColor }) => headerColor ?? "transparent"};
  top: 0;
  left: 0;
  width: 100%;

  z-index: ${({ theme }) => theme.zIndex.header};
  transform: ${({ headerTransform }) => headerTransform};
  transition: background-color 0.3s, transform 0.5s, opacity 0.5s;

  display: flex;
  justify-content: flex-end;
  & a {
    text-decoration: none;
  }

  padding: var(--size-4);

  ${({ isHidden }) =>
    isHidden
      ? `
          pointer-events: none;
          opacity: 0;
          touch-action: none;
        `
      : undefined}
`;

const MainNav = styled.nav`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transform: translateZ(0);
  padding: 0 var(--size-6);

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: 0 var(--size-6);
  }
`;

const HeaderNav = styled.div`
  display: flex;
  height: 100%;
`;

const HeaderNavLinks = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  gap: 0.3em;
`;

export const Header = ({
  isHome,
  children,
  isHidden,
  showLogo = true,
  slideUpOnScroll = true,
  slideUpOnScrollMaxWidthPx = 740,
}: {
  children?: React.ReactNode;
  isHome?: boolean;
  showLogo?: boolean;
  isHidden?: boolean;
  slideUpOnScroll?: boolean;
  slideUpOnScrollMaxWidthPx?: number;
}) => {
  const config = useConfigContext();

  const isMainMenuOpen = useMainMenuStateIsOpenState();
  const menuContext = useMainMenuActions();

  const isMounted = useIsMounted();

  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  const headerContext = useHeaderContext();

  const isLoading = usePageStateIsLoadingState();

  const scrollUpCounterTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);
  const scrollUpHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const scrollDownCounterTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const scrollUpCounterRef = useRef(0);
  const scrollDownCounterRef = useRef(0);
  const headerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const mainRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const browserData = useRef<any>({
    wW: 0,
    wH: 0,
    scrollY: 0,
    heightHeader: 0,
    heightMain: 0,
    heightSubNav: 0,
  });

  const [observeScroll, setObserveScroll] = useState(false);
  const [headerTuckUpTransform, setHeaderTuckUpTransform] = useState("none");

  const onResize = useCallback(() => {
    if (isMounted && browserData.current) {
      browserData.current = {
        ...browserData.current,
        wW: window.innerWidth,
        wH: window.innerHeight,
        heightHeader: headerRef?.current?.offsetHeight ?? 0,
        heightMain: mainRef?.current?.offsetHeight + 1 ?? 0,
      };
      const observe =
        slideUpOnScroll &&
        (!slideUpOnScrollMaxWidthPx ||
          window.innerWidth < slideUpOnScrollMaxWidthPx);
      setObserveScroll(observe);
      setHeaderTuckUpTransform(`translateZ(0)`);
    }
  }, [isMounted, slideUpOnScroll, slideUpOnScrollMaxWidthPx]);
  const onResizeDebounced = debounce(onResize, 280);

  useEffect(() => {
    if (!isLoading) {
      setHeaderTuckUpTransform("translateZ(0)");
    }
  }, [isLoading]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", onResizeDebounced);

    onResize();

    const triggerOnResize = () => {
      onResize();
    };
    document.addEventListener("DOMContentLoaded", triggerOnResize);

    return () => {
      window.removeEventListener("resize", onResizeDebounced);
      document.removeEventListener("DOMContentLoaded", triggerOnResize);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // TODO: shall the header hide on scroll on mobiles?
  useScrollPosition(
    ({ prevPos, currPos }) => {
      if (!isMounted) return;
      if (!headerContext.observeScroll) return;

      if (currPos.y < prevPos.y) {
        // scrolling down
        if (scrollUpCounterTimeoutRef.current) {
          clearTimeout(scrollUpCounterTimeoutRef.current);
          scrollUpCounterTimeoutRef.current = null;
          scrollUpCounterRef.current = 0;
        }

        if (scrollUpHideTimeoutRef.current) {
          clearTimeout(scrollUpHideTimeoutRef.current);
          scrollUpHideTimeoutRef.current = null;
        }

        if (scrollDownCounterTimeoutRef.current)
          clearTimeout(scrollDownCounterTimeoutRef.current);

        scrollDownCounterTimeoutRef.current = setTimeout(() => {
          scrollDownCounterRef.current = 0;
        }, 750);

        scrollDownCounterRef.current += Math.abs(currPos.y - prevPos.y);

        if (
          scrollDownCounterRef.current > SCROLL_DOWN_THRESHOLD_PX &&
          headerTuckUpTransform === "translateZ(0)"
        ) {
          setHeaderTuckUpTransform(
            `translateY(-${headerRef?.current?.offsetHeight}px) translateZ(0)`
          );
        }
      } else {
        // scrolling up
        if (scrollDownCounterTimeoutRef.current) {
          clearTimeout(scrollDownCounterTimeoutRef.current);
          scrollDownCounterTimeoutRef.current = null;
          scrollDownCounterRef.current = 0;
        }

        if (scrollUpCounterTimeoutRef.current) {
          clearTimeout(scrollUpCounterTimeoutRef.current);
          scrollUpCounterTimeoutRef.current = null;
          scrollUpCounterRef.current = 0;
        }

        if (scrollUpHideTimeoutRef.current) {
          clearTimeout(scrollUpHideTimeoutRef.current);
          scrollUpHideTimeoutRef.current = null;
        }

        if (scrollUpCounterTimeoutRef.current)
          clearTimeout(scrollUpCounterTimeoutRef.current);

        scrollUpCounterTimeoutRef.current = setTimeout(() => {
          scrollUpCounterRef.current = 0;
        }, 750);

        scrollUpCounterRef.current += Math.abs(prevPos.y - currPos.y);

        if (scrollUpCounterRef.current > SCROLL_UP_THRESHOLD_PX) {
          if (headerTuckUpTransform !== "translateZ(0)") {
            setHeaderTuckUpTransform(`translateZ(0)`);
          }
        }

        if (scrollUpHideTimeoutRef.current)
          clearTimeout(scrollUpHideTimeoutRef.current);

        scrollUpHideTimeoutRef.current = setTimeout(() => {
          if (
            headerTuckUpTransform === "translateZ(0)" &&
            !menuContext.getIsOpen()
          ) {
            setHeaderTuckUpTransform(
              `translateY(-${headerRef?.current?.offsetHeight}px) translateZ(0)`
            );
          }
        }, SCROLL_UP_REVEAL_TIMEOUT);
      }
    },
    [headerTuckUpTransform, headerContext.observeScroll, isMounted],
    observeScroll,
    undefined,
    false,
    300
  );

  return (
    <>
      <MenuButton />
      <StyledHeader
        ref={headerRef}
        headerTransform={headerTuckUpTransform ?? "translateZ(0)"}
        headerPosition="sticky"
        headerColor="#ffffff"
        style={{
          width: isMainMenuOpen ? `calc(100vw - var(--sbw, 0))` : undefined,
        }}
        isHidden={headerContext.fadeOut || isHidden}
        className="header"
      >
        <SkipToLink id="content">skip to content</SkipToLink>
        {showLogo && (
          <Logo
            color="var(--color-text)"
            hoverColor="var(--color-ailab-red)"
            size={1.3}
          />
        )}

        <MainNav ref={mainRef}>
          <HeaderNav>
            <HeaderNavLinks
              style={{
                transform: "translateZ(0)",
                display: isTabletLandscapeAndUp ? "flex" : "none",
              }}
            >
              {config?.tools?.length > 0 &&
                config?.tools.map((tool: any, index: number) => {
                  return (
                    <Link href={`/tool/${tool.slug}`} key={`tool-${index}`}>
                      <a>
                        <LabElement
                          shortHandle={tool.iconShort}
                          longText={tool.iconLong}
                          color="var(--color-grey)"
                          hoverColor={tool.colorBase}
                          size={1.3}
                        />
                      </a>
                    </Link>
                  );
                })}
            </HeaderNavLinks>
          </HeaderNav>
        </MainNav>
        {children}
      </StyledHeader>
    </>
  );
};
