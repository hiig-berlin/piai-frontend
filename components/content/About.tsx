import React from "react";
import styled from "styled-components";
import { LabElement } from "../ui/LabElement";
import PageMargins from "../ui/PageMargins";
import Button from "../styled/Button";
import { SvgBackground } from "../ui/SvgBackground";

const AboutContainer = styled.div`
  color: white;
  font-size: 0.85em;

  h2 {
    ${({ theme }) => theme.textStyle("h3")}
    ${({ theme }) => theme.applyMixin("uppercase")}
    font-weight: bold;
    color: white;
  }

  p {
    max-width: 80%;
    margin: var(--size-3) 0;
  }

  button {
    margin-left: 0;
  }

  .labElement {
    float: left;
    margin: 0 10px 0 0;
  }

  .labElement + p {
    margin: 0;
  }

  .infoboxes {
    margin-top: var(--size-5);
    height: auto;
  }
`;

const Infobox = styled.article`
  position: relative;
  height: 0%;
  width: 100%;
  padding-bottom: 100%;
  margin-bottom: -150%;
  font-size: 0.85em;

  & svg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: 0;

    g {
      fill: #fff;
      stroke: #707070;
      stroke-width: 1;
    }
  }

  & h3,
  & p,
  & a {
    z-index: 1;
    position: relative;
  }

  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")}
    color: var(--color-text);
    font-weight: 700;
    font-size: calc(var(--text-body-font-size) * 0.8);
    padding: 40px 30px 0;
    margin: 0;
  }

  & p {
    padding: 20px 30px 0px;
    font-size: calc(var(--text-body-font-size) * 0.85);
    color: var(--color-text-grey);
    margin: 0;
    max-width: 100%;
  }

  & a {
    padding: 20px 35px 0;
    text-align: right;
    display: block;
    ${({ theme }) => theme.applyMixin("uppercase")}
    color: var(--color-text-grey);
    font-weight: 700;

    opacity: 0.7;

    &:hover {
      opacity: 1;
    }

    svg {
      height: 0.8em;
      position: relative;
      width: auto;
      top: 0.02em;

      path {
        fill: var(--color-text-grey);
      }
    }
  }
`;

const Grid = styled.div<{ col: number }>`
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  gap: var(--size-gutter-width);
`;

export const About = () => {
  return (
    <PageMargins
      bgColor="var(--color-piai-interface)"
      spaceTop={6}
      spaceBottom={2}
    >
      <AboutContainer>
        <Grid col={2}>
          <div>
            <h2>{aboutContent.about.headline}</h2>
            <p>{aboutContent.about.text}</p>
            {/* TODO: Button with href as link */}
            {/* <Button href={aboutContent.about.ctaUrl}> */}
            <Button>{aboutContent.about.ctaText}</Button>
          </div>
          <div>
            <h2>{aboutContent.toolbox.headline}</h2>
            <p>{aboutContent.toolbox.text}</p>
            <Grid col={2}>
              {aboutContent.toolbox.tools.map((tool: any, index: number) => {
                return (
                  <div key={`tool-${index}`}>
                    <LabElement
                      shortHandle={tool.shortHandle}
                      longText={tool.longText}
                      color="white"
                      hoverColor="#ffffffaa"
                      size={1.6}
                    />
                    <p>{tool.description}</p>
                  </div>
                );
              })}
            </Grid>
          </div>
        </Grid>
        <Grid col={aboutContent.boxes.length} className="infoboxes">
          {aboutContent.boxes.map((box: any, index: number) => {
            return (
              <Infobox key={`box-${index}`}>
                {/* <SvgBackground type={`square1`} /> */}
                <BoxSvgs i={index + 1} />
                <h3>{box.title}</h3>
                <p>{box.description}</p>
                <a href={box.linkUrl} rel="noreferrer nofollow" target="_blank">
                  {box.linkText} <Chevron />
                </a>
              </Infobox>
            );
          })}
        </Grid>
      </AboutContainer>
    </PageMargins>
  );
};

const aboutContent = {
  about: {
    headline: "Who's behind publicinterest.ai?",
    text: "This website is a space to share knowledge and foster collaboration on AI in the public interest. The research that backs the content of this website is undertaken at the Alexander von Humboldt Institute for Internet and Society (HIIG) in Berlin in cooperation with a wide group of experts. be launched soon. Visit our project website to find out more about our research and other related content.",
    ctaText: "Visit research project website",
    ctaUrl: "https://www.hiig.de/en/project/public-interest-ai/",
  },
  toolbox: {
    headline: "The publicinterest.ai toolbox",
    text: "Besides this knowledge resource, we’re showcaseing a handful of projects on public interest AI. This toolbox is a work in progress and open for ideas and collaborators. So some back, once in a while to see what’s new and contact us, if you want to contribute with a tool.",
    tools: [
      {
        shortHandle: "Ma",
        longText: "Project Map",
        description: "Map and directory of PIAI projects",
      },
      {
        shortHandle: "En",
        longText: "Energy Usage",
        description: "Measure you AI’s energy consumption",
      },
    ],
  },
  boxes: [
    {
      title: "Open talks",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.",
      linkText: "Watch on youtube",
      linkUrl: "https://youtube.com",
    },
    {
      title: "Instagram",
      description:
        "Lorem ipsum dolor sit amet, consetetur eirmod tempor et doloresadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.",
      linkText: "Go to channel",
      linkUrl: "https://instagram.com",
    },
    {
      title: "Blogposts",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore.",
      linkText: "Read the posts",
      linkUrl: "https://hiig.de",
    },
    {
      title: "Further resources",
      description:
        "Lorem ipsum dolor sit amet, consetetur sadipscing e  idunt ut labore et dolore.",
      linkText: "Read the posts",
      linkUrl: "https://github.com",
    },
  ],
};

