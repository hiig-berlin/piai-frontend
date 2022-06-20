/* eslint-disable react/jsx-key */
import { map } from "lodash";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Accessible } from "../content/Accessible";
import { ButtonNormalized } from "../styled/Button";
import { StyledHeading } from "../styled/StyledHeading";
import PageMargins from "./PageMargins";
import { SvgBackground } from "./SvgBackground";

const Pillars = styled.div<{ marginBottom?: number }>`
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--size-gutter-width);
  position: relative;
  ${({ marginBottom }) => marginBottom && marginBottom > 0 ? `
    margin-bottom: calc(${marginBottom}px + var(--size-7) + var(--size-6));
    ` : "margin-bottom: var(--size-5)" 
  }
`;

const Title = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")}
  font-weight: 700;
  font-size: calc(var(--text-body-font-size) * 0.8);
  margin: 0;

  section & {
    margin: var(--size-5) var(--size-4) 0;
  }
`;

const ToggleButton = styled(ButtonNormalized)`
  text-align: left;
  display: block;
  height: 100%;

  & h3 {
    padding: 30px 20px 0;
  }

  & .svg {
    position: absolute;
    padding-bottom: 100%;
    height: 0%;
    top: 0;
  }

  & p {
    padding: 10px 20px 0;
    font-size: calc(var(--text-body-font-size) * 0.85);
    color: var(--color-text-grey);
  }

  & svg.arrow {
    position: absolute;
    height: 100px;
    bottom: calc(((100px - var(--size-7)) / 2) - 100px);
    left: 42%;
  }
