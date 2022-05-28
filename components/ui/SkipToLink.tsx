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

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
          height: ${props.theme.spacePx(breakpoint, 5)};
          width: ${props.theme.spacePx(breakpoint, 9)};
          top: ${props.theme.spacePx(breakpoint, 2)};
          left: ${props.theme.spacePx(breakpoint, 2)};
          ${props.theme.textStyle(breakpoint, `h3`)};
          line-height: ${props.theme.spacePx(breakpoint, 9)};
        `;
    })}

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
