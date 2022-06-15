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
      stroke-linejoin :round;
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

export const AnimatedArrow = ({
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
      <Arrow className="arrow" width="100%" height="100%" />
    </Container>
  );
};
