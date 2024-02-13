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
import { Button, LinkButtonAnimated } from "~/components/styled/Button";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";
import {
  useCssVarsStateIsDesktopAndUpState,
  useCssVarsStateIsTabletAndUpState,
} from "~/components/state/CssVarsState";
import { ButtonNormalized } from "~/components/styled/Button";
import { input } from "~/components/tools/simba/simbaInput";
import { preGeneratedText } from "~/components/tools/simba/simbaInput";

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

  // .hightlight {
  //   background: ${({ theme }) => theme.color("piaiSimba", 0.8)};
  //   text-shadow: 0px 1px 3px black;
  // }
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

  // ${({ theme }) => theme.breakpoints.tablet} {
  //   grid-template-areas:
  //     "gpu other other other"
  //     "script script stats1 stats1 stats1"
  //     "script script stats2 stats2 stats2";
  // }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-areas:
      "about about ff"
      " about about chrome"
      " about about blank"
      "test test test";
  }

  // ${({ theme }) => theme.breakpoints.desktop} {
  //   grid-template-areas:
  //     "gpu other other other other"
  //     "script script stats1 stats1 stats1"
  //     "script script stats2 stats2 stats2";
  // }

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
        "subline subline";
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      grid-template-columns: 1fr 2fr;
      grid-template-areas:
        "title title"
        "copy screenshot"
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

    .title{
      grid-area: title;
      background-position: left center !important;
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

const narrow = css`
  font-size: 14px;
  font-family: var(--font-family-narrow);
  line-height: 18px;
`;

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

// Meta columns with icon and narrow text
const Meta = styled.ul<{ col: number }>`
  // ul, li reset
  padding: 0;
  margin: 0;
  & li {
    margin: 0;
    padding: 0;
  }

  display: grid;
  gap: var(--size-1);
  grid-template-columns: repeat(${({ col }) => (col > 2 ? 2 : 1)}, 1fr);

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(${({ col }) => col}, 1fr);
  }

  ${narrow}
  letter-spacing: 0.02em;

  .svg {
    min-height: 0.8em !important;
    min-width: 0.8em !important;
    max-height: 0.8em;
    max-width: 0.8em;
    align-self: center;
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

  button,
  li {
    max-height: 1.5em;
    margin-top: 13px;
    font-size: calc(var(--text-body-font-size-tool) * 0.85);
    line-height: 1em;
  }
`;

const BoxHighlight = styled(Box)`
  background: ${({ theme }) => theme.colors.piaiSimba};
`;

const Input = styled.div`
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

const Placeholder = styled.p`
  color: var(--color-piai-simba);
  position: relative;
  animation: loading 4s ease-in-out infinite;
  transform-origin: left bottom;
  padding-bottom: 0.3em;

  &:after {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    display: block;
    top: 100%;

    animation: loadingBar 2s linear infinite alternate;
    background: linear-gradient(
      90deg,
      transparent 25%,
      var(--color-piai-simba) 50%,
      transparent 75%
    );
    background-size: 200% 100%;
    background-position: 0%;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(0.995);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes loadingBar {
    0% {
      opacity: 0.6;
      background-position: 0%;
    }
    100% {
      opacity: 1;
      background-position: 100%;
    }
  }
`;

// END STYLES
// =================================================

const getSummary = async (input: string) => {
  const regex = /(<([^>]+)>)/gi;
  const strippedText = input.replace(regex, " ");
  const data = { text: strippedText, browser_id: "piai-simba_demo" };
  console.log("data to be sent to API: ", data)

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_SIMBA_API as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const responseData = await response.json();
      console.log("API:", responseData);
      return responseData;
    } else {
      console.error("API Error:", response.status, response.statusText);
      throw new Error("API Error");
    }
  } catch (error) {
    console.error("Fetch Error:", error);
    throw error;
  }
};

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
  const [customText, setCustomText] = useState(''); // State to store textarea value

  let examples = [
    "Newspaper article",
    "Wikipedia page",
    "App description",
    "Custom text",
  ];

  const renderInput = () => {
    if (currentExample === "Custom text") {
      return (
        <textarea
          placeholder="Type text to be highlighted"
          onBlur={handleCustomTextBlur}
          value={customText}
          onChange={(event) => setCustomText(event.target.value)} // Update customText state
        />
      );
    } else {
      // Render the other input options based on currentExample
      return (
        <div
          dangerouslySetInnerHTML={{
            __html: input.filter((e) => e.example === currentExample)[0].text,
          }}
        />
      );
    }
  };

  const renderOutput = () =>
    loading ? (
      <Placeholder
        dangerouslySetInnerHTML={{
          __html: currentOutput,
        }}
      />
    ) : (
      <p
        dangerouslySetInnerHTML={{
          __html: currentOutput,
        }}
      />
    );

  useEffect(() => {
    setLoading(false);
    if (currentExample !== "Custom text") {
      setLoading(true);
      setCurrentOutput(`Generating the summary for a ${currentExample.toLowerCase()}…`);

      // getSummary(input.filter((e) => e.example === currentExample)[0].text)
      //   .then((result) => {
      //     setCurrentOutput(result.output);
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //     setCurrentOutput("Summary can't be generated. We're aplogising for potentially buggy behaviour. Contact us, if this error persists.");
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });

      setCurrentOutput(preGeneratedText.filter((e) => e.example === currentExample)[0].text)
      setLoading(false);
    } else {
      setCurrentOutput(
        "Insert the text on the left that you want to be summarised."
      );
    }
  }, [currentExample]);

  const handleCustomTextBlur = async () => {
    if (customText.trim() === "") {
      console.log("Textarea is empty…")
      setCurrentOutput(
        "Insert the text on the left that you want to be summarised."
      );
    } else {
      console.log("Textarea is not empty…")
      setLoading(true);
      setCurrentOutput("Generating the summary for your custom text…");

      try {
        const result = await getSummary(customText);
        setCurrentOutput(result.output);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

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
          The Simba Text Assistant is a browser plug-in that produces summaries of German-language text on web pages.
          </p>
        </div>
        {isDesktopAndUp && (
          <>
            <Icon
              type="info"
              className="textLink"
              spaceBefore
              url="/tool/simba/about"
              aria-label="About this tool"
            >
              <span>About</span>
            </Icon>
            <Icon
              type="repo"
              className="textLink"
              aria-label="Go to github repository"
              url="https://github.com/fhewett/simba"
            >
              <span>GitHub</span>
            </Icon>
          </>
        )}
      </Header>

      {/* =================== GRID =================== */}
      <Grid>
        <BoxHighlight className="download firefox">
          <h2>Download plugin</h2>
          <Blurb>
            <ToolSvgBackground type="firefox" />
            Download Simba as a browser add-on for Firefox and start summarising webpages. 
          </Blurb>
          
          <LinkButtonAnimated href="https://addons.mozilla.org/en-US/firefox/addon/simba-text-assistant/" target="_blank">Install Firefox Add-on</LinkButtonAnimated>
          <Blurb>
            <ToolSvgBackground type="chrome" />
            Download Simba as a browser extension from the Chrome web store and start summarising webpages. 
          </Blurb>
          <LinkButtonAnimated href="https://github.com/fhewett/simba/tree/main/highlighter-plugin-chrome" target="_blank">Install Chrome Extension</LinkButtonAnimated>
          <p>Let us know what you think and help us improve Simba.</p>
        </BoxHighlight>

        {/* ------------------- About ------------------- */}
        <Box className="about">
          <ToolSvgBackground type="simba" className="title" />
          <p className="copy">
          The Simba Text Assistant is a browser plug-in that produces summaries of German-language text on web pages. It is designed to additionally simplify the summaries, by shortening the sentences and providing explanations for words. We have also integrated the Hurraki dictionary; a Wiki-based dictionary with entries in Leichte Sprache (Easy German Language). You can choose to highlight words found in the dictionary and in the online text, and be shown their definition in Easy Language.


          </p>
          <ToolSvgBackground type="screenshot" className="screenshot" />
          <Meta col={1} className="subline">
          We trained and evaluated the model that provides these simplifications with news articles; that is why it works better for these types of web content. The plug-in also offers the opportunity to submit your feedback on the summary that Simba produces.

          </Meta>
        </Box>

        {/* ------------------- Test ------------------- */}
        <Box className="test">
          <div className="intro">
            <h2>Try it out yourself</h2>
            <Meta col={1}>
            See for yourself how the model behind Simba works by selecting one of the input sources or by entering your text (coming soon!)
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
          <Input className="input">
            <h3>Input</h3>
            {renderInput()}
          </Input>
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
