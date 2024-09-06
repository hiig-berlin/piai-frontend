import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { LinkButtonAnimated } from "~/components/styled/Button";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";

import { Meta } from "~/components/tools/map/Styled";
import ToolHeader from "~/components/tools/shared/Header";
import {
  SimbaWrapper,
  BoxHighlight,
  Blurb,
} from "~/components/tools/simba/Styled";
import useLanguage from "~/hooks/useLanguage";

const Index = ({ tool }: { tool: PiAiTool }) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "simba");
  const { strings, language, setLanguage } = useLanguage("simba"); // Use language hook

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
      <ToolHeader
        tool={tool}
        language={language}
        setLanguage={setLanguage}
        strings={strings?.header}
      ></ToolHeader>

      {/* =================== GRID =================== */}
      <Grid>
        {/* ------------------- Download ------------------- */}
        {strings?.extension?.download &&
          strings?.extension?.download.map((browser: any, index: number) => (
            <BoxHighlight key={index} className={`download ${browser.slug}`}>
              <h2>{browser.title}</h2>
              <Blurb>
                <ToolSvgBackground type={browser.slug} />
                {browser.blurb}
              </Blurb>
              <LinkButtonAnimated href={browser.button?.url} target="_blank">
                {browser.button?.label}
              </LinkButtonAnimated>
            </BoxHighlight>
          ))}

        {/* ------------------- About ------------------- */}
        <Box className="about">
          <div className="title">
            <ToolSvgBackground type="lion" />
            <h2>{strings?.extension.about.title}</h2>
            <p>{strings?.extension.about.subtitle} </p>
          </div>

          <p className="copy">
          {strings?.extension.about.description} 
          
          </p>
          <p className="note">
          {strings?.extension.about.note} 
          </p>
          <ToolSvgBackground type="screenshot" className="screenshot" />
          <Meta col={1} className="subline">
          {strings?.extension.about.subline} 
          </Meta>
        </Box>

        <Box className="application">
          <div className="intro">
            <h2>{strings?.extension.application.title} </h2>
            <p>
            {strings?.extension.application.subtitle}
            </p>
          </div>
          <Blurb>
            <ToolSvgBackground type="globe" />
            <h3>{strings?.extension.application.fields.learning.title}</h3>
            <p>{strings?.extension.application.fields.learning.text}</p>
          </Blurb>
          <Blurb>
            <ToolSvgBackground type="clean" />
            <h3>{strings?.extension.application.fields.accessibility.title}</h3>
            <p>{strings?.extension.application.fields.accessibility.text}</p>
          </Blurb>
          <Blurb>
            <ToolSvgBackground type="structure" />
            <h3>{strings?.extension.application.fields.overview.title}</h3>
            <p>{strings?.extension.application.fields.overview.text}</p>
          </Blurb>
        </Box>
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

// Grid and subgrid layouts
// =================================================
const Grid = styled.div`
  display: grid;
  gap: var(--size-3);
  grid-template-areas:
    "about"
    "ff"
    "chrome"
    "application";

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "about about ff"
      " about about chrome"
      " about about blank"
      "application application application";
  }

  & .download {
    a {
      align-self: start;
      margin-left: 0;

      &:hover {
        margin-left: -0.3em;
      }
    }

    &.firefox {
      grid-area: ff;
    }

    &.chrome {
      grid-area: chrome;
    }
  }

  & .about {
    grid-area: about;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "copy"
      "note"
      "screenshot"
      "subline";

    align-items: center;

    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "title title"
        "copy screenshot"
        "note screenshot"
        "subline subline";
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      grid-template-columns: 1fr 2fr;
      grid-template-areas:
        "title title"
        "copy screenshot"
        "note screenshot"
        "subline subline";
    }

    ${({ theme }) => theme.breakpoints.screen} {
      grid-template-columns: 1fr 3fr;
      grid-template-areas:
        "title title"
        "copy screenshot"
        "subline screenshot";
    }

    .svg {
      min-height: 50px;
      // width: 100%;
      // max-width: 270px;
    }

    .title {
      grid-area: title;
      // display the icon to the left and title and p next to it underneath each other
      // the icon spans the full height of the grid
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: 4em auto;
      align-items: center;

      // Icon spanning both rows
      .svg {
        grid-row: 1 / -1; //
        font-size: 3em;
        width: 1em !important;

        // on hover make .svg shake its head with a slight turn animation
        &:hover {
          animation: turn 0.5s ease-in-out;
        }
      }

      h2 {
        grid-row: 1;
        margin-bottom: 0;
      }

      p {
        grid-row: 2;
        margin-bottom: 0;
      }
    }

    .copy{
      grid-area: copy;
    }

    .note{
      grid-area: note;
    }

    .screenshot {
      grid-area: screenshot;
      min-height: calc(100vw / 1.4 - 80px);

      ${({ theme }) => theme.breakpoints.tabletLandscape} {
        min-height: 330px;
      }
    }

    .subline {
      grid-area: subline;
      font-size: 1rem;
    }
  }

  & .application {
    grid-area: application;

    display: grid;
    grid-template-areas: unset;
    grid-template-columns: auto;
    gap: var(--size-4);

    ${({ theme }) => theme.breakpoints.tablet} {
      grid-template-areas: unset;
      grid-template-columns: repeat(3, 1fr);
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      grid-template-areas: unset;
      grid-template-columns: 2fr repeat(3, 2fr);
    }

    & .intro {
      grid-column: span 1;
      margin-right: var(--size-3);

      ${({ theme }) => theme.breakpoints.tablet} {
        grid-column: span 3;
      }

      ${({ theme }) => theme.breakpoints.desktop} {
        grid-column: unset;
      }

      p {
        margin-bottom: 0;
      }
    }

    & > div {
      align-self: end;
    }
  }
`;

// Repeating elements
// =================================================
