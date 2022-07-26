import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import { LabElement } from "~/components/ui/LabElement";
import { Icon } from "~/components/tools/shared/ui/Icon";
import styled, {css} from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { Button } from "~/components/styled/Button";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";

// Wrapper + General tool styles
// =================================================

const EnergyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);

  h1,
  h2,
  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")};
  }

  h2 {
    font-size: var(--text-body-font-size-tool) * 1.1;
    font-weight: bold;
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

  .GPU button {
    align-self: start;
    margin: 0;
    margin-bottom: var(--size-1);
    color: ${({ theme }) => theme.colors.piaiEnergy};

    &:hover {
      margin-left: -0.3em;
    }
  }
`;

// Grid and subgrid layouts
// =================================================
const Grid = styled.div`
  display: grid;
  gap: var(--size-3);
  // align-content: space-between;

  grid-template-areas:
    "gpu"
    "other"
    "script"
    "stats1"
    "stats2";

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-areas:
      "gpu other other other"
      "script script stats1 stats1 stats1"
      "script script stats2 stats2 stats2";
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-areas:
      "gpu other other other"
      "script script stats1 stats1 "
      "script script stats2 stats2";
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-areas:
      "gpu other other other other"
      "script script stats1 stats1 stats1"
      "script script stats2 stats2 stats2";
  }

  & .sources.GPU {
    grid-area: gpu;
  }

  & .sources.other {
    grid-area: other;
  }

  & .GPU.script {
    grid-area: script;
    align-self: flex-start;
  }

  & .GPU.statistic.energy {
    grid-area: stats1;
  }

  & .GPU.statistic.co2 {
    grid-area: stats2;
  }

  & .otherSources {
    grid-template-areas: unset;
    grid-template-columns: auto;

    ${({ theme }) => theme.breakpoints.tablet} {
      grid-template-areas: unset;
      grid-template-columns: repeat(3, 1fr);
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      grid-template-areas: unset;
      grid-template-columns: 3fr repeat(3, 2fr);
    }

    & .intro {
      grid-column: span 1;

      ${({ theme }) => theme.breakpoints.tablet} {
        grid-column: span 3;
      }

      ${({ theme }) => theme.breakpoints.desktop} {
        grid-column: unset;
      }
    }
  }
`;

// Repeating elements
// =================================================

const narrow = css`
  font-size: 14px;
  font-family: var(--font-family-narrow);
`

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
// TODO: Aufräumen
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

  font-size: 14px;
  font-family: var(--font-family-narrow);

  .svg {
    min-height: 0.8em !important;
    min-width: 0.8em !important;
    max-height: 0.8em;
    max-width: 0.8em;
    align-self: center;
  }
`;

const Caption = styled.div`
  font-size: 14px;
  font-family: var(--font-family-narrow);
`


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
    line-hight: 1.1em;
  }

  & p{
    ${narrow}
  }

  button {
    max-height: 1.5em;
    margin-top: 13px;

    // ${({ theme }) => theme.applyMixin("uppercase")};
    // fontFamily: var(--fontFamily-sans-serif);
    // font-weight: bold;
  }
`;

const BoxHighlight = styled(Box)`
  background: ${({ theme }) => theme.colors.piaiEnergy};
