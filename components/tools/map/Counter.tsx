import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Icon } from "../shared/ui/Icon";

import {
  useToolStateFilterState,
  useToolStateMapState,
  useToolStateStoreActions,
} from "./state/toolStateStore";

const CounterContainer = styled.div<{ invert: boolean }>`
  background: ${({ theme, invert }) =>
    invert ? "#0009" : theme.color("piaiMap", 0.9)};
  color: white;
  border-radius: var(--size-3);
  border: 1px solid
    ${({ invert }) => (invert ? "var(--color-grey)" : "var(--color-piai-map)")};
  width: calc(100vw - (2 * var(--size-4)));
  pointer-events: all;
  position: fixed;
  z-index: 6;
  bottom: var(--size-3);
  top: unset;

  left: var(--size-4);
  //transform: translateX(-50%);

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  & > * {
    padding: var(--size-3);
    border-right: 1px solid #0000001a;

    &:last-child {
      border-right: none;
    }
  }

  .label {
    margin-right: var(--size-2);
  }

  ${({ theme }) => theme.breakpoints.tablet} {
    left: 50%;
    transform: translateX(-50%);
    max-width: 500px;
    width: auto;
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    top: var(--size-3);
    bottom: unset;
  }
`;

const StyledLabel = styled.div`
  display: flex;
  // flex-direction: column;
  flex-grow: 1;
  ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: row;
    gap: var(--size-1);
  }
`;

const Label = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <StyledLabel>
      <span>{label}</span>
      <span>{children}</span>
    </StyledLabel>
  );
};

export const Counter = ({ view }: { view: string }) => {
  const router = useRouter();
  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  const mapState = useToolStateMapState();
  const filterState = useToolStateFilterState();

  const { updateFilterState } = useToolStateStoreActions();

  return (
    <CounterContainer
      invert={
        (filterState.isFilterOpen || filterState.isSearchOpen) &&
        !isTabletLandscapeAndUp
      }
    >
      {!isTabletLandscapeAndUp && (
        <Icon
          type="filter"
          onClick={() => {
            updateFilterState({
              isFilterOpen: !filterState.isFilterOpen,
              isSearchOpen: false,
            });
          }}
        />
      )}
      {view === "map" && (
        <div className="inView">
          <Label
            label={isTabletLandscapeAndUp ? "Projects in view" : "In view"}
          >
            <strong>{mapState.filteredInViewCount}</strong>/
            {mapState.totalInViewCount}
          </Label>
        </div>
      )}
      <div className="total">
        <Label label={isTabletLandscapeAndUp ? "Projects total" : "Total"}>
          <strong>{filterState.filteredCount}</strong>/{filterState.totalCount}
        </Label>
      </div>
      {isTabletLandscapeAndUp ? (
        view === "map" ? (
          <Icon
            type="list"
            onClick={() => {
              if (typeof document === "undefined") return;

              router.push({
                pathname: "/tool/map/directory",
                search: document.location.search,
              });
            }}
          />
        ) : (
          <Icon
            type="map"
            onClick={() => {
              if (typeof document === "undefined") return;

              router.push({
                pathname: "/tool/map",
                search: document.location.search,
              });
            }}
          />
        )
      ) : (
        <Icon
          type="search"
          onClick={() => {
            updateFilterState({
              isFilterOpen: false,
              isSearchOpen: !filterState.isSearchOpen,
            });
          }}
        />
      )}
    </CounterContainer>
  );
};
