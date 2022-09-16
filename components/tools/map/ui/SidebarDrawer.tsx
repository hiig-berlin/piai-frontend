import { useEffect, startTransition, useState } from "react";
import styled from "styled-components";

import DisplayAbove from "~/components/styled/DisplayAbove";
import DisplayBelow from "~/components/styled/DisplayBelow";
import { Icon } from "~/components/tools/shared/ui/Icon";
import {
  useCssVarsStateIsInitializingState,
  useCssVarsStateIsTabletLandscapeAndUpState,
} from "~/components/state/CssVarsState";
import {
  useToolStateFilterState,
  useToolStateStoreActions,
} from "../state/ToolState";
import { Label, Scroller } from "../Styled";
import { useModal } from "~/hooks/useModal";

const SidebarContainer = styled.div<{
  isInitializing: boolean;
  isOpen: boolean;
  isOpening: boolean;
  isClosing: boolean;
  hasTopOffset: boolean;
  columnWidth: number;
}>`
  position: fixed;
  display: ${({ isInitializing }) => (isInitializing ? "none" : "block")};
  bottom: 0;
  left: 0;
  z-index: ${({ isOpening, isOpen }) => (isOpening || isOpen ? 5 : 4)};
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
    padding-left: var(--size-6);
    padding-bottom: var(--size-3);
    height: ${({ hasTopOffset }) =>
      hasTopOffset
        ? "calc(100% - var(--lbh) - var(--tool-map-ot))"
        : "calc(100% - var(--lbh) - var(--size-3))"};
    max-width: calc(
      var(--size-6) +
        (
          (100vw - var(--size-6) - 3 * var(--size-3)) *
            (1 * ${({ columnWidth }) => columnWidth})
        )
    );

    width: calc(
      var(--size-6) + (100vw - var(--size-6) - 3 * var(--size-3)) *
        (1 * ${({ columnWidth }) => columnWidth})
    );

    opacity: 1;

    transition: transform 0.25s;

    transform: ${({ isOpen, isClosing }) =>
      isClosing || !isOpen
        ? "translateX(calc(-100% - var(--size-6)))"
        : "translateX(0)"};
  }

  ${({ theme }) => theme.applyMixin("noPrint")}
`;

const Panel = styled.div<{
  isLoading: boolean;
  isRefetching: boolean;
  addCounterPadding: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  box-sizing: border-box;
  background: #000;
  pointer-events: all;
  padding: var(--size-3) var(--size-4)
    ${({ addCounterPadding }) =>
      addCounterPadding
        ? "calc(var(--size-7) + var(--size-2))"
        : "var(--size-3)"}
    var(--size-4);

  height: 100%;

  & > div {
    flex-grow: 1;
    transition: opacity var(--transition-speed-link);
    opacity: ${({ isRefetching }) => (isRefetching ? 0.5 : 1)};
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
  gap: var(--size-3);
  flex-wrap: wrap;
  align-items: center;
  padding-right: var(--size-6);
  padding-bottom: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--size-2);
    padding-right: 0;
  }

  h3{
    margin-bottom: 0;
  }
`;

const H3 = styled.h3<{ hasHeader: boolean }>`
  margin: ${({ hasHeader }) => (hasHeader ? "0" : "0 0 var(--size-2) 0")};
`;

const Footer = styled.div``;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const openingAnimationLength = 350;
const closeAnimationLength = 350;

export const SidebarDrawer = ({
  title,
  statusFlagKey,
  children,
  header,
  initiallyOpenOnLargerScreens,
  dimmContent,
  columnWidth = 0.333,
  hasTopOffset = true,
  addCounterPadding,
}: {
  title: string;
  columnWidth?: number;
  statusFlagKey: string;
  children: React.ReactNode;
  dimmContent?: boolean;
  addCounterPadding?: boolean;
  initiallyOpenOnLargerScreens?: boolean;
  header?: React.ReactNode;
  hasTopOffset?: boolean;
}) => {
  const isInitializing = useCssVarsStateIsInitializingState();
  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();

  const filterState = useToolStateFilterState();
  const { updateFilterState } = useToolStateStoreActions();

  const { isOpen, isOpening, isClosing, open, close } = useModal({
    defaultIsOpen: false,
    openingAnimationLength,
    closeAnimationLength,
  });

  const [initiallyStateSet, setInitiallyStateSet] = useState(false);

  const isSidebarOpen = (filterState as any)?.[statusFlagKey] ?? false;

  useEffect(() => {
    startTransition(() => {
      if (isSidebarOpen) {
        open();
      } else {
        close();
      }
    });
  }, [isSidebarOpen, open, close]);

  const closeSidebar = () => {
    updateFilterState({
      [statusFlagKey]: false,
    });
  };

  useEffect(() => {
    startTransition(() => {
      if (
        !isInitializing &&
        isTabletLandscapeAndUp &&
        initiallyOpenOnLargerScreens &&
        !initiallyStateSet
      ) {
        updateFilterState({
          [statusFlagKey]: true,
        });
        open();
        setInitiallyStateSet(true);
      }
    });
  }, [
    isInitializing,
    isTabletLandscapeAndUp,
    statusFlagKey,
    initiallyStateSet,
    initiallyOpenOnLargerScreens,
    updateFilterState,
    open,
  ]);

  return (
    <SidebarContainer
      {...{
        columnWidth,
        hasTopOffset,
        isInitializing,
        isOpen: isOpen || isOpening,
        isOpening: isOpening,
        isClosing: isClosing,
      }}
    >
      <Panel
        isLoading={false}
        isRefetching={false}
        addCounterPadding={!!addCounterPadding}
      >
        <Header>
          <DisplayBelow breakpoint="tabletLandscape">
            <Icon
              onClick={closeSidebar}
              type="back"
              className="textLink back inBox"
            >
              <span>Close</span>
            </Icon>
          </DisplayBelow>
          {/* <Label hasHeader={false}>{title}</Label> */}
          <Label>{title}</Label>
          {header}
        </Header>

        <Scroller opacity={dimmContent ? 0.1 : 1}>{children}</Scroller>

        <Footer>
          <DisplayAbove breakpoint="tabletLandscape">
            <CloseButtonContainer>
              <Icon
                onClick={closeSidebar}
                type="back"
                className="textLink back inBox"
              >
                <span>Close</span>
              </Icon>
            </CloseButtonContainer>
          </DisplayAbove>
        </Footer>
      </Panel>
    </SidebarContainer>
  );
};
