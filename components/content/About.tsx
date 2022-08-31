import React from "react";
import styled from "styled-components";
import { LabElement } from "../ui/LabElement";
import { PageMargins } from "../ui/PageMargins";
import { LinkButton } from "../styled/Button";

import { BoxSvgs, Chevron } from "../ui/StaticSvgs";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import Link from "next/link";
import SafeHtmlSpan from "../ui/SafeHtmlSpan";
import SafeHtmlDiv from "../ui/SafeHtmlDiv";

const pageContainerWidth = "(100vw - 2 * var(--size-page-margin))";
const mobileBoxSize = `calc(${pageContainerWidth} * 0.9)`;
const boxPadding = "30px";
const boxPaddingMobile = "10vw";
const boxPaddingTablet = "5vw";

const AboutContainer = styled(PageMargins)`
  color: white;
  font-size: 0.85em;

  & > div > div > div:first-child {
    margin-bottom: var(--size-6);
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    padding-bottom: var(--size-7);

    & > div > div > div:first-child {
      margin-bottom: var(--size-2);
    }
  }

  h2 {
    ${({ theme }) => theme.textStyle("h3")}
    ${({ theme }) => theme.applyMixin("uppercase")}
    font-weight: bold;
    color: white;
    font-size: calc(var(--text-h3-font-size) * 0.8);

    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      font-size: var(--text-h3-font-size);
    }
  }

  p {
    max-width: 100%;
    margin: var(--size-3) 0;

    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      max-width: 80%;
    }
  }

  .button {
    margin-left: 0;

    &:hover {
      margin-left: 0;
    }
  }

  & .tools {
    margin: var(--size-4) 0;

    & a {
      color: white;
      display: flex;
    }

    .labElement {
      float: left;
      margin: 0 10px 0 0;
    }

    .labElement + span {
      margin: auto 0;
      padding-bottom: 5px;
    }
  }
`;

const InfoboxesContainer = styled(PageMargins)`
  ${({ theme }) => theme.breakpoints.tablet} {
    height: auto;
    margin-bottom: calc(0px - var(--size-6));

    .infoboxes {
      height: auto;
    }
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    margin-bottom: calc(${pageContainerWidth} * 0.25 * -0.5);

    .infoboxes {
      height: calc(${pageContainerWidth} / 4);
      // overlap a third of the box to the top
      margin-top: calc(${pageContainerWidth} * 0.25 * -0.5);
    }
  }

  ${({ theme }) => theme.breakpoints.screen} {
    margin-bottom: calc(var(--size-page-max-width) * 0.25 * -0.5);
    .infoboxes {
      height: calc(var(--size-page-max-width) * 0.25);
      margin-top: calc(var(--size-page-max-width) * 0.25 * -0.5);
    }
  }
`;

const Infobox = styled.article`
  position: relative;
  width: 100%;
  height: 0%;
  padding-bottom: ${mobileBoxSize};
  font-size: 0.85em;
  width: ${mobileBoxSize};
  margin: 0 auto;

  ${({ theme }) => theme.breakpoints.tablet} {
    width: auto;
    padding-bottom: 100%;
  }

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
    padding: calc(${boxPaddingMobile} + 10px) ${boxPaddingMobile};

    ${({ theme }) => theme.breakpoints.tablet} {
      padding: calc(${boxPaddingTablet} + 10px) ${boxPaddingTablet};
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      padding: calc(${boxPadding} + 10px) ${boxPadding};
    }
  }

  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")}
    color: var(--color-text);
    font-weight: 700;
    font-size: calc(var(--text-body-font-size) * 0.8);
    padding-bottom: 0;
    margin: 0;
  }

  & p {
    padding-top: 20px;
    padding-bottom: 0;
    font-size: calc(var(--text-body-font-size) * 0.85);
    color: var(--color-text-muted);
    margin: 0;
    max-width: 100%;
  }

  & a {
    padding-top: 20px;
    padding-bottom: 0;
    text-align: right;
    display: block;
    ${({ theme }) => theme.applyMixin("uppercase")}
    color: var(--color-text-muted);
    font-weight: 700;
    font-size: 0.9em;

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
        fill: var(--color-text-muted);
      }
    }
  }
`;

const Grid = styled.div<{ col: number }>`
  display: grid;
  gap: var(--size-gutter-width);
  grid-template-rows: auto;

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: repeat(${({ col }) => col}, 1fr);
  }

  &.infoboxes {
    grid-template-rows: repeat(
      ${({ col }) => col},
      calc(${mobileBoxSize} + var(--size-3))
    );

    // Two by two
    ${({ theme }) => theme.breakpoints.tablet} {
      grid-template-columns: repeat(calc(${({ col }) => col} / 2), 1fr);
      grid-template-rows: auto;
    }

    // Four in a row
    ${({ theme }) => theme.breakpoints.desktop} {
      grid-template-columns: repeat(${({ col }) => col}, 1fr);
    }
  }
`;

export const About = ({ data }: { data: any }) => {
  const config = useConfigContext();

  return (
    <>
      <AboutContainer
        bgColor="var(--color-piai-interface)"
        spaceTop={6}
        spaceBottom={6}
      >
        <Grid col={2}>
          <div>
            <h2>
              <SafeHtmlSpan html={data?.acf?.footerAbout.title} />
            </h2>
            <SafeHtmlDiv html={data?.acf?.footerAbout.text} />
            {data?.acf?.footerAbout.linkLabel &&
              data?.acf?.footerAbout.linkLabel.trim() &&
              data?.acf?.footerAbout.linkUrl && (
                <LinkButton
                  href={data?.acf?.footerAbout.linkUrl}
                  target="_blank"
                  rel="norefferer"
                  className="button"
                >
                  {data?.acf?.footerAbout.linkLabel}
                </LinkButton>
              )}
          </div>
          <div>
            <h2>
              <SafeHtmlSpan html={data?.acf?.footerTools.title} />
            </h2>
            <SafeHtmlDiv html={data?.acf?.footerTools.text} />
            {config?.tools?.length > 0 && (
              <Grid col={2} className="tools">
                {config?.tools.map((tool: any, index: number) => {
                  return (
                    <Link
                      passHref
                      href={`/tool/${tool.slug}`}
                      key={`tool-${index}`}
                    >
                      <a>
                        <LabElement
                          shortHandle={tool.iconShort}
                          longText={tool.iconLong}
                          color="white"
                          hoverColor="#ffffffaa"
                          size={1.6}
                        />
                        <span>{tool.description}</span>
                      </a>
                    </Link>
                  );
                })}
              </Grid>
            )}
          </div>
        </Grid>
      </AboutContainer>
      <InfoboxesContainer
        bgColor="var(--color-light-grey)"
        spaceTop={6}
        spaceBottom={6}
      >
        {data?.acf?.boxes?.length > 0 && <Grid col={data.acf.boxes.length} className="infoboxes">
          {data.acf.boxes.map((box: any, index: number) => {
            return (
              <Infobox key={`box-${index}`}>
                {/* <SvgBackground type={`square1`} /> */}
                <BoxSvgs i={index + 1} />
                <h3>{box.title}</h3>
                <p>{box.text}</p>
                <a href={box.linkUrl} rel="noreferrer nofollow" target="_blank">
                  <Chevron /> {box.linkLabel}
                </a>
              </Infobox>
            );
          })}
        </Grid>}
      </InfoboxesContainer>
    </>
  );
};
