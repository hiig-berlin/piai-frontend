import React from "react";
import styled from "styled-components";
import { StyledHeading } from "../styled/StyledHeading";
import { Heading } from "../ui/Heading";
import PageMargins from "../ui/PageMargins";
import { Wizard } from "./Wizard";

// Content
const headline =
  "For Public Interest AI we need to design new processes and design patterns.";
const textrows = [
  {
    headline: "What is public interest AI?",
    textStandard: (
      <>
        <p>
          We understand public interest AI systems to be those AI systems that{" "}
          <strong>
            support those outcomes best serving the long-run survival and
            well-being of a social collective construed as a “public”.
          </strong>
        </p>
        <p>
          Our understanding is inspired by theorists like Barry Bozeman and John
          Dewey and many other sources in the tradition of public interest
          theory. In our research we aim to make these ideas useful for the
          discussion on AI and how it could serve people and equality in
          societies instead of private goals and profit maximisation.{" "}
        </p>
        <p>
          Public interest is closely entangled with the idea of democracy and
          the rule of law. Developing a collective idea of the public interest
          regarding a certain issue is an established process in many societies
          and has a long tradition in legal discourse. The public interest is
          never universal but needs to be defined for each societal issue by a
          deliberative and participatory process. To act in the public interests
          citizens think about more than their private interests - they think
          and act for a common good.{" "}
        </p>
        <p>
          In our research, we explore and discuss what this understanding of the
          public interest means for the development and implementation of AI.{" "}
        </p>
      </>
    ),
    textSimple: (
      <>
        <p>
          Public interest is closely entangled with the idea of democracy and
          the rule of law. Developing a collective idea of the public interest
          regarding a certain issue is an established process in many societies
          and has a long tradition in legal discourse. The public interest is
          never universal but needs to be defined for each societal issue by a
          deliberative and participatory process. To act in the public interests
          citizens think about more than their private interests - they think
          and act for a common good.
        </p>
      </>
    ),
  },
  {
    headline: "What are the conditions for PIAI?",
    textStandard: (
      <>
        <p>
          We believe that besides legal requirements informed by ethical
          considerations certain conditions are important for the process of
          development and implementation of AI systems to serve the public
          interest.{" "}
        </p>
      </>
    ),
    textSimple: (
      <>
        <p>
          Public interest is closely entangled with the idea of democracy and
          the rule of law. Developing a collective idea of the public interest
          regarding a certain issue is an established process in many societies
          and has a long tradition in legal discourse.{" "}
        </p>
      </>
    ),
  },
];

const Row = styled.div`
  display: flex;
  margin: 0 0 var(--size-4);
`;
const Left = styled.div`
  flex: 30% 0 0;
`;
const Right = styled.div`
  flex: 70% 0 0;
`;

const SectionHeading = styled(Heading)`
  margin: var(--size-6) var(--size-4);
  text-align: center;
  font-weight: bold;
`

export const TextSection = () => {
  return (
    <PageMargins spaceBottom={4} spaceTop={4}>
      <>
        <SectionHeading asTag="h2" heading="h2">
          {headline}
        </SectionHeading>
        <Wizard bend="up right" left="0%" bottom="-250px" width="20%"> 
        You would like to add something here? Go ahead and contact us!
        </Wizard>
        {textrows.map((row:any, i:number) => {
          return(
            <Row key={i}>
              <Left><h3>{row.headline}</h3></Left>
              <Right>{row.textStandard}</Right>
            </Row>
          );
        })}
        <Wizard bend="down right" left="0%" bottom="-50px" width="30%">
          Select one of the 5 conditions to find out more.
        </Wizard>
        {/* <Pillars></Pillars> */}
      </>
    </PageMargins>
  );
};