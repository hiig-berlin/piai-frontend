import React from "react";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Icon } from "../shared/ui/Icon";
import { useToolStateContext } from "./context/ContextProviders";

const CounterContainer = styled.div<{ invert: boolean }>`
  background: ${({ theme, invert }) =>
    invert ? "#fff2" : theme.color("piaiMap", 0.9)};
  color: white;
  border-radius: var(--size-3);
  border: 1px solid
    ${({ invert }) => (invert ? "var(--color-grey)" : "var(--color-piai-map)")};
  // width: calc(100vw - (2 * var(--size-4)));

  pointer-events:all ;
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
    top: var(--size-3);
    bottom: unset;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: var(--size-5);
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    top: var(--size-3);
    bottom: unset;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    height: var(--size-5);
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

export const Counter = () => {
  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  const { map, filter, updateFilterState } = useToolStateContext();

  // TODO: Ich würde das Klickevent zumindest für mobile
  // auch auf die Zahlen setzen. Dan kann man einfach unten
  // drauf klicken um auf die Filteransicht zu kommen. Bei mobile 
  // ist ja auch filter und suche das gleiche fenster….
  return (
    <CounterContainer invert={filter.isFilterOpen && !isTabletLandscapeAndUp}>
      {!isTabletLandscapeAndUp && (
        <Icon
          type="filter"
          onClick={() => {
            console.log(123)
            updateFilterState({
              isFilterOpen: !filter.isFilterOpen,
            });
          }}
        />
      )}

        <Label className="inView" label={isTabletLandscapeAndUp ? "Projects in view" : "In view"}>
          <strong>{map.filteredInViewCount}</strong>/{map.totalInViewCount}
        </Label>

        <Label className="total" label={isTabletLandscapeAndUp ? "Projects total" : "Total"}>
          <strong>{map.filteredCount}</strong>/{map.totalCount}
        </Label>

      {isTabletLandscapeAndUp ? <Icon type="list" /> : <Icon type="search" />}
    </CounterContainer>
  );
};
