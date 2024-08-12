import styled from "styled-components";

export const DisplayAbove = styled.span<{
  breakpoint: string;
  display?: string;
}>`
  display: none;
  ${({ theme, breakpoint }) => theme.breakpoints?.[breakpoint]} {
    display: ${({ display }) => display ?? "block"};
  }
`;

export default DisplayAbove;
