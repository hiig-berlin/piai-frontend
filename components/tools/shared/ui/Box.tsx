import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  border-radius: 10px;
  padding: var(--size-3);
  background: #000;

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
