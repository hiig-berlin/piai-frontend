import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: var(--size-6);  
`;

const StyledHeading = styled.div`
  text-align: center;
  ${(props: any) => props.theme.textStyle("h0")};
  // TODO: this is the way you can use mixins. I know not as pretty as @import uppercase()
  ${(props: any) => props.theme.applyMixin("uppercase")}
`;

const PossibleAnswers = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 800px;
  background-color: salmon;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props: any) => props.theme.textStyle("h1")};

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
