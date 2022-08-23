import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.div<{ hideOnPrint: boolean }>`
  border-radius: var(--size-3);
  background: #000;
  pointer-events: all;
  padding: var(--size-4);
  display: inline-flex;
  flex-direction: column;
  gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: var(--size-3);
  }

  & > h1,
  & > h2,
  & > h3,
  & > h4,
  & > h5,
  & > h6,
  & > p,
  & > ul {
    margin: 0;
  }

  & p:first-child,
  & h2:first-child,
  & h3:first-child {
    margin-top: 5px;
  }

  ${({ hideOnPrint }) => (hideOnPrint ? `@media print {display:none;}` : "")}
`;
export const Box = ({
  children,
  hideOnPrint,
  className,
}: {
  children: any;
  hideOnPrint?: boolean;
  className?: string;
}) => {
  return (
    <BoxWrapper hideOnPrint={!!hideOnPrint} className={className}>
      {children}
    </BoxWrapper>
  );
};
