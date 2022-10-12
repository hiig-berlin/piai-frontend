import React from "react";
import styled from "styled-components";
import SafeHtmlSpan from "../ui/SafeHtmlSpan";

const TileContainer = styled.div`
  padding: var(--size-4);
  height: 100%;
  display: flex;
  flex-direction: column;

  color: white;
  position: relative;
`;

const TileOverlay = styled.div<{ bgColor?: string }>`
  background-color: ${({ theme, bgColor }) => theme.color(bgColor, 0.6)};
  mix-blend-mode: multiply;

  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 0;
`;

const TileElement = styled.div`
  font-size: 2em;
  margin-bottom: var(--size-5);
  z-index: 1;
`;

const TileContent = styled.div`
  z-index: 1;
  text-align: center;
  flex: auto 1 1;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.55);
  // background-blend-mode: multiply;
  mix-blend-mode: none;

  padding: var(--size-6) var(--size-4);
  ${({ theme }) => theme.breakpoints.tablet} {
    padding: var(--size-5) var(--size-6) var(--size-4);
  }
`;

const TileHeadline = styled.h3`
  ${({ theme }) => theme.textStyle("h3")};
  ${({ theme }) => theme.applyMixin("uppercase")};
  color: white;

  font-weight: bold;
`;

const TileText = styled.div`
  font-size: 0.85em;
  line-height: 1.2em;

  flex: auto 0 0;
  margin: auto;
`;

const TileButtons = styled.div`
  flex: auto 0 0;
  display: flex;
  justify-content: center;
  
  & a {
    align-self: flex-end;
  }
`;

export const Tile = ({
  bgOverlay,
  element,
  headline,
  buttons,
  children,
}: {
  bgOverlay: string;
  element: React.ReactNode | null;
  headline: string;
  buttons: any;
  children: React.ReactNode;
}) => {
  return (
    <TileContainer>
      <TileOverlay bgColor={bgOverlay} />
      <TileElement>{element}</TileElement>
      <TileContent>
        <TileHeadline>
          <SafeHtmlSpan html={headline} />
        </TileHeadline>
        <TileText>{children}</TileText>
        <TileButtons>{buttons}</TileButtons>
      </TileContent>
    </TileContainer>
  );
};
