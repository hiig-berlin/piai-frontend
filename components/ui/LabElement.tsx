import React from "react";
import styled from "styled-components";
import { getStaticProps } from "~/pages";
// import safeHtml from "~/utils/sanitize";
// import omit from "lodash/omit";

const ElementContainer = styled.div`
    border-color: ${(props: any) => props.color || "#000"};
    color: ${(props: any) => props.color|| "#000"};
    border-style: solid;
    border-width: 0.16em;
    padding: 0.2em;

    width: 2.4em;
    min-width: 2.4em;
    max-width: 2.4em;
    height: 2.4em;

    display: flex;  
    flex-direction: column;
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

export const LabElement = (props: {
  color?: string;
  shortHandle?: string;
  longText?: string;
}) => {
  return (
    <ElementContainer color={props.color}>
        <ElementShort>
            {props.shortHandle}
        </ElementShort>
        <ElementLong>
            {props.longText}
        </ElementLong>
    </ElementContainer>
  );
};

