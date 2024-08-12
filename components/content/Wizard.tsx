import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import styled, { keyframes } from "styled-components";

// import { AnimatedArrow } from "~/components/ui/AnimatedArrow";
import { AnimatedArrow } from "~/components/ui/AnimatedArrow";
// import { SvgBackground } from "../ui/SvgBackground";
// import Arrow from "~/assets/svg/original/Arrow.svg"

const blendIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const WizAnchor = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const WizContainer = styled.div<{
  width?: string;
  left?: string;
  bottom?: string;
  top?: string;
  position?: string;
}>`
  position: ${({ position }) => position};
  bottom: ${({ bottom }) => bottom ?? "0"};
  top: ${({ top }) => top ?? "auto"};

  left: ${({ left }) => left ?? "0"};
  display: inline-block;
  height: 120px;
  width: ${({ width }) => width ?? "100%"};
`;

const WizText = styled.p<{
  right?: boolean;
  animationDelay?: number;
  animate?: boolean;
}>`
  text-align: ${({ right }) => (right ? "right" : "left")};
  ${({ theme }) => theme.applyMixin("monospace")}
  opacity: 0;

  // opacity: ${({ animate }) => (animate ? 1 : 0)};

  // transition: all 1sec ease;
  animation-duration: 1s;
  animation-delay: ${({ animationDelay }) =>
    animationDelay ? `${animationDelay?.toFixed(1)}s` : "0s"};
  animation-fill-mode: forwards;
  animation-name: ${({ animate }) => (animate ? blendIn : "none")};
`;

export const Wizard = ({
  towards,
  right,
  bend,
  width,
  left,
  bottom,
  top,
  position = "absolute",
  children,
  inView,
  inViewDelay,
  inViewRevert,
}: {
  towards?: boolean;
  right?: boolean;
  bend?: string;
  width?: string;
  position?: string;
  left?: string;
  bottom?: string;
  top?: string;
  children: React.ReactNode;
  inViewDelay?: number;
  inView?: boolean;
  inViewRevert?: boolean;
}) => {
  const inViewObserver = useInView({
    fallbackInView: true,
  });

  const [isInView, setIsInView] = useState(!!!inView);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (inViewObserver.inView) {
      setIsInView(true);
    } else if (isInView && inViewRevert) {
      setIsInView(false);
    }
  }, [inViewObserver.inView, isInView, inViewRevert]);

  return (
    <WizAnchor>
      <WizContainer
        width={width}
        left={left}
        position={position}
        bottom={bottom}
        top={top}
        ref={inViewObserver.ref}
      >
        <AnimatedArrow
          animate={isInView}
          animationDelay={inViewDelay ?? 0}
          bend={bend}
          towards={towards}
        />
        <WizText
          animate={isInView}
          animationDelay={inViewDelay ?? 0}
          right={right}
        >
          {children}
        </WizText>
      </WizContainer>
    </WizAnchor>
  );
};
