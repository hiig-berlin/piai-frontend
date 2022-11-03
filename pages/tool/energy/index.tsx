import { ReactElement } from "react";
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
    margin-top: 0 !important;
  }

  & .GPU.script h2,
  & .GPU.statistic h2 {
    color: ${({ theme }) => theme.colors.piaiEnergy};
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

  .GPU.script button,
  .GPU.CO2 button {
    font-size: calc(var(--text-body-font-size-tool) * 0.85);
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

  & .GPU.statistic.CO2 {
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
      grid-template-columns: 2fr repeat(3, 2fr);
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

  &.scribble .svg{
    min-height: 2.5em !important;
    min-width: 2.5em !important;
    max-height: 2.5em;
    max-width: 2.5em;
  }
`;

const Chart = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.desktop} {
    flex-direction: row;
  }
`;

const Caption = styled.div`
  ${narrow}

  ${({ theme }) => theme.breakpoints.desktop} {
    max-width: 200px;
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

  & p {
    ${narrow}
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
  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();
  const currentTool = appConfig.tools?.find((t) => t.slug === "energy");

  return (
    <EnergyWrapper>
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
          <>
            <Icon
              type="info"
              className="textLink"
              spaceBefore
              url="/tool/energy/about"
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

      <Grid>
        <BoxHighlight className="sources GPU">
          <h2>GPU energy usage</h2>
          <Blurb>
            <ToolSvgBackground type="GPU" />
            Graphics Processing Units (GPU) speed up machine learning. For
            training and inference the GPU energy usage often surpasses that of
            the CPU.
          </Blurb>
        </BoxHighlight>
        <Box className="sources other">
          <h2>Other energy consumers</h2>
          <Grid className="otherSources">
            <Blurb className="intro">
              Beside the power consumption of a GPU there are other factors that
              account for the overall energy usage of an AI-System.
            </Blurb>
            <Blurb>
              <ToolSvgBackground type="hardware" />
              <h3>Hardware production</h3>
              <p>
                Manufacturing the hardware comes with{" "}
                <em>embodied emissions</em> for mining the materials and producing
                the final product.
              </p>
            </Blurb>
            <Blurb>
              <ToolSvgBackground type="CPU" />
              <h3>CPU usage</h3>
              <p>
                Gathering, curating, and maintaining the data requires much CPU
                power, which again results in CO<sub>2</sub>-Emissions.
              </p>
            </Blurb>
            <Blurb>
              <ToolSvgBackground type="fan" />
              <h3>Cooling</h3>
              <p>
                Much of the energy is not spent on computing alone but also on
                cooling down the servers.
              </p>
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
          <Chart>
            <Caption>
              <p>
                Energy usage for training a machine learning model is usually
                documented in kWh. However, this metric is quite abstract.
                Therefore, we provide the kWh of several everyday objects (and
                cows) to put the energy usage of machine learning into
                perspective.
              </p>
              <Icon type="download" nonMuted className="textLink">
                <span>Get sample chart</span>
              </Icon>
            </Caption>

            <Chart1 />
          </Chart>
          <h3>Explanations</h3>
          <Meta col={2} className="scribble">
          <p>Energy consumers see graph below</p>
            <Icon stc type="scribble">
              Calculated kWh from CO<sub>2</sub>-eq <br />given the energy was consumed in Germany
            </Icon>
          </Meta>
        </Box>
        <Box className="GPU statistic CO2">
          <h2>
            <span>CO<sub>2</sub> contribution</span>
          </h2>
          <Chart>
            <Caption>
              <p>
                What matters for sustainable machine learning is not the energy
                consumption but the Carbon Dioxide contribution, or more
                specific, the Carbon Dioxide equivalent (CO<sub>2</sub>-eq). CO
                <sub>2</sub> is not the only greenhouse gas. A cow, for example,
                emits Methane, which is also a greenhouse gas. CO<sub>2</sub>-eq
                is a unified metric to make different greenhouse gases
                comparable. But we must not only consider different greenhouse
                gases but also the carbon intensity (gCO<sub>2</sub>/kWh). Due
                to their energy mix different regions or countries can have
                different CO<sub>2</sub>
                -emissions even if the electricity usage is the same. We used
                Germany’s carbon intensity. On{" "}
                <a href="https://electricitymaps.com">electricitymap.org</a> you
                can get further information on your country’s carbon intensity.
              </p>
            </Caption>

            <Chart2 />
          </Chart>
          <h3>Explanations</h3>
          <Meta col={2}>
            <Icon stc type="kettle">
              Kettle: Heating 1l water to 100° 
            </Icon>
            <Icon stc type="screen">
              Screen: Asus PC Monitor 15.6” for 1 month with 8h per day
            </Icon>
            <Icon stc type="streaming">
              Streaming: 1.5h of 4k video streaming
            </Icon>
            <Icon stc type="opnv">
              Public transport: 25km by public transport
            </Icon>
            <Icon stc type="car">
              Car: 25km by car
            </Icon>
            <Icon stc type="jcow">
              Cow: CO<sup>2</sup>-eq per day of emissioned methan
            </Icon>
            <Icon stc type="boxSmall">
              Small AI application: YOLOv5 (object recognition for accessability)
            </Icon>
            <Icon stc type="boxLarge">
              Larger AI model: DALL·E Mega (no location information available)
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
      id="Group_183"
      data-name="Group 183"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="40 20 622.98 408.54"
    >
<defs>
    <linearGradient
      id="New_Gradient_Swatch"
      x1="606.14"
      y1="367.15"
      x2="606.14"
      y2="58.28"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset=".64" stopColor="#38b883" />
      <stop offset=".8" stopColor="#18adad" stopOpacity="0" />
      <stop offset=".95" stopColor="#38b883" stopOpacity="0" />
      <stop offset=".95" stopColor="#38b883" stopOpacity=".16" />
      <stop offset=".96" stopColor="#38b883" stopOpacity=".38" />
      <stop offset=".96" stopColor="#38b883" stopOpacity=".57" />
      <stop offset=".97" stopColor="#38b883" stopOpacity=".73" />
      <stop offset=".97" stopColor="#38b883" stopOpacity=".85" />
      <stop offset=".98" stopColor="#38b883" stopOpacity=".93" />
      <stop offset=".99" stopColor="#38b883" stopOpacity=".98" />
      <stop offset="1" stopColor="#38b883" />
    </linearGradient>
  </defs>
  <g id="Layer_2">
    <path
      id="Drawer_bg"
      d="M-307.02,0H662.98c11.05,0,20,12.2,20,27.25V626.54c0,15.05-8.95,27.25-20,27.25H-307.02c-11.05,0-20-12.2-20-27.25V27.25c0-15.05,8.95-27.25,20-27.25Z"
    />
  </g>
  <g id="Layer_1">
    <g>
      <line
        x1="94.41"
        y1="367.15"
        x2="645.49"
        y2="367.15"
        fill="none"
        stroke="#000"
        strokeMiterlimit="10"
      />
      <g>
        <g>
          <text
            transform="translate(48.32 373.56) scale(1.08 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">0 kWh</tspan>
          </text>
          <text
            transform="translate(48.32 306.65) scale(1.08 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">5 kWh</tspan>
          </text>
          <text
            transform="translate(40.52 239.74) scale(1.08 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">10 kWh</tspan>
          </text>
          <text
            transform="translate(40.52 172.83) scale(1.08 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">15 kWh</tspan>
          </text>
          <text
            transform="translate(40.52 105.92) scale(1.08 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">20 kWh</tspan>
          </text>
        </g>
        <g>
          <g>
            <line
              x1="94.41"
              y1="367.15"
              x2="645.49"
              y2="367.15"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
            <line
              x1="94.41"
              y1="300.24"
              x2="645.49"
              y2="300.24"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
            <line
              x1="94.41"
              y1="233.33"
              x2="645.49"
              y2="233.33"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
            <line
              x1="94.41"
              y1="166.42"
              x2="645.49"
              y2="166.42"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
            <line
              x1="94.41"
              y1="99.51"
              x2="551.16"
              y2="99.51"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
          </g>
          <g>
            <line
              x1="94.41"
              y1="333.69"
              x2="645.49"
              y2="333.69"
              fill="none"
              stroke="#828282"
              strokeMiterlimit="10"
              strokeWidth=".25"
            />
            <line
              x1="94.41"
              y1="266.78"
              x2="645.49"
              y2="266.78"
              fill="none"
              stroke="#828282"
              strokeMiterlimit="10"
              strokeWidth=".25"
            />
            <line
              x1="94.41"
              y1="199.87"
              x2="645.49"
              y2="199.87"
              fill="none"
              stroke="#828282"
              strokeMiterlimit="10"
              strokeWidth=".25"
            />
            <line
              x1="94.41"
              y1="132.97"
              x2="551.16"
              y2="132.97"
              fill="none"
              stroke="#828282"
              strokeMiterlimit="10"
              strokeWidth=".25"
            />
          </g>
        </g>
      </g>
      <g>
        <rect x="111.73" y="365.67" width="44.09" height="1.47" fill="#fff" />
        <rect x="190.46" y="354.43" width="44.09" height="12.71" fill="#fff" />
        <rect x="269.18" y="341.05" width="44.09" height="26.09" fill="#fff" />
        <path
          d="M347.94,298.68s.5-.29,.5-.29c.09,.16-.5,7.22-.5,7.22,.2,.34,12.31-7.58,12.51-7.23,0,0-12.57,14.06-12.51,14.15,0,0,24.39-14.41,24.53-14.16,0,0-24.88,20.48-24.53,21.09,.48,.84,36.54-21.1,36.54-21.1l-36.54,28.03,44.03-25.42-44.03,32.35,44.03-25.42c.22,.38-44.03,32.35-44.03,32.35,.24,.42,43.82-25.79,44.03-25.42l-44.03,32.35c.2,.34,43.78-25.86,44.04-25.42l-44.04,32.35s43.98-25.53,44.04-25.43l-44.04,32.35s43.92-25.63,44.04-25.43l-42.62,31.54c.17,.29,42.63-24.61,42.63-24.61,0,0-30.92,24.07-30.61,24.6,.36,.63,30.62-17.68,30.62-17.68l-18.6,17.67s18.34-11.21,18.6-10.74c.15,.26-6.59,10.73-6.59,10.73,0,0,6.59-3.81,6.59-3.81"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x="426.63"
          y="173.38"
          width="44.09"
          height="193.77"
          fill="#38b883"
        />
        <path
          d="M505.39,156.84s.5-.3,.5-.29c.05,.08-.5,7.22-.5,7.22,.18,.31,12.51-7.23,12.51-7.23,.26,.44-12.63,13.95-12.51,14.15,0,0,24.19-14.75,24.53-14.16l-24.53,21.09c.22,.39,36.17-21.75,36.54-21.1,.18,.31-36.54,28.03-36.54,28.03,0,0,43.41-26.48,44.03-25.42l-44.03,32.35c.37,.64,43.32-26.64,44.03-25.42,0,0-44.09,32.24-44.03,32.35l44.03-25.42s-44.44,31.63-44.03,32.35c.43,.75,44.03-25.42,44.03-25.42,0,0-44.42,31.67-44.03,32.35,.03,.05,44.03-25.42,44.03-25.42,.38,.66-44.03,32.35-44.03,32.35,.31,.54,44.03-25.42,44.03-25.42l-44.03,32.35c.66,1.14,44.03-25.42,44.03-25.42,0,0-44.03,32.35-44.03,32.35,.5,.86,43.54-26.27,44.03-25.42,0,0-44.52,31.51-44.03,32.35l44.03-25.42c.57,.98-44.69,31.21-44.03,32.35l44.04-25.42s-44.41,31.7-44.04,32.35c.75,1.31,44.04-25.42,44.04-25.42,0,0-44.84,30.95-44.04,32.35,0,0,43.53-26.31,44.04-25.42,.06,.11-44.3,31.9-44.04,32.35,.13,.22,43.97-25.54,44.04-25.43,.57,.99-44.04,32.35-44.04,32.35,0,0,43.63-26.14,44.04-25.43,0,0-44.39,31.75-44.04,32.35,.06,.1,44.04-25.43,44.04-25.43,0,0-44.23,32.03-44.04,32.35,.17,.29,44.04-25.43,44.04-25.43l-44.04,32.36s43.74-25.96,44.04-25.43l-44.04,32.36,44.04-25.43c.5,.87-44.04,32.36-44.04,32.36,.27,.47,43.35-26.63,44.04-25.43,0,0-44.56,31.47-44.04,32.36,0,0,44.04-25.44,44.04-25.43,.44,.77-44.04,32.36-44.04,32.36,.75,1.31,44.05-25.43,44.05-25.43,0,0-44.79,31.08-44.05,32.36,0,0,43.71-26.02,44.05-25.43,.25,.44-44.39,31.77-44.05,32.36l44.05-25.43s-44.19,32.12-44.05,32.36c.58,1,43.95-25.61,44.05-25.43,.02,.04-44.05,32.36-44.05,32.36,.7,1.22,43.75-25.95,44.05-25.43,.68,1.18-44.62,31.38-44.05,32.36,.39,.67,43.46-26.45,44.05-25.43,.73,1.26-44.05,32.36-44.05,32.36l44.05-25.43s-36.68,27.25-36.31,27.89c0,0,36.05-21.42,36.31-20.97,0,0-24.46,20.68-24.3,20.96l24.3-14.03s-12.44,13.76-12.29,14.02c0,0,12.24-7.17,12.29-7.09"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M626.34,367.37c-.5,.29-.55,.28-.71,.24-.13-.03-.24-.12-.31-.24s-.08-.26-.05-.39l2.07-7.13-13.36,7.71c-.22,.12-.49,.07-.64-.12-.15-.2-.14-.47,.03-.65,3.91-4.1,9.2-9.68,12.16-12.82l-23.57,13.61c-.24,.14-.54,.06-.68-.18-.07-.12-.13-.23,.21-.64l-.03-.05,.13-.08c1.16-1.31,5.7-5.21,22.03-18.62-8.41,4.8-25.86,14.99-33.68,19.57h0c-.11,.07-.25,.09-.38,.05-.13-.03-.24-.12-.3-.23-.44-.76,.3-1.57,20.86-16.41,5.88-4.25,12.35-8.91,15.56-11.41-7.03,3.67-27.3,15.77-41.32,24.3-.11,.06-.25,.09-.38,.06s-.24-.12-.31-.23c-.08-.15-.15-.26,.2-.63l-.03-.05c.07-.04,.14-.08,.21-.13,1.29-1.22,5.98-4.64,21.72-16.14,6.46-4.72,12.93-9.42,17.18-12.51-4.9,2.79-12.36,7.32-18.83,11.24-17.49,10.57-19.54,11.69-20.12,11.54-.13-.03-.26-.13-.33-.25-.13-.22-.07-.5,.14-.65l38.21-28.07c-3.81,2.24-8.82,5.26-13.51,8.08-19.39,11.68-23.74,14.16-24.5,13.96-.13-.03-.27-.14-.34-.25q-.23-.39,2.02-2.05c1.2-.89,2.92-2.15,4.99-3.67,4.13-3.04,9.64-7.08,15.14-11.12,4.54-3.33,9.08-6.66,12.84-9.42-14.25,8.6-33.37,19.93-34.65,19.6-.13-.03-.28-.14-.35-.26-.38-.66-.45-.77,23.75-18.04,6.91-4.93,14.51-10.35,18.15-13.08-7.09,3.6-27.28,15.76-41.2,24.37-.23,.14-.53,.08-.68-.15-.15-.23-.09-.53,.13-.68,13.19-9.33,31.54-22.48,39.71-28.7l-39.17,22.61c-.23,.13-.52,.06-.67-.16-.15-.22-.09-.52,.12-.68l36.65-26.92c-27.25,15.77-33.99,19.67-35.78,20.6-.18,.12-.28,.19-.29,.2l-.03-.04c-.29,.14-.33,.13-.39,.11-.19-.05-.33-.2-.36-.4s.05-.39,.21-.5c14.44-10.1,35.07-24.79,41.74-30.14-4.54,2.52-14.01,8.16-21.99,12.92-18.28,10.89-19.15,11.31-19.58,11.2-.13-.03-.25-.12-.32-.24-.33-.57-.5-.86,22-17.11,4.82-3.48,9.68-6.97,13.61-9.79-26.37,15.27-32.9,19.04-34.63,19.94-.16,.12-.25,.18-.26,.19l-.03-.04c-.3,.14-.34,.13-.39,.12-.19-.05-.33-.2-.36-.39-.03-.19,.04-.38,.2-.5,13.81-9.85,33.28-23.89,40.8-29.64-4.84,2.72-13.69,8.01-21.23,12.51-18.1,10.8-18.96,11.22-19.4,11.1-.13-.03-.25-.12-.32-.24-.13-.22-.07-.5,.14-.65l40.57-29.8c-7.96,4.25-26.79,15.57-40.01,23.7-.21,.15-.53,.07-.68-.15-.15-.22-.1-.52,.12-.68l35.04-25.74c-14.29,8.6-33.6,20.04-34.83,19.72-.13-.03-.28-.14-.34-.26q-.23-.4,2.47-2.36c1.48-1.07,3.58-2.59,6.06-4.39,7.95-5.75,22-15.91,29.85-21.74-28.9,16.79-35.71,20.68-37.43,21.55l-.21,.15-.03-.04c-.3,.14-.35,.13-.4,.12-.19-.05-.33-.2-.36-.39s.04-.38,.2-.5l34.83-25.59c-14.22,8.6-33.29,19.91-34.61,19.57-.13-.03-.28-.15-.35-.26-.34-.58-.51-.88,21.99-17.13,4.32-3.12,8.67-6.24,12.36-8.88-21.93,13-33.37,19.5-34.04,19.32-.13-.03-.25-.13-.32-.24-.33-.56-.45-.77,22.03-17.06,4.95-3.59,9.93-7.18,13.92-10.04l-35.27,20.36c-.24,.14-.54,.06-.68-.18-.1-.18-.16-.28,.21-.63l-.03-.05,.31-.18c.6-.48,1.77-1.3,3.97-2.85,8.53-5.99,32.67-22.92,38.36-27.81-6.1,2.97-27.53,15.81-42.13,24.76-.12,.08-.25,.09-.38,.06-.13-.03-.24-.12-.31-.23-.1-.17-.16-.27,.2-.63l-.03-.05c.07-.05,.15-.09,.22-.14,.73-.65,2.51-1.97,6.58-4.97,4.12-3.04,9.63-7.08,15.15-11.12,4.86-3.56,9.73-7.11,13.65-9.98-34.56,20.42-35.2,20.25-35.45,20.18-.13-.03-.25-.12-.32-.24q-.25-.44,9.05-7.06c8.53-6.06,24.16-17.18,31.28-22.63-8.65,4.97-28.17,16.28-39.65,22.94h0c-.23,.13-.53,.06-.67-.16s-.08-.53,.14-.68c14.13-9.85,34.19-24.1,41.28-29.75-3.28,1.9-8.66,5.12-13.91,8.26-21.36,12.77-26.44,15.66-27.18,15.47-.13-.03-.26-.13-.33-.25q-.25-.43,3.55-3.18c2.14-1.55,5.14-3.7,8.55-6.15,8.63-6.2,21.57-15.49,28.02-20.35-3.5,2.04-8.59,5.09-13.58,8.08-20.57,12.32-25.47,15.11-26.2,14.92-.13-.03-.27-.13-.33-.25-.13-.22-.07-.5,.14-.65l35.47-26.06c-17.17,10.25-34.33,20.28-35.28,20.03-.13-.03-.26-.13-.33-.25-.34-.59-.57-.98,21.95-17.19,5.23-3.76,10.51-7.52,14.61-10.43-10.28,5.91-27.69,16.08-35.88,20.88h0c-.11,.07-.25,.09-.38,.05-.13-.03-.24-.12-.3-.23-.33-.58-.54-.93,21.97-17.15,4.79-3.45,9.62-6.91,13.55-9.71l-34.84,20.12c-.23,.13-.52,.06-.67-.16-.14-.22-.09-.52,.12-.68,10.97-8.01,29.27-21.39,38.43-28.15-4.32,2.51-10.33,6.07-15.92,9.37-20.84,12.34-21.89,12.85-22.33,12.74-.13-.03-.25-.12-.31-.24q-.27-.46,5.56-4.71c3.33-2.43,7.86-5.71,12.65-9.18,6.62-4.79,14.2-10.28,19.44-14.13-36.68,21.5-37.09,21.39-37.34,21.33-.13-.03-.24-.12-.31-.24-.35-.61-.69-1.2,21.88-17.31,5.17-3.69,10.39-7.37,14.48-10.24-9.24,5.3-24.39,14.17-35.68,20.81h0c-.23,.13-.52,.07-.67-.16-.15-.22-.09-.52,.12-.68l36.72-26.98-36.17,20.88c-.24,.14-.54,.06-.68-.18-.1-.17-.17-.29,.19-.67l.04-.04c1-1.03,4.97-3.87,18.94-13.87,6.53-4.67,14.02-10.03,19.07-13.75-36.96,21.89-37.67,21.7-37.92,21.64-.13-.03-.25-.12-.32-.24-.41-.71-.51-.88,21.25-16.13,6.28-4.4,13.54-9.5,18.14-12.89-30.7,18.12-37.13,21.58-38.61,22.21-.04,.03-.06,.04-.06,.04h-.01c-.3,.11-.36,.09-.4,.08-.13-.03-.25-.12-.31-.24-.13-.22-.07-.51,.14-.66,14.01-10.01,33.87-24.33,41.13-29.9-5.25,2.9-15.82,9.23-24.09,14.18-16.37,9.81-16.47,9.79-16.87,9.69-.13-.03-.25-.12-.31-.24-.13-.22-.07-.5,.14-.65l34.84-25.6c-14.23,8.6-33.31,19.92-34.63,19.59-.13-.03-.28-.15-.35-.26-.13-.22-.07-.5,.14-.65l36.71-26.97-36.17,20.88c-.23,.13-.53,.06-.67-.16-.14-.22-.09-.52,.13-.68,14.52-10.37,35.32-25.38,41.86-30.47-6.99,3.56-27.3,15.77-41.31,24.38-.11,.06-.25,.09-.38,.06-.13-.03-.24-.12-.31-.23-.45-.78,.32-1.6,21.85-16.59,7.62-5.31,16.72-11.64,20.45-14.59-6.73,3.48-27.38,15.79-41.61,24.43-.26,.16-.53,.07-.68-.15-.15-.23-.09-.53,.13-.68,13.33-9.32,31.94-22.56,39.95-28.75-17.41,10.39-36.26,21.47-39.37,22.63h0s0,0,0,0c-.21,.08-.34,.11-.4,.09-.13-.03-.26-.13-.32-.25-.13-.22-.07-.5,.14-.65l36.71-26.97-36.17,20.88c-.23,.13-.52,.06-.67-.16-.15-.22-.09-.52,.12-.68,11.05-8.08,29.51-21.6,38.6-28.3-8.82,5.01-25.75,14.94-38.05,22.21-.13,.03-.25,.09-.38,.05-.13-.03-.24-.12-.31-.23-.4-.69-.49-.85,20.43-15.5,8.07-5.65,17.71-12.4,21.71-15.55-6.91,3.64-27.32,15.77-41.45,24.3-.12,.06-.25,.09-.38,.06-.13-.03-.24-.12-.31-.23-.1-.18-.16-.28,.19-.64l-.02-.03s.1-.06,.15-.09c.69-.64,2.45-1.94,6.64-5.03,4.12-3.04,9.63-7.08,15.14-11.11,6.81-4.98,13.63-9.95,17.85-13.02-5.35,3-14.41,8.51-21.63,12.89-15.85,9.62-17.46,10.5-17.99,10.36-.13-.03-.26-.13-.33-.25-.13-.22-.07-.51,.14-.66,13.16-9.32,31.48-22.45,39.66-28.67l-39.12,22.59c-.23,.13-.52,.06-.67-.16s-.1-.51,.11-.67c8.98-6.86,23.87-18.25,31.57-24.16-2.69,1.6-6.08,3.66-9.42,5.69-16.81,10.22-21.12,12.66-21.93,12.45-.13-.03-.28-.14-.35-.26-.12-.21-.08-.47,.11-.63,6.1-5.23,16.28-13.95,21.38-18.35-2.81,1.63-6.78,4.02-10.03,5.98-10.67,6.43-10.77,6.41-11.14,6.32-.13-.03-.25-.12-.32-.24-.27-.47-.31-.54,8.68-10.39,.66-.72,1.3-1.42,1.87-2.05l-9.86,5.69c-.24,.14-.54,.06-.68-.18-.1-.17-.14-.25,.37-6.68-.02,0-.04,0-.06-.01l.09-.35c0-.06,0-.12,.01-.18l-.19-.41c.09-.05,.45-.26,.45-.26,.15-.11,.36-.1,.52,0,.16,.1,.25,.28,.24,.47-.16,1.95-.38,4.87-.47,6.29l11.73-6.77c.24-.14,.54-.06,.68,.18q.21,.36-3.97,4.94c-2.17,2.38-5.39,5.91-7.19,7.98,2.09-1.17,5.54-3.28,8.71-5.2,12.18-7.34,13.63-8.1,14.13-7.98,.13,.03,.26,.13,.33,.25q.22,.38-3.93,3.95c-2.3,1.98-5.37,4.61-8.43,7.25-3.65,3.13-7.3,6.27-9.66,8.29,4.22-2.33,12.16-7.15,18.39-10.94,13.46-8.18,14.83-8.92,15.33-8.79,.13,.03,.26,.13,.32,.24q.23,.41-5.82,5.06c-3.42,2.63-7.99,6.13-12.56,9.63-4.38,3.35-8.76,6.7-12.14,9.28l37.32-21.55c.24-.14,.54-.06,.68,.18,.33,.57,.53,.92-21.97,17.15-5.24,3.78-10.52,7.56-14.62,10.48,2.86-1.72,6.2-3.74,9.5-5.74,18.87-11.45,25.74-15.47,26.74-15.22,.13,.03,.29,.15,.36,.27,.13,.22,.07,.5-.14,.65-8.33,6.06-26.03,18.97-36.25,26.5,15.64-9.38,34.94-20.77,36.06-20.48,.13,.03,.27,.14,.33,.25,.46,.8-.45,1.76-23.89,18.17-5.19,3.63-10.77,7.54-14.73,10.41,37.5-22.1,38.06-21.95,38.31-21.88,.13,.03,.25,.12,.31,.24q.24,.42-6.99,5.75c-4.13,3.04-9.63,7.08-15.14,11.12-5.26,3.85-10.52,7.7-14.58,10.68l36.02-20.8c.23-.13,.52-.06,.67,.16,.15,.22,.09,.52-.12,.68l-39.06,28.7c8.66-4.86,26.02-15.13,38.51-22.6,.15-.06,.25-.09,.38-.05,.13,.03,.24,.12,.31,.23,.35,.61,.63,1.09-21.92,17.25-3.68,2.64-7.38,5.27-10.68,7.61,13.94-8.36,31.12-18.47,32.25-18.18,.13,.03,.28,.14,.34,.26,.47,.81-.33,1.66-22.48,17.08-5.67,3.95-11.78,8.2-16.04,11.29,13.27-8.09,36.57-22.11,38.15-21.71,.13,.03,.29,.15,.36,.27,.33,.57,.46,.79-22.02,17.07-4.93,3.57-9.9,7.15-13.88,10.01l35.22-20.33c.23-.13,.52-.06,.67,.16,.15,.22,.09,.52-.12,.68l-40.2,29.54c8.16-4.43,26.61-15.48,39.65-23.44,.24-.13,.53-.07,.68,.15,.15,.22,.1,.52-.12,.68l-37.23,27.35c2.74-1.62,5.96-3.56,9.14-5.46,21.63-12.96,27.1-16.08,27.9-15.87,.13,.03,.27,.14,.34,.25,.33,.58,.46,.79-22.02,17.07-5.73,4.15-11.51,8.31-15.73,11.34,9.04-5.16,25.21-14.65,37.06-21.66,.13-.11,.25-.09,.38-.05,.13,.03,.24,.12,.31,.23,.43,.74,.56,.96-23.08,17.54-6.64,4.66-13.9,9.75-17.89,12.73,7.85-4.37,26.86-15.54,40.29-23.52,.13-.06,.25-.09,.38-.05s.24,.12,.31,.23c.38,.65,.44,.77-25.15,19.09-4.53,3.25-9.15,6.55-12.68,9.11l37.15-21.45c.23-.13,.52-.06,.67,.16,.15,.22,.09,.52-.12,.68l-36.17,26.57c27.8-16.32,33.99-19.71,35.48-20.38,.07-.05,.1-.07,.11-.08v.02c.31-.12,.36-.11,.41-.1,.13,.03,.24,.12,.31,.24,.13,.22,.07,.51-.15,.66-14.32,9.94-34.71,24.38-41.54,29.91,7.38-4.14,27.11-15.66,41.01-23.82h0c.11-.07,.25-.09,.38-.05,.13,.03,.24,.12,.31,.23,.09,.15,.15,.26-.2,.64l.02,.04c-.05,.03-.1,.06-.15,.09-1.31,1.28-6.57,5.1-25.78,19-4.45,3.22-8.98,6.5-12.39,8.99,4.29-2.49,10.21-6,15.73-9.27,20.95-12.4,22.01-12.92,22.45-12.8,.13,.03,.25,.12,.31,.24q.25,.44-6.98,5.77c-4.12,3.04-9.63,7.08-15.14,11.12-5.24,3.84-10.48,7.67-14.54,10.63l35.98-20.77c.23-.13,.53-.06,.67,.16,.14,.23,.09,.52-.13,.68-13.07,9.24-31.21,22.24-39.48,28.53,30.39-17.78,37.14-21.55,38.76-22.32,.09-.06,.14-.1,.14-.1l.02,.03c.3-.13,.35-.12,.39-.1,.13,.03,.24,.12,.31,.24,.13,.22,.07,.51-.15,.66-14.39,10.14-34.95,24.84-41.67,30.18,7.22-3.89,27.21-15.73,41.13-24.09,.22-.15,.53-.07,.67,.15,.15,.22,.1,.52-.12,.68l-39.08,28.71c5.32-3.04,13.64-8.02,20.34-12.04,17.29-10.36,18.12-10.76,18.56-10.64,.13,.03,.25,.12,.32,.24,.37,.65,.49,.84-32.23,24.34-2.6,1.87-5.05,3.63-7.04,5.06,5.5-3.14,14.3-8.4,21.37-12.62,17.09-10.22,17.19-10.19,17.59-10.09,.13,.03,.25,.12,.31,.24,.35,.61,.65,1.13-21.91,17.28-4.48,3.21-9,6.41-12.79,9.08,34.06-19.75,34.14-19.73,34.39-19.66,.13,.03,.24,.12,.3,.23,.4,.7,.62,1.08-35.28,26.61-1.03,.73-2.01,1.43-2.92,2.07,8.95-5.09,25.46-14.8,37.51-21.94h0c.23-.14,.52-.07,.67,.16,.15,.22,.09,.52-.12,.68-9.91,7.22-25.8,18.84-35.53,26,14.26-8.65,33.91-20.34,35.31-19.99,.13,.03,.29,.15,.36,.27,.4,.7,.79,1.36-35.11,26.62l34.43-19.88c.23-.13,.53-.06,.67,.16,.14,.22,.09,.52-.13,.68-13.72,9.81-33.02,23.74-40.65,29.55,7.96-4.42,26.78-15.51,40.1-23.46h0c.23-.14,.52-.07,.67,.16,.15,.23,.09,.53-.13,.68-14.57,10.34-35.46,25.36-41.93,30.46,6.95-3.58,27.32-15.77,41.38-24.36,.26-.17,.53-.07,.68,.15,.15,.22,.1,.52-.12,.68l-37.15,27.3c9.59-5.53,26.33-15.24,36.61-21.2h0c.11-.07,.25-.08,.38-.05,.13,.03,.24,.12,.3,.23,.08,.14,.14,.25-.21,.64l.03,.05c-.05,.03-.11,.06-.16,.1-1.52,1.51-8.26,6.48-35.45,26.14-1.54,1.12-2.98,2.15-4.2,3.04,8.33-4.57,26.45-15.39,39.31-23.21,.27-.12,.53-.07,.68,.15,.15,.22,.1,.52-.12,.68l-34.58,25.4c13.48-8.19,32.91-19.76,34.35-19.4,.13,.03,.3,.15,.36,.27,.13,.22,.07,.5-.14,.65l-37.69,27.69c3.45-2.03,7.82-4.64,12.12-7.21,21.52-12.84,24.75-14.62,25.38-14.46,.13,.03,.26,.13,.33,.25,.33,.57,.46,.81-22.02,17.08-5.01,3.63-10.06,7.26-14.08,10.14,9.74-5.61,25.53-14.76,35.42-20.48h0c.23-.13,.53-.06,.67,.16s.09,.52-.13,.68c-13.51,9.6-32.45,23.22-40.3,29.21,3.7-2.15,9.36-5.52,14.91-8.83,21.39-12.75,24.6-14.52,25.21-14.36,.13,.03,.26,.13,.32,.24,.34,.58,.63,1.09-21.92,17.25-4.72,3.38-9.48,6.76-13.38,9.51,9.78-5.65,25-14.45,34.62-20.02h0c.23-.13,.52-.06,.67,.16,.15,.22,.09,.52-.12,.68l-36.73,26.98,36.18-20.89c.24-.14,.54-.06,.68,.18,.33,.58,.53,.92-21.98,17.16-3.56,2.57-7.14,5.13-10.36,7.43,13.24-8.04,30.52-18.29,31.97-17.93,.13,.03,.3,.16,.37,.27,.36,.63,.39,.68-20.58,15.64-7.72,5.51-16.88,12.04-21.12,15.26,7.29-3.83,27.19-15.73,41.01-24.15,.21-.15,.53-.07,.68,.15,.15,.22,.1,.52-.12,.68-11.36,8.33-30.47,22.35-39.3,28.85,4.86-2.78,12.35-7.3,18.84-11.21,17.65-10.63,19.72-11.75,20.27-11.61,.13,.03,.26,.13,.33,.25,.13,.22,.07,.5-.14,.65l-38.31,28.14c3.78-2.23,8.79-5.26,13.47-8.08,19.23-11.63,23.84-14.25,24.64-14.04,.13,.03,.28,.14,.34,.26,.13,.22,.07,.5-.14,.65-8.34,6.05-26.11,18.98-36.33,26.52,14.38-8.68,34.85-20.83,36.13-20.5,.13,.03,.28,.14,.34,.26,.38,.66,.46,.8-17.88,14.04-5.85,4.22-12.65,9.12-16.78,12.29,26.39-15.43,32.36-18.77,33.83-19.47,.03-.02,.05-.04,.08-.07l.02,.02c.32-.15,.38-.13,.43-.12,.13,.03,.24,.12,.31,.23,.12,.21,.07,.48-.12,.64-7.43,6.09-17.63,14.52-22.9,19l22.33-12.89c.24-.14,.54-.06,.68,.18,.08,.13,.12,.21-.2,.65l.02,.04-.09,.05c-.64,.81-2.41,2.68-7,7.51-1.75,1.85-3.5,3.69-4.84,5.1l11.44-6.6c.18-.1,.4-.09,.56,.04s.23,.34,.17,.53l-2.07,7.13s.02-.01,.03-.02q1.45-.87,1.69-.81l-.12,.48-.43,.25,.43-.25,.18,.46c-.11,.06-.78,.45-1.23,.72-.34,.21-.6,.36-.78,.46Z"
          fill="url(#New_Gradient_Swatch)"
        />
      </g>
    </g>
    <path
      d="M607.12,94.21c.05-.48,.08-.97,.08-1.45-.02-3.74-1.7-7.29-4.58-9.68-2.88-2.39-6.67-3.39-10.36-2.72-3.68,.67-6.89,2.93-8.74,6.18-1.1-.65-2.35-.99-3.63-.99-1.93,0-3.77,.76-5.14,2.13-1.36,1.36-2.13,3.21-2.13,5.14v.68c-2.35,.37-4.36,1.87-5.4,4.01-1.04,2.14-.96,4.65,.2,6.72,1.16,2.07,3.27,3.45,5.63,3.67,2.72,2.22,5.57,2.31,8.29,.27,1.52,1.57,3.6,2.47,5.78,2.5,2.18,.03,4.29-.81,5.84-2.34,1.42,1.31,3.29,2.02,5.23,1.99,1.93-.03,3.78-.81,5.16-2.16,.64,.15,1.3,.25,1.95,.31,2.33-.07,4.48-1.25,5.79-3.18,1.31-1.93,1.61-4.37,.82-6.56-.79-2.19-2.59-3.87-4.83-4.51h.03Z"
      fill="#fff"
    />
    <path
      d="M642.59,93.36c-1.21,3.27-5.41,4.45-8.14,1.91-1.24,5.74-9.05,6.64-11.45,1.06-2.27,.96-5.03-.39-5.49-2.97-5.26-.1-5.51-7.73-.06-8.01-.55-4.84,4.63-7.97,8.44-4.63,1.24-5.74,9.05-6.64,11.45-1.06,1.87-.84,4.25,.08,5.11,1.84,.43-.1,.88-.15,1.33-.15,8.32,.38,8,12.67-1.18,12.01h0Z"
      fill="#fff"
    />
    <text
      transform="translate(121.96 355.52)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">0.11</tspan>
    </text>
    <text
      transform="translate(200.77 342.7)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">0.95</tspan>
    </text>
    <text
      transform="translate(278.78 330.98)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">1.95</tspan>
    </text>
    <text
      transform="translate(357.9 284.81)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">5.14</tspan>
    </text>
    <text
      transform="translate(431.16 164.53)"
      fill="#38b883"
      fontFamily="PTSans-NarrowBold, 'PT Sans Narrow'"
      fontSize="16"
      fontWeight="700"
    >
      <tspan x="0" y="0">14.48</tspan>
    </text>
    <text
      transform="translate(511.73 146.98)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">15.74</tspan>
    </text>
    <text
      transform="translate(574.75 46.28)"
      fill="#38b883"
      fontFamily="PTSans-NarrowBold, 'PT Sans Narrow'"
      fontSize="16"
      fontWeight="700"
    >
      <tspan x="0" y="0">14 460.50</tspan>
    </text>
    <path
      id="car"
      d="M540.18,394.33c-.02-.07-.04-.14-.07-.21l-2.52-5.89c-.65-1.4-2.07-2.28-3.61-2.24h-13.21c-1.54-.04-2.96,.84-3.61,2.24l-2.53,5.89c-.06,.13-.09,.28-.09,.42v11.76c0,.59,.48,1.07,1.07,1.07,0,0,0,0,0,0h2.14c.59,0,1.07-.48,1.07-1.07v-1.07h17.1v1.07c0,.59,.48,1.07,1.07,1.07h2.14c.59,0,1.07-.48,1.07-1.07v-11.76c0-.07,0-.14-.02-.21h0Zm-20.28,6.63c-1.18,0-2.14-.96-2.14-2.14s.96-2.14,2.14-2.14,2.14,.96,2.14,2.14-.96,2.14-2.14,2.14Zm14.96,0c-1.18,0-2.14-.96-2.14-2.14s.96-2.14,2.14-2.14,2.14,.96,2.14,2.14-.96,2.14-2.14,2.14Zm-17.62-7.48l1.89-4.4c.32-.61,.96-.98,1.64-.95h13.21c.69-.03,1.33,.34,1.64,.95l1.89,4.4h-20.27Z"
      fill="#fff"
    />
    <g id="box">
      <path
        id="Path_104"
        d="M448.19,389.7c-.13-.05-.28-.05-.41,0l-6.52,2.61,6.72,2.69,6.72-2.69-6.52-2.61Zm7.44,3.41l-7.1,2.84v8.65l7.1-2.84v-8.65h0Zm-8.19,11.49v-8.65l-7.1-2.84v8.65l7.1,2.84Zm-.06-15.92c.39-.16,.83-.16,1.22,0l7.79,3.11c.21,.08,.34,.28,.34,.51v9.46c0,.45-.27,.85-.69,1.01l-7.85,3.14c-.13,.05-.28,.05-.41,0l-7.85-3.14c-.42-.17-.69-.57-.69-1.01v-9.46c0-.22,.13-.43,.34-.51l7.79-3.11Z"
        fill="#38b883"
        fillRule="evenodd"
      />
    </g>
    <g id="box-2">
      <path
        id="Path_104-2"
        d="M606.31,384.82c-.21-.09-.45-.09-.67,0l-10.71,4.28,11.04,4.42,11.04-4.42-10.71-4.28Zm12.23,5.61l-11.66,4.66v14.22l11.66-4.67v-14.21h0Zm-13.46,18.88v-14.22l-11.66-4.66v14.22l11.66,4.67Zm-.1-26.16c.64-.26,1.36-.26,2,0l12.79,5.12c.34,.14,.56,.47,.56,.83v15.54c0,.73-.45,1.39-1.13,1.66l-12.89,5.16c-.21,.09-.45,.09-.67,0l-12.89-5.16c-.68-.27-1.13-.93-1.13-1.67v-15.54c0-.37,.22-.7,.56-.83l12.79-5.12Z"
        fill="#38b883"
        fillRule="evenodd"
      />
    </g>
    <path
      d="M365.4,379.55c.4-.57,1.13-.49,1.13-.49l3.22,3.48h.13s.13,0,.13,0l3.24-3.48s.71-.07,1.12,.49c.4,.57,.16-.99-.73-.99h-7.53c-.89,0-1.13,1.55-.73,.99h0Zm4.49-.49h2.66s-2.61,2.72-2.61,2.72v-.02l-.05,.06-.05-.06v.02l-2.54-2.72h2.59Zm-7.88,30.11h1.63l1.29-2.6h-.91l-2.01,2.6Zm12.98-2.6l1.2,2.6h1.63l-1.93-2.6h-.91Zm-8.16-1.02h6.24v-1.81h-6.24s0,1.81,0,1.81Zm12.52-19.61c0-1.6-6.6-1.72-6.6-1.72l-1.11-1.18-3.43-.02-1.43,1.19s-5.48,.1-6.28,1.72c0,0,.02,16.05,.02,16.88s1.62,2.73,2.73,2.73c1.61,0,2.69,0,2.69,0l-.02-2.7h8.12v2.72s1.42-.03,2.78-.03,2.57-2.39,2.57-2.73c0-1.21-.03-16.88-.03-16.88h0Zm-12.23,.14s0,.04,0,.06c.03-.25,.24-.45,.5-.45h4.59c.26,0,.47,.2,.5,.45,0-.02,0-.04,0-.06v.12s0-.04,0-.06c-.03,.26-.24,.5-.5,.5h-4.59c-.26,0-.47-.24-.5-.5,0,.02,0,.04,0,.06v-.12Zm-3.43,16.12c-.4,0-.72-.33-.72-.73s.32-.73,.72-.73,.72,.33,.72,.73-.33,.73-.72,.73Zm5.85-6.67c0,.56-.46,1.02-1.02,1.02h-6.05c-.56,0-1.02-.46-1.02-1.02v-6.97c0-.56,.46-1.02,1.02-1.02h6.05c.56,0,1.02,.46,1.02,1.02v6.97Zm6.77,6.72c-.4,0-.72-.33-.72-.73s.33-.73,.72-.73,.72,.33,.72,.73c0,.4-.32,.73-.72,.73Zm2.23-6.72c0,.56-.46,1.02-1.02,1.02h-6.07c-.56,0-1.02-.45-1.02-1.02v-6.97c0-.56,.46-1.02,1.02-1.02h6.08c.56,0,1.02,.46,1.02,1.02v6.97Z"
      fill="#fff"
      fillRule="evenodd"
    />
    <path
      d="M286.44,386.53h14.9c2.18,0,3.96,1.78,3.96,3.96v8.23c0,2.18-1.78,3.96-3.96,3.96h-14.9c-2.18,0-3.96-1.78-3.96-3.96v-8.23c0-2.18,1.78-3.96,3.96-3.96h0Zm-2.69,19.94c-.31,0-.55-.25-.55-.55s.25-.55,.55-.55h6.02c.31,0,.55,.25,.55,.55s-.25,.55-.55,.55h-6.02Zm7.96-2.03c0-.31,.25-.55,.55-.55s.55,.25,.55,.55v.92h11.2c.31,0,.55,.25,.55,.55s-.25,.55-.55,.55h-11.2v.93c0,.31-.25,.55-.55,.55s-.55-.25-.55-.55v-2.96Zm.18-13.91l6.04,3.6c.26,.16,.35,.49,.19,.76-.05,.08-.12,.15-.2,.19l-6.09,3.62c-.26,.16-.6,.07-.76-.19-.05-.09-.08-.19-.08-.28h0v-7.26c0-.31,.25-.55,.55-.55,.12,0,.24,.04,.33,.11h0Zm4.68,4.07l-4.46-2.66v5.31l4.46-2.66Z"
      fill="#fff"
      fillRule="evenodd"
    />
    <g>
      <path
        d="M137.22,402.69c0,.12,0,.22-.02,.35,.02-.12,.02-.22,.02-.35Z"
        fill="#fff"
      />
      <path
        d="M139.11,384.73h-.82c-.67-.75-2.79-.85-5.3-.85-2.96,0-5.6,.42-6.49,1.22-.27,.22-.5,.5-.7,.82-1.49,.55-4.1,1.62-4.1,5.47,0,5.57,3.78,9.2,3.78,10.02v1.99c0,1.17,.97,2.24,2.16,2.24h7.69c1.12,0,2.06-.9,2.26-1.96l1.07-13.26c.25-2.39,2.61-5.7,2.61-5.7h-2.16Zm-13.63,12.81c-1.24,0-3.33-8.81,0-9.3v9.3Zm9.95,2.96c0,.22-.15,.4-.37,.4s-.37-.17-.37-.4v-11.37c0-.22,.15-.4,.37-.4s.37,.17,.37,.4v11.37Z"
        fill="#fff"
      />
    </g>
    <g>
      <path
        d="M227.51,386.83h-24.1c-.38,0-.7,.32-.7,.7v15.51c0,.38,.32,.7,.7,.7h11.14v2.31c-1.4,.08-2.71,.38-3.84,.89-.46,.21-.67,.75-.48,1.23,.16,.35,.48,.56,.86,.56,.13,0,.24-.03,.38-.08,1.1-.48,2.52-.75,4-.75s2.92,.27,4,.75c.46,.21,1.02,0,1.23-.48,.21-.46,0-1.02-.48-1.23-1.1-.48-2.42-.78-3.84-.89v-2.31h11.14c.38,0,.7-.32,.7-.7v-15.51c0-.38-.32-.7-.7-.7h0Zm-.7,15.51h-22.7v-14.12h22.7v14.12Z"
        fill="#fff"
      />
      <path
        d="M225.39,389.64h-19.86v11.24h19.86v-11.24Zm-18.06,2.98l1.21-1.21c.27-.27,.72-.27,.99,0s.27,.72,0,.99l-1.21,1.21c-.13,.13-.32,.21-.48,.21-.19,0-.35-.08-.48-.21-.29-.27-.29-.72-.03-.99h0Zm5.39,.43l-3.78,3.76c-.13,.13-.32,.21-.48,.21-.19,0-.35-.08-.48-.21-.27-.27-.27-.72,0-.99l3.78-3.78c.27-.27,.72-.27,.99,0,.24,.3,.24,.75-.03,1.02h0Z"
        fill="#fff"
      />
    </g>
  </g>
    </svg>
  );
};

const Chart2 = () => {
  return (
    <svg
      id="Group_195"
      data-name="Group 195"
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="30 35 613.838 378.853"
    >
        <defs>
    <linearGradient
      id="New_Gradient_Swatch"
      x1="539.98"
      y1="368.32"
      x2="539.98"
      y2="59.16"
      gradientUnits="userSpaceOnUse"
    >
      <stop offset=".64" stopColor="#38b883" />
      <stop offset=".8" stopColor="#18adad" stopOpacity="0" />
      <stop offset=".95" stopColor="#38b883" stopOpacity="0" />
      <stop offset=".95" stopColor="#38b883" stopOpacity=".16" />
      <stop offset=".96" stopColor="#38b883" stopOpacity=".38" />
      <stop offset=".96" stopColor="#38b883" stopOpacity=".57" />
      <stop offset=".97" stopColor="#38b883" stopOpacity=".73" />
      <stop offset=".97" stopColor="#38b883" stopOpacity=".85" />
      <stop offset=".98" stopColor="#38b883" stopOpacity=".93" />
      <stop offset=".99" stopColor="#38b883" stopOpacity=".98" />
      <stop offset="1" stopColor="#38b883" />
    </linearGradient>
  </defs>
  <g id="Layer_2">
    <path
      id="Drawer_bg"
      d="M-307.32,0H662.68c11.05,0,20,12.2,20,27.25V626.54c0,15.05-8.95,27.25-20,27.25H-307.32c-11.05,0-20-12.2-20-27.25V27.25c0-15.05,8.95-27.25,20-27.25Z"
    />
  </g>
  <g id="Layer_1">
    <g>
      <line
        x1="90.97"
        y1="368.32"
        x2="643.6"
        y2="368.32"
        fill="none"
        stroke="#000"
        strokeMiterlimit="10"
      />
      <g>
        <g>
          <text
            transform="translate(63.82 374.73) scale(1.06 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">0 g</tspan>
          </text>
          <text
            transform="translate(37.38 321.2) scale(1.06 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">2 000 g</tspan>
          </text>
          <text
            transform="translate(37.38 267.67) scale(1.06 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">4 000 g</tspan>
          </text>
          <text
            transform="translate(37.38 214.14) scale(1.06 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">6 000 g</tspan>
          </text>
          <text
            transform="translate(37.38 160.62) scale(1.06 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">8 000 g</tspan>
          </text>
          <text
            transform="translate(29.76 107.09) scale(1.06 1)"
            fill="#fff"
            fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
            fontSize="16"
          >
            <tspan x="0" y="0">10 000 g</tspan>
          </text>
        </g>
        <g>
          <g>
            <line
              x1="90.97"
              y1="368.32"
              x2="643.6"
              y2="368.32"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
            <line
              x1="90.97"
              y1="314.79"
              x2="643.6"
              y2="314.79"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
            <line
              x1="90.97"
              y1="261.26"
              x2="643.6"
              y2="261.26"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
            <line
              x1="90.97"
              y1="207.73"
              x2="643.6"
              y2="207.73"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
            <line
              x1="90.97"
              y1="154.21"
              x2="643.6"
              y2="154.21"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
            <line
              x1="90.97"
              y1="100.68"
              x2="643.6"
              y2="100.68"
              fill="none"
              stroke="#7f7f7f"
              strokeMiterlimit="10"
              strokeWidth=".5"
            />
          </g>
          <g>
            <line
              x1="90.97"
              y1="341.55"
              x2="643.6"
              y2="341.55"
              fill="none"
              stroke="#828282"
              strokeMiterlimit="10"
              strokeWidth=".25"
            />
            <line
              x1="90.97"
              y1="288.02"
              x2="643.6"
              y2="288.02"
              fill="none"
              stroke="#828282"
              strokeMiterlimit="10"
              strokeWidth=".25"
            />
            <line
              x1="90.97"
              y1="234.5"
              x2="643.6"
              y2="234.5"
              fill="none"
              stroke="#828282"
              strokeMiterlimit="10"
              strokeWidth=".25"
            />
            <line
              x1="90.97"
              y1="180.97"
              x2="643.6"
              y2="180.97"
              fill="none"
              stroke="#828282"
              strokeMiterlimit="10"
              strokeWidth=".25"
            />
            <line
              x1="90.97"
              y1="127.44"
              x2="643.6"
              y2="127.44"
              fill="none"
              stroke="#828282"
              strokeMiterlimit="10"
              strokeWidth=".25"
            />
          </g>
        </g>
      </g>
      <g>
        <rect x="106.17" y="367.4" width="38.68" height=".92" fill="#fff" />
        <rect x="175.25" y="360.36" width="38.68" height="7.95" fill="#fff" />
        <rect x="244.33" y="352.06" width="38.68" height="16.25" fill="#fff" />
        <rect x="313.41" y="325.49" width="38.68" height="42.82" fill="#fff" />
        <rect
          x="382.48"
          y="247.64"
          width="38.68"
          height="120.68"
          fill="#38b883"
        />
        <rect x="451.56" y="237.17" width="38.68" height="131.14" fill="#fff" />
        <rect
          x="520.64"
          y="59.16"
          width="38.68"
          height="309.16"
          fill="url(#New_Gradient_Swatch)"
        />
        <rect x="589.72" y="144.77" width="38.68" height="223.54" fill="#fff" />
      </g>
    </g>
    <path
      d="M544.55,94.21c.05-.48,.08-.97,.08-1.45-.02-3.74-1.7-7.29-4.58-9.68-2.88-2.39-6.67-3.39-10.36-2.72-3.68,.67-6.89,2.93-8.74,6.18-1.1-.65-2.35-.99-3.63-.99-1.93,0-3.77,.76-5.14,2.13-1.36,1.36-2.13,3.21-2.13,5.14v.68c-2.35,.37-4.36,1.87-5.4,4.01-1.04,2.14-.96,4.65,.2,6.72,1.16,2.07,3.27,3.45,5.63,3.67,2.72,2.22,5.57,2.31,8.29,.27,1.52,1.57,3.6,2.47,5.78,2.5,2.18,.03,4.29-.81,5.84-2.34,1.42,1.31,3.29,2.02,5.23,1.99,1.93-.03,3.78-.81,5.16-2.16,.64,.15,1.3,.25,1.95,.31,2.33-.07,4.48-1.25,5.79-3.18,1.31-1.93,1.61-4.37,.82-6.56-.79-2.19-2.59-3.87-4.83-4.51h.03Z"
      fill="#fff"
    />
    <path
      d="M580.02,93.36c-1.21,3.27-5.41,4.45-8.14,1.91-1.24,5.74-9.05,6.64-11.45,1.06-2.27,.96-5.03-.39-5.49-2.97-5.26-.1-5.51-7.73-.06-8.01-.55-4.84,4.63-7.97,8.44-4.63,1.24-5.74,9.05-6.64,11.45-1.06,1.87-.84,4.25,.08,5.11,1.84,.43-.1,.88-.15,1.33-.15,8.32,.38,8,12.67-1.18,12.01h0Z"
      fill="#fff"
    />
    <text
      transform="translate(117.69 355.52)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">34</tspan>
    </text>
    <text
      transform="translate(184.09 348.85)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">29</tspan>
      <tspan x="14.42" y="0" letterSpacing="-.04em">7</tspan>
    </text>
    <text
      transform="translate(253.17 340.11)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">60</tspan>
      <tspan x="14.4" y="0" letterSpacing="-.04em">7</tspan>
    </text>
    <text
      transform="translate(316.25 312.47)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">1 600</tspan>
    </text>
    <text
      transform="translate(384.51 237.35)"
      fill="#38b883"
      fontFamily="PTSans-NarrowBold, 'PT Sans Narrow'"
      fontSize="16"
      fontWeight="700"
    >
      <tspan x="0" y="0">4 509</tspan>
    </text>
    <text
      transform="translate(454.49 226.31)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">4 900</tspan>
    </text>
    <text
      transform="translate(593.07 134.68)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">8 352</tspan>
    </text>
    <text
      transform="translate(601.97 253.39)"
      fill="#fff"
      fontFamily="PTSans-Narrow, 'PT Sans Narrow'"
      fontSize="16"
    >
      <tspan x="0" y="0">16</tspan>
    </text>
    <text
      transform="translate(509.68 46.28)"
      fill="#38b883"
      fontFamily="PTSans-NarrowBold, 'PT Sans Narrow'"
      fontSize="16"
      fontWeight="700"
    >
      <tspan x="0" y="0">4 503 000</tspan>
    </text>
    <path
      id="car"
      d="M483.39,394.33c-.02-.07-.04-.14-.07-.21l-2.52-5.89c-.65-1.4-2.07-2.28-3.61-2.24h-13.21c-1.54-.04-2.96,.84-3.61,2.24l-2.53,5.89c-.06,.13-.09,.28-.09,.42v11.76c0,.59,.48,1.07,1.07,1.07,0,0,0,0,0,0h2.14c.59,0,1.07-.48,1.07-1.07v-1.07h17.1v1.07c0,.59,.48,1.07,1.07,1.07h2.14c.59,0,1.07-.48,1.07-1.07v-11.76c0-.07,0-.14-.02-.21h0Zm-20.28,6.63c-1.18,0-2.14-.96-2.14-2.14s.96-2.14,2.14-2.14,2.14,.96,2.14,2.14-.96,2.14-2.14,2.14Zm14.96,0c-1.18,0-2.14-.96-2.14-2.14s.96-2.14,2.14-2.14,2.14,.96,2.14,2.14-.96,2.14-2.14,2.14Zm-17.62-7.48l1.89-4.4c.32-.61,.96-.98,1.64-.95h13.21c.69-.03,1.33,.34,1.64,.95l1.89,4.4h-20.27Z"
      fill="#fff"
    />
    <g id="box">
      <path
        id="Path_104"
        d="M401.65,389.7c-.13-.05-.28-.05-.41,0l-6.52,2.61,6.72,2.69,6.72-2.69-6.52-2.61Zm7.44,3.41l-7.1,2.84v8.65l7.1-2.84v-8.65h0Zm-8.19,11.49v-8.65l-7.1-2.84v8.65l7.1,2.84Zm-.06-15.92c.39-.16,.83-.16,1.22,0l7.79,3.11c.21,.08,.34,.28,.34,.51v9.46c0,.45-.27,.85-.69,1.01l-7.85,3.14c-.13,.05-.28,.05-.41,0l-7.85-3.14c-.42-.17-.69-.57-.69-1.01v-9.46c0-.22,.13-.43,.34-.51l7.79-3.11Z"
        fill="#38b883"
        fillRule="evenodd"
        stroke="#18adad"
        strokeWidth=".5"
      />
    </g>
    <g id="box-2">
      <path
        id="Path_104-2"
        d="M540.06,384.82c-.21-.09-.45-.09-.67,0l-10.71,4.28,11.04,4.42,11.04-4.42-10.71-4.28Zm12.23,5.61l-11.66,4.66v14.22l11.66-4.67v-14.21h0Zm-13.46,18.88v-14.22l-11.66-4.66v14.22l11.66,4.67Zm-.1-26.16c.64-.26,1.36-.26,2,0l12.79,5.12c.34,.14,.56,.47,.56,.83v15.54c0,.73-.45,1.39-1.13,1.66l-12.89,5.16c-.21,.09-.45,.09-.67,0l-12.89-5.16c-.68-.27-1.13-.93-1.13-1.67v-15.54c0-.37,.22-.7,.56-.83l12.79-5.12Z"
        fill="#38b883"
        fillRule="evenodd"
      />
    </g>
    <path
      d="M327.77,379.55c.4-.57,1.13-.49,1.13-.49l3.22,3.48h.13s.13,0,.13,0l3.24-3.48s.71-.07,1.12,.49c.4,.57,.16-.99-.73-.99h-7.53c-.89,0-1.13,1.55-.73,.99h0Zm4.49-.49h2.66s-2.61,2.72-2.61,2.72v-.02l-.05,.06-.05-.06v.02l-2.54-2.72h2.59Zm-7.88,30.11h1.63l1.29-2.6h-.91l-2.01,2.6Zm12.98-2.6l1.2,2.6h1.63l-1.93-2.6h-.91Zm-8.16-1.02h6.24v-1.81h-6.24s0,1.81,0,1.81Zm12.52-19.61c0-1.6-6.6-1.72-6.6-1.72l-1.11-1.18-3.43-.02-1.43,1.19s-5.48,.1-6.28,1.72c0,0,.02,16.05,.02,16.88s1.62,2.73,2.73,2.73c1.61,0,2.69,0,2.69,0l-.02-2.7h8.12v2.72s1.42-.03,2.78-.03,2.57-2.39,2.57-2.73c0-1.21-.03-16.88-.03-16.88h0Zm-12.23,.14s0,.04,0,.06c.03-.25,.24-.45,.5-.45h4.59c.26,0,.47,.2,.5,.45,0-.02,0-.04,0-.06v.12s0-.04,0-.06c-.03,.26-.24,.5-.5,.5h-4.59c-.26,0-.47-.24-.5-.5,0,.02,0,.04,0,.06v-.12Zm-3.43,16.12c-.4,0-.72-.33-.72-.73s.32-.73,.72-.73,.72,.33,.72,.73-.33,.73-.72,.73Zm5.85-6.67c0,.56-.46,1.02-1.02,1.02h-6.05c-.56,0-1.02-.46-1.02-1.02v-6.97c0-.56,.46-1.02,1.02-1.02h6.05c.56,0,1.02,.46,1.02,1.02v6.97Zm6.77,6.72c-.4,0-.72-.33-.72-.73s.33-.73,.72-.73,.72,.33,.72,.73c0,.4-.32,.73-.72,.73Zm2.23-6.72c0,.56-.46,1.02-1.02,1.02h-6.07c-.56,0-1.02-.45-1.02-1.02v-6.97c0-.56,.46-1.02,1.02-1.02h6.08c.56,0,1.02,.46,1.02,1.02v6.97Z"
      fill="#fff"
      fillRule="evenodd"
    />
    <path
      d="M255.72,386.53h14.9c2.18,0,3.96,1.78,3.96,3.96v8.23c0,2.18-1.78,3.96-3.96,3.96h-14.9c-2.18,0-3.96-1.78-3.96-3.96v-8.23c0-2.18,1.78-3.96,3.96-3.96h0Zm-2.69,19.94c-.31,0-.55-.25-.55-.55s.25-.55,.55-.55h6.02c.31,0,.55,.25,.55,.55s-.25,.55-.55,.55h-6.02Zm7.96-2.03c0-.31,.25-.55,.55-.55s.55,.25,.55,.55v.92h11.2c.31,0,.55,.25,.55,.55s-.25,.55-.55,.55h-11.2v.93c0,.31-.25,.55-.55,.55s-.55-.25-.55-.55v-2.96Zm.18-13.91l6.04,3.6c.26,.16,.35,.49,.19,.76-.05,.08-.12,.15-.2,.19l-6.09,3.62c-.26,.16-.6,.07-.76-.19-.05-.09-.08-.19-.08-.28h0v-7.26c0-.31,.25-.55,.55-.55,.12,0,.24,.04,.33,.11h0Zm4.68,4.07l-4.46-2.66v5.31l4.46-2.66Z"
      fill="#fff"
      fillRule="evenodd"
    />
    <g>
      <path
        d="M130.62,402.69c0,.12,0,.22-.02,.35,.02-.12,.02-.22,.02-.35Z"
        fill="#fff"
      />
      <path
        d="M132.51,384.73h-.82c-.67-.75-2.79-.85-5.3-.85-2.96,0-5.6,.42-6.49,1.22-.27,.22-.5,.5-.7,.82-1.49,.55-4.1,1.62-4.1,5.47,0,5.57,3.78,9.2,3.78,10.02v1.99c0,1.17,.97,2.24,2.16,2.24h7.69c1.12,0,2.06-.9,2.26-1.96l1.07-13.26c.25-2.39,2.61-5.7,2.61-5.7h-2.16Zm-13.63,12.81c-1.24,0-3.33-8.81,0-9.3v9.3Zm9.95,2.96c0,.22-.15,.4-.37,.4s-.37-.17-.37-.4v-11.37c0-.22,.15-.4,.37-.4s.37,.17,.37,.4v11.37Z"
        fill="#fff"
      />
    </g>
    <g>
      <path
        d="M206.08,386.83h-24.1c-.38,0-.7,.32-.7,.7v15.51c0,.38,.32,.7,.7,.7h11.14v2.31c-1.4,.08-2.71,.38-3.84,.89-.46,.21-.67,.75-.48,1.23,.16,.35,.48,.56,.86,.56,.13,0,.24-.03,.38-.08,1.1-.48,2.52-.75,4-.75s2.92,.27,4,.75c.46,.21,1.02,0,1.23-.48,.21-.46,0-1.02-.48-1.23-1.1-.48-2.42-.78-3.84-.89v-2.31h11.14c.38,0,.7-.32,.7-.7v-15.51c0-.38-.32-.7-.7-.7h0Zm-.7,15.51h-22.7v-14.12h22.7v14.12Z"
        fill="#fff"
      />
      <path
        d="M203.96,389.64h-19.86v11.24h19.86v-11.24Zm-18.06,2.98l1.21-1.21c.27-.27,.72-.27,.99,0s.27,.72,0,.99l-1.21,1.21c-.13,.13-.32,.21-.48,.21-.19,0-.35-.08-.48-.21-.29-.27-.29-.72-.03-.99h0Zm5.39,.43l-3.78,3.76c-.13,.13-.32,.21-.48,.21-.19,0-.35-.08-.48-.21-.27-.27-.27-.72,0-.99l3.78-3.78c.27-.27,.72-.27,.99,0,.24,.3,.24,.75-.03,1.02h0Z"
        fill="#fff"
      />
    </g>
    <path
      id="jcow"
      d="M620.66,390.7h-3.83c.03,3.16-.11,6.31-.42,9.45-.17,2.01-.64,3.99-1.39,5.86-.47,1.21-1.28,2.25-2.35,2.99-1.07,.6-2.28,.89-3.5,.84-1.24,0-2.48-.17-3.68-.51-1.04-.27-2.02-.75-2.87-1.4-.65-.43-1.06-1.14-1.11-1.92,0-.52,0-.91,.01-1.17,0-.26,.04-.61,.1-1.05,.04-.36,.13-.72,.28-1.05,.16-.3,.35-.58,.58-.82,.26-.29,.58-.53,.93-.7-.12-.54-.37-1.41-.76-2.62-.38-1.17-.67-2.37-.86-3.58-.21-1.44-.3-2.89-.28-4.34h-3.83c-.96,.04-1.92-.1-2.83-.4-.63-.22-1.04-.84-1-1.51,.05-.97,.47-1.89,1.17-2.56,.66-.79,1.63-1.26,2.66-1.27,.7,.03,1.38,.18,2.02,.46,.75,.3,1.46,.7,2.11,1.18,.56-1.15,1.51-2.06,2.69-2.56,1.46-.69,3.06-1.03,4.67-1,1.61-.03,3.21,.31,4.67,1,1.18,.5,2.14,1.41,2.69,2.56,.65-.48,1.36-.88,2.11-1.18,.64-.28,1.32-.44,2.02-.46,1.03,.02,2,.48,2.66,1.27,.7,.67,1.12,1.59,1.17,2.56,.04,.67-.37,1.29-1,1.51-.91,.31-1.87,.44-2.83,.4Zm-12.45-5.74c-.52-.01-1.04,.03-1.56,.13-.33,.05-.63,.2-.87,.43-.16,.17-.28,.37-.36,.58-.07,.25-.1,.51-.09,.76,.01,.44,.12,.88,.3,1.29,.2,.48,.42,1,.66,1.56,.34,1.01,.56,2.05,.66,3.11,.22,1.84,.32,3.69,.3,5.54,0,.82-.1,1.64-.31,2.44-.07,.52-.29,1-.64,1.39-1.92,.94-2.87,1.9-2.87,2.87,0,.86,.64,1.55,1.93,2.08,1.42,.55,2.92,.82,4.44,.79,.13-.11,.25-.22,.36-.34,.23-.3,.42-.63,.57-.97,.24-.48,.36-1.02,.36-1.56,.03-2.42,.19-4.84,.48-7.24,.32-2.85,.64-5.35,.96-7.48,.32-2.13,.48-3.29,.48-3.47,0-.54-.47-.99-1.41-1.36-1.08-.39-2.23-.58-3.38-.55Z"
      fill="#fff"
    />
  </g>
    </svg>
  );
};
