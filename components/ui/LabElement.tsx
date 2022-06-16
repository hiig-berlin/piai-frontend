import React from "react";
import styled from "styled-components";
import { getStaticProps } from "~/pages";
// import safeHtml from "~/utils/sanitize";
// import omit from "lodash/omit";

const ElementContainer = styled.div<{
  color?: string; 
  hoverColor?: string; 
  size?: number;
}>`
    border-color: ${({color}) => color || "#000"};
    color: ${({color}) => color|| "#000"};
    font-size: ${({size}) => size || 1}em;
    border-style: solid;
    border-width: 0.16em;
    padding: 0.2em;

    width: 2.4em;
    min-width: 2.4em;
    max-width: 2.4em;
    height: 2.4em;

    display: flex;  
    flex-direction: column;

    & + &{
      margin-left: 0.3em;
    }

    &:hover{
      border-color: ${({hoverColor}) => hoverColor || "#666"};
      color: ${({hoverColor}) => hoverColor|| "#666"};
    }
`

const ElementShort = styled.span`
    font-size: 0.8em;
    text-decoration: none;
    font-weight: 800;
    line-height: 1em;
`

const ElementLong= styled.span`
    font-size: 0.35em;
    line-height: 1em;
    text-decoration: none;
    
    margin-top: auto;
`

export const LabElement = ({
  color,
  hoverColor,
  shortHandle,
  longText,
  size,
}: {
  color?: string;
  hoverColor?: string;
  shortHandle?: string;
  longText?: string;
  size?: number;
}) => {
  return (
    <ElementContainer color={color} hoverColor={hoverColor} size={size}>
        <ElementShort>
            {shortHandle}
        </ElementShort>
        <ElementLong>
            {longText}
        </ElementLong>
    </ElementContainer>
  );
};

