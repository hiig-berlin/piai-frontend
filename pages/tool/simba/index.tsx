import { ReactElement, useState, useEffect } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import { LabElement } from "~/components/ui/LabElement";
import { Icon } from "~/components/tools/shared/ui/Icon";
import styled, { css } from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { LinkButtonAnimated } from "~/components/styled/Button";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";
import {
  useCssVarsStateIsDesktopAndUpState,
  useCssVarsStateIsTabletAndUpState,
} from "~/components/state/CssVarsState";
import { ButtonNormalized } from "~/components/styled/Button";
import { input } from "~/components/tools/simba/simbaInput";
import { preGeneratedText } from "~/components/tools/simba/simbaInput";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { narrow, Meta } from "~/components/tools/map/Styled";
import Simplifier from "~/components/tools/simba/simplifier";
import { findLastIndex } from "lodash";

const Index = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();

  const currentTool = appConfig.tools?.find((t) => t.slug === "simba");

  const [currentExample, setCurrentExample] = useState("Newspaper article"); // Current selected Tag
  const [currentOutput, setCurrentOutput] = useState("");
  const [loading, setLoading] = useState(false); // True while loading summary
  const [customText, setCustomText] = useState(""); // State to store textarea value

  let examples = ["Newspaper article", "Wikipedia page", "App description"];

  const renderInput = () => {
    return (
      <SafeHtmlDiv
        html={input.filter((e) => e.example === currentExample)[0].text}
      />
    );
  };

  const renderOutput = () => <SafeHtmlDiv html={currentOutput} />;

  useEffect(() => {
    setLoading(true);
    setCurrentOutput(
      `Generating the summary for a ${currentExample.toLowerCase()}…`
    );
    setCurrentOutput(
      preGeneratedText.filter((e) => e.example === currentExample)[0].text
    );
    setLoading(false);
  }, [currentExample]);

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
      <Header>
        {isTabletAndUp && (
          <LabElement
            shortHandle={tool.iconShort}
            longText={tool.iconLong}
            color="white"
            hoverColor={tool.colorBase}
            size={2}
          />
        )}
        <div>
          <h1>Simba Text assistant</h1>
          <p>
            The Simba Text Assistant is a browser extension and application that
            produces summaries of German-language texts.
          </p>
        </div>
        {isDesktopAndUp && (
          <ul>
            <Icon
              type="info"
              className="textLink"
              stc={false}
              spaceBefore
              url="/tool/simba/about"
              aria-label="About this tool"
            >
              <span>About</span>
            </Icon>
            <Icon
              type="info"
              className="textLink"
              aria-label="Read privacy policy"
              url="https://github.com/fhewett/simba/blob/main/PRIVACY.md"
            >
              <span>Privacy</span>
            </Icon>
            <Icon
              type="repo"
              className="textLink"
              aria-label="Go to github repository"
              url="https://github.com/fhewett/simba"
            >
              <span>GitHub</span>
            </Icon>
          </ul>
        )}
      </Header>

      <Simplifier />

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
            <Meta col={1}>
              The Simba Text Assistant is a browser extension that produces
              summaries of German-language text on web pages
            </Meta>
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

        {/* ------------------- Test ------------------- */}
        <Box className="test">
          <div className="intro">
            <h2>Explore some examples</h2>
            <Meta col={1}>
              See for yourself how the model behind Simba works by selecting one
              of the input sources.
            </Meta>
          </div>
          <div className="filter">
            <h3>Pick an example</h3>
            <Tags>
              {examples.map((example: any, j: number) => {
                const isActive = currentExample === example;
                return (
                  <Tag
                    onClick={() => {
                      if (!isActive) setCurrentExample(example);
                    }}
                    key={`tag-filter-${j}`}
                    isActive={isActive}
                  >
                    {example}
                  </Tag>
                );
              })}
            </Tags>
          </div>
          <InputStyling className="input">
            <h3>Input</h3>
            {renderInput()}
          </InputStyling>
          <div className="output">
            <h3>Output</h3>
            {renderOutput()}
          </div>
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

// Wrapper + General tool styles
// =================================================

const SimbaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);

  h1,
  h2,
  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")};
  }

  h1 {
    line-height: 1em;
  }

  h2 {
    font-size: var(--text-body-font-size-tool) * 1.1;
    font-weight: bold;
    margin-top: 0 !important;
  }

  h3 {
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    // margin: var(--size-4) 0 calc(0px - var(--size-3));
  }

  ul li::marker {
    content: "— ";
    position: absolute;
  }

  textarea {
    background: transparent;
    boder: 1px solid white;
    color: white;
    font-size: 0.8em;
    padding: var(--size-2);
    border-radius: var(--size-1);
    height: fit-content;
    min-height: 10em;
    width: 100%;
  }
`;

// Grid and subgrid layouts
// =================================================
const Grid = styled.div`
  display: grid;
  gap: var(--size-3);
  grid-template-areas:
    "about"
    "ff"
    "chrome"
    "test";


  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "about about ff"
      " about about chrome"
      " about about blank"
      "test test test";
  }



  & .download{
    a{
      align-self: start;
      margin-left: 0;

      &:hover{
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

    .copy{
      grid-area: copy;
    }

    .screenshot {
      grid-area: screenshot;
      min-height: calc(100vw / 1.4 - 80px);

      ${({ theme }) => theme.breakpoints.tabletLandscape} {
        min-height: 330px;
      }
    }

    .subline{
      grid-area: subline;
    }
  }

  & .test {
    grid-area: test;
    display: grid;
    gap: var(--size-4);
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "filter"
      "input"
      "output"
      "footnote";

    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "title title"
        "filter filter"
        "input output"
        "footnote footnote";
      }
    }
  }
    .intro  { grid-area: title;   }
    .input  { grid-area: input    }
    .output { 
      grid-area: output;
      font-family: var(--font-family-monospace);
      font-size: 0.9em;
    }

    .footnote  { grid-area: footnote;   }

  }
`;

// Repeating elements
// =================================================

// Bigger icon with text on the side
const Blurb = styled.div`
  display: grid;
  color: #fff;
  height: fit-content;
  align-self: flex-start;
  justify-content: flex-start;

  ${narrow}

  grid-template-areas:
    "icon ."
    "icon .";

  .svg {
    grid-area: icon;
    min-height: 3em;
    min-width: 3em;
    max-width: 3em;
    flex: 1em 0 0;
    margin-right: var(--size-3);

    ${({ theme }) => theme.breakpoints.tablet} {
      margin-right: var(--size-2);
    }
  }

  p,
  h3 {
    margin-bottom: 3px;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--size-2);

  &.filter {
    justify-content: start;
  }
`;

const Tag = styled(ButtonNormalized)<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: 3px var(--size-1);
  gap: var(--size-1);
  max-width: 100%;

  ${narrow}

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.color("piai-simba", 0.4) : "transparent"};
  color: var(--color-piai-simba);
  border: 1px solid var(--color-piai-simba);
  border-radius: 4px;
  cursor: ${({ isActive, theme }) => (isActive ? "inherit" : "pointer")};

  & .svg {
    filter: invert(58%) sepia(83%) saturate(375%) hue-rotate(131deg)
      brightness(111%) contrast(101%);
    max-width: 10px;
  }
`;

// Individual elements
// =================================================

const Header = styled.header`
  display: flex;
  flex-direction: row;
  gap: var(--size-3);

  margin-top: 100px;

  ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: unset;
    margin-right: 100px;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 0;
    line-height: 1.1em;
  }

  p {
    ${narrow}
    margin-bottom: 0;
    margin-top: var(--size-1);
  }

  ul {
    display: flex;
    margin-left: auto;
    padding-top: 15px;
    gap: var(--size-3);

    li:nth-child(2) {
      .svg {
        display: none !important;
      }
    }
  }

  li {
    max-height: 1em;
    font-size: calc(var(--text-body-font-size-tool) * 0.85);
    line-height: 1em;
  }
`;

const BoxHighlight = styled(Box)`
  background: ${({ theme }) => theme.colors.piaiSimba};
`;

const InputStyling = styled.div`
  p{
    h1,
  h2,
  h3 {
    text-transform: none;
    font-weight: bold;
    margin: 2em 0 1em;
    
    &:first-child{
      margin-top: 0;
    }
  }
`;

// END STYLES
// =================================================
