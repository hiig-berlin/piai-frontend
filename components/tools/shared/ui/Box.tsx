import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  border-radius: var(--size-3);
  background: #000;

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
`;
export const Box = ({
  children,
  className,
}: {
  children: any;
  className?: string;
}) => {
  return <BoxWrapper className={className}>{children}</BoxWrapper>;
};
