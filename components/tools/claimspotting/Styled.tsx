import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";

export const TableGrid = styled.div<{ grid: string, header?: boolean }>`
  display: grid;
  gap: var(--size-1);
  border-bottom: ${({ header }) => (header ? "1px solid var(--color-light-grey)" : "none")};
  padding: ${({ header }) => (header ? "0 0 var(--size-1)" : "0")};

  ${({ grid, theme }) =>
    grid === "claimlist" &&
    `

      grid-template-columns: 1fr 2fr;
      & > div:nth-child(3), & > div:nth-child(4), & > div:nth-child(5){
        display: none;
      }

      ${theme.breakpoints.tablet} {
        display: grid;
        grid-template-columns: 
          minmax(50px, 1fr)     // Date
          minmax(50px, 5fr)     // Text
          minmax(50px, 2.5fr)     // Channel
          minmax(50px, 1.6fr)   // Topics
          minmax(50px, 4fr)     // Narrative
          minmax(50px, 1.1fr)   // Attributes
          minmax(50px, 2fr);    // Reach
        gap: var(--size-1);
        transition: all 0.3s;
        & > div:nth-child(3), & > div:nth-child(4), & > div:nth-child(5){
          display: inherit;
        }
      }

  `}

  ${({ grid, theme }) =>
    grid === "littleClaimlist" &&
    `
      grid-template-columns: 1fr 2fr;
      
      & > div:nth-child(3), & > div:nth-child(4), & > div:nth-child(5){
        display: none;
      }

      ${theme.breakpoints.tablet} {
        display: grid;
        grid-template-columns: 
          minmax(50px, 2fr)     // Date
          minmax(50px, 6fr)     // Text
          minmax(50px, 2fr)   // Topics
          minmax(50px, 1.5fr)   // Attributes
          minmax(50px, 0.5fr);    // Reach
        gap: var(--size-1);
        transition: all 0.3s;
        & > div:nth-child(3), & > div:nth-child(4), & > div:nth-child(5){
          display: inherit;
        }
      }

  `}


  ${({ grid, theme }) =>
    grid === "search" &&
    `
      grid-template-columns: auto 1fr;

      & > div:nth-child(2) {
        font-weight: bold;
      }

      & > div:nth-child(3) {
        grid-column: span 2;
        margin-bottom: var(--size-3);
      }

      ${theme.breakpoints.tablet} {
        grid-template-columns: 1fr 2fr 3fr;

        & > div:nth-child(3) {
          grid-column: unset;
        }
      }
  `}

  ${({ grid, theme }) =>
    grid === "narratives" &&
    `
      grid-template-columns: 1fr auto auto;

      & > div:nth-child(1) {
        font-size: 14px;
        
        grid-column: span 3;
        margin-bottom: var(--size-3);
      }

      ${theme.breakpoints.tablet} {
        grid-template-columns: 4fr 5fr 1fr 1fr;

        & > div:nth-child(1) {
          grid-column: unset;
          margin-bottom: 0;
          padding-right: var(--size-3);
        }
      }
  `}

  ${({ header }) => !header && `
  &:hover {
    background: #fff2;
    padding: var(--size-1);
    margin: calc(var(--size-1) * -1);
    cursor: pointer;
    border-radius: var(--size-2);
  }
  `}


`;

export const ClaimspottingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);
  min-width: calc(100vw - var(--size-6));

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
    font-size: 14px;
    font-weight: 300;
    line-height: 1em;
    // margin: var(--size-4) 0 calc(0px - var(--size-3));
  }
`;

export const BoxHighlight = styled(Box)`
  background: ${({ theme }) => theme.color("piai-claim", 0.6)} !important;
`;

export const Caption = styled.caption`
  border-top: 1px solid #333;
  padding-top: var(--size-3);
  width: 100%;

  text-align: left;
  font-family: var(--font-family-monospace);
  font-size: 0.8em;
`;

export const HeadlineWithButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--size-3);
  justify-content: space-between;
  margin-bottom: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: row;
    align-items: center;
  }

  a{
    margin: 0;
  }
`;
