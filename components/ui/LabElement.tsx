import React from "react";
import styled from "styled-components";
import { AspectRatio } from "./AspectRatio";
// import safeHtml from "~/utils/sanitize";
// import omit from "lodash/omit";

const ElementContainer = styled(AspectRatio)<{
  color?: string;
  hoverColor?: string;
  bgColor?: string;
  size?: number;
}>`
  border-color: ${({ color }) => color || "#000"};
  color: ${({ color }) => color || "#000"};
  background-color: ${({ theme, bgColor }) => bgColor ? theme.color(bgColor, 0.8) : "transparent"};
  
  font-size: ${({ size }) => size || 1}em;
  border-style: solid;
  border-width: 0.16em;
  padding: 0.2em;

  // Resetting inherited styles from parent
  text-transform: none;
  font-weight: 300;
  text-align: left;

  width: 2.4em;
  min-width: 2.4em;
  max-width: 2.4em;
  height: 2.4em;

  display: flex;
  flex-direction: column;
  
  

  // & + &{
  //   margin-left: 0.3em;
  // }

  transition: color var(--transition-speed-link),
    border-color var(--transition-speed-link);

  @media (any-pointer: fine) {
    &:hover {
      border-color: ${({ hoverColor }) => hoverColor || "#666"};
      color: ${({ hoverColor }) => hoverColor || "#666"};
    }
  }

  @media print {
    border-color: #000;
  }
`;

const ElementShort = styled.span`
  font-size: 0.8em;
  text-decoration: none;
  font-weight: 800;
  line-height: 1em;
`;

const ElementLong = styled.span`
  font-size: 0.35em;
  line-height: 1em;
  text-decoration: none;

  margin-top: auto;
`;

export const LabElement = ({
  color,
  hoverColor,
  shortHandle,
  longText,
  size,
  bgColor
}: {
  color?: string;
  hoverColor?: string;
  shortHandle?: string;
  longText?: string;
  size?: number;
  bgColor?: string;
}) => {
  return (
    <ElementContainer
      ratio="1"
      color={color}
      hoverColor={hoverColor}
      bgColor={bgColor}
      size={size}
      className="labElement"
    >
      <ElementShort>{shortHandle}</ElementShort>
      <ElementLong>{longText}</ElementLong>
    </ElementContainer>
  );
};
