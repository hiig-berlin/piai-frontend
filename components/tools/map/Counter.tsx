import React from "react";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Icon } from "../shared/ui/Icon";
import { useToolStateContext } from "./context/ContextProviders";

const CounterContainer = styled.div<{ invert: boolean }>`
  background: ${({ theme, invert }) =>
    invert ? "#0009" : theme.color("piaiMap", 0.9)};
  color: white;
  border-radius: var(--size-3);
  border: 1px solid
    ${({ invert }) => (invert ? "var(--color-grey)" : "var(--color-piai-map)")};
  width: calc(100vw - (2 * var(--size-4)));
  pointer-events:all ;
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
    top: var(--size-3);
    bottom: unset;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
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

export const Counter = () => {
  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  const { map, filter, updateFilterState } = useToolStateContext();

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
      <div className="inView">
        <Label label={isTabletLandscapeAndUp ? "Projects in view" : "In view"}>
          <strong>{map.filteredInViewCount}</strong>/{map.totalInViewCount}
        </Label>
      </div>
      <div className="total">
        <Label label={isTabletLandscapeAndUp ? "Projects total" : "Total"}>
          <strong>{map.filteredCount}</strong>/{map.totalCount}
        </Label>
      </div>
      {isTabletLandscapeAndUp ? <Icon type="list" /> : <Icon type="search" />}
    </CounterContainer>
  );
};
