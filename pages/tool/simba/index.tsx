import { ReactElement, useState, useEffect } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";

import styled, { css } from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { LinkButtonAnimated } from "~/components/styled/Button";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";

import SimbaHeader from "~/components/tools/simba/header";
import { BoxHighlight, SimbaWrapper } from "~/components/tools/simba/Styled";
import Examples from "~/components/tools/simba/examples";
import { narrow } from "~/components/tools/map/Styled";
import useLanguage from "~/hooks/useLanguage";

const Index = ({ tool }: { tool: PiAiTool }) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "simba");
  const { strings, language, setLanguage } = useLanguage("simba"); // Use language hook

  // const strings?.index = textBits.en.index;

  return (
    <SimbaWrapper>
      <NextHeadSeo
        title={currentTool?.name ?? appConfig.appTitle}
        description={currentTool?.description ?? undefined}
        og={{
          title: currentTool?.name ?? appConfig.appTitle,
          siteName: appConfig.appTitle,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
      {/* =================== HEADER =================== */}
      <SimbaHeader
        strings={strings?.header}
        tool={tool}
        language={language}
        setLanguage={setLanguage}
      ></SimbaHeader>
      {/* =================== MAIN =================== */}

      <Grid>
        <About>
          <ToolSvgBackground type="lion" />
          <h2 className="title">{strings?.index.about.title}</h2>
          <p className="subtitle">{strings?.index.about.subtitle}</p>
          <p className="description">{strings?.index.about.description}</p>
        </About>

        <Team>
          <h2 className="title">{strings?.index.team.title}</h2>
          <p>{strings?.index.team.text}</p>
          <LinkButtonAnimated
            href={strings?.index.team.button.url}
            className="button"
            target="_blank"
            rel="noreferrer nofollow"
          >
            {strings?.index.team.button.label}
          </LinkButtonAnimated>
        </Team>

        <Tool className="simplifier">
          <div>
            <h2>{strings?.index.simplifier.title}</h2>
            <p className="subtitle">{strings?.index.simplifier.subtitle}</p>
          </div>
          <p className="copy">{strings?.index.simplifier.description}</p>

          <ToolSvgBackground
            type="screenshotSimplifier"
            className="screenshot"
          />
          <LinkButtonAnimated
            href={strings?.index.simplifier.button.url}
            className="button"
          >
            {strings?.index.simplifier.button.label}
          </LinkButtonAnimated>
        </Tool>

        <Tool className="extension">
          <div>
            <h2>{strings?.index.plugin.title}</h2>
            <p className="subtitle">{strings?.index.plugin.subtitle}</p>
          </div>
          <p className="copy">{strings?.index.plugin.description}</p>

          <ToolSvgBackground type="screenshot" className="screenshot" />
          <LinkButtonAnimated
            href={strings?.index.plugin.button.url}
            className="button"
          >
            {strings?.index.plugin.button.label}
          </LinkButtonAnimated>
        </Tool>

        <Examples />
      </Grid>
    </SimbaWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "simba");

  if (!tool)
    return {
      props: {
        frontendSettings: await restApiGetSettings(),
      },
      notFound: true,
      revalidate: 240,
    };

  return {
    props: {
      frontendSettings: await restApiGetSettings(),
      tool,
      view: "page",
      slug: "index",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Index.getLayout = function getLayout(page: ReactElement, props: any) {
  return <LayoutTool props={props}>{page}</LayoutTool>;
};

export default Index;

// Styled components for About, Team, and Tool
// =================================================

const Grid = styled.div`
  display: grid;
  gap: var(--size-3);

  grid-template-areas:
    "about"
    "team"
    "tool"
    "test";
  grid-template-columns: 1fr;

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "tool1 tool1 tool1"
      "tool2 tool2 tool2"
      "about about team"
      "test test test";
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "tool1 tool1 tool2 tool2"
      "about about about team"
      "test test test test";
  }

  & > div:last-child {
    grid-area: test;
  }

  a {
    align-self: start;
    margin-left: 0;

    &:hover {
      margin-left: -0.3em;
    }
  }
`;

const About = styled(Box)`
  grid-area: about;

    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: 3em auto;
    align-items: center;
    grid-row-gap: 0;

    // Icon spanning both rows
    .svg {
      grid-row: 1 / -2; //
      font-size: 3em;
      width: 1em !important;

      // on hover make .svg shake its head with a slight turn animation
      &:hover {
        animation: turn 0.5s ease-in-out;
      }
    }

    h2 {
      grid-row: 1;
    }

    .subtitle {
      grid-row: 2;
      max-width: unset;
      margin-bottom: 0;
    }

    // description spans the full width
    .description{
      grid-column: 1 / -1;
      grid-row: 3;
      max-width: unset;
      margin-top: var(--size-3);
    }

  }
`;

const Team = styled(BoxHighlight)`
  grid-area: team;
  gap: var(--size-3);
  .button {
    margin: 0;
  }
`;

const Tool = styled(Box)`
  h2 {
    margin: 0;
  }

  .subtitle {
    ${narrow}
    margin-bottom: 0;
  }

  .screenshot {
    grid-area: screenshot;
    width: 100%;

    min-height: 300px;

    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      min-height: calc((100vw - var(--size-6) - 9 * var(--size-3)) / 2 / 1.75);
    }
  }

  &.extension {
    grid-area: tool2;
  }

  &.simplifier {
    grid-area: tool1;
  }
`;
