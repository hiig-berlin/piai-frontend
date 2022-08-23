import { useEffect, startTransition } from "react";
import styled from "styled-components";

import DisplayAbove from "~/components/styled/DisplayAbove";
import DisplayBelow from "~/components/styled/DisplayBelow";
import { Icon } from "~/components/tools/shared/ui/Icon";
import { useModal } from "~/hooks/useModal";
import {
  useCssVarsStateIsTabletLandscapeAndUpState,
  useCssVarsStateIsInitializingState,
} from "~/components/state/CssVarsState";
import {
  useToolStateFilterState,
  useToolStateStore,
  useToolStateStoreActions,
} from "../state/ToolState";
import { Scroller } from "../Styled";

const SidebarContainer = styled.div<{
  isInitializing: boolean;
  isAlwaysOpen: boolean;
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
  transform: ${({ isOpening, isOpen, isClosing, isAlwaysOpen }) =>
    isOpening || isOpen || isClosing || isAlwaysOpen
      ? "translateX(0)"
      : "translateX(-105vw)"};

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

    opacity: 1;

    transition: transform 0.3s;

    transform: ${({ isOpening, isOpen, isClosing, isAlwaysOpen }) =>
      ((isOpening || isOpen) && !isClosing) || isAlwaysOpen
        ? "translateX(0)"
        : "translateX(calc(-100% - var(--size-6)))"};
  }

  ${({ theme }) => theme.applyMixin("noPrint")}
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

  h3 {
    margin: 0;
  }

  ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--size-2);
    padding-right: 0;
  }
`;

const Footer = styled.div``;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SidebarDrawer = ({
  title,
  statusFlagKey,
  children,
  header,
  dimmContent,
  alwaysOpenOnTabletLandscape,
  columnWidth = 0.3,
  hasTopOffset = true,
}: {
  title: string;
  columnWidth?: number;
  statusFlagKey: string;
  children: React.ReactNode;
  alwaysOpenOnTabletLandscape?: boolean;
  dimmContent?: boolean;
  header?: React.ReactNode;
  hasTopOffset?: boolean;
}) => {
  const isInitializing = useCssVarsStateIsInitializingState();
  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();

  const filterState = useToolStateFilterState();
  const { getFilterState, setFilterState } = useToolStateStoreActions();

  const { isOpen, isOpening, isClosing, open, close } = useModal({
    defaultIsOpen: false,
    openingAnimationLength: 350,
    closeAnimationLength: 350,
  });

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
    setFilterState({
      ...getFilterState(),
      [statusFlagKey]: false,
    });
  };

  return (
    <SidebarContainer
      {...{
        columnWidth,
        hasTopOffset,
        isInitializing,
        isAlwaysOpen:
          alwaysOpenOnTabletLandscape &&
          (isInitializing || isTabletLandscapeAndUp)
            ? true
            : false,
        isOpen:
          alwaysOpenOnTabletLandscape &&
          (isInitializing || isTabletLandscapeAndUp)
            ? true
            : isOpen,
        isOpening,
        isClosing,
      }}
    >
      <Panel isLoading={false} isRefetching={false}>
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
          <h3>{title}</h3>
          {header}
        </Header>

        <Scroller opacity={dimmContent ? 0.1 : 1}>{children}</Scroller>

        <Footer>
          {!alwaysOpenOnTabletLandscape && (
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
          )}
        </Footer>
      </Panel>
    </SidebarContainer>
  );
};
