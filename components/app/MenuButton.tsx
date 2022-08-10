import React, { useContext, useRef } from "react";
import styled, { ThemeContext } from "styled-components";

import {
  useMainMenuActions,
  useMainMenuStateIsOpenState,
} from "~/components/state/MainMenuState";
import { SvgBackground } from "../ui/SvgBackground";

const MenuButtonContainer = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.menu + 1};

  top: ${({ theme }) =>
    theme.colorMode === "dark"
      ? "var(--size-3)"
      : "calc(var(--size-4) + 10px)"};

  ${({ theme }) => theme.breakpoints.tablet} {
    top: ${({ theme }) =>
      theme.colorMode === "dark"
        ? "calc(var(--size-3) + 4px)"
        : "calc(var(--size-4) + 10px)"};
  }

  right: ${({ theme }) =>
    theme.colorMode === "dark" ? "var(--size-3)" : "var(--size-4)"};
`;

const StyledMenuButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  position: relative;
  opacity: 1;

  & > span {
    transition: opacity 0.3s;
    position: absolute;
    top: 0;
    left: 0;
  }

  height: var(--size-5);
  width: var(--size-5);

  ${({ theme }) => theme.breakpoints.tablet} {
    height: var(--size-4);
    width: var(--size-4);
  }

  &:active,
  &:focus-within {
    & > span {
      opacity: 0.6;
    }
  }

  @media (any-pointer: fine) {
    &:hover {
      & > span {
        opacity: 0.6;
      }
    }
  }
`;

export const MenuButton = () => {
  const isMainMenuOpen = useMainMenuStateIsOpenState();
  const mainMenuActions = useMainMenuActions();
  const theme = useContext(ThemeContext);

  const menuButtonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <MenuButtonContainer>
      <StyledMenuButton
        ref={menuButtonRef}
        aria-expanded={isMainMenuOpen}
        aria-label={`${isMainMenuOpen ? "close" : "open"} menu`}
        aria-controls="menu"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();

          if (isMainMenuOpen) {
            mainMenuActions.close();
          } else {
            mainMenuActions.open(menuButtonRef);
          }

          event.currentTarget.blur();
        }}
      >
        <SvgBackground
          className="svg open"
          type={
            isMainMenuOpen
              ? "close"
              : theme.colorMode === "dark"
              ? "menuNeg"
              : "menu"
          }
          position="left center"
          width="100%"
          height="100%"
        />
      </StyledMenuButton>
    </MenuButtonContainer>
  );
};
