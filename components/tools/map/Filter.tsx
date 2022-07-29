import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DisplayAbove from "~/components/styled/DisplayAbove";
import DisplayBelow from "~/components/styled/DisplayBelow";
import { useModal } from "~/hooks/useModal";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Icon } from "../shared/ui/Icon";

import { useToolStateContext } from "./context/ContextProviders";

const FilterContainer = styled.div<{
  isOpen: boolean;
  isOpening: boolean;
  isClosing: boolean;
}>`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 4;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s;
  opacity: ${({ isOpening, isOpen, isClosing }) =>
    isOpening || (isOpen && !isClosing) ? 1 : 0};
  transform: ${({ isOpening, isOpen, isClosing }) =>
    isOpening || isOpen || isClosing ? "translateX(0)" : "translateX(-105vw)"};

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    left: var(--size-6);
    padding-bottom: var(--size-3);
    height: calc(100% - var(--lbh) - var(--tool-map-ot));
    max-width: calc((100vw - var(--size-6) - 2 * var(--size-3)) * 0.3);
  }
`;

const Panel = styled.div<{
  isLoading: boolean;
  isRefetching: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  box-sizing: border-box;
  background: #000;
  pointer-events: all;
  padding: var(--size-3) var(--size-4) calc(var(--size-7) + var(--size-2))
    var(--size-4);

  height: 100%;

  & > div {
    flex-grow: 1;
    transition: opacity var(--transition-speed-link);
    opacity: ${({ isRefetching }) => (isRefetching ? 0.5 : 1)};
    border: 1px solid #f0f;
  }

  & > div:first-child,
  & > span:first-child,
  & > div:last-child {
    flex-grow: 0;
    flex-shrink: 0;
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    padding: var(--size-3);
    border-top-right-radius: var(--size-3);
    border-bottom-right-radius: var(--size-3);
  }
`;

const Header = styled.div`
  display: flex;
`;

const Footer = styled.div``;

const Scroller = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const Filter = () => {
  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();
  const { getFilterState, setFilterState, filter } = useToolStateContext();

  const { isOpen, isOpening, isClosing, open, close } = useModal({
    defaultIsOpen: isTabletLandscapeAndUp,
    openingAnimationLength: 350,
    closeAnimationLength: 350,
  });

  const closeFilter = () => {
    setFilterState({
      ...getFilterState(),
      isFilterOpen: false,
    });
  };

  useEffect(() => {
    console.log(filter.isFilterOpen);
    if (filter.isFilterOpen) {
      open();
    } else {
      close();
    }
  }, [filter.isFilterOpen, open, close]);

  return (
    <FilterContainer {...{ isOpen, isOpening, isClosing }}>
      <Panel isLoading={false} isRefetching={false}>
        <Header>
          <DisplayBelow breakpoint="tabletLandscape">
            <Icon onClick={close} type="back" className="textLink back inBox">
              <span>Close</span>
            </Icon>
          </DisplayBelow>
          <h3>FILTER PROJECTS</h3>
        </Header>

        <Scroller>
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxss
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxx
          <br />
          xxss
          <br />
          xxxxxxxxxxx
        </Scroller>

        <Footer>
          <DisplayAbove breakpoint="tabletLandscape">
            <CloseButtonContainer>
              <Icon onClick={close} type="back" className="textLink back inBox">
                <span>Close</span>
              </Icon>
            </CloseButtonContainer>
          </DisplayAbove>
        </Footer>
      </Panel>
    </FilterContainer>
  );
};
