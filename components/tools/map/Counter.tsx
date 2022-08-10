import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import { useCssVarsStateIsTabletLandscapeAndUpState } from "~/components/state/CssVarsState";
import { Icon } from "../shared/ui/Icon";

import {
  useToolStateFilterState,
  useToolStateMapState,
  useToolStateStoreActions,
} from "./state/ToolState";

const CounterContainer = styled.div<{ invert: boolean }>`
  background: ${({ theme, invert }) =>
    invert ? "#fff2" : theme.color("piaiMap", 0.9)};
  color: white;
  border-radius: var(--size-3);
  border: 1px solid
    ${({ invert }) => (invert ? "var(--color-grey)" : "var(--color-piai-map)")};
<<<<<<< HEAD
  // width: calc(100vw - (2 * var(--size-4)));

  pointer-events:all ;
=======
  width: calc(100vw - (2 * var(--size-4)));
  pointer-events: all;
>>>>>>> refs/remotes/origin/dev-frontend
  position: fixed;
  z-index: 6;
  bottom: var(--size-3);
  top: unset;
  height: var(--size-6);
  left: 50%;
  transform: translateX(-50%);
  
  // justify-items: center;
  display: flex;
  flex-direction: row;

  & > * {
    padding: 0 var(--size-3);
    border-right: 1px solid #0000001a;

    &:last-child {
      border-right: none;
    }
    margin: auto 0;
  }

  .label {
    margin-right: var(--size-2);
  }

  ${({ theme }) => theme.breakpoints.tablet} {
<<<<<<< HEAD
    top: var(--size-3);
    bottom: unset;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: var(--size-5);
=======
    left: 50%;
    transform: translateX(-50%);
    max-width: 500px;
    width: auto;
>>>>>>> refs/remotes/origin/dev-frontend
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    top: var(--size-3);
    bottom: unset;
<<<<<<< HEAD
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: var(--size-5);
=======
>>>>>>> refs/remotes/origin/dev-frontend
  }
`;

const StyledLabel = styled.div`
  display: flex;
  gap: var(--size-1);
  flex-direction: row;

  // ${({ theme }) => theme.breakpoints.tablet} {
  //   flex-direction: row;
  //   gap: var(--size-1);
  // }
  
  span{
    white-space: nowrap;
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
  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();

  const mapState = useToolStateMapState();
  const filterState = useToolStateFilterState();

  const { updateFilterState } = useToolStateStoreActions();

  // TODO: Ich würde das Klickevent zumindest für mobile
  // auch auf die Zahlen setzen. Dan kann man einfach unten
  // drauf klicken um auf die Filteransicht zu kommen. Bei mobile 
  // ist ja auch filter und suche das gleiche fenster….
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
<<<<<<< HEAD

        <Label className="inView" label={isTabletLandscapeAndUp ? "Projects in view" : "In view"}>
          <strong>{map.filteredInViewCount}</strong>/{map.totalInViewCount}
        </Label>

        <Label className="total" label={isTabletLandscapeAndUp ? "Projects total" : "Total"}>
          <strong>{map.filteredCount}</strong>/{map.totalCount}
        </Label>

      {isTabletLandscapeAndUp ? <Icon type="list" /> : <Icon type="search" />}
=======
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
>>>>>>> refs/remotes/origin/dev-frontend
    </CounterContainer>
  );
};
