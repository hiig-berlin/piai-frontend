import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";

export const TableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--size-1);

  ${({ theme }) => theme.breakpoints.tablet} {
    display: grid;
    grid-template-columns: 
      minmax(50px, 1fr) 
      minmax(50px, 4fr) 
      minmax(50px, 1.5fr) 
      minmax(50px, 2fr) 
      minmax(50px, 4fr) 
      minmax(50px, 1.1fr) 
      minmax(50px, 2fr);
        // grid-template-columns: 6fr 24fr 9fr 12fr 25fr 7fr 10fr;
    gap: var(--size-1);
    transition: all 0.3s;
  }

  &:hover{
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
  background: ${({ theme }) => theme.colors.piaiClaim};
`;
