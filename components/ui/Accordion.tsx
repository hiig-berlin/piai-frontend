/* eslint-disable react/jsx-key */
import { indexOf, map } from "lodash";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import useIsBreakpoint from "~/hooks/useIsBreakpoint";
import { Accessible } from "../content/Accessible";
import { ButtonNormalized } from "../styled/Button";
import { StyledHeading } from "../styled/StyledHeading";
import PageMargins from "./PageMargins";
import { SvgBackground } from "./SvgBackground";
import { Arrow, Frame, Borders, BoxSvgs } from "./StaticSvgs";

const boxPadding = "20px";
const boxPaddingMobile = "10vw";
const boxPaddingTablet = "5vw";
const pageContainerWidth = "calc(100vw - 2 * var(--size-page-margin))";
const mobileBoxSize = `calc(${pageContainerWidth} * 0.9)`;

//
//   Styling 5 pillars
// __________________________________

const Pillars = styled.div<{ marginBottom?: number }>`
  display: grid;
  gap: calc(var(--size-gutter-width) * 2);
  position: relative;
  margin-bottom: var(--size-5);

  // Create Pillar grid and adjust margin bottom
  // depending on the height of the absolutly positioned
  // detail box below

  ${({ theme }) => theme.breakpoints.tablet} {
    gap: var(--size-gutter-width);
    grid-template-columns: auto auto;
    grid-auto-rows: calc(${pageContainerWidth} / 2);

    ${({ marginBottom }) =>
      marginBottom && marginBottom > 0
        ? `
      margin-bottom: calc(${marginBottom}px + var(--size-2) + var(--size-6));
      `
        : "margin-bottom: var(--size-5)"}
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: auto auto auto;
    grid-auto-rows: calc(${pageContainerWidth} / 3);
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: auto;

    ${({ marginBottom }) =>
      marginBottom && marginBottom > 0
        ? `
      margin-bottom: calc(${marginBottom}px + var(--size-7) + var(--size-6));
      `
        : "margin-bottom: var(--size-5)"}
  }
`;

const ToggleBox = styled(ButtonNormalized)`
  text-align: left;
  display: block;
  height: ${mobileBoxSize};
  width: ${mobileBoxSize};
  margin: 0 auto;
  position: relative;

  ${({ theme }) => theme.breakpoints.tablet} {
    height: 100%;
    width: unset;
    margin: unset;
  }

  & svg.box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: -1;
  }

  &[aria-expanded="true"] svg.box g {
    stroke-width: 3;
    stroke: var(--color-piai-interface);
  }

  & h3,
  & p {
    padding: calc(${boxPaddingMobile} + 10px) ${boxPaddingMobile};

    ${({ theme }) => theme.breakpoints.tablet} {
      padding: calc(${boxPaddingTablet} + 10px) ${boxPaddingTablet};
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      padding: calc(${boxPadding} + 10px) ${boxPadding};
    }
  }

  & h3 {
    padding-bottom: 0;
  }

  & p {
    padding-top: 20px;
    font-size: calc(var(--text-body-font-size));
    color: var(--color-text-grey);

    ${({ theme }) => theme.breakpoints.desktop} {
      font-size: calc(var(--text-body-font-size) * 0.85);
    }
  }

  & svg.arrow {
    position: absolute;
    height: 50px;
    bottom: calc(((60px - var(--size-7)) / 2) - 50px);
    left: 42%;
    display: block;

    ${({ theme }) => theme.breakpoints.tablet} {
      height: 100px;
      bottom: calc(((100px - var(--size-7)) / 2) - 100px);
      display: none;
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      height: 100px;
      bottom: calc(((100px - var(--size-7)) / 2) - 100px);
      display: block;
    }
  }
`;

//
//   Styling detail box
// __________________________________

const Details = styled.section`
  position: relative;
  left: 0;
  margin-top: var(--size-7);

  ${({ theme }) => theme.breakpoints.tablet} {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: var(--size-2);
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    margin-top: var(--size-7);
  }

  & svg.frame {
    position: absolute;
    width: calc(100% + 2 * var(--size-4));
    // height: 100%;
    top: 0;
    left: calc(0px - var(--size-4));
    z-index: -1;

    ${({ theme }) => theme.breakpoints.tablet} {
      width: 100%;
      left: 0;
    }

    g {
      fill: #f5f8f9;
      stroke: #707070;
      strokewidth: 1;

      ${({ theme }) => theme.breakpoints.tablet} {
        fill: none;
      }
    }
  }
`;

const Columns = styled.div`
  display: grid;
  gap: var(--size-gutter-width);
  padding: var(--size-4);

  & > div:last-child {
    ${({ theme }) => theme.applyMixin("monospace")}
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 3fr 1fr;
  }
`;

//
//   Headline styling
// __________________________________

const Title = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")}
  font-weight: 700;
  font-size: calc(var(--text-body-font-size) * 0.8);
  margin: 0;

  section & {
    padding: var(--size-5) var(--size-4) 0;
  }
`;

const Headline = styled.div`
  ${({ theme }) => theme.textStyle("h2")}
  font-size: calc(var(--text-h2-font-size) * 0.85);
  margin: var(--size-2) var(--size-4) var(--size-2);
