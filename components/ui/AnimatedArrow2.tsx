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
}>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  // the & is important as it makes sure that anything is only applied to this instance
  & svg {
    opacity: ${({ animate }) => (animate ? 1 : 0)};
    .draw-arrow {
      stroke-width: 5;
      stroke: dodgerblue;
      fill: none;
      stroke-dasharray: 400;
      stroke-dashoffset: 400;
      stroke-linecap: round;
      stroke-linejoin: round;
      animation-duration: 2s;
      animation-fill-mode: forwards;
      animation-name: ${({ animate }) => (animate ? drawAnimation : "none")};

      &.tail-1 {
        animation-delay: 0.5s;
      }
      &.tail-2 {
        animation-delay: 0.7s;
      }
    }
  }
`;

export const AnimatedArrow2 = ({
  width = "100%",
  height = "100%",
  animate,
}: {
  width?: string;
  height?: string;
  animate?: boolean;
}) => {
  return (
    <Container {...{ width, height, animate }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 43.1 85.9"
        xmlSpace="preserve"
        width="100%"
        height="100%"
      >
        <path
          className="st0 draw-arrow"
          d="M11.3 2.5c-5.8 5-8.7 12.7-9 20.3s2 15.1 5.3 22c6.7 14 18 25.8 31.7 33.1"
        />
        <path
          className="draw-arrow tail-1"
          d="M40.6 78.1C39 71.3 37.2 64.6 35.2 58"
        />
        <path
          className="draw-arrow tail-2"
          d="M39.8 78.5c-7.2 1.7-14.3 3.3-21.5 4.9"
        />
      </svg>
    </Container>
  );
};
