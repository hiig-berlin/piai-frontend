import React from "react";
import styled from "styled-components";
import ReactTypingEffect from "react-typing-effect";

const Container = styled.div`
  text-align: center;
  margin-top: var(--size-7);
`;

const StyledHeading = styled.h1`
  text-align: center;
  ${({ theme }) => theme.textStyle("h0")};
  // TODO: this is the way you can use mixins. I know not as pretty as @import uppercase()
  /* ${({ theme }) => theme.applyMixin("uppercase")} */
`;

const Typing = styled.div`
  margin: 0 auto;
  width: 80%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme }) => theme.textStyle("h3")};
  ${({ theme }) => theme.applyMixin("monospace")};

  text-transform: none;
  height: var(--size-6);
  margin-bottom: var(--size-7);
`;

// TODO: Fetch from CMS
const possibleAnswers = [
  "AI serving equality.",
  "Making knowledge equally accessible.",
  "A new digital commons.",
  "AI in the power of people.",
  "AI systems, which are open for validation. ",
];

export const Intro = () => {
  return (
    <Container>
      <StyledHeading>What is public interest AI?</StyledHeading>
      <Typing>
        <ReactTypingEffect
          text={possibleAnswers}
          speed={100}
          eraseSpeed={20}
          eraseDelay={3000}
          typingDelay={500}
        />
      </Typing>
    </Container>
  );
};
