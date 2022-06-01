import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import FocusLock from "react-focus-lock";

import { useMenuContext } from "~/providers/MenuContextProvider";
import { SvgBackground } from "../ui/SvgBackground";
import { MenuFooter } from "./Menus/MenuFooter";

const ANIMATION_LENGTH = 500;

type MenuContainerStyledProps = {
  isOpen?: boolean;
  isAnimating?: boolean;
};

const MenuContainer = styled.div.attrs((props: MenuContainerStyledProps) => ({
  style: {
    // as the menu transition was visible on page load, the transform has to be set as style attribute
    // apparently classes are set dynamically and do not reliably intitialize elements
    transform: props.isOpen || props.isAnimating ? `none` : "translateX(-105%)",
    opacity: props.isOpen ? 1 : 0,
    pointerEvents: !props.isOpen ? "none" : undefined,
  },
}))<MenuContainerStyledProps>`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.menu};
  top: 0px;
  width: 100vw;

  background-color: var(--color-menu-bg);

  transform: translateX(-105%);
  opacity: 0;
  transition: opacity ${ANIMATION_LENGTH}ms;
  overflow: hidden;

  & a {
    text-decoration: none;
  }
  & *::selection {
    background: var(--color-bg, #fff);
  }
`;

const MenuWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
`;

const MenuContent = styled.div`
  height: 100%;
  width: 100%;
  overflow: auto;
  overscroll-behavior: contain;
  position: sticky;
  top: 0;
  left: 0;
`;

const MenuContentGrid = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  grid-gap: var(--size-gutter-width);
  padding: var(--size-page-margin);

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    align-items: stretch;
  }

`;

const Column = styled.div<{ stretch?: boolean }>`
  color: #fff;
  display: flex;
  flex-direction: column;
  grid-gap: var(--size-4);

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    justify-content: ${(props) =>
      props.stretch ? "space-between" : "flex-start"};
  }

`;
export const Menu = () => {
  const menuContext = useMenuContext();

  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const menuContentRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  
  const isAnimatingRef = useRef(false);
  const isAnimatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const onResize = useCallback(() => {
    if (menuContainerRef.current)
      menuContainerRef.current.style.height = `${window.innerHeight + 200}px`;

    if (menuContentRef.current)
      menuContentRef.current.style.height = `${window.innerHeight}px`;
  }, []);
  const onResizeDebounced = debounce(onResize, 100);

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

  useEffect(() => {
    if (isAnimatingTimeoutRef.current)
      clearTimeout(isAnimatingTimeoutRef.current);

    // as the useState function get's only called on the next render
    // a short delay lets the navigation flicker on open
    // using a ref does avoid this.
    isAnimatingRef.current = true;
    isAnimatingTimeoutRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
      isAnimatingTimeoutRef.current = null;
    }, ANIMATION_LENGTH);
  }, [menuContext.isOpen]);

  return (
    <FocusLock disabled={!menuContext.isOpen}>
      <MenuContainer
        ref={menuContainerRef}
        isOpen={menuContext.isOpen}
        isAnimating={isAnimatingRef.current}
        id="menu"
        aria-hidden={!menuContext.isOpen}
        role="menu"
        tabIndex={!menuContext.isOpen ? -1 : undefined}
      >
        <MenuWrapper>
          <MenuContent ref={menuContentRef}>
            <MenuContentGrid>
              <Column stretch>
                <div>
                  <h1>Here we would have the logos and title</h1>
                  <p>
                    Quisque molestie dapibus libero non pellentesque. Vivamus
                    quam arcu, dictum quis hendrerit eget, lobortis eu felis.
                    Nulla felis velit, ornare ac porttitor ut, rhoncus eu ipsum.
                    Donec auctor efficitur est vel congue. Nunc at nunc quis
                    massa facilisis fermentum. Vivamus fringilla nunc vitae
                    justo consectetur, aliquam gravida nisl mollis. Nulla
                    facilisi. Pellentesque tristique nisl ut lectus maximus,
                    eget euismod sapien blandit. Pellentesque eget molestie
                    neque. Nulla hendrerit congue sapien, quis maximus magna
                    cursus nec. Praesent viverra tellus massa, vitae mollis
                    massa blandit in. Donec mattis ut arcu et ultrices. Maecenas
                    posuere sem odio, eu molestie justo luctus sed. Quisque
                    pulvinar, arcu ac posuere sodales, augue risus accumsan
                    odio, eleifend tincidunt purus enim et lectus.
                  </p>
                </div>
                <MenuFooter id="menu-footer" direction="column" />
              </Column>
              <Column>
                <div>
                  <h1>Plugin 1</h1>
                  <p>About line and links</p>
                </div>
                <div>
                  <h1>Plugin 2</h1>
                  <p>About line and links</p>
                </div>
                <div>
                  <h1>Plugin 3</h1>
                  <p>About line and links</p>
                </div>
              </Column>
            </MenuContentGrid>
          </MenuContent>
        </MenuWrapper>
      </MenuContainer>
    </FocusLock>
  );
};
