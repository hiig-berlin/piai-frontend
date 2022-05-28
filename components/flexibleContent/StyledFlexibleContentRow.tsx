import styled from "styled-components";

export const StyledFlexibleContentRow = styled.div<{ shortBottomMargin?: boolean }>`
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
      margin-bottom: ${props.theme.spacePx(
        breakpoint,
        props.shortBottomMargin ? 4 : 3
      )};        
    `;
    })}
`;
