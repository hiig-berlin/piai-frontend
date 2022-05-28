import styled from "styled-components";

export const DisplayAbove = styled.span<{breakpoint: string; inline?: boolean;}>`
  display: none;
  ${({ theme, breakpoint }) => theme.breakpoints?.[breakpoint]} {
    display: ${({inline}) => inline ? "inline-block":"block"};
  }
`;

export default DisplayAbove;
