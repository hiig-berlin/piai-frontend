import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        margin-top:${props.theme.spacePx(breakpoint, 6)};
        `;
    })}
`;

const StyledHeading = styled.div`
  text-align: center;
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        ${props.theme.textStyle(breakpoint, "h0")};
        `;
    })}
`;

const PossibleAnswers = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 800px;
  background-color: salmon;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        height:${props.theme.spacePx(breakpoint, 6)};
        ${props.theme.textStyle(breakpoint, "h1")};
        margin-bottom:${props.theme.spacePx(breakpoint, 6)};
        `;
    })}
`;

export const Intro = () => {
  return (
    <Container>
      <StyledHeading>What is public interest AI?</StyledHeading>
      <PossibleAnswers>Possible answers</PossibleAnswers>
    </Container>
  );
};
