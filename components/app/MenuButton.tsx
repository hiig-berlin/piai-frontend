import React, { useRef } from "react";
import styled from "styled-components";

import { useMenuContext } from "~/providers/MenuContextProvider";
import { SvgBackground } from "../ui/SvgBackground";

const MenuButtonContainer = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.menu + 1};
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
          top: ${props.theme.spacePx(breakpoint, 3)};
          right: ${props.theme.pageMarginPx(breakpoint)};          
        `;
    })}
`;

const StyledMenuButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  position: relative;

  & > span {
    transition: filter 0.3s;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:active,
  &:focus-within {
    & > span {
      filter: invert(33.33%);
    }
  }

  @media (any-pointer: fine) {
    &:hover {
      & > span {
        filter: invert(33.33%);
      }
    }
  }

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
     
      height: ${props.theme.spacePx(
        breakpoint,
        ["base", "mobile"].includes(breakpoint) ? 5 : 4
      )};
      width: ${props.theme.spacePx(
        breakpoint,
        ["base", "mobile"].includes(breakpoint) ? 5 : 4
      )};
      
    `;
    })}
`;

export const MenuButton = () => {
  const menuContext = useMenuContext();

  const menuButtonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  return (
    <MenuButtonContainer>
      <StyledMenuButton
        ref={menuButtonRef}
        aria-expanded={menuContext.isOpen}
        aria-label={`${menuContext.isOpen ? "close" : "open"} menu`}
        aria-controls="menu"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();

          if (menuContext.isOpen) {
            menuContext.close();
          } else {
            menuContext.open(menuButtonRef);
          }

          event.currentTarget.blur();
        }}
      >
        <SvgBackground
          className="svg open"
          type={menuContext.isOpen ? "close" : "menu"}
          position="left center"
          width="100%"
          height="100%"
        />
      </StyledMenuButton>
    </MenuButtonContainer>
  );
};
