import styled from "styled-components";

export const DisplayBelow = styled.span<{
  breakpoint: string;
  display?: string;
}>`
  display: ${({ display }) => display ?? "block"};
  ${({ theme, breakpoint }) => theme.breakpoints?.[breakpoint]} {
    display: none;
  }
`;

export default DisplayBelow;
