import { ReactElement, useState } from "react";
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
import { Button } from "~/components/styled/Button";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";
import {
  useCssVarsStateIsDesktopAndUpState,
  useCssVarsStateIsTabletAndUpState,
} from "~/components/state/CssVarsState";
import { ButtonNormalized } from "~/components/styled/Button";
import { highlightedText } from "~/components/tools/simba/highlightedText";
import { AnyMxRecord } from "dns";

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
    margin-bottom: calc(0px - var(--size-2));
  }

  ul li::marker {
    content: "— ";
    position: absolute;
  }
`;

// Grid and subgrid layouts
// =================================================
const Grid = styled.div`
  display: grid;
  gap: var(--size-3);
  // align-content: space-between;
  // grid-template-rows: auto;
  grid-template-areas:
    "about"
    "test"
    "ff"
    "chrome";

  // ${({ theme }) => theme.breakpoints.tablet} {
  //   grid-template-areas:
  //     "gpu other other other"
  //     "script script stats1 stats1 stats1"
  //     "script script stats2 stats2 stats2";
  // }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
      "about about test test"
      "ff chrome test test"
      "blank blank test test";
  }

  // ${({ theme }) => theme.breakpoints.desktop} {
  //   grid-template-areas:
  //     "gpu other other other other"
  //     "script script stats1 stats1 stats1"
  //     "script script stats2 stats2 stats2";
  // }

  & .download.firefox {
    grid-area: ff;
  }

  & .download.chrome {
    grid-area: chrome;
  }

  & .about {
    grid-area: about;

    .svg {
      min-height: 50px;
      max-width: 270px;
    }

    .screenshot {
      min-height: 330px;
    }
  }

  & .test {
    grid-area: test;

    textarea {
      background: transparent;
      boder: 1px solid white;
      color: white;
      font-size: 0.8em;
      padding: var(--size-2);
      border-radius: var(--size-1);
      height: fit-content;
    }

    .hightlight{
      background: ${({ theme }) => theme.color("piaiSimba", 0.8)};
      text-shadow: 0px 1px 3px black;
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

// END STYLES
// =================================================

// onKeyUp={(e) => adjustHeight(e)}

// const adjustHeight = ({ el }: { el: any }) => {
//   el.style.height =
//     el.scrollHeight > el.clientHeight ? el.scrollHeight + "px" : "60px";
// };

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

  const [currentExample, setCurrentExample] = useState("Newspaper article");
  let examples = [
    "Newspaper article",
    "Wikipedia page",
    "Suggestion 3",
    "Custom text",
  ];
  let exampleText: any;
  if (currentExample === "Custom text") {
    exampleText = (
      <textarea
        placeholder="Type text to be highlighted"
      ></textarea>
    );
  } else {
    exampleText = (
      <p
        dangerouslySetInnerHTML={{
          __html: highlightedText.filter((e) => e.example === currentExample)[0]
            .text,
        }}
      />
    );
  }

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
              url="https://github.com/hiig-berlin/energy-log"
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
        </BoxHighlight>
        <BoxHighlight className="download chrome">
          <h2>Downnload plugin</h2>
          <Blurb>
            <ToolSvgBackground type="chrome" />
            Graphics Processing Units (GPU) speed up machine learning. For
            training and inference the GPU energy usage often surpasses that of
            the CPU.
          </Blurb>
        </BoxHighlight>

        {/* ------------------- About ------------------- */}
        <Box className="about">
          <ToolSvgBackground type="simba" />
          <p>
            The script is based on python and runs as cron background tab on the
            server that executes your AI training. Your GPU power values are
            stored in regular intervals into a .csv log file.
          </p>
          <ToolSvgBackground type="screenshot" className="screenshot" />
          <Meta col={1}>
            See for yourself how the highlighting (extractive summary) works by
            selecting on oft the input sources or by entering your text
            paragraph.
          </Meta>
        </Box>

        {/* ------------------- Test ------------------- */}
        <Box className="test">
          <h2>Try it out yourself</h2>
          <Meta col={1}>
            See for yourself how the highlighting (extractive summary) works by
            selecting on oft the input sources or by entering your text
            paragraph.
          </Meta>

          <h3>Pick an example</h3>
          <Tags className="filter">
            {examples.map((example: any, j: number) => {
              const isActive = currentExample === example;
              return (
                <Tag
                  onClick={() =>
                    isActive
                      ? setCurrentExample("")
                      : setCurrentExample(example)
                  }
                  key={`tag-filter-${j}`}
                  isActive={isActive}
                >
                  {example}
                </Tag>
              );
            })}
          </Tags>
          {exampleText}
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
