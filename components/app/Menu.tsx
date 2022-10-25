import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import FocusLock from "react-focus-lock";

import { useMainMenuStateIsOpenState, useMainMenuActions } from "~/components/state/MainMenuState";
import { MenuFooter } from "./Menus/MenuFooter";
import { Logo } from "./Logo";
import { LabElement } from "../ui/LabElement";
import { Chevron } from "../ui/StaticSvgs";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import Link from "next/link";
import {
  useCssVarsStateIsMobileLandscapeState,
  useCssVarsStateIsTabletAndUpState,
} from "~/components/state/CssVarsState";

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
  font-size: var(--text-body-font-size);
  line-height: var(--text-body-line-height);
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.menu};
  top: 0px;
  width: 100vw;

  background-color: var(--color-ailab-red);
  color: white;

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
  padding: var(--size-5);

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

  & header {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: 1.5em;
    color: white;
    font-weight: 700;
    height: 2.4em;

    display: flex;
    align-items: center;
    margin-bottom: var(--size-4);

    .logo {
      margin-right: 20px;
    }
  }

  &.piai {
    section {
      margin-bottom: auto;

      h1 {
        color: white;
        font-size: 1.5em;
        font-weight: 700;
      }

      p {
        ${({ theme }) => theme.breakpoints.tabletLandscape} {
          max-width: 80%;
        }
      }

      & a {
        padding-top: 20px;
        padding-bottom: 0;
        display: block;
        ${({ theme }) => theme.applyMixin("uppercase")}
        color: white;
        font-weight: 700;
        font-size: 0.9em;

        opacity: 1;

        &:hover {
          opacity: 0.7;
        }

        svg {
          height: 0.8em;
          position: relative;
          width: auto;
          top: 0.02em;

          path {
            fill: white;
          }
        }
      }
    }

    nav {
      gap: 0;

      a {
        color: white;
        font-size: 1em;
        padding: 5px 0;
        text-transform: none;
      }
    }
  }

  &.toolbox {
    color: white;

    section.tool > a {
      display: flex;
      color: white;
      margin-bottom: var(--size-2);

      .labElement {
        float: left;
        margin: 0 10px 0 0;
      }

      .labElement + span {
        margin: auto 0;
        padding-bottom: 5px;
      }
    }

    section.tool nav {
      display: flex;
      flex-direction: column;
      padding: 0;

      a {
        color: white;
        font-size: 0.8em;
        padding: 5px 0;
      }
    }
  }
`;
export const Menu = () => {
  const config = useConfigContext();

  const mainMenuOpen = useMainMenuStateIsOpenState();
  const mainMenuActions = useMainMenuActions();

  const menuContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;
  const menuContentRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const isAnimatingRef = useRef(false);
  const isAnimatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const isMobileLandscape = useCssVarsStateIsMobileLandscapeState();
  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();

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
  }, [mainMenuOpen]);

  return (
    <FocusLock disabled={!mainMenuOpen}>
      <MenuContainer
        ref={menuContainerRef}
        isOpen={mainMenuOpen}
        isAnimating={isAnimatingRef.current}
        id="menu"
        aria-hidden={!mainMenuOpen}
        role="menu"
        tabIndex={!mainMenuOpen ? -1 : undefined}
      >
        <MenuWrapper>
          <MenuContent ref={menuContentRef}>
            <MenuContentGrid>
              <Column className="piai">
                <header>
                  <Logo color="white" hoverColor="white" size={1} />
                  {(isTabletAndUp || isMobileLandscape) && (
                    <span>Public interest AI</span>
                  )}
                </header>
                <section>
                  <h1>{menuContent.piai.headline}</h1>
                  <p>{menuContent.piai.description}</p>
                  <a href={menuContent.piai.linkURL} onClick={() => mainMenuActions.close()}>
                    <Chevron /> {menuContent.piai.linkText}
                  </a>
                </section>

                <MenuFooter id="footer" direction="column" />
              </Column>
              <Column className="toolbox">
                <header>Tools</header>

                {config.tools.map((tool: any, index: number) => {
                  return (
                    <section key={`tool-${index}`} className="tool">
                      <Link href={`/tool/${tool.slug}`} key={`tool-${index}`}>
                        <a>
                          <LabElement
                            shortHandle={tool.iconShort}
                            longText={tool.iconLong}
                            color="#fff"
                            hoverColor={tool.colorHighlight}
                            size={1.6}
                          />
                          <span>{tool.name}</span>
                        </a>
                      </Link>
                      <nav>
                        {tool.menu.map((menuItem: any, i: number) => {
                          if (menuItem?.url)
                            return (
                              <a
                                key={`tool-${index}-menu-${i}`}
                                href={menuItem.url}
                                target={menuItem.target}
                                rel="noreferrer"
                              >
                                {menuItem.name}
                              </a>
                            );

                          return (
                            <Link
                              key={`tool-${index}-menu-${i}`}
                              href={`/tool/${tool.slug}/${menuItem.slug ?? ""}`}
                            >
                              {menuItem.name}
                            </Link>
                          );
                        })}
                      </nav>
                    </section>
                  );
                })}
              </Column>
            </MenuContentGrid>
          </MenuContent>
        </MenuWrapper>
      </MenuContainer>
    </FocusLock>
  );
};

const menuContent = {
  piai: {
    headline: "What is Public Interest AI?",
    description:
      "Defining public interest AI is as difficult as it is crucial for our society. Academia and various societal stakeholder have entered a discourse to sharpen the edges of this explanation.",
    linkText: "Explore the definition",
    linkURL: "/#more",
  },
};
