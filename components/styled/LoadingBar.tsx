import styled, { keyframes, css } from "styled-components";

const loadingBorderAnimation = keyframes`
  0% {
    width: 0%;
    left: 0px;
    right: auto;
  }
  49.99% {
    width: 100%;
    left: 0px;
    right: auto;
  }
  50% {
    width: 100%;
    left: auto;
    right: 0px;
  }
  99.99% {
    width: 0%;
    left: auto;
    right: 0px;
  }
`;

export const LoadingBar = styled.div<{ isLoading: boolean; bgColor?: string }>`
  position: fixed;
  height: 3px;
  top: 0;
  left: 0;
  width: 100%;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  animation: ${({ isLoading }) =>
    isLoading
      ? css`
          ${loadingBorderAnimation} 2s infinite
        `
      : "none"};
  background-color: ${({ isLoading, bgColor }) =>
    isLoading ? bgColor ?? "var(--color-loading-bar)" : "transparent"};
  pointer-events: none;
`;
