import React from "react";
import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`;

const Icon = styled.span<{
  isLoading: boolean;
  color: string;
  size: number;
}>`
  display: ${({ isLoading }) => (isLoading ? "block" : "none")};
  background-color: ${({ color }) => color};

  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 100%;
  opacity: 1;
  z-index: 2;
  animation: fadingColor 2s infinite;
  transform: translateX(-50%) translateY(-50%);
  animation-name: ${pulseAnimation};
  animation-duration: 2s;
  animation-iteration-count: infinite;
  pointer-events: none;
  touch-action: none;

  width: var(--size-${({ size }) => size});
  height: var(--size-${({ size }) => size});
`;

export const LoadingIcon = ({
  loading,
  isLoading,
  color = "#000",
  size = 6,
}: {
  loading?: boolean;
  isLoading?: boolean;
  color?: string;
  size?: number;
}) => {
  return (
    <Icon isLoading={loading || !!isLoading} size={size} color={color}></Icon>
  );
};
