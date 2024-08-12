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

  min-height: ${({ minHeight }) => minHeight ?? "auto"};

  padding: ${({ spaceTop }) => (spaceTop ? `var(--size-${spaceTop})` : "0")}
    var(--size-page-margin)
    ${({ spaceBottom }) => (spaceBottom ? `var(--size-${spaceBottom})` : "0")}
    var(--size-page-margin);
`;

const Wrapper = styled.div<{
  keepMaxWidth?: boolean;
}>`
  width: 100%;
  max-width: ${({ keepMaxWidth }) =>
    keepMaxWidth ? "var(--size-page-max-width)" : "100%"};
    
  margin-left: auto;
  margin-right: auto;
`;

export const PageMargins = ({
  children,
  spaceTop,
  spaceBottom,
  minHeight,
  position,
  bgColor,
  className,
  id,
  keepMaxWidth = true,
}: {
  children: React.ReactNode;
  spaceTop?: number;
  spaceBottom?: number;
  minHeight?: number;
  position?: string;
  bgColor?: string;
  className?: string;
  id?: string;
  keepMaxWidth?: boolean;
}) => {
  return (
    <Container {...{ spaceTop, spaceBottom, minHeight, position, bgColor }} className={className} id={id}>
      <Wrapper {...{ keepMaxWidth }}>{children}</Wrapper>
    </Container>
  );
};

export default PageMargins;
