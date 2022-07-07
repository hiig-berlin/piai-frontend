import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  border-radius: 10px;
  background: #000;

  padding: var(--size-4);
  display: inline-flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: var(--size-3);
  }

  

  & p:first-child,
  & h2:first-child,
  & h3:first-child{
    margin-top: 5px;
  }
`;
export const Box = ({ 
  children, 
  className 
}: { 
  children: any;
  className?: string;
}) => {
  return <BoxWrapper className={className}>{children}</BoxWrapper>;
};
