import React, { useRef } from "react";
import styled from "styled-components";

import { useMenuContext } from "~/providers/MenuContextProvider";
import { SvgBackground } from "../ui/SvgBackground";

const MenuButtonContainer = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.menu + 1};

  top: var(--size-3);
  right: var(--size-page-margin);

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

  height: var(--size-5);
  width: var(--size-5);
  
  ${({ theme }) => theme.breakpoints.tablet} {
    height: var(--size-4);
    width: var(--size-4);
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