`;

const Details = styled.section`
  position: absolute;
  left: 0;
  margin-top: var(--size-7);

  & svg.frame {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: -1;

    g{
      fill: none;
      stroke: #707070;
      strokeWidth: 1;
    }
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--size-gutter-width);
  padding: var(--size-4);

  & > div:last-child{
    ${({ theme }) => theme.applyMixin("monospace")}
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

  useEffect(() => {
    if (activeIndex < 5)
      setHeight(boxesRefs.current[activeIndex].clientHeight);
  }, [activeIndex]);

  console.log(boxesRefs, boxesRefs.current, boxesRefs.current[0]);

  return (
    <Pillars marginBottom={height}>
      {pillarContent.map((pillar: any, index: number) => {
        return (
          <article key={`pillar-${index}`}>
            <ToggleButton
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
            </ToggleButton>
            <Details
              id={`pillar-panel-${index}`}
              aria-labelledby={`pillar-header-${index}`}
              hidden={activeIndex !== index}
            >
              {/* This div is needed for height calculation */}
              <div ref={(element) => (boxesRefs.current[index] = element)}>
                <Frame />
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
        {/* <path
          d="M0-.344s185.148-1.535,282.709,0,104.325,6.075,161.54,6.075S593.54-.344,593.54-.344L909.029,9.718,1483.834-.344s11.623,33.815,0,90.047c-8.187,39.6-6.225,164.664-6.225,221.883,0,136.56,6.225,234.31,6.225,234.31s-178.338-10.984-549.3-10.984c-191.044,0-445.942,8.149-636.511,10.984C119.8,548.548,0,545.9,0,545.9V436.729C0,384.016-16.006,299.167-16.006,189.9S0-.344,0-.344Z"
        />
        <path
          d="M 166.053955078125 -0.02667236328125 C 87.6824951171875 -0.02667236328125 9.6461181640625 0.57861328125 0.8275146484375 0.64910888671875 C 0.0557861328125 4.728759765625 -3.4991455078125 24.1671142578125 -7.0133056640625 53.94549560546875 C -9.3336181640625 73.60971069335938 -11.1826171875 93.86849975585938 -12.5086669921875 114.1591186523438 C -14.1658935546875 139.5205078125 -15.0062255859375 165.0031127929688 -15.0062255859375 189.8993225097656 C -15.0062255859375 218.5709228515625 -13.90869140625 248.034912109375 -11.6505126953125 279.9753112792969 C -9.6868896484375 307.751708984375 -7.126708984375 333.463134765625 -4.86767578125 356.1479187011719 C -1.71923828125 387.7667236328125 0.9998779296875 415.0735168457031 0.9998779296875 436.7286987304688 L 0.9998779296875 544.9168090820312 C 8.657470703125 545.0737915039062 60.69873046875 546.0745239257812 141.5489501953125 546.0745239257812 C 192.8173828125 546.0745239257812 245.458984375 545.6781005859375 298.01171875 544.8963012695312 C 367.7105712890625 543.859130859375 444.91748046875 542.1357421875 526.65771484375 540.3110961914062 C 667.6089477539062 537.1649169921875 813.3589477539062 533.9114990234375 934.5375366210938 533.9114990234375 C 1019.156494140625 533.9114990234375 1100.691650390625 534.4888916015625 1176.878295898438 535.6279296875 C 1237.828491210938 536.5391235351562 1295.51171875 537.8096923828125 1348.325561523438 539.404296875 C 1430.444458007812 541.8836669921875 1475.261474609375 544.3928833007812 1482.7666015625 544.8309326171875 C 1482.44677734375 539.5593872070312 1481.076782226562 516.1115112304688 1479.722290039062 479.988525390625 C 1478.818481445312 455.88330078125 1478.098510742188 430.9324951171875 1477.581909179688 405.8287048339844 C 1476.9365234375 374.4495239257812 1476.609130859375 342.7415161132812 1476.609130859375 311.5859069824219 C 1476.609130859375 303.2359008789062 1476.566528320312 293.2483215332031 1476.521362304688 282.6741027832031 C 1476.2509765625 219.2589111328125 1475.842163085938 123.4251098632812 1482.85498046875 89.50051879882812 C 1485.491088867188 76.74652099609375 1487.133178710938 64.10391235351562 1487.735717773438 51.92388916015625 C 1488.2177734375 42.1805419921875 1488.039306640625 32.70953369140625 1487.20556640625 23.773681640625 C 1486.014404296875 11.00958251953125 1483.803588867188 2.97509765625 1483.10546875 0.6685791015625 L 909.021728515625 10.71832275390625 L 908.9971313476562 10.717529296875 L 593.557861328125 0.65667724609375 C 592.3556518554688 0.735595703125 569.5787963867188 2.22308349609375 540.4005126953125 3.69189453125 C 490.5067138671875 6.2034912109375 460.5739135742188 6.730712890625 444.2491455078125 6.730712890625 C 417.3861083984375 6.730712890625 401.9512939453125 5.75128173828125 382.41015625 4.51153564453125 C 361.0555419921875 3.15673828125 334.4788818359375 1.4703369140625 282.6934814453125 0.655517578125 C 253.92333984375 0.20294189453125 214.68017578125 -0.02667236328125 166.053955078125 -0.02667236328125 M 166.0538330078125 -1.026611328125 C 207.9417724609375 -1.026611328125 250.18505859375 -0.8560791015625 282.7093505859375 -0.34429931640625 C 380.2703857421875 1.19073486328125 387.0341796875 5.730712890625 444.2491455078125 5.730712890625 C 501.464111328125 5.730712890625 593.5403442382812 -0.34429931640625 593.5403442382812 -0.34429931640625 L 909.0289306640625 9.7181396484375 L 1483.834106445312 -0.34429931640625 C 1483.834106445312 -0.34429931640625 1495.457275390625 33.4700927734375 1483.834106445312 89.70291137695312 C 1475.647583007812 129.3061218261719 1477.609130859375 254.3673095703125 1477.609130859375 311.5859069824219 C 1477.609130859375 448.1461181640625 1483.834106445312 545.8961181640625 1483.834106445312 545.8961181640625 C 1483.834106445312 545.8961181640625 1305.49609375 534.9114990234375 934.5375366210938 534.9114990234375 C 743.493896484375 534.9114990234375 488.595703125 543.0604858398438 298.0264892578125 545.8961181640625 C 238.62158203125 546.7799072265625 185.699462890625 547.0745849609375 141.5489501953125 547.0745849609375 C 53.239990234375 547.0745849609375 -0.0001220703125 545.8961181640625 -0.0001220703125 545.8961181640625 L -0.0001220703125 548.1416625976562 C -0.0001220703125 548.1416625976562 -0.0001220703125 534.1893920898438 -0.0001220703125 436.7286987304688 C -0.0001220703125 384.0165100097656 -16.0062255859375 299.1675109863281 -16.0062255859375 189.8993225097656 C -16.0062255859375 80.63092041015625 -0.0001220703125 -0.34429931640625 -0.0001220703125 -0.34429931640625 C -0.0001220703125 -0.34429931640625 82.2933349609375 -1.026611328125 166.0538330078125 -1.026611328125 Z"
        /> */}

        <path
          d="M 166.054 -0.0267 C 87.6825 -0.0267 9.6461 0.5786 0.8275 0.6491 C 0.0558 4.7288 -3.4991 24.1671 -7.0133 53.9455 C -9.3336 73.6097 -11.1826 93.8685 -12.5087 114.1591 C -14.1659 139.5205 -15.0062 165.0031 -15.0062 189.8993 C -15.0062 218.5709 -13.9087 248.0349 -11.6505 279.9753 C -9.6869 307.7517 -7.1267 333.4631 -4.8677 356.1479 C -1.7192 387.7667 0.9999 415.0735 0.9999 436.7287 L 0.9999 544.9168 C 8.6575 545.0738 60.6987 546.0745 141.549 546.0745 C 192.8174 546.0745 245.459 545.6781 298.0117 544.8963 C 367.7106 543.8591 444.9175 542.1357 526.6577 540.3111 C 667.6089 537.1649 813.3589 533.9115 934.5375 533.9115 C 1019.1565 533.9115 1100.6917 534.4889 1176.8783 535.6279 C 1237.8285 536.5391 1295.5117 537.8097 1348.3256 539.4043 C 1430.4445 541.8837 1475.2615 544.3929 1482.7666 544.8309 C 1482.4468 539.5594 1481.0768 516.1115 1479.7223 479.9885 C 1478.8185 455.8833 1478.0985 430.9325 1477.5819 405.8287 C 1476.9365 374.4495 1476.6091 342.7415 1476.6091 311.5859 C 1476.6091 303.2359 1476.5665 293.2483 1476.5214 282.6741 C 1476.251 219.2589 1475.8422 123.4251 1482.855 89.5005 C 1485.4911 76.7465 1487.1332 64.1039 1487.7357 51.9239 C 1488.2178 42.1805 1488.0393 32.7095 1487.2056 23.7737 C 1486.0144 11.0096 1483.8036 2.9751 1483.1055 0.6686 L 909.0217 10.7183 L 908.9971 10.7175 L 593.5579 0.6567 C 592.3557 0.7356 569.5788 2.2231 540.4005 3.6919 C 490.5067 6.2035 460.5739 6.7307 444.2491 6.7307 C 417.3861 6.7307 401.9513 5.7513 382.4102 4.5115 C 361.0555 3.1567 334.4789 1.4703 282.6935 0.6555 C 253.9233 0.2029 214.6802 -0.0267 166.054 -0.0267 Z"
        />
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
