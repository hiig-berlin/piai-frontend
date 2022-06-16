import React, { useEffect, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";

import { useHeaderContext } from "~/providers/HeaderContextProvider";
import { MenuHeader } from "./Menus/MenuHeader";
import { useMenuContext } from "~/providers/MenuContextProvider";
import { Logo } from "./Logo";
import { usePageStateContext } from "~/providers/PageStateContextProvider";
import { useScrollPosition } from "~/hooks/useScrollPosition";
import { SkipToLink } from "../ui/SkipToLink";
import useIsMounted from "~/hooks/useIsMounted";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { MenuButton } from "./MenuButton";
import { LabElement } from "../ui/LabElement";

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
`;

const scrollUpPixel = 150;

export const Header = ({
  isHome,
  children,
  isHidden,
  showLogo = true,
}: {
  children?: React.ReactNode;
  isHome?: boolean;
  showLogo?: boolean;
  isHidden?: boolean;
}) => {
  const menuContext = useMenuContext();

  const isMounted = useIsMounted();

  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  const scrollUpCounterTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null);

  const headerContext = useHeaderContext();
  const { isLoading } = usePageStateContext();

  const scrollUpHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const animatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const scrollUpCounterRef = useRef(0);
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

  const [headerTuckUpTransform, setHeaderTuckUpTransform] = useState("none");

  const [animating, setAnimating] = useState(false);

  const onResize = useCallback(() => {
    if (isMounted && browserData.current) {
      browserData.current = {
        ...browserData.current,
        wW: window.innerWidth,
        wH: window.innerHeight,
        heightHeader: headerRef?.current?.offsetHeight ?? 0,
        heightMain: mainRef?.current?.offsetHeight + 1 ?? 0,
        lastScrollY: 0,
      };
    }
  }, [isMounted]);
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

        if (
          headerTuckUpTransform === "translateZ(0)" ||
          headerTuckUpTransform === "translateY(-110%) translateZ(0)"
        ) {
          setHeaderTuckUpTransform(
            `translateY(-${headerRef?.current?.offsetHeight}px) translateZ(0)`
          );
        }
      } else {
        // scrolling up

        if (animatingTimeoutRef.current) {
          clearTimeout(animatingTimeoutRef.current);
          animatingTimeoutRef.current = null;
          setAnimating(false);
        }

        if (scrollUpCounterTimeoutRef.current)
          clearTimeout(scrollUpCounterTimeoutRef.current);

        scrollUpCounterTimeoutRef.current = setTimeout(() => {
          scrollUpCounterRef.current = 0;
        }, 750);

        scrollUpCounterRef.current += Math.abs(prevPos.y - currPos.y);
        if (scrollUpCounterRef.current > scrollUpPixel) {
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
        }, 1500);
      }
    },
    [headerTuckUpTransform, animating, headerContext.observeScroll, isMounted],
    true,
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
        headerColor="#ffffffcc"
        style={{
          width: menuContext.isOpen ? `calc(100vw - var(--sbw, 0))` : undefined,
        }}
        isHidden={headerContext.fadeOut || isHidden}
        className="header"
      >
        <SkipToLink id="content">skip to content</SkipToLink>
        {showLogo && <Logo color="var(--color-text)" hoverColor="var(--color-ailab-red)" size={1.3} />}
        <MainNav ref={mainRef}>
          <HeaderNav>
            <HeaderNavLinks
              style={{
                transform: "translateZ(0)",
                display: isTabletLandscapeAndUp ? "flex" : "none",
              }}
            >
              {/* <MenuHeader id="menu-header" /> */}
              <LabElement shortHandle="Ma" longText="Project Map" size={1.3} color="var(--color-grey)" hoverColor="var(--color-piai-map)"/>
              <LabElement shortHandle="En" longText="Energy Usage" size={1.3} color="var(--color-grey)" hoverColor="var(--color-piai-energy)"/>
            </HeaderNavLinks>
          </HeaderNav>
        </MainNav>
        {children}
      </StyledHeader>
      
    </>
  );
};
