import React from "react";
import styled from "styled-components";

export const Meta = styled.ul<{ col: number }>`
  // ul, li reset
  padding: 0;
  margin: 0;
  & li {
    margin: 0;
    padding: 0;
  }

  display: grid;
  gap: var(--size-1);
  grid-template-columns: repeat(${({ col }) => (col > 1 ? 2 : 1)}, 1fr);

  ${({ theme }) => theme.breakpoints.mobileLandscape} {
    grid-template-columns: repeat(${({ col }) => col}, 1fr);
  }

  font-size: 14px;
  font-family: var(--font-family-narrow);

  .svg {
    min-height: 0.8em !important;
    min-width: 0.8em !important;
    max-height: 0.8em;
    max-width: 0.8em;
    align-self: center;
  }
`;

export const Label = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")};
  font-weight: 400;
  font-size: calc(var(--text-body-font-size-tool) * 0.8);
`;

export const Scroller = styled.div<{ opacity?: number }>`
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  transition: opacity 0.3s;
  opacity: ${({ opacity }) => opacity ?? 1};
  ${({ theme }) => theme.applyMixin("styledScrollbar")}
`;
