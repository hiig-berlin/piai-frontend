import { String } from "lodash";
import styled from "styled-components";
import { ButtonNormalized } from "~/components/styled/Button";
import { narrow } from "~/components/tools/map/Styled";

export const HideOnPrint = styled.div`
  @media print {
    display: none;
  }
`

// Styled component for loading placeholder
export const Placeholder = styled.p<{tool?: string; mode?: string;}>`  
  color: ${({tool, mode}) => mode === "full" ? "white" : tool ? `var(--color-piai-${tool})` : "var(--color-piai-simba" };
  position: relative;
  animation: loading 4s ease-in-out infinite;
  transform-origin: left bottom;
  padding-bottom: 0.3em;
  max-width: unset;

  padding: ${({ mode }) => mode === "full" ? "var(--size-3)" : "0 0 0.3em"};
  ${({ mode, tool }) => mode === "full" ? 
      `background: var(--color-piai-${tool});
      border-radius: var(--size-2);`
    : ""};


  &:after {
    content: "";
    width: ${({mode}) => mode === "full" ? "calc(100% - 2 * var(--size-3))" : "100%"};
    height: 3px;
    position: absolute;
    display: block;
    top: ${({mode}) => mode === "full" ? "70%" : "100%"};
    animation: loadingBar 2s linear infinite alternate;
    background: linear-gradient(
      90deg,
      transparent 25%,
      ${({tool, mode}) => mode === "full" ? "white" : tool ? `var(--color-piai-${tool})` : "var(--color-piai-simba" } 50%,
      transparent 75%
    );
    background-size: 200% 100%;
    background-position: 0%;
    border-radius: 3px;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(0.995);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes loadingBar {
    0% {
      opacity: 0.6;
      background-position: 0%;
    }
    100% {
      opacity: 1;
      background-position: 100%;
    }
  }
`;

export const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--size-2);

  &.filter {
    justify-content: start;
  }
`;

export const Tag = styled(ButtonNormalized)<{ isActive: boolean; tool: string }>`
  display: inline-flex;
  align-items: center;
  padding: 3px var(--size-1);
  gap: var(--size-1);
  max-width: 100%;

  ${narrow}

  background-color: ${({ isActive, theme, tool }) =>
    // piai-TOOL as string from variable tool
    isActive ? theme.color("piai-" + tool, 0.4) : "transparent"};

  color: var(--color-piai-${({tool}) => tool});
  border: 1px solid var(--color-piai-${({tool}) => tool});
  border-radius: 4px;
  cursor: ${({ isActive, theme }) => (isActive ? "inherit" : "pointer")};

  & .svg {
    filter: invert(58%) sepia(83%) saturate(375%) hue-rotate(131deg)
      brightness(111%) contrast(101%);
    max-width: 10px;
  }
`;