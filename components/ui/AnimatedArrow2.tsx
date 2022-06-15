import React from "react";
import styled, { keyframes } from "styled-components";
import Arrow from "~/assets/svg/optimized/AnimatedArrow.svg";

const drawAnimation = keyframes`
  to {
    stroke-dashoffset: 0;
  }
`;

const Container = styled.div<{
  width: string;
  height: string;
  animate?: boolean;
  towards?: boolean;
  bend?: string;
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  transform-origin: center center;

  // down to left
  // transform: rotate(70deg) translate(22px,-31px);

  // down to right
  transform: rotate(-70deg) translate(-26px,-31px) scaleX(-1);

  // the & is important as it makes sure that anything is only applied to this instance
  & svg {
    opacity: ${({ animate }) => (animate ? 1 : 0)};
    .draw-arrow {
      stroke-width: 1;
      stroke: #9f9f9f;
      fill: none;
      stroke-dasharray: 400;
      stroke-dashoffset: 400;
      stroke-linecap: round;
      stroke-linejoin: round;
      animation-duration: 1s;
      animation-fill-mode: forwards;
      animation-name: ${({ animate }) => (animate ? drawAnimation : "none")};

      &.st0{
        stroke-width: 1;
        stroke: #aaa;
      }

      &.tail-1 {
        animation-delay: 0.5s;
        animation-fill-mode: forwards;
      }
      &.tail-2 {
        animation-delay: 0.7s;
        animation-fill-mode: forwards;
      }
    }
  }
`;

export const AnimatedArrow2 = ({
  width = "100%",
  height = "100%",
  towards = true,
  bend = "bottom left",
  animate,
}: {
  width?: string;
  height?: string;
  towards?: boolean;
  bend?: string;
  animate?: boolean;
}) => {
  return (
    <Container {...{ width, height, animate, bend, towards }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 43.1 85.9"
        xmlSpace="preserve"
        width="100%"
        height="100%"
      >
        {/* MORE CURVED, ORGIGINAL */}

        {/* <path
          className="st0 draw-arrow"
          d="M11.3 2.5c-5.8 5-8.7 12.7-9 20.3s2 15.1 5.3 22c6.7 14 18 25.8 31.7 33.1"
        /> */}
        {/* <path
          className="draw-arrow tail-1"
          d="M40.6 78.1C39 71.3 37.2 64.6 35.2 58"
        />
        <path
          className="draw-arrow tail-2"
          d="M39.8 78.5c-7.2 1.7-14.3 3.3-21.5 4.9"
        /> */}

        {/* ADAPTED PATH, https://yqnn.github.io/svg-path-editor/ */}

        <path
          className="draw-arrow st0"
          d="M 6 2 C 4.093 8.472 1.625 23.453 9 43 C 13.922 55.547 24.782 68.68 36.943 78.755 M 6 2 C 4.093 8.472 1.625 23.453 9 43 C 13.08 53.695 21.836 68.511 36.6 79"
        />

        <path
          className="draw-arrow tail-1"
          d="M 37 79 C 36.685 72.607 36.685 72.607 36.068 67.494 M 36.451 78.347 C 36.244 72.431 36.244 71.197 36.156 67.759 "
        />
        <path
          className="draw-arrow tail-2"
          d="M 37.046 79.065 C 31.925 79.464 32.47 79.246 24.989 79.392 M 36.013 78.632 C 31.744 79.174 32.288 79.21 25.025 79.392"
        />
      </svg>
    </Container>
  );
};
