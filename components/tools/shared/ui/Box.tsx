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
export const Box: React.FC<BoxProps> = ({
  children,
  hideOnPrint = false,
  ...rest
}) => {
  return (
    <BoxWrapper hideOnPrint={hideOnPrint} {...rest}>
      {children}
    </BoxWrapper>
  );
};

export const BoxLight = styled(Box)`
  background: #434343;
`;

type BoxProps = React.HTMLAttributes<HTMLDivElement> & {
  hideOnPrint?: boolean;
};
