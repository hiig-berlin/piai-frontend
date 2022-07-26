import React from "react";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Icon } from "./Icon";

const CounterContainer = styled.div`
  
  background: ${({ theme }) => theme.color("piaiMap", 0.9)};
  color: white;
  border-radius: var(--size-3);
  border: 1px solid var(--color-piai-map);
  width: calc(100% - 2 * var(--size-4));

  position: sticky;

  bottom: var(--size-3);
  top: unset;

  left: var(--size-4);
  //transform: translateX(-50%);

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    top: var(--size-3);
    bottom: unset;
  }

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

  ${({theme}) => theme.breakpoints.mobileLandscape} {
    position: fixed;
    left: calc(50% + var(--size-6));
    width: calc(50% - var(--size-6) - var(--size-3));
  }

  ${({theme}) => theme.breakpoints.tablet} {
    position: fixed;
    top: var(--size-3);
    bottom: unset;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
  }
`;

const StyledLabel = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  ${({theme}) => theme.breakpoints.tablet} {
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

export const Counter = ({
  inView,
  inViewFiltered,
  total,
  totalFiltered,
}: {
  inView: number;
  inViewFiltered: number;
  total: number;
  totalFiltered: number;
}) => {
  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  return (
    <CounterContainer>
      {!isTabletLandscapeAndUp && <Icon type="filter" />}
      <div className="inView">
        <Label label={isTabletLandscapeAndUp ? "Projects in view" : "In view"}>
          <strong>{inViewFiltered}</strong>/{inView}
        </Label>
      </div>
      <div className="total">
        <Label label={isTabletLandscapeAndUp ? "Projects total" : "Total"}>
          <strong>{totalFiltered}</strong>/{total}
        </Label>
      </div>
      {isTabletLandscapeAndUp ? <Icon type="list" /> : <Icon type="search" />}
    </CounterContainer>
  );
};
