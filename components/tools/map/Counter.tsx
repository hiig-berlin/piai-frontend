import React from "react";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Icon } from "./Icon";
import { Box } from "../shared/ui/Box";

const CounterContainer = styled.div`
  background: ${({ theme }) => theme.color("piaiMap", 0.9)};var(--color-piai-map);
  color: white;
  border-radius: var(--size-3);
  border: 1px solid var(--color-piai-map);

  position: absolute;
  
  bottom: var(--size-3);
    top: unset;
    
  left: 50%;
  transform: translateX(-50%);

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    top: var(--size-3);
    bottom: unset;
  }

  display: flex;
  flex-direction: row;

  & > *{
    padding: var(--size-3);
    border-right: 1px solid #0000001a;

    &:last-child{
      border-right: none;
    }
  }

  .label{
    margin-right: var(--size-2)
  }


`;

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
      {!isTabletLandscapeAndUp && <Icon type={"filter"} />}
      <div className="inView">
        <Label inView />
        <strong>{inViewFiltered}</strong>/{inView}
      </div>
      <div className="total">
        <Label total />
        <strong>{totalFiltered}</strong>/{total}
      </div>
      {isTabletLandscapeAndUp ? <Icon type={"list"} /> : <Icon type={"search"} />}
    </CounterContainer>
  );
};

const Label = ({ inView, total }: { inView?: boolean; total?: boolean }) => {
  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  let labelInView, labelTotal;
  labelInView = isTabletLandscapeAndUp ? "Projects in view" : "In view";
  labelTotal = isTabletLandscapeAndUp ? "Projects in total" : "Total";

  return (
    <span className="label">
      {inView && labelInView} 
      {total && labelTotal} 
    </span>
  );
};
