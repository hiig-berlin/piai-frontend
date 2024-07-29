import styled from "styled-components";
import { ButtonNormalized } from "~/components/styled/Button";
import { narrow } from "~/components/tools/map/Styled";
import { Box } from "~/components/tools/shared/ui/Box";

export const SimbaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);
  min-width: calc(100vw - var(--size-6));
  min-height: 100vh;

  h1,
  h2,
  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")};
  }

  h1 {
    line-height: 1em;
  }

  h2 {
    font-size: var(--text-body-font-size-tool) * 1.1;
    font-weight: bold;
    margin-top: 0 !important;
  }

  h3 {
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    // margin: var(--size-4) 0 calc(0px - var(--size-3));
  }

  ul li::marker {
    content: "— ";
    position: absolute;
  }

  textarea {
    background: transparent;
    boder: 1px solid white;
    color: white;
    font-size: 0.8em;
    padding: var(--size-2);
    border-radius: var(--size-1);
    height: fit-content;
    min-height: 10em;
    width: 100%;
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

export const Tag = styled(ButtonNormalized)<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 3px var(--size-1);
  gap: var(--size-1);
  max-width: 100%;

  ${narrow}

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.color("piai-simba", 0.4) : "transparent"};
  color: var(--color-piai-simba);
  border: 1px solid var(--color-piai-simba);
  border-radius: 4px;
  cursor: ${({ isActive, theme }) => (isActive ? "inherit" : "pointer")};

  & .svg {
    filter: invert(58%) sepia(83%) saturate(375%) hue-rotate(131deg)
      brightness(111%) contrast(101%);
    max-width: 10px;
  }
`;

export const BoxHighlight = styled(Box)`
  background: ${({ theme }) => theme.colors.piaiSimba};
`;


export const InputStyling = styled.div`
  p{
    h1,
  h2,
  h3 {
    text-transform: none;
    font-weight: bold;
    margin: 2em 0 1em;
    
    &:first-child{
      margin-top: 0;
    }
  }
`;