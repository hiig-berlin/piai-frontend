/* eslint-disable react/jsx-key */
import { map } from "lodash";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import useIsBreakpoint from "~/hooks/useIsBreakpoint";
import { Accessible } from "../content/Accessible";
import { ButtonNormalized } from "../styled/Button";
import { StyledHeading } from "../styled/StyledHeading";
import PageMargins from "./PageMargins";
import { SvgBackground } from "./SvgBackground";

const boxPadding = "20px";
const boxPaddingMobile = "50px";
const pageContainerWidth = "calc(100vw - 2 * var(--size-page-margin))";
const mobileBoxSize = `calc(${pageContainerWidth} * 0.8)`;

const Pillars = styled.div<{ marginBottom?: number }>`
  display: grid;
  gap: var(--size-gutter-width);
  position: relative;
  margin-bottom: var(--size-5);

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: auto auto auto;

    ${({ marginBottom }) =>
      marginBottom && marginBottom > 0
        ? `
      margin-bottom: calc(${marginBottom}px + var(--size-7) + var(--size-6));
      `
        : "margin-bottom: var(--size-5)"} 
  }

  // Create Pillar grid and adjust margin bottom
  // depending on the height of the absolutly positioned
  // detail box below

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: 1fr;

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

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    height: 100%;
    width: unset;
    margin: unset;
  }

  & .svg {
    position: absolute;
    padding-bottom: 100%;
    height: 0% !important;
    top: 0;
  }

  & h3,
  & p {
    padding: calc(${boxPaddingMobile} + 10px) ${boxPaddingMobile};

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

    ${({ theme }) => theme.breakpoints.tablet} {
      height: 100px;
      bottom: calc(((100px - var(--size-7)) / 2) - 100px);
    }

    ${({ theme }) => theme.breakpoints.dektop} {
      height: 100px;
      bottom: calc(((100px - var(--size-7)) / 2) - 100px);
    }
  }
`;

const Title = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")}
  font-weight: 700;
  font-size: calc(var(--text-body-font-size) * 0.8);
  margin: 0;

  section & {
    padding: var(--size-5) var(--size-4) 0;
  }
`;

const Details = styled.section`
  position: relative;
  left: 0;
  margin-top: var(--size-7);

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
  }

  & svg.frame {
    position: absolute;
    width: calc(100% + 2 * var(--size-4));
    // height: 100%;
    top: 0;
    left: calc(0px - var(--size-4));
    z-index: -1;

    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      width: 100%;
      left: 0;
    }

    g {
      fill: #f5f8f9;
      stroke: #707070;
      strokewidth: 1;

      ${({ theme }) => theme.breakpoints.tabletLandscape} {
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

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: 3fr 1fr;
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

  useEffect(() => {
    if (activeIndex < 5) setHeight(boxesRefs.current[activeIndex].clientHeight);
  }, [activeIndex]);

  console.log(boxesRefs, boxesRefs.current, boxesRefs.current[0]);

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
                setActiveIndex(index);
              }}
            >
              <SvgBackground type={`square${index + 1}`} />
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

const Frame = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 1505.006 549.168"
      preserveAspectRatio="none"
      className="frame"
      vectorEffect="non-scaling-stroke"
    >
      <g
        id="Frame"
        data-name="Frame"
        transform="translate(16.006 1.026)"
        strokeWidth="1px"
      >
        <path d="M 166.054 -0.0267 C 87.6825 -0.0267 9.6461 0.5786 0.8275 0.6491 C 0.0558 4.7288 -3.4991 24.1671 -7.0133 53.9455 C -9.3336 73.6097 -11.1826 93.8685 -12.5087 114.1591 C -14.1659 139.5205 -15.0062 165.0031 -15.0062 189.8993 C -15.0062 218.5709 -13.9087 248.0349 -11.6505 279.9753 C -9.6869 307.7517 -7.1267 333.4631 -4.8677 356.1479 C -1.7192 387.7667 0.9999 415.0735 0.9999 436.7287 L 0.9999 544.9168 C 8.6575 545.0738 60.6987 546.0745 141.549 546.0745 C 192.8174 546.0745 245.459 545.6781 298.0117 544.8963 C 367.7106 543.8591 444.9175 542.1357 526.6577 540.3111 C 667.6089 537.1649 813.3589 533.9115 934.5375 533.9115 C 1019.1565 533.9115 1100.6917 534.4889 1176.8783 535.6279 C 1237.8285 536.5391 1295.5117 537.8097 1348.3256 539.4043 C 1430.4445 541.8837 1475.2615 544.3929 1482.7666 544.8309 C 1482.4468 539.5594 1481.0768 516.1115 1479.7223 479.9885 C 1478.8185 455.8833 1478.0985 430.9325 1477.5819 405.8287 C 1476.9365 374.4495 1476.6091 342.7415 1476.6091 311.5859 C 1476.6091 303.2359 1476.5665 293.2483 1476.5214 282.6741 C 1476.251 219.2589 1475.8422 123.4251 1482.855 89.5005 C 1485.4911 76.7465 1487.1332 64.1039 1487.7357 51.9239 C 1488.2178 42.1805 1488.0393 32.7095 1487.2056 23.7737 C 1486.0144 11.0096 1483.8036 2.9751 1483.1055 0.6686 L 909.0217 10.7183 L 908.9971 10.7175 L 593.5579 0.6567 C 592.3557 0.7356 569.5788 2.2231 540.4005 3.6919 C 490.5067 6.2035 460.5739 6.7307 444.2491 6.7307 C 417.3861 6.7307 401.9513 5.7513 382.4102 4.5115 C 361.0555 3.1567 334.4789 1.4703 282.6935 0.6555 C 253.9233 0.2029 214.6802 -0.0267 166.054 -0.0267 Z" />
      </g>
    </svg>
  );
};

const Borders = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="10 -5 300 610"
      preserveAspectRatio="none"
      className="frame"
      vectorEffect="non-scaling-stroke"
    >
      <g
        id="Borders"
        data-name="Borders"
        transform="translate(0) scale(1 1)"
        strokeWidth="1px"
      >
        <path d="M 0 0 c 0 0 77 -2 111 0 c 22 1 43 2 69 2 c 38 1 107 -1 197 -2 l 0 600 c -14 2 -89 3 -150 0 c -60 -1 -88 0 -150 0 L 0 600 Z" />
      </g>
    </svg>
  );
};

const Arrow = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="33.055"
      height="79.144"
      viewBox="0 0 33.055 79.144"
      className="arrow"
    >
      <g
        id="arrow_bow_right"
        data-name="arrow bow right"
        transform="translate(-1215.249 -897.786) rotate(12)"
        strokeWidth={1}
      >
        <path
          id="Path_64"
          data-name="Path 64"
          d="M-997.036,639.267s3.227,18.16,6.8,31.988c2.758,13.612,10.359,41.468,10.359,41.468"
          transform="translate(2387.864 -16.862)"
          fill="none"
          stroke="#707070"
        />
        <path
          id="Path_65"
          data-name="Path 65"
          d="M-1016.623,685.855l-5.774,17.292-16.924-6.707"
          transform="translate(2562.47 241.007) rotate(13)"
          fill="none"
          stroke="#707070"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};
