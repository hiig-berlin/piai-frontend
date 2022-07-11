import React from "react";
import styled from "styled-components";

export const Meta = styled.ul<{col: number}>`

  // ul, li reset
  padding: 0;
  margin: 0;
  & li{
    margin: 0;
    padding: 0;
  }

  display: grid;
  grid-template-columns: repeat(${({col}) => col}, 1fr);
  gap: var(--size-1);

  font-size: 14px;
  font-family: var(--font-family-narrow);

  .svg{
    min-height: 0.8em !important;
    min-width: 0.8em !important;
    max-height: 0.8em;
    max-width: 0.8em;
    align-self: center;
  }
`