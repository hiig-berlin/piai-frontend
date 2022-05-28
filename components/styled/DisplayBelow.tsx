import styled from "styled-components";

export const DisplayBelow = styled.span<{breakpoint: string; inline?: boolean;}>`
  display: ${({inline}) => inline ? "inline-block":"block"};
  ${({ theme, breakpoint }) => theme.breakpoints?.[breakpoint]} {
    display: none;
  }
`;

export default DisplayBelow;
