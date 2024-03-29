import React from "react";
import styled from "styled-components";
import { isNullOrUndefined } from "util";
import DisplayAbove from "~/components/styled/DisplayAbove";

export const Meta = styled.ul<{ col: number, inline?: boolean, nowrap?: boolean}>`
  // ul, li reset
  padding: 0;
  margin: 0;
  & li {
    margin: 0;
    padding: 0;
  }

  ${({ inline }) => inline ? `
  display: flex;
  gap: var(--size-3);
  ` : `
  display: grid;
  gap: var(--size-1);
  `}

  
  grid-template-columns: repeat(${({ col }) => (col > 1 ? 2 : 1)}, 1fr);

  ${({ theme }) => theme.breakpoints.mobileLandscape} {
    grid-template-columns: repeat(${({ col }) => col}, 1fr);
  }  

  ${({ nowrap }) => nowrap ? `

    li {
      max-width: 90%;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    li span {
      max-height: 1.3em;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      overflow: hidden;
    }
    }
    ` : `

  `}

  font-size: 14px;
  font-family: var(--font-family-narrow);

  .svg {
    min-height: 0.8em !important;
    min-width: 0.8em !important;
    max-height: 0.8em;
    max-width: 0.8em;
    position: relative;
    top: 5px;
    align-self: flex-start;
  }




`;

export const Label = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")};
  font-weight: 700;
  font-size: calc(var(--text-body-font-size-tool) * 0.9);
`;

export const Scroller = styled.div<{ opacity?: number }>`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: opacity 0.3s;
  opacity: ${({ opacity }) => opacity ?? 1};
  ${({ theme }) => theme.applyMixin("styledScrollbar")}

  @media print {
    height: auto;
    overflow: visible;
    opacity: 1;
  }
`;
