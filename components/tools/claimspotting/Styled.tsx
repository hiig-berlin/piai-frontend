import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";

export const TableGrid = styled.div<{ grid: string }>`
  display: grid;
  gap: var(--size-1);

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
          minmax(50px, 3fr)     // Channel
          minmax(50px, 1.6fr)     // Topics
          minmax(50px, 4fr)     // Narrative
          minmax(50px, 1.1fr)   // Attributes
          minmax(50px, 2fr);    // Reach
            // grid-template-columns: 6fr 24fr 9fr 12fr 25fr 7fr 10fr;
        gap: var(--size-1);
        transition: all 0.3s;
        & > div:nth-child(3), & > div:nth-child(4), & > div:nth-child(5){
          display: block;
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


  &:hover {
    background: #fff2;
    padding: var(--size-1);
    margin: calc(var(--size-1) * -1);
    cursor: pointer;
    border-radius: var(--size-2);
  }
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
  background: ${({ theme }) => theme.colors.piaiClaim} !important;
`;
