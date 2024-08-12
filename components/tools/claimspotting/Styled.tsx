import styled from "styled-components";

export const TableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--size-1);

  ${({ theme }) => theme.breakpoints.tablet} {
    display: grid;
    grid-template-columns: 6fr 24fr 9fr 12fr 25fr 7fr 10fr;
    gap: var(--size-1);
  }
`;
