import React from "react";
import styled from "styled-components";
const A = styled.a`
  display: flex;
  opacity: 0;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.overlay + 2};
  background-color: var(--color-hl, #ff0);
  pointer-events: none;
  white-space: nowrap;
  text-decoration: none;
  text-transform: uppercase;

  height: var(--size-5);
  width: var(--size-9);
  top: var(--size-2);
  left: var(--size-2);
  line-height: var(--size-9);
  
  ${(props: any) => props.theme.textStyle("h3")};
  
  .tabbed &:focus {
    transform: translateY(0);
    opacity: 1;
  }
`;
export const SkipToLink = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <A href={`#${id}`}>
      <span>{children}</span>
    </A>
  );
};
