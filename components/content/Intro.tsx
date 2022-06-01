import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: var(--size-6);  
`;

const StyledHeading = styled.div`
  text-align: center;
  font-family: var(--text-h0-font-family);
  font-weight: var(--text-h0-font-weight);
  font-style: var(--text-h0-font-style);
  font-size: var(--text-h0-font-size);
  line-height: var(--text-h0-line-height);
`;

const PossibleAnswers = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 800px;
  background-color: salmon;
  display: flex;
  align-items: center;
  justify-content: center;

  font-family: var(--text-h1-font-family);
  font-weight: var(--text-h1-font-weight);
  font-style: var(--text-h1-font-style);
  font-size: var(--text-h1-font-size);
  line-height: var(--text-h1-line-height);

  height: var(--size-6);
  margin-bottom: var(--size-4);
`;

export const Intro = () => {
  return (
    <Container>
      <StyledHeading>What is public interest AI?</StyledHeading>
      <PossibleAnswers>Possible answers</PossibleAnswers>
    </Container>
  );
};