`;



// END STYLES
// =================================================

const Index = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const {
    vars: { isDesktopAndUp, isTabletAndUp },
  } = useCssVarsContext();

  return (
    <EnergyWrapper>
      {/*
        TODO: Set correct values ... 
        <NextHeadSeo
          canonical={currentPage?.yoast_head_json?.canonical}
          title={currentPage?.yoast_head_json?.title ?? currentPage?.title}
          description={currentPage?.yoast_head_json?.description}
          og={{
            title: currentPage?.yoast_head_json?.og_title,
            type: currentPage?.yoast_head_json?.og_type,
            siteName: currentPage?.yoast_head_json?.og_site_name,
            image: currentPage?.yoast_head_json?.twitter_image,
          }}
          twitter={{
            card: "summary_large_image",
          }}
      />*/}

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
          <h1>
            How many cows is your AI training’s CO<sub>2</sub> production worth?
          </h1>
          <p>
            Metus vulputate eu scelerisque felis imperdiet. Eget sit amet tellus
            cras. Urna condimentum mattis pellentesque id.
          </p>
        </div>
        {isDesktopAndUp && (
          <Icon type="repo" className="textLink" spaceBefore aria-label="Go to github repository">
            GitHub Repository
          </Icon>
        )}
      </Header>

      <Grid>
        <BoxHighlight className="sources GPU">
          <h2>GPU energy usage</h2>
          <Blurb>
            <ToolSvgBackground type="GPU" />
            Metus vulputate eu scelerisque felis imperdiet. Eget sit amet tellus
            cras.
          </Blurb>
        </BoxHighlight>
        <Box className="sources other">
          <h2>Other energy consumers</h2>
          <Grid className="otherSources">
            <Blurb className="intro">
              Urna condimentum mattis pellentesque id. Metus vulputate eu
              scelerisque felis imperdiet. Eget sit amet tellus cras. Urna
              condimentum mattis pellentesque id.
            </Blurb>
            <Blurb>
              <ToolSvgBackground type="hardware" />
              <h3>Hardware procution</h3>
              <p>Metus vulputate eu scelerisque felis imperdiet.</p>
            </Blurb>
            <Blurb>
              <ToolSvgBackground type="CPU" />
              <h3>CPU usage</h3>
              <p>Urna condimentum mattis pellentesque id.</p>
            </Blurb>
            <Blurb>
              <ToolSvgBackground type="fan" />
              <h3>Cooling</h3>
              <p>Eget sit amet tellus cras., lorem dolor met.</p>
            </Blurb>
          </Grid>
        </Box>
        <Box className="GPU script">
          <h2>Download and run script</h2>
          <h3>Hardware requirements</h3>
          <ul>
            <li>Pyhton</li>
            <li>nVideo GPU</li>
            <li>nVideo Toolkit</li>
          </ul>
          <h3>Funtionality and installation</h3>
          <p>
            The script is based on python and runs as cron background tab on the
            server that executes your AI training. Your GPU power values are
            stored in regular intervals into a .csv log file.
          </p>
          <p>
            Please find the script and all technical instructions on its GitHub
            repository.
          </p>
          <Button>Download script from Github</Button>
          <h3>How to read the log file</h3>
          <p>
            We advice you to keep track of approximate start and end dates and
            times of your AI trainings. This way you can extract the relevant
            numbers from the logged file (.cvs), calculate its energy
            consumption and evaluate it in comparison to other consumption
            sources as seen in the adjacent visualisation.
          </p>
        </Box>
        <Box className="GPU statistic energy">
          <h2>Energy consumption relation</h2>
          <Meta col={1}>
            Metus vulputate eu scelerisque felis imperdiet. Eget sit amet tellus
            cras. Urna condimentum mattis pellentesque id.
          </Meta>
          <Chart1 />
          <h3>Explanations</h3>
          <Meta col={2}>
            <Icon stc type="washing">
              Washing machine: Regular eco cotton programme | AA+ energy class
            </Icon>
            <Icon stc type="washing">
              Washing machine: Regular eco cotton programme | AA+ energy class
            </Icon>
          </Meta>
        </Box>
        <Box className="GPU statistic co2">
          <h2>Energy consumption relation</h2>
          <Caption>
            Metus vulputate eu scelerisque felis imperdiet. Eget sit amet tellus
            cras. Urna condimentum mattis pellentesque id.
            
          </Caption>
          <Chart2 />
          <h3>Explanations</h3>
          <Meta col={2}>
            <Icon stc type="washing">
              Washing machine: Regular eco cotton programme | AA+ energy class
            </Icon>
            <Icon stc type="washing">
              Washing machine: Regular eco cotton programme | AA+ energy class
            </Icon>
          </Meta>
        </Box>
      </Grid>
    </EnergyWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "energy");

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

const Chart1 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 574.855 227.768"
    >
      <g id="Group_165" data-name="Group 165" transform="translate(-1213 -796)">
        <g
          id="Group_163"
          data-name="Group 163"
          transform="translate(366.021 -15.904)"
        >
          <path
            id="Line_38"
            data-name="Line 38"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 996.959)"
            fill="#707070"
          />
          <path
            id="Line_39"
            data-name="Line 39"
            d="M503.335,1.5H0v-3H503.335Z"
            transform="translate(918.5 952.188)"
            fill="#1cadad"
          />
          <path
            id="Line_40"
            data-name="Line 40"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 907.416)"
            fill="#707070"
          />
          <path
            id="Line_43"
            data-name="Line 43"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 974.416)"
            fill="#707070"
            opacity="0.5"
          />
          <path
            id="Line_44"
            data-name="Line 44"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 929.416)"
            fill="#707070"
            opacity="0.5"
          />
          <path
            id="Line_45"
            data-name="Line 45"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 885.188)"
            fill="#707070"
            opacity="0.5"
          />
          <path
            id="Line_46"
            data-name="Line 46"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 846.303)"
            fill="#707070"
            opacity="0.5"
          />
          <path
            id="Line_41"
            data-name="Line 41"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 825.436)"
            fill="#707070"
          />
          <path
            id="Line_42"
            data-name="Line 42"
            d="M503.335,1.5H0v-3H503.335Z"
            transform="translate(918.5 866.328)"
            fill="#1cadad"
          />
          <rect
            id="Rectangle_68"
            data-name="Rectangle 68"
            width="45"
            height="89"
            transform="translate(956.979 908.973)"
            fill="#e4e4e4"
          />
          <path
            id="Rectangle_68_-_Outline"
            data-name="Rectangle 68 - Outline"
            d="M1,1V88H44V1H1M0,0H45V89H0Z"
            transform="translate(956.979 908.973)"
            fill="#707070"
          />
          <rect
            id="Rectangle_67"
            data-name="Rectangle 67"
            width="45"
            height="137.113"
            transform="translate(1047.98 860.859)"
            fill="#e4e4e4"
          />
          <path
            id="Rectangle_67_-_Outline"
            data-name="Rectangle 67 - Outline"
            d="M1,1V136.113H44V1H1M0,0H45V137.113H0Z"
            transform="translate(1047.98 860.859)"
            fill="#707070"
          />
          <rect
            id="Rectangle_65"
            data-name="Rectangle 65"
            width="45"
            height="19"
            transform="translate(1138.98 978.973)"
            fill="#e4e4e4"
          />
          <path
            id="Rectangle_65_-_Outline"
            data-name="Rectangle 65 - Outline"
            d="M1,1V18H44V1H1M0,0H45V19H0Z"
            transform="translate(1138.98 978.973)"
            fill="#707070"
          />
          <rect
            id="Rectangle_64"
            data-name="Rectangle 64"
            width="45"
            height="54"
            transform="translate(1229.979 943.973)"
            fill="#1cadad"
          />
          <path
            id="Rectangle_64_-_Outline"
            data-name="Rectangle 64 - Outline"
            d="M1,1V53H44V1H1M0,0H45V54H0Z"
            transform="translate(1229.979 943.973)"
            fill="#707070"
          />
          <rect
            id="Rectangle_63"
            data-name="Rectangle 63"
            width="45"
            height="130.354"
            transform="translate(1319.98 867.619)"
            fill="#1cadad"
          />
          <path
            id="Rectangle_63_-_Outline"
            data-name="Rectangle 63 - Outline"
            d="M1,1V129.354H44V1H1M0,0H45V130.354H0Z"
            transform="translate(1319.98 867.619)"
            fill="#707070"
          />
        </g>
        <text
          id="_0_kWh"
          data-name="0 kWh"
          transform="translate(1229 984)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            0 kWh
          </tspan>
        </text>
        <text
          id="_200_kWh"
          data-name="200 kWh"
          transform="translate(1213 812)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            200 kWh
          </tspan>
        </text>
        <text
          id="_50_kWh"
          data-name="50 kWh"
          transform="translate(1221 941)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            50 kWh
          </tspan>
        </text>
        <text
          id="_100_kWh"
          data-name="100 kWh"
          transform="translate(1213 898)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            100 kWh
          </tspan>
        </text>
        <text
          id="_150_kWh"
          data-name="150 kWh"
          transform="translate(1213 855)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            150 kWh
          </tspan>
        </text>
        <path
          id="car"
          d="M31.477,15.524a1.125,1.125,0,0,0-.07-.217l-2.656-6.2a4.06,4.06,0,0,0-3.8-2.358H11.047a4.059,4.059,0,0,0-3.8,2.358l-2.659,6.2a1.105,1.105,0,0,0-.091.443V28.125A1.125,1.125,0,0,0,5.625,29.25h2.25A1.125,1.125,0,0,0,9,28.125V27H27v1.125a1.125,1.125,0,0,0,1.125,1.125h2.25A1.125,1.125,0,0,0,31.5,28.125V15.75a1.136,1.136,0,0,0-.022-.226ZM10.125,22.5a2.25,2.25,0,1,1,2.25-2.25A2.25,2.25,0,0,1,10.125,22.5Zm15.75,0a2.25,2.25,0,1,1,2.25-2.25A2.25,2.25,0,0,1,25.875,22.5ZM7.331,14.625l1.985-4.63A1.848,1.848,0,0,1,11.047,9H24.953a1.849,1.849,0,0,1,1.731.995l1.985,4.63Z"
          transform="translate(1419 991.476)"
          fill="#fff"
        />
        <path
          id="washing-machine"
          d="M6.585,19.165l7.243-7.243a4.933,4.933,0,0,1,1.5,3.622,4.931,4.931,0,0,1-1.5,3.621,4.937,4.937,0,0,1-3.622,1.5,4.929,4.929,0,0,1-3.622-1.5ZM17.9.25A2.413,2.413,0,0,1,19.664,1a2.419,2.419,0,0,1,.748,1.766V23.236A2.557,2.557,0,0,1,17.9,25.75H2.574A2.484,2.484,0,0,1,.748,25,2.412,2.412,0,0,1,0,23.236V2.764A2.413,2.413,0,0,1,.748,1,2.487,2.487,0,0,1,2.574.25H17.9ZM7.662,2.764a1.171,1.171,0,0,0-.9.389,1.3,1.3,0,0,0,0,1.8,1.23,1.23,0,0,0,1.8,0,1.3,1.3,0,0,0,0-1.8,1.171,1.171,0,0,0-.9-.389Zm-3.831,0a1.171,1.171,0,0,0-.9.389,1.3,1.3,0,0,0,0,1.8,1.168,1.168,0,0,0,.9.389,1.176,1.176,0,0,0,.9-.389,1.3,1.3,0,0,0,0-1.8,1.17,1.17,0,0,0-.9-.389Zm6.405,20.472a7.382,7.382,0,0,0,5.417-2.245A7.38,7.38,0,0,0,17.9,15.574a7.386,7.386,0,0,0-2.245-5.417,7.378,7.378,0,0,0-5.417-2.244,7.384,7.384,0,0,0-5.417,2.245,7.384,7.384,0,0,0-2.245,5.417,7.379,7.379,0,0,0,2.245,5.417,7.384,7.384,0,0,0,5.417,2.245Z"
          transform="translate(1334.5 994.946)"
          fill="#fff"
        />
        <g id="computer-line" transform="translate(1509.668 993.268)">
          <path
            id="Path_101"
            data-name="Path 101"
            d="M9.383,21V10.383H22.173L23.539,9H8V21H9.383Z"
            transform="translate(-0.95 -0.543)"
            fill="#fff"
          />
          <path
            id="Path_102"
            data-name="Path 102"
            d="M5.728,6.728H26.47V20.556H28.2V6.3A1.3,1.3,0,0,0,26.9,5H5.3A1.3,1.3,0,0,0,4,6.3v14.26H5.728Z"
            transform="translate(-0.407)"
            fill="#fff"
          />
          <path
            id="Path_103"
            data-name="Path 103"
            d="M1,25v2.938a2.247,2.247,0,0,0,2.247,2.247H28.085a2.247,2.247,0,0,0,2.247-2.247V25Zm27.655,2.938a.519.519,0,0,1-.519.519H3.212a.519.519,0,0,1-.519-.519V26.322h8.6a1.417,1.417,0,0,0,1.3.864h6.162a1.417,1.417,0,0,0,1.3-.864h8.608Z"
            transform="translate(0 -2.715)"
            fill="#fff"
          />
        </g>
        <g id="box" transform="translate(1609.431 1000.636)">
          <path
            id="Path_104"
            data-name="Path 104"
            d="M8.941,1.3a.546.546,0,0,0-.406,0L2.016,3.911,8.737,6.6l6.721-2.688Zm7.442,3.414-7.1,2.84v8.652l7.1-2.84V4.72ZM8.191,16.212V7.557l-7.1-2.839v8.653ZM8.129.29a1.638,1.638,0,0,1,1.217,0L17.132,3.4a.546.546,0,0,1,.343.507v9.461a1.092,1.092,0,0,1-.687,1.014L8.941,17.524a.546.546,0,0,1-.406,0L.688,14.386A1.092,1.092,0,0,1,0,13.372V3.911A.546.546,0,0,1,.343,3.4Z"
            fill="#1cadad"
            fillRule="evenodd"
          />
          <path
            id="Path_104_-_Outline"
            data-name="Path 104 - Outline"
            d="M8.738-.077a1.88,1.88,0,0,1,.7.135l7.786,3.115a.792.792,0,0,1,.5.739v9.461a1.336,1.336,0,0,1-.844,1.246L9.034,17.756a.8.8,0,0,1-.592,0L.595,14.618A1.336,1.336,0,0,1-.25,13.372V3.911a.792.792,0,0,1,.5-.739L8.036.058A1.88,1.88,0,0,1,8.738-.077Zm0,17.391a.3.3,0,0,0,.11-.021L16.7,14.153a.838.838,0,0,0,.53-.782V3.911a.3.3,0,0,0-.186-.275L9.253.522a1.394,1.394,0,0,0-1.031,0L.436,3.637a.3.3,0,0,0-.186.275v9.461a.838.838,0,0,0,.53.781l7.847,3.139A.3.3,0,0,0,8.738,17.313Zm0-16.3a.793.793,0,0,1,.3.057l7.1,2.839L8.737,6.868,1.343,3.911l7.1-2.839A.792.792,0,0,1,8.738,1.015Zm6.048,2.9L8.848,1.536a.3.3,0,0,0-.22,0L2.69,3.911,8.737,6.33Zm1.847.438V13.54l-7.6,3.04V7.389Zm-.5,8.852V5.088l-6.6,2.64v8.114ZM.842,4.349l7.6,3.039v9.193l-7.6-3.04Zm7.1,3.377-6.6-2.639V13.2l6.6,2.64Z"
            fill="#1cadad"
          />
        </g>
        <g id="box-2" data-name="box" transform="translate(1695.019 995.022)">
          <path
            id="Path_104-2"
            data-name="Path 104"
            d="M14.69,2.032a.9.9,0,0,0-.668,0L3.313,6.316l11.043,4.416L25.4,6.316Zm12.227,5.61L15.253,12.307V26.523l11.664-4.666V7.643ZM13.458,26.525V12.306L1.794,7.642V21.859Zm-.1-26.16a2.692,2.692,0,0,1,2,0L28.148,5.483a.9.9,0,0,1,.563.833V21.859a1.794,1.794,0,0,1-1.129,1.665L14.69,28.682a.9.9,0,0,1-.668,0L1.13,23.525A1.794,1.794,0,0,1,0,21.859V6.316a.9.9,0,0,1,.564-.833Z"
            transform="translate(0 0)"
            fill="#1cadad"
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  );
};

const Chart2 = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 574.855 227.768"
    >
      <g id="Group_167" data-name="Group 167" transform="translate(-1213 -796)">
        <g
          id="Group_163"
          data-name="Group 163"
          transform="translate(366.021 -15.904)"
        >
          <path
            id="Line_38"
            data-name="Line 38"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 996.959)"
            fill="#707070"
          />
          <path
            id="Line_39"
            data-name="Line 39"
            d="M503.335,1.5H0v-3H503.335Z"
            transform="translate(918.5 952.188)"
            fill="#1cadad"
          />
          <path
            id="Line_40"
            data-name="Line 40"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 907.416)"
            fill="#707070"
          />
          <path
            id="Line_43"
            data-name="Line 43"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 974.416)"
            fill="#707070"
            opacity="0.5"
          />
          <path
            id="Line_44"
            data-name="Line 44"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 929.416)"
            fill="#707070"
            opacity="0.5"
          />
          <path
            id="Line_45"
            data-name="Line 45"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 885.188)"
            fill="#707070"
            opacity="0.5"
          />
          <path
            id="Line_46"
            data-name="Line 46"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 846.303)"
            fill="#707070"
            opacity="0.5"
          />
          <path
            id="Line_41"
            data-name="Line 41"
            d="M503.335.5H0v-1H503.335Z"
            transform="translate(918.5 825.436)"
            fill="#707070"
          />
          <path
            id="Line_42"
            data-name="Line 42"
            d="M503.335,1.5H0v-3H503.335Z"
            transform="translate(918.5 866.328)"
            fill="#1cadad"
          />
          <rect
            id="Rectangle_68"
            data-name="Rectangle 68"
            width="45"
            height="65.177"
            transform="translate(957.114 932.796)"
            fill="#e4e4e4"
          />
          <path
            id="Rectangle_68_-_Outline"
            data-name="Rectangle 68 - Outline"
            d="M1,1V64.177H44V1H1M0,0H45V65.177H0Z"
            transform="translate(957.114 932.796)"
            fill="#707070"
          />
          <rect
            id="Rectangle_67"
            data-name="Rectangle 67"
            width="45"
            height="137.113"
            transform="translate(1041.114 860.859)"
            fill="#e4e4e4"
          />
          <path
            id="Rectangle_67_-_Outline"
            data-name="Rectangle 67 - Outline"
            d="M1,1V136.113H44V1H1M0,0H45V137.113H0Z"
            transform="translate(1041.114 860.859)"
            fill="#707070"
          />
          <rect
            id="Rectangle_65"
            data-name="Rectangle 65"
            width="45"
            height="19"
            transform="translate(1125.114 978.973)"
            fill="#e4e4e4"
          />
          <path
            id="Rectangle_65_-_Outline"
            data-name="Rectangle 65 - Outline"
            d="M1,1V18H44V1H1M0,0H45V19H0Z"
            transform="translate(1125.114 978.973)"
            fill="#707070"
          />
          <rect
            id="Rectangle_64"
            data-name="Rectangle 64"
            width="45"
            height="54"
            transform="translate(1210.115 943.973)"
            fill="#1cadad"
          />
          <path
            id="Rectangle_64_-_Outline"
            data-name="Rectangle 64 - Outline"
            d="M1,1V53H44V1H1M0,0H45V54H0Z"
            transform="translate(1210.115 943.973)"
            fill="#707070"
          />
          <rect
            id="Rectangle_63"
            data-name="Rectangle 63"
            width="45"
            height="130.354"
            transform="translate(1294.114 867.619)"
            fill="#1cadad"
          />
          <path
            id="Rectangle_63_-_Outline"
            data-name="Rectangle 63 - Outline"
            d="M1,1V129.354H44V1H1M0,0H45V130.354H0Z"
            transform="translate(1294.114 867.619)"
            fill="#707070"
          />
          <rect
            id="Rectangle_69"
            data-name="Rectangle 69"
            width="38.541"
            height="54"
            transform="translate(1378.114 943.973)"
            fill="#e4e4e4"
          />
          <path
            id="Rectangle_69_-_Outline"
            data-name="Rectangle 69 - Outline"
            d="M1,1V53H37.541V1H1M0,0H38.541V54H0Z"
            transform="translate(1378.114 943.973)"
            fill="#707070"
          />
          <path
            id="jcow"
            d="M26.811,7.66h-3.83a87.168,87.168,0,0,1-.419,9.455,20.078,20.078,0,0,1-1.392,5.865,6.475,6.475,0,0,1-2.349,2.993,6.642,6.642,0,0,1-3.5.838,13.218,13.218,0,0,1-3.68-.509A8.064,8.064,0,0,1,8.768,24.9,2.506,2.506,0,0,1,7.66,22.981q0-.778.015-1.167t.1-1.047a3.4,3.4,0,0,1,.284-1.047,3.848,3.848,0,0,1,.584-.823,3.078,3.078,0,0,1,.928-.7q-.18-.808-.763-2.618A24.306,24.306,0,0,1,7.946,12a27.766,27.766,0,0,1-.284-4.339H3.83A7.82,7.82,0,0,1,1,7.257,1.5,1.5,0,0,1,0,5.745,3.811,3.811,0,0,1,1.167,3.187,3.533,3.533,0,0,1,3.83,1.915a5.528,5.528,0,0,1,2.02.464A9.281,9.281,0,0,1,7.96,3.561,5.248,5.248,0,0,1,10.653,1a10.429,10.429,0,0,1,4.668-1,10.429,10.429,0,0,1,4.668,1,5.248,5.248,0,0,1,2.693,2.559,9.257,9.257,0,0,1,2.11-1.182,5.533,5.533,0,0,1,2.02-.464,3.533,3.533,0,0,1,2.663,1.272,3.811,3.811,0,0,1,1.167,2.559,1.5,1.5,0,0,1-1,1.511A7.85,7.85,0,0,1,26.811,7.66ZM14.363,1.915a7.325,7.325,0,0,0-1.556.134,1.616,1.616,0,0,0-.868.434,1.622,1.622,0,0,0-.359.584,2.624,2.624,0,0,0-.089.763,3.4,3.4,0,0,0,.3,1.287q.3.718.658,1.556a13.626,13.626,0,0,1,.658,3.112,43.305,43.305,0,0,1,.3,5.536,9.451,9.451,0,0,1-.314,2.439,2.623,2.623,0,0,1-.643,1.392q-2.873,1.406-2.873,2.873,0,1.287,1.93,2.079a11.637,11.637,0,0,0,4.443.793,3.612,3.612,0,0,0,.359-.344,4.441,4.441,0,0,0,.569-.973,3.557,3.557,0,0,0,.359-1.556,66.8,66.8,0,0,1,.479-7.242q.479-4.28.958-7.481t.479-3.471q0-.808-1.406-1.362A9.218,9.218,0,0,0,14.363,1.915Z"
            transform="translate(1386.014 1011.684)"
            fill="#fff"
          />
        </g>
        <text
          id="_0_kWh"
          data-name="0 kWh"
          transform="translate(1229 984)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            0 kWh
          </tspan>
        </text>
        <text
          id="_200_kWh"
          data-name="200 kWh"
          transform="translate(1213 812)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            200 kWh
          </tspan>
        </text>
        <text
          id="_50_kWh"
          data-name="50 kWh"
          transform="translate(1221 941)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            50 kWh
          </tspan>
        </text>
        <text
          id="_100_kWh"
          data-name="100 kWh"
          transform="translate(1213 898)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            100 kWh
          </tspan>
        </text>
        <text
          id="_150_kWh"
          data-name="150 kWh"
          transform="translate(1213 855)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSansPro-Narrow, PT Sans Pro Narrow"
          letterSpacing="0.04em"
          opacity="0.6"
        >
          <tspan x="0" y="0">
            150 kWh
          </tspan>
        </text>
        <path
          id="car"
          d="M31.477,15.524a1.125,1.125,0,0,0-.07-.217l-2.656-6.2a4.06,4.06,0,0,0-3.8-2.358H11.047a4.059,4.059,0,0,0-3.8,2.358l-2.659,6.2a1.105,1.105,0,0,0-.091.443V28.125A1.125,1.125,0,0,0,5.625,29.25h2.25A1.125,1.125,0,0,0,9,28.125V27H27v1.125a1.125,1.125,0,0,0,1.125,1.125h2.25A1.125,1.125,0,0,0,31.5,28.125V15.75a1.136,1.136,0,0,0-.022-.226ZM10.125,22.5a2.25,2.25,0,1,1,2.25-2.25A2.25,2.25,0,0,1,10.125,22.5Zm15.75,0a2.25,2.25,0,1,1,2.25-2.25A2.25,2.25,0,0,1,25.875,22.5ZM7.331,14.625l1.985-4.63A1.848,1.848,0,0,1,11.047,9H24.953a1.849,1.849,0,0,1,1.731.995l1.985,4.63Z"
          transform="translate(1411.054 991.476)"
          fill="#fff"
        />
        <path
          id="washing-machine"
          d="M6.585,19.165l7.243-7.243a4.933,4.933,0,0,1,1.5,3.622,4.931,4.931,0,0,1-1.5,3.621,4.937,4.937,0,0,1-3.622,1.5,4.929,4.929,0,0,1-3.622-1.5ZM17.9.25A2.413,2.413,0,0,1,19.664,1a2.419,2.419,0,0,1,.748,1.766V23.236A2.557,2.557,0,0,1,17.9,25.75H2.574A2.484,2.484,0,0,1,.748,25,2.412,2.412,0,0,1,0,23.236V2.764A2.413,2.413,0,0,1,.748,1,2.487,2.487,0,0,1,2.574.25H17.9ZM7.662,2.764a1.171,1.171,0,0,0-.9.389,1.3,1.3,0,0,0,0,1.8,1.23,1.23,0,0,0,1.8,0,1.3,1.3,0,0,0,0-1.8,1.171,1.171,0,0,0-.9-.389Zm-3.831,0a1.171,1.171,0,0,0-.9.389,1.3,1.3,0,0,0,0,1.8,1.168,1.168,0,0,0,.9.389,1.176,1.176,0,0,0,.9-.389,1.3,1.3,0,0,0,0-1.8,1.17,1.17,0,0,0-.9-.389Zm6.405,20.472a7.382,7.382,0,0,0,5.417-2.245A7.38,7.38,0,0,0,17.9,15.574a7.386,7.386,0,0,0-2.245-5.417,7.378,7.378,0,0,0-5.417-2.244,7.384,7.384,0,0,0-5.417,2.245,7.384,7.384,0,0,0-2.245,5.417,7.379,7.379,0,0,0,2.245,5.417,7.384,7.384,0,0,0,5.417,2.245Z"
          transform="translate(1334.5 994.946)"
          fill="#fff"
        />
        <g id="computer-line" transform="translate(1497.668 993.268)">
          <path
            id="Path_101"
            data-name="Path 101"
            d="M9.383,21V10.383H22.173L23.539,9H8V21H9.383Z"
            transform="translate(-0.95 -0.543)"
            fill="#fff"
          />
          <path
            id="Path_102"
            data-name="Path 102"
            d="M5.728,6.728H26.47V20.556H28.2V6.3A1.3,1.3,0,0,0,26.9,5H5.3A1.3,1.3,0,0,0,4,6.3v14.26H5.728Z"
            transform="translate(-0.407)"
            fill="#fff"
          />
          <path
            id="Path_103"
            data-name="Path 103"
            d="M1,25v2.938a2.247,2.247,0,0,0,2.247,2.247H28.085a2.247,2.247,0,0,0,2.247-2.247V25Zm27.655,2.938a.519.519,0,0,1-.519.519H3.212a.519.519,0,0,1-.519-.519V26.322h8.6a1.417,1.417,0,0,0,1.3.864h6.162a1.417,1.417,0,0,0,1.3-.864h8.608Z"
            transform="translate(0 -2.715)"
            fill="#fff"
          />
        </g>
        <g id="box" transform="translate(1588.641 1000.636)">
          <path
            id="Path_104"
            data-name="Path 104"
            d="M8.941,1.3a.546.546,0,0,0-.406,0L2.016,3.911,8.737,6.6l6.721-2.688Zm7.442,3.414-7.1,2.84v8.652l7.1-2.84V4.72ZM8.191,16.212V7.557l-7.1-2.839v8.653ZM8.129.29a1.638,1.638,0,0,1,1.217,0L17.132,3.4a.546.546,0,0,1,.343.507v9.461a1.092,1.092,0,0,1-.687,1.014L8.941,17.524a.546.546,0,0,1-.406,0L.688,14.386A1.092,1.092,0,0,1,0,13.372V3.911A.546.546,0,0,1,.343,3.4Z"
            fill="#1cadad"
            fillRule="evenodd"
          />
          <path
            id="Path_104_-_Outline"
            data-name="Path 104 - Outline"
            d="M8.738-.077a1.88,1.88,0,0,1,.7.135l7.786,3.115a.792.792,0,0,1,.5.739v9.461a1.336,1.336,0,0,1-.844,1.246L9.034,17.756a.8.8,0,0,1-.592,0L.595,14.618A1.336,1.336,0,0,1-.25,13.372V3.911a.792.792,0,0,1,.5-.739L8.036.058A1.88,1.88,0,0,1,8.738-.077Zm0,17.391a.3.3,0,0,0,.11-.021L16.7,14.153a.838.838,0,0,0,.53-.782V3.911a.3.3,0,0,0-.186-.275L9.253.522a1.394,1.394,0,0,0-1.031,0L.436,3.637a.3.3,0,0,0-.186.275v9.461a.838.838,0,0,0,.53.781l7.847,3.139A.3.3,0,0,0,8.738,17.313Zm0-16.3a.793.793,0,0,1,.3.057l7.1,2.839L8.737,6.868,1.343,3.911l7.1-2.839A.792.792,0,0,1,8.738,1.015Zm6.048,2.9L8.848,1.536a.3.3,0,0,0-.22,0L2.69,3.911,8.737,6.33Zm1.847.438V13.54l-7.6,3.04V7.389Zm-.5,8.852V5.088l-6.6,2.64v8.114ZM.842,4.349l7.6,3.039v9.193l-7.6-3.04Zm7.1,3.377-6.6-2.639V13.2l6.6,2.64Z"
            fill="#1cadad"
          />
        </g>
        <g id="box-2" data-name="box" transform="translate(1670.019 995.022)">
          <path
            id="Path_104-2"
            data-name="Path 104"
            d="M14.69,2.032a.9.9,0,0,0-.668,0L3.313,6.316l11.043,4.416L25.4,6.316Zm12.227,5.61L15.253,12.307V26.523l11.664-4.666V7.643ZM13.458,26.525V12.306L1.794,7.642V21.859Zm-.1-26.16a2.692,2.692,0,0,1,2,0L28.148,5.483a.9.9,0,0,1,.563.833V21.859a1.794,1.794,0,0,1-1.129,1.665L14.69,28.682a.9.9,0,0,1-.668,0L1.13,23.525A1.794,1.794,0,0,1,0,21.859V6.316a.9.9,0,0,1,.564-.833Z"
            transform="translate(0 0)"
            fill="#1cadad"
            fillRule="evenodd"
          />
        </g>
      </g>
    </svg>
  );
};
