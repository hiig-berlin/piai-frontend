import { ReactElement} from "react";
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
import SimbaHeader from "~/components/tools/simba/header";
import { SimbaWrapper, BoxHighlight, Blurb } from "~/components/tools/simba/Styled";

const Index = ({
  tool,
}: {
  tool: PiAiTool;
}) => {


  const currentTool = appConfig.tools?.find((t) => t.slug === "simba");

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
      <SimbaHeader tool={tool}></SimbaHeader>

      {/* =================== GRID =================== */}
      <Grid>
        <BoxHighlight className="download firefox">
          <h2>Download Firefox Add-on</h2>
          <Blurb>
            <ToolSvgBackground type="firefox" />
            Download Simba as a browser add-on for Firefox and start summarising
            webpages as you browse.
          </Blurb>

          <LinkButtonAnimated
            href="https://addons.mozilla.org/en-US/firefox/addon/simba-text-assistant/"
            target="_blank"
          >
            Install Firefox Add-on
          </LinkButtonAnimated>
        </BoxHighlight>
        <BoxHighlight className="download chrome">
          <h2>Download Chrome extension</h2>
          <Blurb>
            {" "}
            <ToolSvgBackground type="chrome" />
            Download Simba as a browser extension from the Chrome web store and
            start summarising webpagesx.
          </Blurb>
          <LinkButtonAnimated
            href="https://chromewebstore.google.com/detail/simba-text-assistant/lllfbelghpclobblmackbkheabbhfdhf"
            target="_blank"
          >
            Install Chrome Extension
          </LinkButtonAnimated>
        </BoxHighlight>

        {/* ------------------- About ------------------- */}
        <Box className="about">
          <div className="title">
            <ToolSvgBackground type="lion" />
            <h2>Simba browser extension</h2>
            <p>
              Get summaries of German-language text on web pages as you browse
            </p>
          </div>

          <p className="copy">
            The Simba Text Assistant is a browser extension that produces
            summaries of German-language text on web pages. It is designed to
            additionally simplify the summaries, by shortening the sentences and
            providing explanations for words.
          </p>
          <ToolSvgBackground type="screenshot" className="screenshot" />
          <Meta col={1} className="subline">
            We trained and evaluated the model that provides these
            simplifications with news articles; that is why it works better for
            these types of web content. The browser extension also offers the
            opportunity to submit your feedback on the summary that Simba
            produces.
          </Meta>
        </Box>

        <Box className="application">
          <div className="intro">
            <h2>What to use it for</h2>
            <p>
              The Simba Browser Extension can be used on a variety of webpages
              in both Firefox and Chrome browsers.
            </p>
          </div>
          <Blurb>
            <ToolSvgBackground type="globe" />
            <h3>Learning German</h3>
            <p>Improve your language skills by simplifying online content.</p>
          </Blurb>
          <Blurb>
            <ToolSvgBackground type="clean" />
            <h3>Creating accessible content</h3>
            <p>Get suggestions for simplifying your online content.</p>
          </Blurb>
          <Blurb>
            <ToolSvgBackground type="structure" />
            <h3>Getting quick overviews</h3>
            <p>Read succinct overviews of longer, complex webpages.</p>
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
      "screenshot"
      "subline";

    align-items: center;

    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "title title"
        "copy screenshot"
        "subline screenshot";
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      grid-template-columns: 1fr 2fr;
      grid-template-areas:
        "title title"
        "copy screenshot"
        "subline screenshot";
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
      }

      p {
        grid-row: 2;
      }
    }

    .copy {
      grid-area: copy;
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

      p{
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