`;

export const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(6);
  const [height, setHeight] = useState(0);
  const boxesRefs = useRef(new Array());

  const isTablet = useIsBreakpoint("tablet");

  // Update hight and scroll to details
  // when pillars get (de)selected (i.e. activeIndex changes)
  useEffect(() => {
    if (activeIndex < 5) {
      setHeight(boxesRefs.current[activeIndex].clientHeight);
      boxesRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: isTablet ? "nearest" : "start",
      });
    } else setHeight(0);
  }, [activeIndex, isTablet]);

  return (
    <Pillars marginBottom={height}>
      {pillarContent.map((pillar: any, index: number) => {
        return (
          <article key={`pillar-${index}`}>
            <ToggleBox
              id={`pillar-header-${index}`}
              aria-expanded={activeIndex === index ? "true" : "false"}
              aria-controls={`pillar-panel-${index}`}
              onClick={() => {
                activeIndex === index
                  ? setActiveIndex(6)
                  : setActiveIndex(index);
              }}
            >
              <BoxSvgs i={index + 1} />
              <Title>{pillar.title}</Title>
              <p>{pillar.shortDescription}</p>
              {activeIndex === index && <Arrow />}
            </ToggleBox>
            <Details
              id={`pillar-panel-${index}`}
              aria-labelledby={`pillar-header-${index}`}
              hidden={activeIndex !== index}
            >
              {/* This div is needed for height calculation */}
              <div ref={(element) => (boxesRefs.current[index] = element)}>
                {isTablet ? <Frame /> : <Borders />}
                <Title>{pillar.title}</Title>
                <Headline>{pillar.headline}</Headline>
                <Columns>
                  <div>
                    <Accessible simple={pillar.textSimple}>
                      {pillar.textStandard}
                    </Accessible>
                    {/* {pillar.textStandard} */}
                  </div>
                  <div>{pillar.sideNotes}</div>
                </Columns>
              </div>
            </Details>
          </article>
        );
      })}
    </Pillars>
  );
};

const pillarContent = [
  {
    title: "Justification",
    shortDescription:
      "What is the societal reason for this system? Is this AI solution the best way and most sustainable to solve an existing problem?",
    headline: "How does this system help our society?",
    textStandard: (
      <>
        <p>
          We unasdasdasdderstand public interest AI systems to be those AI
          systems that{" "}
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
    // sideNotes: [
    //   (
    //     <p>
    //     This is a sidenote with a <a href="#">Link</a>
    //   </p>
    //   ),
    //   (
    //   <p>
    //     It would be nice to add an example or anecdote here to lighten it a
    //     little up. Or maybe even two?!
    //   </p>
    //   ),
    // ],
  },
  {
    title: "Equality",
    shortDescription:
      "What is the societal reason for this system? Is this AI solution the best way and most sustainable to solve an existing problem?",
    headline: "How does this system help our society?",
    textStandard: (
      <>
        <p>
          We understand public isdgdsghbsfdhsdbhnterest AI systems to be those
          AI systems that{" "}
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
    // sideNotes: [
    //   (
    //     <p>
    //     This is a sidenote with a <a href="#">Link</a>
    //   </p>
    //   ),
    //   (
    //   <p>
    //     It would be nice to add an example or anecdote here to lighten it a
    //     little up. Or maybe even two?!
    //   </p>
    //   ),
    // ],
  },
  {
    title: "Participatory design / Deliberation",
    shortDescription:
      "How can citizens get informed, participate, co-design or have a stake in the design and the use of the system?",
    headline: "How does this system help our society?",
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
    // sideNotes: [
    //   (
    //     <p>
    //     This is a sidenote with a <a href="#">Link</a>
    //   </p>
    //   ),
    //   (
    //   <p>
    //     It would be nice to add an example or anecdote here to lighten it a
    //     little up. Or maybe even two?!
    //   </p>
    //   ),
    // ],
  },
  {
    title: "Technical standards / Safeguards",
    shortDescription:
      "Is the system secure, accurate and robust the way is is built? Was there an audit to make sure?",
    headline: "How does this system help our society?",
    textStandard: (
      <>
        <p>
          We underssdafgdsdfgadstand public interest AI systems to be those AI
          systems that{" "}
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
    // sideNotes: [
    //   (
    //     <p>
    //     This is a sidenote with a <a href="#">Link</a>
    //   </p>
    //   ),
    //   (
    //   <p>
    //     It would be nice to add an example or anecdote here to lighten it a
    //     little up. Or maybe even two?!
    //   </p>
    //   ),
    // ],
  },
  {
    title: "Open for validation",
    shortDescription:
      "Is the system secure, accurate and robust the way is is built? Was there an audit to make sure?",
    headline: "How does this system help our society?",
    textStandard: (
      <>
        <p>
          asdasdasdadWe understand public interest AI systems to be those AI
          systems that{" "}
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
    sideNotes: [
      <p>
        This is a sidenote with a <a href="#">Link</a>
      </p>,
      <p>
        It would be nice to add an example or anecdote here to lighten it a
        little up. Or maybe even two?!
      </p>,
    ],
  },
];
