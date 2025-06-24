import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { narrow } from "~/components/tools/map/Styled";

// Define colour for BoxHighlight
export const BoxHighlight = styled(Box)`
  background: ${({ theme }) => theme.color("piai-network", 0.8)} !important;
`;

// Network Wrapper
export const NetworkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);

  h2 {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: var(--text-body-font-size-tool) * 1.1;
    font-weight: bold;
    margin-top: 0 !important;
  }

  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: calc(0px - var(--size-2));
  }

  p a {
    text-decoration: underline dotted 0.5px;
    text-decoration-color: inherit;
    text-underline-offset: 3px;
    transition: all ease-out 0.5s;

    &:hover {
      text-decoration: underline solid 2px;
      text-underline-offset: 2px;
      margin-right: 0;
      margin-left: 0;
    }
  }
`;

// Grid and subgrid layouts
export const Grid = styled.div`
  display: grid;
  gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

//extend Grid for GoalGrid
export const GoalGrid = styled(Grid)`
${({ theme }) => theme.breakpoints.tablet} {
  grid-template-columns: repeat(2, 1fr);
}
  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

//extend Grid for InfoGrid
export const InfoGridWrapper = styled(Grid)`
  grid-template-areas:
    "about"
    "endorsement"
    "goals";

  grid-template-columns: 1fr;
  align-items: start;
  justify-items: stretch;

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "about endorsement"
      "goals goals";
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "about about endorsement endorsement"
      "goals goals goals goals";
  }

  .about {
    grid-area: about;
  }
  .join {
    grid-area: join;
  }
  .goals {
    grid-area: goals;
  }
  .endorsement {
    grid-area: endorsement;
  }

  .about,
  .join,
  .goals,
  .endorsement {
    align-self: flex-start;
    justify-self: stretch;

    a {
      margin: 0;
      align-self: flex-start;
    }
  }
`;

// Member Filter Wrapper
export const MemberFilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--size-3);
  justify-content: space-between;
  align-items: center;

  h2 {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: var(--text-body-font-size-tool) * 1.1;
    font-weight: bold;
    margin: 0 !important;
  }

`;

// Member List Element
export const Entry = styled(Box)<{ isExpanded: boolean }>`
  grid-row: auto;

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-row: ${({ isExpanded }) =>
      isExpanded ? "auto / span 3" : "auto / span 1"};
  }

  & h2 {
    text-transform: none;
    font-size: 18px;
    font-weight: bold;
  }

  .svg {
    min-height: 0.8em !important;
    min-width: 0.8em !important;
    max-height: 0.8em;
    max-width: 0.8em;
    align-self: center;
    top: 0;
  }

  
`;

// Label for Card
export const Label = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")};
  font-weight: 300;
  font-size: calc(var(--text-body-font-size-tool) * 0.9);
`;

// Bigger icon with text on the side (Goals)
export const Blurb = styled.div`
  display: grid;
  color: #fff;
  height: fit-content;
  align-self: flex-start;
  justify-content: flex-start;

  ${narrow}

  grid-template-areas:
    "icon ."
    "icon .";

  .svg {
    grid-area: icon;
    min-height: 3em;
    min-width: 3em;
    max-width: 3em;
    flex: 1em 0 0;
    margin-right: var(--size-3);

    ${({ theme }) => theme.breakpoints.tablet} {
      margin-right: var(--size-2);
    }
  }

  p,
  h3 {
    margin-bottom: 3px;
  }

  a{
    text-decoration: underline dotted 0.5px;
    text-decoration-color: inherit;
    text-underline-offset: 3px;
    transition: all ease-out 0.5s;

    &:hover {
      text-decoration: underline solid 2px;
      text-underline-offset: 2px;
      margin-right: 0;
      margin-left: 0;
    }
  }
`;

export const ProjectLinks = styled.ul`
  color: var(--color-piai-network);
  padding-left: 1em;

  li::marker {
    content: "›  ";
    position: absolute;
    font-size: 1.2em;
    font-weight: bold;
  }
`;
