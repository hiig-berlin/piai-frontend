import React from "react";
import styled from "styled-components";

// import { AnimatedArrow } from "~/components/ui/AnimatedArrow";
import { AnimatedArrow2 } from "~/components/ui/AnimatedArrow2";
// import { SvgBackground } from "../ui/SvgBackground";
// import Arrow from "~/assets/svg/original/Arrow.svg"

const WizAnchor = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
`;

const WizContainer = styled.div<{width?: string; left?: string; bottom?: string}>`
  position: absolute;
  bottom: ${({bottom}) => bottom || "0"};
  left: ${({left}) => left || "0"};
  display: inline-block;
  height: 120px;
  width: ${({width}) => width || "100%"};
`;
const WizText = styled.p<{ right?: boolean}>`
  text-align: ${({right}) => right ? "right" : "left"};;
`;

export const Wizard = ({
  towards,
  right,
  bend,
  width,
  left,
  bottom,
  children,
}: {
  towards?: boolean;
  right?: boolean;
  bend?: string;
  width?: string;
  left?: string;
  bottom?: string;
  children: React.ReactNode;
}) => {
  return (
    <WizAnchor>
      <WizContainer width={width} left={left} bottom={bottom}>
        <AnimatedArrow2 animate bend={bend} towards={towards} />
        <WizText  right={right}>{children}</WizText>
      </WizContainer>
    </WizAnchor>
  );
};
