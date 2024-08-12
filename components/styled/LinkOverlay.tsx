import styled from "styled-components";

export const LinkOverlay = styled.a<{
  top?: string;
  left?: string;
  width?: string;
  height?: string;
}>`
  &::after {
    display: block;
    position: absolute;
    content: "";
    top: ${({ top }) => top ?? 0};
    left: ${({ left }) => left ?? 0};
    width: ${({ width }) => width ?? "100%"};
    height: ${({ height }) => height ?? "100%"};
    z-index: 2;
  }
  @media (any-pointer: fine) {
    &:hover {
      color: #000;
    }
  }

  text-decoration: none;
  
  .tabbed &:focus-within  {
    div {
      outline-width: 3px;
      outline-color: var(--color-focus-outline, #00f) !important;
      outline-offset: 3px;
      outline-style: solid;
    }
  }
`;

export default LinkOverlay;
