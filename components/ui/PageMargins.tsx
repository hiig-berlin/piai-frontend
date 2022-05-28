import React from "react";
import styled from "styled-components";

export const Container = styled.div<{
  spaceTop?: number;
  spaceBottom?: number;
  minHeight?: number;
  position?: string;
  bgColor?: string;
}>`
  display: flow-root;
  position: ${({ position }) => position ?? "static"};

  background-color: ${({ bgColor }) => bgColor ?? "transparent"};

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        min-height: ${props.minHeight ?? "auto"};
        
        padding: ${
          props.spaceTop ? props.theme.spacePx(breakpoint, props.spaceTop) : 0
        } ${props.theme.pageMarginPx(breakpoint)} ${
        props.spaceBottom
          ? props.theme.spacePx(breakpoint, props.spaceBottom)
          : 0
      } ${props.theme.pageMarginPx(breakpoint)};
        `;
    })}
`;

const Wrapper = styled.div<{
  keepMaxWidth?: boolean;
}>`
  width: 100%;
  max-width: ${(props) =>
    props.keepMaxWidth ? `${props.theme.pageMaxWidth}px` : "100%"};
  margin: 0 auto;
`;

export const PageMargins = ({
  children,
  spaceTop,
  spaceBottom,
  minHeight,
  position,
  bgColor,
  keepMaxWidth,
}: {
  children: React.ReactNode;
  spaceTop?: number;
  spaceBottom?: number;
  minHeight?: number;
  position?: string;
  bgColor?: string;
  keepMaxWidth?: boolean;
}) => {
  return (
    <Container {...{ spaceTop, spaceBottom, minHeight, position, bgColor }}>
      <Wrapper {...{ keepMaxWidth }}>{children}</Wrapper>
    </Container>
  );
};

export default PageMargins;
