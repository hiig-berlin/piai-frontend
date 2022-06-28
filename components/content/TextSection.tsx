import React from "react";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { ButtonNormalized } from "../styled/Button";
import DisplayAbove from "../styled/DisplayAbove";
import DisplayBelow from "../styled/DisplayBelow";
import { Heading } from "../ui/Heading";
import PageMargins from "../ui/PageMargins";
import { Wizard } from "./Wizard";
import { Accessible } from "./Accessible";
import { Accordion } from "../ui/Accordion";

const Grid = styled.div`
  display: grid;

  // auf mobiles stacken wir dir columns
  grid-template-rows: auto auto;
  gap: var(
    --size-gutter-width
  ); // <-- immer gut etwas luft zischen den spalten/reihen zu haben

  margin: 0 0 var(--size-6);
  position: relative;

  // ab tablets gibt es dann genug platz um die spalten
  ${({ theme }) => theme.breakpoints.tablet} {
    // <!-- so kann man breakpoints innerhalb einer styled component verwenden. Alles in den klammern wird nur ab dieser größe dargestellt.
    grid-template-rows: auto;
    grid-template-columns: 1fr 2fr;
  }
`;

// const Row = styled.div`
//   display: flex;
//   margin: 0 0 var(--size-6);
// `;
// const Left = styled.div`
//   flex: 30% 0 0;
// `;
// const Right = styled.div`
//   flex: 70% 0 0;
// `;

const SectionHeading = styled(Heading)`
  margin: var(--size-7) var(--size-2);
  text-align: center;
  font-weight: bold;

  ${({ theme }) => theme.breakpoints.tablet} {
    margin: var(--size-6);
  }
`;

const Icon = styled(ButtonNormalized)`
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
`;

export const TextSection = () => {
  // Larissa: Moved to Accessibility (to be used in several content components)
  // // we build an array that stores for each text row if it is simple or not
  // // initially all are not
  // // const [isSimpleIndexes, setisSimpleIndexes] = useState(
  // //   textrows.map(() => false)
  // // );

  // TODO: you could use useIsBreakpoint
  // whenever you can it would be better to hide components using css and breakpoints
  // useIsBreakpoint takes sompe CPU time. So it is only worth using if the hidden component would potentially use
  // more CPU time than the useIsBreakpoint

   const {
    vars: { isTabletAndUp },
  } = useCssVarsContext();

  // TODO: the alternavite is to use <DisplayAbove breakpoint="table" display="flex"/> or <DisplayBelow breakpoint="tablet" />
  // this is just a helper div setting display to none or block or any value you pass. I used it in the code below
  // downside it adds another element to the DOM tree.

  // TODO: third alternative is to have a styled component that shows only after a certain break point

  return (
    <>
      <PageMargins spaceBottom={7} spaceTop={4}>
        <SectionHeading asTag="h2" heading="h2">
          {headline}
        </SectionHeading>
        {isTabletAndUp && (
          <Wizard
            bend="up right"
            left="0%"
            bottom="-250px"
            width="20%"
            inView
            inViewDelay={1}
          >
            You would like to add something here? Go ahead and contact us!
          </Wizard>
        )}
        {textrows.map((row: any, index: number) => {
          return (
            <Grid key={`textrow-${index}`}>
              <div>
                <h3>{row.headline}</h3>
              </div>
              <div>
                {/* {isSimpleIndexes[index] ? row.textSimple : row.textStandard}
                <Icon
                  aria-label="change to simple text version"
                  onClick={() => {
                    // in this on click we toggle the current rows value
                    isSimpleIndexes[index] = !isSimpleIndexes[index];

                    // and safe it again in the the state
                    // as the state only triggers an update if the "reference" of the variable changes
                    // arrays (and object) nedd to be new
                    // hence we "spread" the current array in a new one
                    setisSimpleIndexes([...isSimpleIndexes]);
                  }}
                >
                  <SvgBackground type="language" />
                </Icon> */}
                <Accessible simple={row.textSimple}>
                  {row.textStandard}
                </Accessible>
              </div>
            </Grid>
            // TODO: ich würde ja hier ein css grid verwenden weil das erlaubt dir breakpoint änderungen
            // <Row key={i}>
            // <Left>
            //    <h3>{row.headline}</h3>
            //  </Left>
            //  <Right>{row.textStandard}</Right>
            //</Row>
          );
        })}
        <DisplayAbove breakpoint="tablet">
          <Wizard
            bend="down right"
            left="0%"
            bottom="0px"
            width="20%"
            inView
            inViewDelay={1}
          >
            Select one of the 5 conditions to find out more.
          </Wizard>
        </DisplayAbove>
        <DisplayBelow
          breakpoint="tablet"
          style={{
            marginBottom: "var(--size-8)",
          }}
        >
          <Wizard
            bend="down below"
            left="0%"
            bottom="0px"
            width="80%"
            inView
            inViewDelay={1}
          >
            Select one of the 5 conditions to find out more.
          </Wizard>
        </DisplayBelow>
      </PageMargins>

      <PageMargins spaceBottom={4} spaceTop={0}>
        <Accordion />
      </PageMargins>
    </>
  );
};

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
          and act for a common good.
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
          interest.
        </p>
      </>
    ),
    textSimple: (
      <>
        <p>
          Public interest is closely entangled with the idea of democracy and
          the rule of law. Developing a collective idea of the public interest
          regarding a certain issue is an established process in many societies
          and has a long tradition in legal discourse.
        </p>
      </>
    ),
  },
];