const BoxSvgs = ({ i }: { i: number }) => {
  switch (i) {
    case 1:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 283.921 277.991"
          // preserveAspectRatio="none"
          vectorEffect="non-scaling-stroke"
        >
          <g
            id="Square1"
            data-name="Square1"
            transform="translate(5.96)"
            fill="#fff"
            stroke="#000"
          >
            <path d="M0,0S20.611,4.539,55.825,6.165,108.432,0,164.286,0H276s2.162,17.519,0,46.652c-.926,12.475-12.722,33.364-5.96,53.921,4.236,12.878,0,34.736,0,46.356,0,70.75,6.921,123.219,6.921,123.219s-22.22,7.842-91.22,7.842c-35.535,0-85.969-9.311-121.416-7.842-33.151,1.374-70.286,0-70.286,0S.961,298.753.961,228c0-27.309-6.921-92.917-6.921-149.528S0,0,0,0Z" />
          </g>
        </svg>
      );
    case 2:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="282.921"
          height="285.218"
          viewBox="0 0 282.921 286.218"
        >
          <g
            id="Square2"
            data-name="Square2"
            transform="translate(5.96 0.723)"
            fill="none"
          >
            <path d="M0,0S17.371-1.626,52.585,0s42.522,0,98.376,0H276s2.162,17.519,0,46.652c-1.523,20.518-1.039,63.352-1.039,93,0,70.75,2,130.5,2,130.5H173.341c-35.535,0-82.46,11.382-117.907,12.851C22.284,284.374,0,283,0,283s.961,15.753.961-55c0-27.309-6.921-92.917-6.921-149.528S0,0,0,0Z" />
          </g>
        </svg>
      );
    case 3:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="282.921"
          height="285.218"
          viewBox="0 0 282.921 285.218"
        >
          <g
            id="Square3"
            data-name="Square3"
            transform="translate(5.96 -1.723)"
            fill="none"
          >
            <path d="M0,0S17.371-1.626,52.585,0,85,6.5,140.858,6.5,276,0,276,0s2.162,17.519,0,46.652c-1.523,20.518.961,59.717.961,89.361C276.961,206.763,276,283,276,283s-32.831,3.9-101.831,3.9c-35.535,0-83.288-5.373-118.735-3.9C22.284,284.374,0,283,0,283s.961,15.753.961-55c0-27.309-6.921-92.917-6.921-149.528S0,0,0,0Z" />
          </g>
        </svg>
      );
    case 4:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="282.921"
          height="285.218"
          viewBox="0 0 282.921 285.218"
        >
          <g
            id="Square4"
            data-name="Square4"
            transform="translate(5.96 0.723)"
            fill="none"
          >
            <path d="M 0 1 H 52.585 S 287.792 14.979 282.078 3.6 S 278.162 17.519 276 46.652 C 274.477 67.17 268.432 94.032 268.432 123.676 C 268.432 194.427 276 283 276 283 S 242.828 277.309 173.828 277.309 C 138.293 277.309 90.881 281.531 55.434 283 C 22.284 284.374 0 283 0 283 V 226.442 C 0 199.133 0 140 0 104 C -0.3333 70 -6 42 0 0 Z" />
          </g>
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="282.921"
          height="285.218"
          viewBox="0 0 282.921 285.218"
        >
          <g
            id="Square5"
            data-name="Square5"
            transform="translate(5.96 0.723)"
            fill="none"
          >
            <path d="M0,0H52.585a69.833,69.833,0,0,0,20,3.181C83.229,3.181,95.154,0,95.154,0H276s2.162,17.519,0,46.652c-1.523,20.518-7.568,47.38-7.568,77.024C268.432,194.427,276,283,276,283s-33.172-5.691-102.172-5.691c-35.535,0-82.947,4.222-118.394,5.691C22.284,284.374,0,283,0,283V226.442c0-27.309,7.342-106.174,7.342-106.174Z" />
          </g>
        </svg>
      );
  }
};

const Chevron = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      // width="9.333"
      // height="14.883"
      viewBox="0 0 9.333 14.883"
    >
      <path
        id="back"
        d="M7.855.857,15.333,8.4,12.7,11.1,7.855,15.74,6,13.926,11.688,8.4,6,2.711Z"
        transform="translate(-6 -0.857)"
      />
    </svg>
  );
};
