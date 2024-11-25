
import React from "react";
import styled from "styled-components";
import { ToolSvgBackground } from "../../shared/ToolSvgBackground";

export const Icon = ({
  type,
  active,
  children,
}: {
  type: string;
  active?: boolean;
  children?: any;
}) => (
  <IconWrapper active={active}>
    <ToolSvgBackground type={type} width="1rem" />
    {children ? children : null}
  </IconWrapper>
);

const IconWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  align-items: center;
  gap: 3px;

  span {
    max-height: 1rem;
    min-height: 0.8rem;
    filter: ${({ active }) =>
      active
        ? "brightness(0) saturate(100%) invert(57%) sepia(24%) saturate(1126%) hue-rotate(105deg) brightness(101%) contrast(95%)"
        : "none"};
  }
`;

export const Icons = styled.div`
  display: flex;
  gap: var(--size-2);
`;