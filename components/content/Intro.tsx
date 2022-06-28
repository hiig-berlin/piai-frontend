import React from "react";
import styled from "styled-components";
import ReactTypingEffect from "react-typing-effect";
import { Wizard } from "./Wizard";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";

const Container = styled.div`
  text-align: center;
  // margin-top: var(--size-7);
  display: flex;
  flex-direction: column;
  height: 60vh;
  min-height: 400px;

  ${({ theme }) => theme.breakpoints.tablet} {
    height: 70vh;
  }
`;

const StyledHeading = styled.h1`
  text-align: center;
  margin: auto auto var(--size-4);
  width: 80%;
  ${({ theme }) => theme.textStyle("h0")};
  
  font-weight: 700;

  ${({ theme }) => theme.breakpoints.tablet} {
    margin: auto auto var(--size-2);
    font-weight: 400;
  }
`;

const Typing = styled.div`
  margin: 0 auto auto;
  width: 80%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: start;

  ${({ theme }) => theme.applyMixin("monospace")};

  font-size: 1.1em; 
  line-height: 1.3em;
  height: fit-content;
  min-height: 4em;

  ${({ theme }) => theme.breakpoints.tablet} {
    height: var(--size-6);
    min-height: none;
    font-size: 1.3em; 
  }
`;

// TODO: Fetch from CMS
const possibleAnswers = [
  "AI serving equality.",
  "Making knowledge equally accessible.",
  "A new digital commons.",
  "AI in the power of people.",
  "AI systems, which are open for validation. ",
  "Lorem ipsum dolor sit AI systems, which are open for validation and some more content, which is really long. ",
];

export const Intro = () => {
  const {
    vars: { isTabletAndUp },
  } = useCssVarsContext();

  return (
    <Container>
      <StyledHeading>What is public interest AI?</StyledHeading>
      <Typing>
        <ReactTypingEffect
          text={possibleAnswers}
          speed={80}
          eraseSpeed={20}
          eraseDelay={3000}
          typingDelay={500}
        />
      </Typing>
      {isTabletAndUp && (
        <>
          <Wizard towards bend="down left" left="5%" bottom="100px" width="30%" inView inViewDelay={1.0} inViewRevert> 
          Explore existing projects of public interest and their answers.
          </Wizard>
          <Wizard towards right bend="down right" left="60%" bottom="100px" width="35%" inView inViewDelay={2.5} inViewRevert> 
            We’ve done some research. Read here our proposed definition for a public interest AI.
          </Wizard>
        </>
      )}
    </Container>
  );
};
