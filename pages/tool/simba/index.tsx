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
import { AnyMxRecord } from "dns";
import { Any } from "@react-spring/types";

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
      "image"
      "subline";
  

    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      grid-template-columns: 1fr 2fr;
      grid-template-areas:
        "title title"
        "copy screenshot"
        "subline screenshot";
      }
      align-items: center;
    }

    .svg {
      min-height: 50px;
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
      min-height: 330px;
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
      "output";

    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "title title"
        "filter filter"
        "input output";
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

  .svg {
    min-height: 0.8em !important;
    min-width: 0.8em !important;
    max-height: 0.8em;
    max-width: 0.8em;
    align-self: center;
  }

  &.scribble .svg {
    min-height: 2.5em !important;
    min-width: 2.5em !important;
    max-height: 2.5em;
    max-width: 2.5em;
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

// onKeyUp={(e) => adjustHeight(e)}

// const adjustHeight = ({ el }: { el: any }) => {
//   el.style.height =
//     el.scrollHeight > el.clientHeight ? el.scrollHeight + "px" : "60px";
// };

const getSummary = async (input: string) => {
  const data = { text: input, browser_id: "piai-simba_demo" };

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
    "Suggestion 3",
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
        <p
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

      getSummary(input.filter((e) => e.example === currentExample)[0].text)
        .then((result) => {
          setCurrentOutput(result.output);
        })
        .catch((error) => {
          console.error("Error:", error);
          setCurrentOutput("Summary can't be generated. We're aplogising for potentially buggy behaviour. Contact us, if this error persists.");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setCurrentOutput(
        "Insert the text on the left, that you want to be summarised."
      );
    }
  }, [currentExample]);

  const handleCustomTextBlur = async () => {
    if (customText.trim() === "") {
      console.log("Textarea is empty…")
      setCurrentOutput(
        "Insert the text on the left, that you want to be summarised."
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
          <h1>Simba – Text assistant</h1>
          <p>
            Browser plugin… Metus vulputate eu scelerisque felis imperdiet. Eget
            sit amet tellus cras. Urna condimentum mattis pellentesque id.
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
          <h2>Downnload plugin</h2>
          <Blurb>
            <ToolSvgBackground type="firefox" />
            Graphics Processing Units (GPU) speed up machine learning. For
            training and inference the GPU energy usage often surpasses that of
            the CPU.
          </Blurb>
          <LinkButtonAnimated>Install Firefox Add-on</LinkButtonAnimated>
        </BoxHighlight>
        <BoxHighlight className="download chrome">
          <h2>Downnload plugin</h2>
          <Blurb>
            <ToolSvgBackground type="chrome" />
            Graphics Processing Units (GPU) speed up machine learning. For
            training and inference the GPU energy usage often surpasses that of
            the CPU.
          </Blurb>
          <LinkButtonAnimated>Install Chrome Extension</LinkButtonAnimated>
        </BoxHighlight>

        {/* ------------------- About ------------------- */}
        <Box className="about">
          <ToolSvgBackground type="simba" className="title" />
          <p className="copy">
            The script is based on python and runs as cron background tab on the
            server that executes your AI training. Your GPU power values are
            stored in regular intervals into a .csv log file.
          </p>
          <ToolSvgBackground type="screenshot" className="screenshot" />
          <Meta col={1} className="subline">
            See for yourself how the highlighting (extractive summary) works by
            selecting on oft the input sources or by entering your text
            paragraph.
          </Meta>
        </Box>

        {/* ------------------- Test ------------------- */}
        <Box className="test">
          <div className="intro">
            <h2>Try it out yourself</h2>
            <Meta col={1}>
              See for yourself how the highlighting (extractive summary) works
              by selecting on oft the input sources or by entering your text
              paragraph.
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
