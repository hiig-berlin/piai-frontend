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
      viewBox="0 0 609.235 378.853"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_79"
            data-name="Rectangle 79"
            width="609.235"
            height="378.853"
            fill="none"
          />
        </clipPath>
        <clipPath id="clip-path-4">
          <path
            id="Path_118"
            data-name="Path 118"
            d="M564.915,33.9c-6.234,3.787-14.166,8.6-18.389,10.939,2.359-2.021,6.012-5.153,9.663-8.288,3.068-2.633,6.136-5.268,8.434-7.247,4.144-3.57,4.144-3.57,3.927-3.945a.557.557,0,0,0-.326-.246c-.5-.127-1.951.639-14.126,7.977-3.171,1.912-6.627,4.024-8.714,5.2,1.8-2.073,5.013-5.6,7.186-7.981,4.175-4.577,4.175-4.577,3.966-4.938a.5.5,0,0,0-.683-.183l-11.734,6.774c.088-1.427.311-4.339.468-6.292a.5.5,0,0,0-.235-.466.478.478,0,0,0-.522,0s-.36.218-.449.264l.187.409c-.006.06-.01.121-.015.182l-.09.347.06.013c-.512,6.431-.465,6.512-.368,6.68a.5.5,0,0,0,.684.183l9.859-5.693c-.568.625-1.211,1.33-1.867,2.049-8.985,9.854-8.95,9.915-8.676,10.389a.53.53,0,0,0,.317.241c.367.094.467.12,11.142-6.315,3.247-1.957,7.22-4.352,10.03-5.98-5.106,4.4-15.281,13.126-21.381,18.353a.5.5,0,0,0-.108.63.629.629,0,0,0,.35.261c.81.207,5.114-2.238,21.929-12.455,3.334-2.026,6.724-4.085,9.416-5.69-7.7,5.917-22.584,17.3-31.566,24.165a.5.5,0,0,0,.554.83l39.12-22.586C574.78,37.7,556.463,50.835,543.3,60.151a.5.5,0,0,0-.144.659.551.551,0,0,0,.325.245c.534.138,2.142-.742,17.992-10.36,7.22-4.382,16.288-9.893,21.634-12.889-4.214,3.071-11.034,8.042-17.847,13.024-5.511,4.03-11.019,8.068-15.141,11.11-4.194,3.1-5.955,4.4-6.642,5.032l-.147.089.021.033c-.359.36-.3.47-.195.644a.5.5,0,0,0,.308.235.567.567,0,0,0,.384-.056c14.123-8.53,34.541-20.658,41.446-24.3-4,3.152-13.635,9.9-21.708,15.55-20.923,14.647-20.828,14.81-20.43,15.5a.5.5,0,0,0,.306.233.788.788,0,0,0,.381-.053c12.3-7.267,29.235-17.2,38.051-22.205-9.091,6.7-27.552,20.219-38.6,28.3a.5.5,0,0,0,.545.836L580.005,60.9,543.292,87.869a.5.5,0,0,0-.137.654.56.56,0,0,0,.324.246.953.953,0,0,0,.4-.094h0l0,0c3.1-1.154,21.96-12.241,39.366-22.629-8.016,6.188-26.621,19.425-39.953,28.748a.5.5,0,0,0-.131.683.479.479,0,0,0,.678.154c14.227-8.636,34.883-20.947,41.609-24.428-3.73,2.944-12.832,9.281-20.452,14.587-21.529,14.989-22.3,15.813-21.85,16.592a.5.5,0,0,0,.31.235.569.569,0,0,0,.385-.058c14.009-8.612,34.324-20.82,41.312-24.379-6.547,5.091-27.341,20.1-41.865,30.473a.5.5,0,0,0,.541.84l36.169-20.882-36.715,26.974a.5.5,0,0,0-.137.654.637.637,0,0,0,.351.262c1.316.334,20.4-10.988,34.628-19.586l-34.842,25.6a.5.5,0,0,0-.137.653.518.518,0,0,0,.315.238c.4.1.492.127,16.866-9.685,8.268-4.952,18.84-11.287,24.087-14.184-7.257,5.569-27.111,19.893-41.125,29.9a.5.5,0,0,0-.143.657.528.528,0,0,0,.314.239c.044.011.1.027.4-.1l.011.015.059-.045c1.473-.626,7.91-4.083,38.607-22.205-4.606,3.395-11.865,8.486-18.144,12.891-21.751,15.254-21.654,15.423-21.246,16.129a.533.533,0,0,0,.317.241c.246.065.962.254,37.921-21.637-5.047,3.71-12.542,9.074-19.069,13.745-13.971,10-17.944,12.84-18.944,13.872l-.035.037c-.357.381-.287.5-.19.67a.5.5,0,0,0,.684.183l36.171-20.883-36.718,26.975a.5.5,0,0,0,.547.836h0c11.287-6.642,26.441-15.505,35.679-20.808-4.091,2.869-9.313,6.548-14.484,10.241-22.573,16.118-22.237,16.7-21.882,17.314a.518.518,0,0,0,.31.237c.248.064.654.172,37.338-21.33-5.238,3.849-12.816,9.336-19.44,14.131-4.79,3.469-9.324,6.751-12.651,9.18-5.823,4.249-5.823,4.249-5.557,4.71a.526.526,0,0,0,.315.239c.441.116,1.494-.4,22.333-12.738,5.588-3.309,11.6-6.868,15.916-9.374-9.152,6.754-27.456,20.139-38.426,28.148a.5.5,0,0,0,.546.836l34.841-20.116c-3.926,2.8-8.759,6.253-13.551,9.708-22.509,16.226-22.307,16.576-21.974,17.153a.5.5,0,0,0,.684.183l0,0c8.19-4.8,25.6-14.96,35.88-20.875-4.1,2.91-9.38,6.671-14.611,10.435-22.523,16.2-22.3,16.6-21.955,17.188a.561.561,0,0,0,.329.247c.956.248,18.113-9.786,35.283-20.035l-35.475,26.062a.5.5,0,0,0-.137.654.575.575,0,0,0,.332.25c.737.192,5.635-2.6,26.206-14.917,4.989-2.989,10.079-6.038,13.577-8.081-6.452,4.859-19.392,14.15-28.019,20.346-3.408,2.447-6.406,4.6-8.548,6.149-3.8,2.748-3.8,2.748-3.548,3.181a.576.576,0,0,0,.332.25c.745.194,5.825-2.7,27.183-15.471,5.255-3.142,10.627-6.354,13.911-8.257-7.093,5.648-27.146,19.894-41.279,29.747a.5.5,0,0,0,.537.842c11.477-6.659,31-17.969,39.648-22.94-7.124,5.45-22.755,16.566-31.28,22.629-9.306,6.616-9.306,6.616-9.052,7.057a.526.526,0,0,0,.316.24c.253.066.893.236,35.452-20.184-3.918,2.863-8.783,6.418-13.646,9.977-5.511,4.035-11.02,8.075-15.145,11.116-4.067,3-5.847,4.311-6.581,4.965-.075.047-.15.092-.225.137l.029.046c-.358.357-.3.461-.2.631a.51.51,0,0,0,.31.235.475.475,0,0,0,.384-.059c14.6-8.947,36.032-21.789,42.128-24.761-5.691,4.885-29.826,21.818-38.359,27.8-2.208,1.549-3.379,2.37-3.975,2.848l-.3.177.032.055c-.378.344-.32.446-.215.628a.5.5,0,0,0,.683.183L579.1,206.91c-3.986,2.864-8.972,6.456-13.919,10.042-22.476,16.289-22.354,16.5-22.029,17.063a.541.541,0,0,0,.321.243c.669.174,12.1-6.321,34.037-19.322-3.691,2.64-8.043,5.762-12.364,8.881-22.5,16.249-22.331,16.542-21.994,17.126a.632.632,0,0,0,.352.263c1.327.338,20.393-10.975,34.613-19.574l-34.828,25.586a.5.5,0,0,0,.168.887c.049.013.093.025.4-.117l.027.036.21-.153c1.718-.873,8.528-4.77,37.433-21.554-7.85,5.827-21.891,15.982-29.846,21.735-2.479,1.793-4.579,3.312-6.058,4.384-2.7,1.96-2.7,1.96-2.468,2.364a.611.611,0,0,0,.344.258c1.231.314,20.542-11.12,34.831-19.723l-35.038,25.739a.5.5,0,0,0-.119.683.5.5,0,0,0,.677.147c13.218-8.129,32.05-19.458,40.009-23.7L543.292,268a.5.5,0,0,0-.137.653.526.526,0,0,0,.316.24c.441.115,1.3-.3,19.4-11.1,7.531-4.5,16.381-9.78,21.225-12.505-7.52,5.749-26.992,19.788-40.8,29.637a.5.5,0,0,0,.162.89c.051.014.093.026.389-.116l.03.041.263-.188c1.727-.9,8.257-4.67,34.63-19.942-3.936,2.817-8.795,6.3-13.614,9.786-22.5,16.257-22.333,16.544-22,17.115a.522.522,0,0,0,.315.239c.435.113,1.3-.306,19.582-11.2,7.978-4.755,17.444-10.4,21.985-12.916-6.664,5.358-27.293,20.047-41.736,30.144a.5.5,0,0,0,.159.893c.051.013.093.025.386-.115l.029.041.288-.2c1.784-.932,8.53-4.831,35.775-20.6l-36.646,26.92a.5.5,0,0,0,.546.837l39.169-22.615c-8.168,6.221-26.522,19.375-39.708,28.7a.5.5,0,0,0,.552.834c13.929-8.6,34.115-20.771,41.205-24.367-3.643,2.737-11.241,8.156-18.149,13.084-24.2,17.262-24.131,17.38-23.752,18.035a.615.615,0,0,0,.348.26c1.276.325,20.4-11.007,34.65-19.6L565.309,300.3c-5.507,4.043-11.015,8.087-15.143,11.122-2.066,1.518-3.786,2.784-4.988,3.673-2.25,1.659-2.25,1.659-2.023,2.053a.583.583,0,0,0,.337.253c.756.2,5.107-2.285,24.5-13.963,4.686-2.822,9.706-5.846,13.511-8.083l-38.209,28.068a.5.5,0,0,0-.137.654.561.561,0,0,0,.329.247c.581.15,2.636-.965,20.124-11.537,6.469-3.911,13.93-8.442,18.832-11.236-4.251,3.09-10.719,7.8-17.182,12.513-15.743,11.494-20.436,14.921-21.723,16.137-.069.042-.137.085-.207.126l.031.051c-.352.37-.289.48-.2.627a.5.5,0,0,0,.309.234.524.524,0,0,0,.384-.057c14.022-8.527,34.291-20.624,41.321-24.3-3.211,2.5-9.675,7.165-15.56,11.412-20.564,14.839-21.3,15.649-20.862,16.406a.5.5,0,0,0,.683.182h0c7.817-4.577,25.265-14.762,33.675-19.565-16.33,13.408-20.871,17.31-22.033,18.617l-.131.076.026.046c-.339.411-.279.516-.209.637a.5.5,0,0,0,.683.182l23.566-13.605c-2.961,3.14-8.258,8.715-12.164,12.82a.5.5,0,0,0,.612.777l13.357-7.712-2.073,7.132a.5.5,0,0,0,.355.624c.166.043.21.054.715-.237.187-.109.439-.258.783-.465.442-.263,1.111-.661,1.226-.717l-.178-.463.125-.486c-.234-.061-.233-.06-1.686.808l-.032.019,2.074-7.13a.5.5,0,0,0-.731-.572l-11.436,6.6c1.342-1.41,3.093-3.254,4.845-5.1,4.587-4.835,6.362-6.7,7-7.513l.09-.051-.022-.037c.329-.432.28-.516.2-.646a.5.5,0,0,0-.683-.184l-22.333,12.9c5.268-4.486,15.468-12.913,22.9-19a.5.5,0,0,0-.19-.87c-.051-.015-.1-.028-.426.118l-.017-.021-.081.066c-1.467.694-7.432,4.036-33.826,19.468,4.131-3.162,10.925-8.065,16.777-12.286,18.343-13.237,18.263-13.375,17.879-14.04a.613.613,0,0,0-.344-.257c-1.278-.328-21.743,11.822-36.126,20.5,10.216-7.537,27.989-20.466,36.33-26.518a.5.5,0,0,0,.139-.654.6.6,0,0,0-.342-.256c-.8-.206-5.408,2.415-24.641,14.044-4.673,2.826-9.682,5.853-13.465,8.08l38.311-28.143a.5.5,0,0,0,.137-.653.553.553,0,0,0-.325-.245c-.555-.143-2.621.978-20.274,11.611-6.482,3.9-13.974,8.427-18.836,11.206,8.83-6.5,27.942-20.519,39.3-28.847a.5.5,0,0,0-.555-.83c-13.822,8.423-33.725,20.321-41.015,24.153,4.238-3.219,13.4-9.754,21.123-15.263,20.974-14.963,20.945-15.014,20.584-15.641a.7.7,0,0,0-.372-.273c-1.443-.365-18.722,9.889-31.965,17.93,3.216-2.3,6.8-4.862,10.355-7.428,22.514-16.232,22.314-16.579,21.981-17.156a.5.5,0,0,0-.683-.183L551.2,291.144l36.73-26.982a.5.5,0,0,0-.546-.836c-9.617,5.569-24.837,14.37-34.621,20.022,3.9-2.756,8.66-6.132,13.378-9.513,22.554-16.165,22.262-16.67,21.925-17.253a.553.553,0,0,0-.324-.246c-.609-.159-3.816,1.61-25.205,14.358-5.548,3.3-11.211,6.681-14.911,8.826,7.85-5.99,26.786-19.607,40.3-29.209a.5.5,0,0,0-.539-.84h0c-9.88,5.721-25.673,14.87-35.415,20.478,4.014-2.879,9.066-6.511,14.078-10.141,22.485-16.277,22.349-16.513,22.02-17.083a.556.556,0,0,0-.327-.246c-.635-.167-3.867,1.613-25.382,14.457-4.3,2.565-8.668,5.174-12.121,7.206l37.692-27.691a.5.5,0,0,0,.137-.653.665.665,0,0,0-.362-.27c-1.447-.366-20.869,11.21-34.353,19.4l34.578-25.4a.5.5,0,0,0,.119-.681.508.508,0,0,0-.675-.15c-12.86,7.819-30.978,18.639-39.311,23.211l4.205-3.042c27.187-19.663,33.93-24.627,35.452-26.14.053-.032.111-.066.165-.1l-.028-.048c.354-.384.289-.5.209-.635a.5.5,0,0,0-.683-.183h0c-10.273,5.968-27.017,15.671-36.608,21.2l37.154-27.295a.5.5,0,0,0,.119-.682.469.469,0,0,0-.675-.148c-14.059,8.59-34.431,20.784-41.382,24.365,6.471-5.1,27.358-20.116,41.931-30.458a.5.5,0,0,0-.54-.842l-.005,0c-13.318,7.942-32.143,19.041-40.1,23.457,7.628-5.806,26.932-19.742,40.648-29.548a.5.5,0,0,0-.541-.84l-34.426,19.876c35.895-25.26,35.512-25.922,35.109-26.621a.645.645,0,0,0-.358-.265c-1.4-.356-21.049,11.337-35.311,19.988,9.728-7.16,25.624-18.774,35.529-26a.5.5,0,0,0-.544-.837l-.006,0c-12.044,7.143-28.556,16.854-37.505,21.94l2.917-2.074c35.9-25.531,35.679-25.916,35.276-26.614a.5.5,0,0,0-.3-.233c-.252-.068-.337-.087-34.393,19.661,3.786-2.67,8.308-5.871,12.79-9.079,22.559-16.146,22.257-16.67,21.907-17.276a.531.531,0,0,0-.315-.24c-.4-.1-.5-.13-17.59,10.088-7.067,4.226-15.866,9.486-21.365,12.623,1.994-1.437,4.443-3.2,7.043-5.063,32.714-23.491,32.6-23.688,32.226-24.336a.529.529,0,0,0-.318-.241c-.441-.114-1.27.285-18.564,10.641-6.7,4.016-15.024,9-20.34,12.039l39.084-28.714a.5.5,0,0,0,.12-.681.486.486,0,0,0-.673-.151c-13.92,8.36-33.912,20.2-41.13,24.086,6.729-5.335,27.28-20.038,41.674-30.176a.5.5,0,0,0,.145-.659.51.51,0,0,0-.308-.235c-.047-.012-.1-.027-.394.1l-.019-.027-.145.1c-1.621.766-8.37,4.532-38.759,22.317,8.27-6.285,26.413-19.287,39.48-28.528a.5.5,0,0,0-.539-.842L551.4,166.325c4.057-2.964,9.3-6.8,14.535-10.633,5.509-4.036,11.017-8.076,15.143-11.116,7.234-5.331,7.234-5.331,6.982-5.767a.521.521,0,0,0-.315-.24c-.443-.116-1.5.4-22.449,12.8-5.516,3.265-11.444,6.776-15.73,9.266,3.4-2.482,7.934-5.762,12.386-8.986,19.205-13.9,24.468-17.724,25.778-19l.149-.087-.023-.041c.354-.378.29-.49.2-.641a.5.5,0,0,0-.683-.182h0c-13.895,8.16-33.629,19.679-41.006,23.823,6.834-5.527,27.223-19.973,41.544-29.908a.5.5,0,0,0,.147-.661.516.516,0,0,0-.31-.238c-.046-.012-.1-.026-.392.1l-.015-.021-.109.076c-1.493.673-7.678,4.067-35.48,20.382l36.169-26.572a.5.5,0,0,0-.546-.836l-37.152,21.449c3.537-2.562,8.15-5.864,12.684-9.109,25.595-18.315,25.527-18.433,25.151-19.085a.5.5,0,0,0-.306-.233.554.554,0,0,0-.383.054c-13.431,7.979-32.433,19.155-40.286,23.522,4-2.983,11.254-8.074,17.894-12.73,23.636-16.578,23.507-16.8,23.08-17.541a.5.5,0,0,0-.306-.234.384.384,0,0,0-.382.053c-11.856,7.014-28.021,16.5-37.065,21.661,4.22-3.028,10-7.185,15.735-11.337,22.473-16.28,22.35-16.495,22.017-17.071a.588.588,0,0,0-.336-.252c-.792-.205-6.266,2.909-27.9,15.87-3.177,1.9-6.4,3.836-9.136,5.461l37.23-27.353a.5.5,0,0,0,.12-.682.509.509,0,0,0-.676-.148c-13.033,7.959-31.491,19.014-39.648,23.439l40.2-29.537a.5.5,0,0,0-.545-.836l-35.215,20.332c3.978-2.859,8.948-6.436,13.88-10.008,22.472-16.28,22.348-16.494,22.017-17.069a.67.67,0,0,0-.362-.269c-1.578-.4-24.888,13.622-38.154,21.712,4.262-3.092,10.369-7.345,16.04-11.293,22.149-15.423,22.941-16.271,22.475-17.078a.6.6,0,0,0-.342-.256c-1.131-.29-18.319,9.819-32.254,18.181,3.3-2.338,7-4.97,10.679-7.606C588.677,63.687,588.4,63.209,588.051,62.6a.505.505,0,0,0-.308-.234.609.609,0,0,0-.382.055c-12.494,7.476-29.855,17.744-38.512,22.6l39.064-28.7a.5.5,0,0,0-.546-.836l-36.024,20.8c4.061-2.973,9.32-6.823,14.577-10.677,5.508-4.037,11.013-8.077,15.139-11.115,7.234-5.329,7.234-5.329,6.99-5.752a.518.518,0,0,0-.312-.237c-.25-.066-.815-.218-38.313,21.884,3.969-2.872,9.547-6.778,14.734-10.407,23.439-16.412,24.35-17.371,23.891-18.167a.578.578,0,0,0-.335-.252c-1.111-.285-20.421,11.1-36.055,20.481,10.221-7.535,27.925-20.445,36.25-26.5a.5.5,0,0,0,.138-.654.654.654,0,0,0-.355-.266c-1-.254-7.872,3.765-26.738,15.216-3.3,2-6.637,4.026-9.5,5.745,4.1-2.921,9.385-6.7,14.624-10.476,22.5-16.228,22.3-16.574,21.97-17.146a.5.5,0,0,0-.683-.184L550.042,49.328c3.376-2.58,7.757-5.932,12.138-9.285,4.571-3.5,9.14-7,12.565-9.63,6.053-4.652,6.053-4.652,5.819-5.057a.54.54,0,0,0-.324-.245.373.373,0,0,0-.1-.012c-.6,0-2.568,1.114-15.226,8.806"
            fill="none"
          />
        </clipPath>
      </defs>
      <g id="Group_182" data-name="Group 182" clipPath="url(#clip-path)">
        <path
          id="Line_47"
          data-name="Line 47"
          d="M551.073.5H0v-1H551.073Z"
          transform="translate(53.89 334.464)"
          fill="#1a1818"
        />
        <text
          id="_0_kWh"
          data-name="0 kWh"
          transform="translate(7.801 340.874)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            0 kWh
          </tspan>
        </text>
        <text
          id="_5_kWh"
          data-name="5 kWh"
          transform="translate(7.801 273.962)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            5 kWh
          </tspan>
        </text>
        <g id="Group_173" data-name="Group 173">
          <g id="Group_172" data-name="Group 172" clipPath="url(#clip-path)">
            <text
              id="_10_kWh"
              data-name="10 kWh"
              transform="translate(0 207.056)"
              fill="#fff"
              fontSize="16"
              fontFamily="PTSans-Narrow, PT Sans Narrow"
            >
              <tspan x="0" y="0">
                10 kWh
              </tspan>
            </text>
            <text
              id="_15_kWh"
              data-name="15 kWh"
              transform="translate(0 140.144)"
              fill="#fff"
              fontSize="16"
              fontFamily="PTSans-Narrow, PT Sans Narrow"
            >
              <tspan x="0" y="0">
                15 kWh
              </tspan>
            </text>
            <text
              id="_20_kWh"
              data-name="20 kWh"
              transform="translate(0 73.232)"
              fill="#fff"
              fontSize="16"
              fontFamily="PTSans-Narrow, PT Sans Narrow"
            >
              <tspan x="0" y="0">
                20 kWh
              </tspan>
            </text>
          </g>
        </g>
        <path
          id="Line_48"
          data-name="Line 48"
          d="M551.073.25H0v-.5H551.073Z"
          transform="translate(53.89 334.464)"
          fill="#808386"
        />
        <path
          id="Line_49"
          data-name="Line 49"
          d="M551.073.25H0v-.5H551.073Z"
          transform="translate(53.89 267.555)"
          fill="#808386"
        />
        <path
          id="Line_50"
          data-name="Line 50"
          d="M551.073.25H0v-.5H551.073Z"
          transform="translate(53.89 200.646)"
          fill="#808386"
        />
        <path
          id="Line_51"
          data-name="Line 51"
          d="M551.073.25H0v-.5H551.073Z"
          transform="translate(53.89 133.737)"
          fill="#808386"
        />
        <path
          id="Line_52"
          data-name="Line 52"
          d="M456.747.25H0v-.5H456.747Z"
          transform="translate(53.89 66.828)"
          fill="#808386"
        />
        <path
          id="Line_53"
          data-name="Line 53"
          d="M551.073.125H0v-.25H551.073Z"
          transform="translate(53.89 301.009)"
          fill="#838588"
        />
        <path
          id="Line_54"
          data-name="Line 54"
          d="M551.073.125H0v-.25H551.073Z"
          transform="translate(53.89 234.1)"
          fill="#838588"
        />
        <path
          id="Line_55"
          data-name="Line 55"
          d="M551.073.125H0v-.25H551.073Z"
          transform="translate(53.89 167.191)"
          fill="#838588"
        />
        <path
          id="Line_56"
          data-name="Line 56"
          d="M456.747.125H0v-.25H456.747Z"
          transform="translate(53.89 100.282)"
          fill="#838588"
        />
        <rect
          id="Rectangle_71"
          data-name="Rectangle 71"
          width="44.086"
          height="1.472"
          transform="translate(71.21 332.992)"
          fill="#fff"
        />
        <rect
          id="Rectangle_72"
          data-name="Rectangle 72"
          width="44.086"
          height="12.713"
          transform="translate(149.935 321.751)"
          fill="#fff"
        />
        <rect
          id="Rectangle_73"
          data-name="Rectangle 73"
          width="44.086"
          height="26.095"
          transform="translate(228.659 308.369)"
          fill="#fff"
        />
        <g id="Group_175" data-name="Group 175">
          <g id="Group_174" data-name="Group 174" clipPath="url(#clip-path)">
            <path
              id="Path_116"
              data-name="Path 116"
              d="M320.888,334.975a.536.536,0,0,1-.145-.022.527.527,0,0,1-.329-.248c-.222-.385.109-.71.375-.971.214-.21.527-.494.956-.867.777-.676,1.934-1.641,3.438-2.869,2.528-2.064,6.076-4.9,10.544-8.437,3.377-2.671,6.781-5.344,9.53-7.5-3.988,2.333-9.349,5.464-14.69,8.572-6.155,3.582-11.079,6.431-14.634,8.468-2.112,1.21-3.759,2.144-4.894,2.775-.613.341-1.09.6-1.418.773-.542.284-.692.355-.912.3a.509.509,0,0,1-.308-.235.5.5,0,0,1,.135-.652l36.255-26.826c-10.065,5.781-28.582,16.564-37.125,21.55a.5.5,0,0,1-.548-.835L344.207,300.7c-9.606,5.535-26.288,15.2-36.542,21.156a.5.5,0,0,1-.547-.835L345,293.191c-4.813,2.787-11.5,6.726-17.358,10.181-5.147,3.034-10.009,5.9-13.7,8.049-1.983,1.155-3.449,2-4.48,2.578-.56.315-1,.554-1.3.712-.51.267-.662.328-.872.273a.5.5,0,0,1-.173-.889l37.519-27.565c-3.957,2.306-9.064,5.315-13.844,8.132-5.555,3.274-11.3,6.659-15.639,9.181-2.342,1.361-4.08,2.358-5.313,3.047-2.235,1.249-2.314,1.228-2.548,1.167a.506.506,0,0,1-.312-.238.5.5,0,0,1,.14-.655c12.4-8.957,29.346-21.268,38.131-27.791l-37.588,21.7a.5.5,0,0,1-.546-.836l36.711-26.972-36.165,20.88a.5.5,0,0,1-.554-.83l29.376-22.53c-2.976,1.79-6.512,3.909-10.056,6.011-5.211,3.091-9.417,5.54-12.5,7.28-5.979,3.373-6.313,3.288-6.609,3.212a.542.542,0,0,1-.339-.254c-.213-.369.094-.713.277-.919s.42-.444.764-.773c.618-.591,1.542-1.427,2.747-2.485,2.023-1.777,4.868-4.209,8.456-7.228,3.013-2.536,6.057-5.069,8.374-6.991-5.138,2.945-13.643,7.934-19.931,11.648a.5.5,0,0,1-.688-.182c-.176-.308.022-.548.181-.74.089-.108.223-.265.4-.468.322-.374.8-.919,1.414-1.619,1.036-1.178,2.485-2.814,4.306-4.863,1.616-1.818,3.245-3.646,4.439-4.983-1.192.711-2.65,1.607-3.874,2.361-1.458.9-2.965,1.823-4.106,2.5-.618.366-1.085.632-1.428.814-.58.308-.786.374-1,.319a.517.517,0,0,1-.324-.244.5.5,0,0,1-.065-.292c.168-1.995.406-5,.484-6.386a.5.5,0,0,1-.235-.933l.5-.289a.5.5,0,0,1,.683.184c.1.179.134.234-.151,3.956-.078,1.022-.161,2.045-.217,2.729,1.139-.625,3.506-2.081,5.338-3.208,6.026-3.706,6.344-3.825,6.718-3.73a.519.519,0,0,1,.325.244.5.5,0,0,1-.06.584c-3.379,3.781-7.972,8.938-10.538,11.854,2.333-1.374,5.932-3.49,9.519-5.585,3.534-2.064,6.366-3.7,8.417-4.876,1.22-.7,2.175-1.233,2.838-1.6,1.23-.672,1.31-.682,1.53-.625a.512.512,0,0,1,.31.237.5.5,0,0,1-.116.635c-.059.048-5.956,4.9-11.893,9.894-6.225,5.232-9.372,7.986-10.953,9.434,2.258-1.177,7-3.831,16.918-9.717,8.722-5.177,17.279-10.381,17.364-10.433a.5.5,0,0,1,.564.824l-30.479,23.376,37.409-21.6a.5.5,0,0,1,.546.836l-36.711,26.972,36.168-20.882a.5.5,0,0,1,.683.184.591.591,0,0,1-.2.742c-.085.079-.207.184-.375.321-.308.252-.773.616-1.383,1.084-1.129.865-2.8,2.117-4.964,3.721-3.644,2.7-8.741,6.436-15.149,11.1-5.566,4.055-11.176,8.124-15.351,11.148,4.542-2.639,10.535-6.17,15.83-9.291,5.349-3.152,10.4-6.13,14.284-8.389,2.088-1.215,3.633-2.1,4.722-2.714.593-.333,1.055-.585,1.374-.752.533-.277.691-.342.9-.285a.5.5,0,0,1,.173.89l-37.405,27.481c3.716-2.169,8.4-4.93,12.8-7.52,5.734-3.38,11.664-6.874,16.2-9.509,2.452-1.425,4.274-2.469,5.57-3.192.708-.4,1.261-.7,1.645-.893.648-.334.811-.386,1.022-.331a.507.507,0,0,1,.313.238.5.5,0,0,1-.137.653l-36.581,26.876c3.972-2.3,8.978-5.2,13.959-8.088,6.381-3.694,11.472-6.635,15.132-8.743,2.173-1.252,3.86-2.219,5.012-2.876.62-.353,1.1-.624,1.421-.8.169-.094.3-.166.388-.214a.634.634,0,0,1,.506-.111.5.5,0,0,1,.167.886l-36.432,26.766c3.931-2.29,8.849-5.151,13.746-7.994,6.37-3.7,11.459-6.64,15.126-8.746,2.178-1.251,3.873-2.217,5.036-2.871.627-.353,1.114-.622,1.445-.8.56-.3.693-.373.914-.314a.5.5,0,0,1,.17.886L315.219,330.36c9.725-5.572,27.719-16.09,35.987-20.938a.5.5,0,0,1,.56.826c-.074.057-7.456,5.8-14.877,11.668-7.248,5.728-11.188,8.923-13.3,10.689,2.2-1.2,6.119-3.439,13.074-7.555,7.3-4.323,14.466-8.655,14.537-8.7a.5.5,0,0,1,.6.79l-15.229,14.465c1.5-.906,3.277-1.974,5.058-3.033,2.65-1.576,4.792-2.824,6.366-3.711,3.133-1.764,3.315-1.718,3.568-1.654a.524.524,0,0,1,.328.246c.168.291.017.568-.233,1.027-.164.3-.412.728-.736,1.269-.542.9-1.309,2.144-2.278,3.686-.806,1.281-1.621,2.562-2.246,3.541l4.813-2.779a.5.5,0,1,1,.5.866l-6.593,3.806a.5.5,0,0,1-.67-.7c1.9-2.949,4.725-7.407,5.942-9.477-1.188.622-3.617,1.984-8.566,4.93-4.394,2.616-8.667,5.227-8.709,5.253a.5.5,0,0,1-.605-.789L347.8,319.572c-2.861,1.72-6.936,4.16-11.018,6.574-4.374,2.587-7.9,4.638-10.481,6.1C322.043,334.648,321.213,334.975,320.888,334.975Z"
              fill="#fff"
            />
            <rect
              id="Rectangle_74"
              data-name="Rectangle 74"
              width="44.086"
              height="193.768"
              transform="translate(386.109 140.695)"
              fill="#1d9f9d"
            />
            <path
              id="Path_117"
              data-name="Path 117"
              d="M472.6,334.96a.508.508,0,0,1-.435-.251c-.231-.4.124-.736.436-1.032.249-.236.63-.567,1.131-.985.921-.768,2.293-1.864,4.076-3.257,3-2.342,7.206-5.559,12.506-9.563,4.071-3.075,8.175-6.152,11.462-8.61l-36.667,21.17a.5.5,0,0,1-.535-.844c.107-.074,10.8-7.506,21.523-15.153,6.293-4.49,11.362-8.174,15.064-10.951,2.195-1.646,3.926-2.985,5.146-3.982.22-.18.418-.343.6-.493-1.293.683-3.4,1.861-6.816,3.864-4.75,2.785-10.686,6.369-16.427,9.834-4.764,2.876-9.264,5.592-12.656,7.593-5.754,3.392-5.952,3.341-6.253,3.264a.52.52,0,0,1-.324-.244c-.249-.431.178-.828.46-1.091s.691-.6,1.26-1.05c1.024-.8,2.524-1.918,4.587-3.407,3.834-2.766,8.938-6.339,14.342-10.121,5.544-3.88,11.276-7.893,15.672-11.065,1.816-1.31,3.283-2.389,4.446-3.271-2.876,1.7-6.995,4.2-11.033,6.647-6.159,3.734-13.139,7.966-18.715,11.229-3.044,1.782-5.348,3.088-7.045,3.992-.937.5-1.689.877-2.235,1.119-.847.377-1.147.416-1.379.356a.575.575,0,0,1-.36-.268.5.5,0,0,1,.137-.653c10.12-7.422,26.4-19.366,36.072-26.476l-.715.429c-6.216,3.733-14.728,8.845-21.717,12.928-12.545,7.33-13.06,7.2-13.435,7.1a.551.551,0,0,1-.343-.258.513.513,0,0,1,.106-.639c.029-.029.066-.062.117-.106.085-.072.207-.171.373-.3.31-.244.777-.6,1.389-1.062,1.134-.855,2.808-2.1,4.975-3.7,3.648-2.694,8.746-6.434,15.15-11.114,5.166-3.775,10.367-7.566,14.422-10.52l-35.849,20.7a.5.5,0,0,1-.683-.183.627.627,0,0,1,.194-.764c.1-.1.238-.223.432-.386.351-.294.885-.716,1.587-1.252,1.283-.981,3.134-2.353,5.659-4.2,4.667-3.407,10.818-7.823,16.766-12.093,5.434-3.9,11.313-8.122,15.171-10.947-3.3,1.851-8.806,5.018-17.932,10.371-10.6,6.22-21.083,12.457-21.187,12.52a.5.5,0,0,1-.689-.18c-.256-.444.183-.9.446-1.172.3-.307.736-.706,1.345-1.219,1.1-.928,2.753-2.225,4.911-3.855,3.626-2.74,8.736-6.465,15.186-11.071,3.137-2.24,6.292-4.475,9.2-6.527-2.433,1.473-5.021,3.033-7.617,4.585-6.247,3.735-11.307,6.691-15.041,8.785-2.222,1.246-3.994,2.2-5.268,2.831-2.092,1.038-2.516,1.06-2.795.99a.588.588,0,0,1-.371-.274.5.5,0,0,1,.143-.658c.107-.076,10.78-7.656,21.484-15.383,6.286-4.537,11.353-8.236,15.059-10.994,1.13-.841,2.088-1.561,2.9-2.176-11.542,6.661-38.559,22.267-38.9,22.466a.5.5,0,0,1-.683-.183c-.245-.425.169-.813.5-1.125.3-.28.757-.67,1.363-1.16,1.113-.9,2.774-2.178,4.935-3.8,3.634-2.723,8.739-6.453,15.172-11.087,6.666-4.8,13.409-9.6,17.689-12.639-1.557.866-3.473,1.966-5.809,3.335-5.612,3.289-12.513,7.467-18.6,11.154-3.856,2.335-7.5,4.54-10.121,6.1-4.425,2.629-4.53,2.6-4.812,2.53a.508.508,0,0,1-.316-.239.5.5,0,0,1,.144-.659c.107-.075,10.78-7.622,21.484-15.331,6.286-4.527,11.352-8.222,15.058-10.984,1.259-.938,2.3-1.726,3.17-2.388l-39.173,22.616a.5.5,0,0,1-.546-.836l38.564-28.332c-3.379,1.915-8.642,4.951-16.8,9.727-10.613,6.217-21.113,12.447-21.218,12.51a.5.5,0,0,1-.551-.833l36.317-26.68c-3.9,2.278-8.747,5.108-13.58,7.919-6.361,3.7-11.448,6.644-15.12,8.748-2.182,1.25-3.882,2.215-5.054,2.868-.633.352-1.125.621-1.463.8-.554.291-.709.365-.928.307a.509.509,0,0,1-.308-.235.586.586,0,0,1,.208-.744c.085-.076.207-.179.374-.313.309-.249.775-.611,1.385-1.075,1.131-.861,2.8-2.111,4.969-3.714,3.646-2.7,8.743-6.435,15.151-11.109,5.05-3.683,10.135-7.38,14.152-10.3-3.9,2.262-8.72,5.055-13.513,7.83-6.389,3.7-11.482,6.641-15.137,8.746-2.171,1.25-3.853,2.215-5,2.868-.617.352-1.091.62-1.409.8-.169.094-.293.163-.381.209l-.113.059a.507.507,0,0,1-.685-.183c-.239-.415.14-.744.542-1.092.3-.264.767-.639,1.375-1.116,1.122-.88,2.788-2.143,4.952-3.754,3.64-2.71,8.741-6.443,15.16-11.1,6.17-4.473,12.4-8.955,16.674-12.025-.575.323-1.206.681-1.9,1.075-3.737,2.128-8.782,5.06-14.994,8.717-10.579,6.227-21.015,12.478-21.12,12.54a.5.5,0,0,1-.544-.838c.107-.075,10.783-7.582,21.488-15.27,6.286-4.514,11.352-8.205,15.056-10.971,1.512-1.129,2.715-2.043,3.67-2.782-3.093,1.793-7.5,4.362-12.049,7.012-6.127,3.571-13.072,7.618-18.4,10.7-2.9,1.677-5.049,2.914-6.576,3.781-2.759,1.567-2.775,1.563-3.029,1.495a.505.505,0,0,1-.306-.235c-.219-.38.116-.678.3-.839.145-.129.356-.3.646-.536.534-.426,1.339-1.045,2.392-1.838,1.874-1.412,4.633-3.451,8.2-6.062,6.572-4.81,14.769-10.744,21.356-15.511,2.546-1.843,4.942-3.577,6.863-4.971-.852.47-1.857,1.033-3.042,1.706-3.743,2.124-8.782,5.06-14.978,8.724-10.551,6.24-20.937,12.515-21.04,12.577a.5.5,0,0,1-.692-.178c-.277-.48.1-1,1.769-2.423,1.1-.936,2.746-2.238,4.9-3.872,3.623-2.744,8.733-6.467,15.187-11.064,2.995-2.133,6.008-4.261,8.809-6.229-2.31,1.4-4.751,2.868-7.2,4.331-6.246,3.734-11.305,6.689-15.038,8.783-2.221,1.246-3.993,2.2-5.267,2.83-2.091,1.037-2.515,1.06-2.794.99a.588.588,0,0,1-.371-.274.594.594,0,0,1,.159-.739c.085-.092.208-.208.376-.356.3-.267.765-.645,1.372-1.123,1.121-.883,2.786-2.149,4.949-3.761,3.639-2.712,8.739-6.444,15.16-11.095,4.925-3.567,9.888-7.138,13.865-9.993l-35.2,20.322a.5.5,0,0,1-.683-.184c-.259-.449.207-.892.515-1.184.323-.307.8-.713,1.466-1.239,1.189-.944,2.925-2.241,5.305-3.965,4.405-3.191,10.338-7.348,16.076-11.369,5.217-3.656,10.145-7.109,13.976-9.866.718-.517,1.361-.983,1.935-1.4l-38.591,22.28a.5.5,0,0,1-.683-.183c-.244-.423.156-.793.508-1.119.3-.277.759-.665,1.364-1.152,1.114-.9,2.775-2.171,4.937-3.789,3.634-2.72,8.737-6.45,15.166-11.086,5.814-4.193,11.685-8.385,15.929-11.406l-.755.443c-4.009,2.358-9.254,5.524-14.326,8.585-5.274,3.183-10.727,6.474-14.837,8.886-7.026,4.123-7.33,4.045-7.652,3.962a.536.536,0,0,1-.334-.251.5.5,0,0,1,.137-.653c.309-.227,22.033-16.185,34.847-25.6-3.473,2.1-7.538,4.545-11.613,6.971-6.264,3.728-11.328,6.681-15.051,8.776-7.181,4.041-7.634,3.926-7.964,3.842a.566.566,0,0,1-.356-.265.5.5,0,0,1,.137-.653l35.915-26.386c-3.787,2.236-8.412,4.961-13.031,7.667-6.331,3.708-11.411,6.653-15.1,8.754-2.192,1.249-3.911,2.21-5.109,2.857-.649.35-1.159.616-1.518.79-.586.285-.769.338-.977.284a.513.513,0,0,1-.317-.24.5.5,0,0,1,.142-.657c.107-.076,10.777-7.692,21.479-15.437,8.842-6.4,14.256-10.388,17.543-12.861-4.238,2.452-10.369,6-16.456,9.518-6.389,3.693-11.481,6.634-15.134,8.741-2.169,1.251-3.849,2.218-4.993,2.874-.615.353-1.087.623-1.4.8l-.374.211-.1.057a.5.5,0,0,1-.7-.166l-.005-.009c-.24-.416.153-.763.532-1.1.3-.268.764-.647,1.371-1.127,1.12-.885,2.784-2.151,4.946-3.764,3.638-2.713,8.738-6.445,15.159-11.093,4.321-3.128,8.672-6.259,12.361-8.907-3.4,2.022-7.313,4.344-11.227,6.649-6.307,3.715-11.381,6.662-15.081,8.761-7.142,4.051-7.429,3.976-7.733,3.9a.528.528,0,0,1-.328-.247c-.241-.417.167-.782.527-1.1.3-.27.763-.651,1.37-1.133,1.118-.888,2.782-2.156,4.944-3.769,3.637-2.714,8.737-6.445,15.16-11.09,4.884-3.532,9.807-7.068,13.769-9.905l-35.086,20.256a.5.5,0,0,1-.686-.188.506.506,0,0,1,.125-.641l.074-.061c.053-.043.133-.1.239-.185.2-.153.5-.379.9-.674.744-.555,1.849-1.374,3.286-2.434,2.517-1.858,6.14-4.521,10.766-7.915,8.355-6.131,18.08-13.25,23.891-17.5l.929-.68c-1.436.8-3.218,1.818-5.4,3.1-5.13,3.011-11.65,6.971-17.4,10.464-4.343,2.637-8.445,5.129-11.478,6.927-5.128,3.042-5.3,3-5.6,2.922a.518.518,0,0,1-.323-.244.5.5,0,0,1,.137-.653l40.1-29.463c-.968.525-2.159,1.184-3.623,2.013-3.747,2.12-8.78,5.057-14.959,8.73-10.523,6.255-20.858,12.558-20.961,12.621a.5.5,0,0,1-.562-.826c10.905-8.23,26.067-19.737,32.889-25.052-.952.541-2.126,1.217-3.574,2.063-4.087,2.387-9.148,5.408-14.042,8.33-3.829,2.286-7.446,4.446-10.135,6.024-1.44.845-2.506,1.46-3.258,1.88-.415.232-.728.4-.956.516-.356.18-.534.253-.742.2a.506.506,0,0,1-.314-.238.5.5,0,0,1,.107-.629l21.624-18.592c-1.882,1.048-4.839,2.751-9.479,5.51-5.82,3.46-11.5,6.925-11.559,6.96a.5.5,0,0,1-.693-.177.593.593,0,0,1,.114-.682c.062-.081.151-.189.273-.332.216-.253.535-.612.974-1.1.82-.907,1.969-2.155,3.186-3.477,2-2.168,4.664-5.066,6.344-6.982-1.08.652-2.422,1.459-3.767,2.258-1.785,1.06-3.227,1.9-4.287,2.5-2.164,1.219-2.289,1.187-2.517,1.129a.514.514,0,0,1-.321-.242.5.5,0,0,1-.065-.288c.154-2,.376-4.994.465-6.391a.5.5,0,0,1-.184-.949l.169-.1c.389-.23.47-.278.679-.223a.5.5,0,0,1,.306.235c.09.159.09.159.006,1.443-.04.6-.1,1.438-.175,2.481s-.155,2.086-.207,2.776c1.983-1.029,7.906-4.574,11.7-6.887a.5.5,0,0,1,.694.178c.207.361-.02.693-.725,1.55-.436.53-1.066,1.256-1.926,2.22-1.573,1.762-3.632,4-5.448,5.971-.813.883-1.638,1.778-2.35,2.558,2.292-1.388,5.722-3.456,9.163-5.5,3.5-2.076,6.319-3.721,8.392-4.889,4.074-2.3,4.306-2.236,4.575-2.167a.53.53,0,0,1,.332.25.5.5,0,0,1-.107.628l-20.871,17.945c2.8-1.642,6.674-3.954,10.475-6.223,5.049-3.015,10.27-6.132,14.418-8.549,7.21-4.2,7.459-4.138,7.774-4.056a.524.524,0,0,1,.325.246.553.553,0,0,1-.176.719c-.071.069-.174.16-.314.279-.256.218-.643.533-1.15.937-.938.748-2.324,1.832-4.121,3.222-3.025,2.338-7.255,5.576-12.573,9.622-3.709,2.822-7.442,5.653-10.563,8.016,3.764-2.272,8.405-5.061,13.057-7.824,6.271-3.725,11.337-6.676,15.055-8.772,2.212-1.247,3.967-2.2,5.218-2.837,2.066-1.051,2.434-1.083,2.7-1.014a.558.558,0,0,1,.35.261.5.5,0,0,1-.137.652l-37.521,27.567c2.85-1.707,6.273-3.786,9.644-5.833,5.889-3.576,12.563-7.63,17.756-10.671,2.826-1.655,4.962-2.866,6.532-3.7,2.6-1.384,3.065-1.433,3.368-1.355a.574.574,0,0,1,.36.268.506.506,0,0,1-.157.668l-.322.236-.978.717-3.571,2.614c-7.316,5.355-23.083,16.9-32.2,23.61l36.549-21.1a.5.5,0,0,1,.54.84c-.107.076-10.775,7.672-21.476,15.406-6.284,4.542-11.348,8.241-15.053,11-2.035,1.513-3.51,2.631-4.579,3.457,1.089-.593,2.543-1.4,4.482-2.5,3.738-2.126,8.78-5.059,14.986-8.717,10.57-6.229,20.99-12.483,21.094-12.546a.5.5,0,0,1,.548.836c-.107.076-10.776,7.686-21.478,15.428-9.065,6.558-14.529,10.586-17.789,13.046,9.048-5.214,27.621-15.956,38.727-22.385a.5.5,0,0,1,.684.183.6.6,0,0,1-.158.739c-.085.092-.208.209-.376.358-.3.267-.765.645-1.372,1.124-1.12.884-2.785,2.149-4.948,3.761-3.638,2.712-8.738,6.444-15.159,11.093-5.858,4.242-11.77,8.49-16.013,11.531,3.392-1.928,8.494-4.876,16.133-9.352,10.609-6.216,21.1-12.446,21.206-12.508a.5.5,0,0,1,.551.833l-40.293,29.6c1.007-.541,2.267-1.236,3.843-2.126,3.75-2.119,8.781-5.057,14.955-8.734,10.515-6.263,20.836-12.581,20.939-12.644a.5.5,0,0,1,.708.2.507.507,0,0,1-.181.651l-.463.341-1.4,1.027-4.988,3.665-15.136,11.12-16.808,12.347c.574-.333,1.207-.7,1.9-1.113,4.055-2.385,9.346-5.578,14.463-8.666,5.229-3.156,10.637-6.42,14.7-8.8,6.942-4.075,7.242-4,7.56-3.916a.535.535,0,0,1,.333.251.5.5,0,0,1-.144.658c-.107.075-10.777,7.629-21.479,15.341-6.284,4.528-11.349,8.224-15.054,10.984-1.223.911-2.243,1.68-3.095,2.329l39.09-22.569a.5.5,0,0,1,.683.183c.249.432-.182.833-.468,1.1s-.7.614-1.284,1.069c-1.043.819-2.57,1.955-4.669,3.47-3.9,2.816-9.07,6.439-14.544,10.275s-11.14,7.806-15.467,10.929c-1.369.988-2.536,1.842-3.522,2.577l39.271-22.673a.5.5,0,0,1,.541.84c-.107.076-10.779,7.7-21.482,15.443-12.259,8.874-17.932,13.114-20.479,15.1l.247-.124c1.314-.663,3.108-1.635,5.332-2.888,3.754-2.115,8.782-5.057,14.945-8.744,10.5-6.28,20.782-12.63,20.884-12.693a.5.5,0,0,1,.547.837c-.107.074-10.814,7.467-21.536,15.092-6.3,4.477-11.363,8.157-15.062,10.937-1.6,1.205-2.959,2.248-4.047,3.114,4.09-2.459,10.826-6.5,17.573-10.484,6.294-3.72,11.365-6.669,15.074-8.767,7.157-4.048,7.5-3.958,7.812-3.879a.539.539,0,0,1,.336.252.507.507,0,0,1-.172.687c-.038.031-.1.075-.172.133-.143.109-.351.263-.637.474-.525.387-1.3.952-2.367,1.728-2.016,1.466-4.826,3.5-8.08,5.855-8.381,6.067-20.744,15.015-27.6,20.112,5.7-3.278,14.68-8.513,21.937-12.742,4.366-2.544,8.491-4.948,11.483-6.684,1.6-.927,2.767-1.6,3.575-2.065.436-.249.771-.44,1-.565.437-.243.528-.294.736-.239a.5.5,0,0,1,.305.233c.249.431-.176.839-.486,1.138s-.754.681-1.358,1.175c-1.11.907-2.768,2.189-4.928,3.811-3.632,2.727-8.737,6.455-15.173,11.081-4.1,2.943-8.221,5.885-11.787,8.417,3.253-1.931,6.932-4.109,10.611-6.273,6.313-3.714,11.389-6.662,15.088-8.761,7.14-4.053,7.4-3.984,7.71-3.9a.524.524,0,0,1,.326.246.5.5,0,0,1-.142.656c-.107.076-10.782,7.714-21.487,15.471-9,6.519-14.446,10.534-17.716,12.993,9.075-5.218,27.606-15.959,38.663-22.377a.5.5,0,0,1,.544.837c-9.089,6.581-29.4,21.331-38.89,28.385,9.709-5.547,29.457-17.085,38.344-22.293a.5.5,0,0,1,.549.834l-35.94,26.4c3.793-2.239,8.43-4.97,13.06-7.68,6.334-3.708,11.415-6.654,15.1-8.756,2.192-1.249,3.91-2.211,5.108-2.858,2.153-1.164,2.266-1.134,2.491-1.075a.512.512,0,0,1,.317.24.5.5,0,0,1-.137.653l-36.724,26.98,36.179-20.888a.5.5,0,0,1,.683.183c.245.424-.171.811-.5,1.122-.3.279-.758.668-1.363,1.156-1.114.9-2.775,2.175-4.936,3.793-3.635,2.721-8.739,6.452-15.171,11.087-4.728,3.407-9.493,6.814-13.392,9.591,1.669-1.007,3.437-2.077,5.189-3.138,6.229-3.771,13.288-8.046,18.967-11.368,3.1-1.815,5.452-3.147,7.181-4.071,2.868-1.533,3.36-1.591,3.672-1.511a.572.572,0,0,1,.358.267.5.5,0,0,1-.144.659c-.107.075-10.781,7.615-21.486,15.32-6.286,4.524-11.353,8.219-15.058,10.982-1.288.96-2.352,1.763-3.229,2.435l17.208-9.939,15.14-8.742,4.992-2.88,1.4-.807.37-.213a.588.588,0,0,1,.51-.121.5.5,0,0,1,.3.232c.242.42-.162.787-.519,1.11-.3.273-.761.657-1.368,1.141-1.117.892-2.78,2.163-4.943,3.779-3.637,2.717-8.74,6.449-15.168,11.092-7.066,5.1-14.213,10.21-18.421,13.209,1.091-.58,2.391-1.294,3.885-2.136,3.755-2.115,8.784-5.058,14.948-8.746,10.5-6.282,20.787-12.633,20.89-12.7a.5.5,0,0,1,.548.836c-.107.074-10.805,7.5-21.523,15.143-6.293,4.488-11.361,8.171-15.063,10.948-1.543,1.157-2.857,2.164-3.925,3.006,4.138-2.455,10.877-6.443,17.606-10.389,6.328-3.711,11.408-6.658,15.1-8.759,2.194-1.249,3.917-2.21,5.121-2.856.652-.35,1.166-.615,1.528-.789.583-.279.777-.334.986-.28a.516.516,0,0,1,.319.243c.094.162.141.421-.176.724-.075.072-.182.165-.329.285-.269.22-.661.526-1.2.933-.976.739-2.4,1.787-4.345,3.2-3.63,2.642-8.494,6.134-13.644,9.831-5.723,4.108-11.64,8.357-16.236,11.707-.992.723-1.867,1.364-2.639,1.932l37.885-21.873a.5.5,0,0,1,.544.837c-9.648,7.013-31.9,23.225-40.5,29.631l.475-.26c2.169-1.192,5.174-2.912,8.933-5.111,6.9-4.038,15.222-9.035,21.3-12.683,2.665-1.6,4.967-2.983,6.6-3.955.863-.514,1.493-.885,1.925-1.135.791-.458.874-.506,1.1-.447a.5.5,0,0,1,.151.906l-.1.075-.369.275c-.322.239-.795.589-1.4,1.033-1.141.841-2.819,2.077-4.988,3.671-3.653,2.686-8.748,6.428-15.144,11.122-6.964,5.112-13.987,10.264-18.174,13.335,1.622-.891,3.685-2.072,6.273-3.589,5.51-3.231,12.334-7.368,18.355-11.018,3.96-2.4,7.7-4.668,10.408-6.277,4.571-2.716,4.689-2.686,4.975-2.613a.51.51,0,0,1,.318.241c.261.453-.208.9-.518,1.2-.329.315-.817.729-1.492,1.266-1.21.962-2.974,2.282-5.395,4.036-4.477,3.242-10.482,7.446-16.289,11.511-5.148,3.6-10.011,7.007-13.778,9.715-1.264.909-2.289,1.657-3.119,2.272,3.645-2.12,9.235-5.495,14.391-8.608,5.9-3.559,11.993-7.24,16.8-10.055,8.3-4.86,8.7-4.758,9.053-4.667a.551.551,0,0,1,.344.258c.256.443-.185.9-.448,1.17-.3.306-.736.7-1.346,1.216-1.1.926-2.754,2.222-4.912,3.852-3.627,2.739-8.737,6.465-15.187,11.073-4.508,3.22-9.056,6.432-12.858,9.1l34.071-19.67a.5.5,0,0,1,.548.834c-.088.065-8.864,6.585-17.677,13.238-5.175,3.907-9.35,7.093-12.408,9.472-.66.513-1.249.974-1.774,1.388,4.12-2.437,10.146-5.994,15.856-9.329,4.472-2.612,8.031-4.667,10.58-6.109,1.481-.838,2.642-1.481,3.451-1.911.436-.232.781-.408,1.025-.523.4-.186.57-.243.768-.191a.511.511,0,0,1,.315.239.5.5,0,0,1-.109.633c-6.752,5.71-15.991,13.574-20.878,17.836l20.305-11.723a.5.5,0,0,1,.621.768c-3.42,3.782-8.132,9.046-10.584,11.894,1.085-.634,2.431-1.42,3.772-2.2,1.775-1.033,3.195-1.854,4.22-2.442.61-.35,1.086-.619,1.414-.8.622-.346.718-.4.935-.342a.5.5,0,0,1,.02.962c-.642.309-7.6,4.36-12.181,7.047a.5.5,0,0,1-.685-.18.661.661,0,0,1,.139-.744c.087-.122.215-.286.389-.5.312-.385.776-.935,1.381-1.636,1.014-1.176,2.439-2.8,4.235-4.813,1.464-1.644,2.941-3.291,4.086-4.565l-21.562,12.449a.5.5,0,0,1-.683-.184c-.208-.361.079-.641.331-.887.17-.166.428-.406.766-.711.622-.563,1.544-1.376,2.739-2.417,2.01-1.751,4.824-4.171,8.364-7.194,3.234-2.762,6.5-5.534,8.835-7.517-4.217,2.368-13,7.449-31.151,18.2l-1.129.669A.637.637,0,0,1,472.6,334.96Z"
              fill="#fff"
            />
          </g>
        </g>
        <g id="Group_177" data-name="Group 177">
          <g id="Group_176" data-name="Group 176" clipPath="url(#clip-path-4)">
            <image
              id="Rectangle_76"
              data-name="Rectangle 76"
              width="47"
              height="311"
              transform="translate(542 24.853)"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC8AAAE3CAYAAAA61RjuAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAL6ADAAQAAAABAAABNwAAAABQUOsrAAADTElEQVR4Ae3aQWoUURRG4W7tuAndupKsKyCZBQRxIIhIQifPHfR5B4oLJ+P+/7r56na9GvT58/3X62no34ehc/8fe/Twl/d/YezarOFfp67OGv5l8vD/Jg//d/LwfyYP/3vy8L8mD/9z8vA/Jg//PHn4p8nDf588/OPU4c/X69iXytPo9/mGP+o7k3zyQKC1AWhKJHmFEZQkD9CUSPIKIyhJHqApkeQVRlCSPEBTIskrjKAkeYCmRJJXGEFJ8gBNiSSvMIKS5AGaEkleYQQlyQM0JZK8wghKkgdoSiR5hRGUJA/QlMho+cuXh28fFYYDStbPce8OuK5yyTX8J6XpgJLx8q3NAVtzam2OUF/XHC/fo/KI1Rm/Nj3nW5sbBcbvfI/KG++48vHWRmEEJePlO6TAXd+OtDbbhLBgyXdIQbyt2Pidb2227j8Mj1+bTlh457dirc0W30a4E3YDbys6fuc7YbfuPwy3NhBuOzZevneb7R0ABa0NQFMiS370ITX2B0NjB1971/DKtw+UJA/QlEjyCiMoSR6gKZHkFUZQkjxAUyLJK4ygJHmApkSSVxhBSfIATYkkrzCCkuQBmhJJXmEEJckDNCWSvMIISpIHaEokeYURlCQP0JRI8gojKEkeoCmR5BVGUJI8QFMiySuMoCR5gKZEklcYQUnyAE2JJK8wgpLkAZoSSV5hBCXJAzQlkrzCCEqSB2hKJHmFEZQkD9CUSPIKIyhJHqApkeQVRlCSPEBTIskrjKAkeYCmRJJXGEFJ8gBNiSSvMIKS5AGaEkleYQQlyQM0JZK8wghKkgdoSiR5hRGUJA/QlEjyCiMoSR6gKZHkFUZQkjxAUyLJK4ygJHmApkSSVxhBSfIATYkkrzCCkuQBmhJJXmEEJckDNCWSvMIISpIHaEokeYURlCQP0JRI8gojKEkeoCmR5BVGUJI8QFMiySuMoCR5gKZEklcYQUnyAE2JJK8wgpLkAZoSSV5hBCXJAzQlkrzCCEqSB2hKJHmFEZQkD9CUSPIKIyhJHqApkeQVRlCSPEBTIskrjKAkeYCmRJJXGEFJ8gBNiSSvMIKS5AGaEkleYQQlyQM0JZK8wghKkgdoSiR5hRGUJA/QlEjyCiMoeQOPcReyvyKlwQAAAABJRU5ErkJggg=="
            />
          </g>
        </g>
        <g id="Group_179" data-name="Group 179">
          <g id="Group_178" data-name="Group 178" clipPath="url(#clip-path)">
            <path
              id="Path_119"
              data-name="Path 119"
              d="M566.594,61.526a13.326,13.326,0,0,0,.08-1.453,12.676,12.676,0,0,0-23.681-6.218,7.063,7.063,0,0,0-3.632-.988,7.269,7.269,0,0,0-7.265,7.265v.682a7.264,7.264,0,0,0,.436,14.405c2.717,2.223,5.572,2.31,8.289.269a8.185,8.185,0,0,0,11.622.16,7.533,7.533,0,0,0,10.388-.175,13.738,13.738,0,0,0,1.954.306,7.264,7.264,0,0,0,1.78-14.245Z"
              fill="#fff"
            />
            <path
              id="Path_120"
              data-name="Path 120"
              d="M602.067,60.68a5.006,5.006,0,0,1-8.14,1.911,6.009,6.009,0,0,1-11.454,1.058,4.015,4.015,0,0,1-5.494-2.969,4,4,0,1,1-.063-8.006c-.555-4.836,4.628-7.97,8.442-4.632a6.009,6.009,0,0,1,11.454-1.058,4.043,4.043,0,0,1,5.1,1.837,6.049,6.049,0,0,1,1.335-.148C611.571,49.05,611.25,61.348,602.067,60.68Z"
              fill="#fff"
            />
          </g>
        </g>
        <text
          id="_0.11"
          data-name="0.11"
          transform="translate(81.436 322.836)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            0.11
          </tspan>
        </text>
        <text
          id="_0.95"
          data-name="0.95"
          transform="translate(160.252 310.02)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            0.95
          </tspan>
        </text>
        <text
          id="_1.95"
          data-name="1.95"
          transform="translate(238.252 298.292)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            1.95
          </tspan>
        </text>
        <text
          id="_5.14"
          data-name="5.14"
          transform="translate(317.372 252.132)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            5.14
          </tspan>
        </text>
        <text
          id="_14.48"
          data-name="14.48"
          transform="translate(390.62 131.844)"
          fill="#0d988c"
          fontSize="16"
          fontFamily="PTSans-NarrowBold, PT Sans Narrow"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            14.48
          </tspan>
        </text>
        <text
          id="_15.74"
          data-name="15.74"
          transform="translate(471.196 114.309)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            15.74
          </tspan>
        </text>
        <g id="Group_181" data-name="Group 181">
          <g id="Group_180" data-name="Group 180" clipPath="url(#clip-path)">
            <text
              id="_14_460.50"
              data-name="14 460.50"
              transform="translate(534.224 13.6)"
              fill="#0d988c"
              fontSize="16"
              fontFamily="PTSans-NarrowBold, PT Sans Narrow"
              fontWeight="700"
            >
              <tspan x="0" y="0">
                14 460.50
              </tspan>
            </text>
            <path
              id="Path_121"
              data-name="Path 121"
              d="M499.655,361.646a1.055,1.055,0,0,0-.067-.206l-2.523-5.89a3.856,3.856,0,0,0-3.61-2.24H480.246a3.856,3.856,0,0,0-3.61,2.24l-2.526,5.89a1.051,1.051,0,0,0-.086.421v11.756a1.069,1.069,0,0,0,1.068,1.069h2.141a1.07,1.07,0,0,0,1.069-1.069v-1.069h17.1v1.069a1.069,1.069,0,0,0,1.068,1.069h2.138a1.07,1.07,0,0,0,1.069-1.069V361.861a1.111,1.111,0,0,0-.021-.215Zm-20.285,6.627a2.138,2.138,0,1,1,2.138-2.137,2.137,2.137,0,0,1-2.138,2.137m14.963,0a2.138,2.138,0,1,1,2.137-2.137,2.138,2.138,0,0,1-2.137,2.137m-17.617-7.481,1.886-4.4a1.757,1.757,0,0,1,1.644-.945h13.211a1.757,1.757,0,0,1,1.644.945l1.886,4.4Z"
              fill="#fff"
            />
            <path
              id="Path_122"
              data-name="Path 122"
              d="M407.667,357.021a.548.548,0,0,0-.406,0l-6.519,2.611,6.721,2.689,6.721-2.688Zm7.442,3.414-7.1,2.84v8.652l7.1-2.84v-8.652Zm-8.192,11.5v-8.655l-7.1-2.839v8.653Zm-.062-15.922a1.641,1.641,0,0,1,1.217,0l7.786,3.11a.547.547,0,0,1,.343.507v9.461a1.092,1.092,0,0,1-.687,1.014l-7.847,3.142a.548.548,0,0,1-.406,0l-7.847-3.138a1.092,1.092,0,0,1-.688-1.014v-9.461a.545.545,0,0,1,.343-.511Z"
              fill="#1d9f9d"
              fillRule="evenodd"
            />
            <path
              id="Path_123"
              data-name="Path 123"
              d="M407.464,355.644a1.884,1.884,0,0,1,.7.135l7.786,3.11a.793.793,0,0,1,.5.739v9.461a1.336,1.336,0,0,1-.844,1.246l-7.847,3.142a.8.8,0,0,1-.592,0l-7.847-3.138a1.334,1.334,0,0,1-.845-1.246v-9.461a.79.79,0,0,1,.5-.743l7.786-3.11A1.884,1.884,0,0,1,407.464,355.644Zm0,17.39a.3.3,0,0,0,.11-.021l7.847-3.142a.838.838,0,0,0,.53-.782v-9.461a.3.3,0,0,0-.186-.275l-7.786-3.11a1.4,1.4,0,0,0-1.032,0l-7.786,3.11a.294.294,0,0,0-.186.277v9.463a.837.837,0,0,0,.53.782l7.847,3.138A.3.3,0,0,0,407.464,373.034Zm0-16.3a.793.793,0,0,1,.3.057l7.1,2.844-7.394,2.957-7.394-2.958,7.1-2.843A.793.793,0,0,1,407.464,356.732Zm6.047,2.9-5.937-2.38a.3.3,0,0,0-.22,0l-5.939,2.379,6.048,2.42Zm1.848.433v9.191l-7.6,3.04v-9.191Zm-.5,8.852V360.8l-6.6,2.64v8.113Zm-15.292-8.848,7.6,3.039V372.3l-7.6-3.041Zm7.1,3.378-6.6-2.639v8.115l6.6,2.641Z"
              fill="#1d9f9d"
            />
            <path
              id="Path_124"
              data-name="Path 124"
              d="M565.786,352.139a.9.9,0,0,0-.668,0l-10.709,4.284,11.043,4.416,11.044-4.416Zm12.227,5.61-11.664,4.665V376.63l11.664-4.666V357.75Zm-13.459,18.883V362.413l-11.664-4.664v14.217Zm-.1-26.16a2.691,2.691,0,0,1,2,0l12.79,5.118a.9.9,0,0,1,.563.833v15.543a1.8,1.8,0,0,1-1.129,1.665l-12.892,5.158a.9.9,0,0,1-.668,0l-12.892-5.157a1.794,1.794,0,0,1-1.13-1.666V356.423a.9.9,0,0,1,.564-.833Z"
              fill="#1d9f9d"
              fillRule="evenodd"
            />
            <path
              id="Path_125"
              data-name="Path 125"
              d="M324.88,346.868a1.322,1.322,0,0,1,1.135-.49l3.224,3.475.132-.005.133.005,3.243-3.475a1.3,1.3,0,0,1,1.118.49c.4.566.161-.985-.727-.985h-7.532C324.718,345.882,324.475,347.432,324.88,346.868Zm4.492-.485h2.657l-2.607,2.722v-.016l-.05.057-.049-.057v.016l-2.544-2.722Zm-7.88,30.106h1.63l1.291-2.6h-.907Zm12.981-2.6,1.2,2.6H337.3l-1.926-2.6Zm-8.164-1.017h6.241v-1.813h-6.241Zm12.515-19.606c0-1.6-6.6-1.716-6.6-1.716l-1.109-1.184-3.426-.019-1.43,1.193s-5.483.1-6.281,1.725c0,0,.023,16.048.023,16.876s1.622,2.733,2.731,2.733c1.6,0,2.686.008,2.686.008l-.024-2.7h8.118v2.718s1.422-.027,2.777-.027,2.568-2.392,2.568-2.726C338.857,368.933,338.824,353.263,338.824,353.263Zm-12.225.143a.431.431,0,0,0,.006.063.509.509,0,0,1,.5-.449h4.59a.51.51,0,0,1,.5.449.468.468,0,0,0,.007-.063v.125a.408.408,0,0,0-.007-.061.551.551,0,0,1-.5.5h-4.59a.549.549,0,0,1-.5-.5.4.4,0,0,0-.006.061Zm-3.431,16.117a.732.732,0,1,1,.723-.732.727.727,0,0,1-.723.732m5.845-6.666a1.018,1.018,0,0,1-1.02,1.019h-6.047a1.019,1.019,0,0,1-1.02-1.019v-6.969a1.018,1.018,0,0,1,1.02-1.019h6.047a1.02,1.02,0,0,1,1.02,1.019Zm6.771,6.722a.732.732,0,1,1,.723-.731.727.727,0,0,1-.723.731m2.229-6.722a1.019,1.019,0,0,1-1.02,1.019h-6.075a1.018,1.018,0,0,1-1.019-1.019V355.89a1.018,1.018,0,0,1,1.019-1.02h6.076a1.02,1.02,0,0,1,1.02,1.02Z"
              fill="#fff"
              fillRule="evenodd"
            />
            <path
              id="Path_126"
              data-name="Path 126"
              d="M245.915,353.851h14.9a3.969,3.969,0,0,1,3.958,3.957v8.226a3.97,3.97,0,0,1-3.958,3.958h-14.9a3.97,3.97,0,0,1-3.958-3.958v-8.226A3.969,3.969,0,0,1,245.915,353.851Zm-2.687,19.937a.555.555,0,0,1,0-1.109h6.023a.555.555,0,1,1,0,1.109Zm7.962-2.033a.554.554,0,1,1,1.109,0v.924h11.2a.555.555,0,0,1,0,1.109H252.3v.926a.554.554,0,0,1-1.109,0Zm.178-13.9,6.041,3.6a.55.55,0,0,1-.005.951l-6.086,3.624a.552.552,0,0,1-.756-.193.558.558,0,0,1-.078-.282h0v-7.255a.554.554,0,0,1,.885-.444Zm4.682,4.072-4.459-2.656v5.312Z"
              fill="#fff"
              fillRule="evenodd"
            />
            <path
              id="Path_127"
              data-name="Path 127"
              d="M85.2,369.836v0Z"
              fill="#fff"
            />
            <path
              id="Path_128"
              data-name="Path 128"
              d="M96.695,370.01a1.7,1.7,0,0,1-.024.348,1.7,1.7,0,0,0,.024-.348"
              fill="#fff"
            />
            <path
              id="Path_129"
              data-name="Path 129"
              d="M98.585,352.05h-.821c-.672-.746-2.786-.846-5.3-.846-2.96,0-5.6.424-6.492,1.22a3.154,3.154,0,0,0-.7.821c-1.493.547-4.1,1.617-4.1,5.472,0,5.572,3.781,9.2,3.781,10.024v1.99a2.248,2.248,0,0,0,2.165,2.239h7.686a2.387,2.387,0,0,0,2.263-1.965l1.069-13.259c.249-2.388,2.612-5.7,2.612-5.7ZM84.954,364.861c-1.244,0-3.334-8.806,0-9.3Zm9.95,2.96a.374.374,0,1,1-.747,0V356.453a.374.374,0,1,1,.747,0Z"
              fill="#fff"
            />
            <path
              id="Path_130"
              data-name="Path 130"
              d="M186.987,354.142h-24.1a.711.711,0,0,0-.7.7v15.512a.711.711,0,0,0,.7.7h11.138v2.308a10.887,10.887,0,0,0-3.838.886.973.973,0,0,0-.484,1.235.938.938,0,0,0,.859.564.955.955,0,0,0,.375-.08,10.2,10.2,0,0,1,4-.752,10.008,10.008,0,0,1,4,.752.938.938,0,1,0,.751-1.719,11.866,11.866,0,0,0-3.838-.886v-2.308h11.138a.711.711,0,0,0,.7-.7V354.84A.711.711,0,0,0,186.987,354.142Zm-.7,15.513h-22.7V355.538h22.7Z"
              fill="#fff"
            />
            <path
              id="Path_131"
              data-name="Path 131"
              d="M184.868,356.961h-19.86V368.2h19.86Zm-18.062,2.978,1.208-1.208a.7.7,0,0,1,.993.993l-1.208,1.208a.722.722,0,0,1-.483.215.676.676,0,0,1-.484-.215A.691.691,0,0,1,166.806,359.939Zm5.4.43-3.785,3.757a.72.72,0,0,1-.483.215.672.672,0,0,1-.483-.215.712.712,0,0,1,0-.993l3.784-3.784a.712.712,0,0,1,.993,0A.775.775,0,0,1,172.2,360.369Z"
              fill="#fff"
            />
          </g>
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
      viewBox="0 30 613.838 378.853"
    >
      <defs>
        <clipPath id="clip-path">
          <rect
            id="Rectangle_93"
            data-name="Rectangle 93"
            width="613.838"
            height="378.853"
            fill="none"
          />
        </clipPath>
        <clipPath id="clip-path-4x">
          <rect
            id="Rectangle_89"
            data-name="Rectangle 89"
            width="38.684"
            height="309.162"
            transform="translate(490.878 26.475)"
            fill="none"
          />
        </clipPath>
      </defs>
      <g id="Group_194" data-name="Group 194" clipPath="url(#clip-path)">
        <g id="Group_185" data-name="Group 185">
          <g id="Group_184" data-name="Group 184" clipPath="url(#clip-path)">
            <path
              id="Line_57"
              data-name="Line 57"
              d="M552.629.5H0v-1H552.629Z"
              transform="translate(61.209 335.632)"
              fill="#1a1818"
            />
          </g>
        </g>
        <text
          id="_0_g"
          data-name="0 g"
          transform="translate(34.057 342.042)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            0 g
          </tspan>
        </text>
        <text
          id="_2_000_g"
          data-name="2 000 g"
          transform="translate(7.617 288.523)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            2 000 g
          </tspan>
        </text>
        <text
          id="_4_000_g"
          data-name="4 000 g"
          transform="translate(7.617 235.002)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            4 000 g
          </tspan>
        </text>
        <text
          id="_6_000_g"
          data-name="6 000 g"
          transform="translate(7.617 181.482)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            6 000 g
          </tspan>
        </text>
        <text
          id="_8_000_g"
          data-name="8 000 g"
          transform="translate(7.617 127.962)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            8 000 g
          </tspan>
        </text>
        <g id="Group_187" data-name="Group 187">
          <g id="Group_186" data-name="Group 186" clipPath="url(#clip-path)">
            <text
              id="_10_000_g"
              data-name="10 000 g"
              transform="translate(0 74.407)"
              fill="#fff"
              fontSize="16"
              fontFamily="PTSans-Narrow, PT Sans Narrow"
            >
              <tspan x="0" y="0">
                10 000 g
              </tspan>
            </text>
            <path
              id="Line_58"
              data-name="Line 58"
              d="M552.629.25H0v-.5H552.629Z"
              transform="translate(61.209 335.632)"
              fill="#808386"
            />
            <path
              id="Line_59"
              data-name="Line 59"
              d="M552.629.25H0v-.5H552.629Z"
              transform="translate(61.209 282.105)"
              fill="#808386"
            />
            <path
              id="Line_60"
              data-name="Line 60"
              d="M552.629.25H0v-.5H552.629Z"
              transform="translate(61.209 228.578)"
              fill="#808386"
            />
            <path
              id="Line_61"
              data-name="Line 61"
              d="M552.629.25H0v-.5H552.629Z"
              transform="translate(61.209 175.05)"
              fill="#808386"
            />
            <path
              id="Line_62"
              data-name="Line 62"
              d="M552.629.25H0v-.5H552.629Z"
              transform="translate(61.209 121.523)"
              fill="#808386"
            />
            <path
              id="Line_63"
              data-name="Line 63"
              d="M552.629.25H0v-.5H552.629Z"
              transform="translate(61.209 67.996)"
              fill="#808386"
            />
            <path
              id="Line_64"
              data-name="Line 64"
              d="M552.629.125H0v-.25H552.629Z"
              transform="translate(61.209 308.868)"
              fill="#838588"
            />
            <path
              id="Line_65"
              data-name="Line 65"
              d="M552.629.125H0v-.25H552.629Z"
              transform="translate(61.209 255.341)"
              fill="#838588"
            />
            <path
              id="Line_66"
              data-name="Line 66"
              d="M552.629.125H0v-.25H552.629Z"
              transform="translate(61.209 201.814)"
              fill="#838588"
            />
            <path
              id="Line_67"
              data-name="Line 67"
              d="M552.629.125H0v-.25H552.629Z"
              transform="translate(61.209 148.287)"
              fill="#838588"
            />
            <path
              id="Line_68"
              data-name="Line 68"
              d="M552.629.125H0v-.25H552.629Z"
              transform="translate(61.209 94.76)"
              fill="#838588"
            />
          </g>
        </g>
        <rect
          id="Rectangle_82"
          data-name="Rectangle 82"
          width="38.684"
          height="0.917"
          transform="translate(76.406 334.715)"
          fill="#fff"
        />
        <rect
          id="Rectangle_83"
          data-name="Rectangle 83"
          width="38.684"
          height="7.952"
          transform="translate(145.485 327.68)"
          fill="#fff"
        />
        <rect
          id="Rectangle_84"
          data-name="Rectangle 84"
          width="38.684"
          height="16.252"
          transform="translate(214.564 319.38)"
          fill="#fff"
        />
        <rect
          id="Rectangle_85"
          data-name="Rectangle 85"
          width="38.684"
          height="42.822"
          transform="translate(283.642 292.81)"
          fill="#fff"
        />
        <rect
          id="Rectangle_86"
          data-name="Rectangle 86"
          width="38.684"
          height="120.679"
          transform="translate(352.721 214.953)"
          fill="#1d9f9d"
        />
        <rect
          id="Rectangle_87"
          data-name="Rectangle 87"
          width="38.684"
          height="131.142"
          transform="translate(421.8 204.49)"
          fill="#fff"
        />
        <g id="Group_189" data-name="Group 189">
          <g
            id="Group_188"
            data-name="Group 188"
            clipPath="url(#clip-path-4x)"
          >
            <image
              id="Rectangle_88"
              data-name="Rectangle 88"
              width="40"
              height="310"
              transform="translate(490 25.853)"
              href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAE2CAYAAAATVdAyAAAAAXNSR0IArs4c6QAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAKKADAAQAAAABAAABNgAAAABNor7QAAACVUlEQVR4Ae3aTUpjYRRF0fg7CZ26oqOyKdjQliBoQ0SMfk5hv8ANrOrveFmel3pQdXJ1d7PfDf5zOvi2/9PGH3j+d+bPZMWjOPB7uuDX9AM/px/4Mf3A9+kHvk0/8HX6gS/TD3yefuDT9AMfpx/4MPnAk/1+9Pvqbvz7oAPrvgkSrAK1t0GCVaD2NkiwCtTeBglWgdrbIMEqUHsbJFgFam+DBKtA7W2QYBWovQ0SrAK1t0GCVaD2NlgFz6/vb8/qhxyyX/936+KQP6B+9jrwsn7IIfujEPQrLhPwKy56q/UUbyHoKS6KnuKit1pP8RaC45/i8Qd6Hyw79D1Y9Fbre3ALQV8zRdFTXPRW6ykmWAVq7yneQtD7YFG0waK3Wn+TbCHofbAoeoqL3mo9xVsIeoqL4trg6H91H33ckndg2R/BqkeQ4BYC9TN8DxKsArW3QYJVoPY2SLAK1N4GCVaB2tsgwSpQexskWAVqb4MEq0DtbZBgFai9DRKsArW3QYJVoPY2SLAK1N4GCVaB2tsgwSpQexskWAVqb4MEq0DtbZBgFai9DRKsArW3QYJVoPY2SLAK1N4GCVaB2tsgwSpQexskWAVqb4MEq0DtbZBgFai9DRKsArW3QYJVoPY2SLAK1N4GCVaB2tsgwSpQexskWAVqb4MEq0DtbZBgFai9DRKsArW3QYJVoPY2SLAK1N4GCVaB2tsgwSpQexskWAVqb4MEq0DtbZBgFai9DRKsArW3QYJVoPY2SLAK1N4GCVaB2tsgwSpQexskWAVqb4MEq0Dtx2/wF8IuF6phQw0xAAAAAElFTkSuQmCC"
            />
          </g>
        </g>
        <rect
          id="Rectangle_90"
          data-name="Rectangle 90"
          width="38.684"
          height="223.543"
          transform="translate(559.957 112.089)"
          fill="#fff"
        />
        <g id="Group_191" data-name="Group 191">
          <g id="Group_190" data-name="Group 190" clipPath="url(#clip-path)">
            <path
              id="Path_132"
              data-name="Path 132"
              d="M514.788,61.526a13.326,13.326,0,0,0,.08-1.453,12.676,12.676,0,0,0-23.681-6.218,7.063,7.063,0,0,0-3.632-.988,7.269,7.269,0,0,0-7.265,7.265v.682a7.264,7.264,0,0,0,.436,14.405c2.717,2.223,5.572,2.31,8.289.269a8.185,8.185,0,0,0,11.622.16,7.533,7.533,0,0,0,10.388-.175,13.739,13.739,0,0,0,1.954.306,7.264,7.264,0,0,0,1.78-14.245Z"
              fill="#fff"
            />
            <path
              id="Path_133"
              data-name="Path 133"
              d="M550.261,60.68a5.006,5.006,0,0,1-8.14,1.911,6.009,6.009,0,0,1-11.454,1.058,4.015,4.015,0,0,1-5.494-2.969,4,4,0,1,1-.063-8.006c-.555-4.836,4.628-7.97,8.442-4.632a6.009,6.009,0,0,1,11.454-1.058,4.043,4.043,0,0,1,5.105,1.837,6.048,6.048,0,0,1,1.335-.148C559.765,49.05,559.444,61.348,550.261,60.68Z"
              fill="#fff"
            />
          </g>
        </g>
        <text
          id="_34"
          data-name="34"
          transform="translate(87.923 322.836)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            34
          </tspan>
        </text>
        <text
          id="_297"
          data-name="297"
          transform="translate(154.323 316.165)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            297
          </tspan>
        </text>
        <text
          id="_607"
          data-name="607"
          transform="translate(223.411 307.428)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            607
          </tspan>
        </text>
        <text
          id="_1_600"
          data-name="1 600"
          transform="translate(286.499 279.781)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            1 600
          </tspan>
        </text>
        <text
          id="_4_509"
          data-name="4 509"
          transform="translate(354.755 204.661)"
          fill="#0d988c"
          fontSize="16"
          fontFamily="PTSans-NarrowBold, PT Sans Narrow"
          fontWeight="700"
        >
          <tspan x="0" y="0">
            4 509
          </tspan>
        </text>
        <text
          id="_4_900"
          data-name="4 900"
          transform="translate(424.723 193.621)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            4 900
          </tspan>
        </text>
        <text
          id="_8_352"
          data-name="8 352"
          transform="translate(563.314 101.988)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            8 352
          </tspan>
        </text>
        <text
          id="_16"
          data-name="16"
          transform="translate(572.211 220.693)"
          fill="#fff"
          fontSize="16"
          fontFamily="PTSans-Narrow, PT Sans Narrow"
        >
          <tspan x="0" y="0">
            16
          </tspan>
        </text>
        <g id="Group_193" data-name="Group 193">
          <g id="Group_192" data-name="Group 192" clipPath="url(#clip-path)">
            <text
              id="_4_503_000"
              data-name="4 503 000"
              transform="translate(479.918 13.6)"
              fill="#0d988c"
              fontSize="16"
              fontFamily="PTSans-NarrowBold, PT Sans Narrow"
              fontWeight="700"
            >
              <tspan x="0" y="0">
                4 503 000
              </tspan>
            </text>
            <path
              id="Path_134"
              data-name="Path 134"
              d="M453.63,361.646a1.055,1.055,0,0,0-.067-.206l-2.523-5.89a3.856,3.856,0,0,0-3.61-2.24H434.221a3.856,3.856,0,0,0-3.61,2.24l-2.526,5.89a1.05,1.05,0,0,0-.086.421v11.756a1.069,1.069,0,0,0,1.068,1.069h2.141a1.07,1.07,0,0,0,1.069-1.069v-1.069h17.1v1.069a1.069,1.069,0,0,0,1.068,1.069h2.138a1.07,1.07,0,0,0,1.069-1.069V361.861a1.113,1.113,0,0,0-.021-.215Zm-20.285,6.627a2.138,2.138,0,1,1,2.138-2.137,2.137,2.137,0,0,1-2.138,2.137m14.963,0a2.138,2.138,0,1,1,2.137-2.137,2.138,2.138,0,0,1-2.137,2.137m-17.617-7.481,1.886-4.4a1.757,1.757,0,0,1,1.644-.945h13.211a1.756,1.756,0,0,1,1.644.945l1.886,4.4Z"
              fill="#fff"
            />
            <path
              id="Path_135"
              data-name="Path 135"
              d="M371.888,357.021a.548.548,0,0,0-.406,0l-6.519,2.611,6.721,2.689,6.721-2.688Zm7.442,3.414-7.1,2.84v8.652l7.1-2.84v-8.652Zm-8.192,11.5v-8.655l-7.1-2.839v8.653Zm-.062-15.922a1.641,1.641,0,0,1,1.217,0l7.786,3.11a.547.547,0,0,1,.343.507v9.461a1.092,1.092,0,0,1-.687,1.014l-7.847,3.142a.548.548,0,0,1-.406,0l-7.847-3.138a1.092,1.092,0,0,1-.688-1.014v-9.461a.545.545,0,0,1,.343-.511Z"
              fill="#1d9f9d"
              fillRule="evenodd"
            />
            <path
              id="Path_136"
              data-name="Path 136"
              d="M371.685,355.644a1.884,1.884,0,0,1,.7.135l7.786,3.11a.793.793,0,0,1,.5.739v9.461a1.336,1.336,0,0,1-.844,1.246l-7.847,3.142a.8.8,0,0,1-.592,0l-7.847-3.138a1.334,1.334,0,0,1-.845-1.246v-9.461a.79.79,0,0,1,.5-.743l7.786-3.11A1.884,1.884,0,0,1,371.685,355.644Zm0,17.39a.3.3,0,0,0,.11-.021l7.847-3.142a.838.838,0,0,0,.53-.782v-9.461a.3.3,0,0,0-.186-.275l-7.786-3.11a1.4,1.4,0,0,0-1.032,0l-7.786,3.11a.294.294,0,0,0-.186.277v9.463a.837.837,0,0,0,.53.782l7.847,3.138A.3.3,0,0,0,371.685,373.034Zm0-16.3a.793.793,0,0,1,.3.057l7.1,2.844-7.394,2.957-7.394-2.958,7.1-2.843A.793.793,0,0,1,371.685,356.732Zm6.047,2.9-5.937-2.38a.3.3,0,0,0-.22,0l-5.939,2.379,6.048,2.42Zm1.848.433v9.191l-7.6,3.04v-9.191Zm-.5,8.852V360.8l-6.6,2.64v8.113Zm-15.292-8.848,7.6,3.039V372.3l-7.6-3.041Zm7.1,3.378-6.6-2.639v8.115l6.6,2.641Z"
              fill="#1d9f9d"
            />
            <path
              id="Path_137"
              data-name="Path 137"
              d="M510.3,352.139a.9.9,0,0,0-.668,0l-10.709,4.284,11.043,4.416,11.044-4.416Zm12.227,5.61-11.664,4.665V376.63l11.664-4.666V357.75Zm-13.459,18.883V362.413L497.4,357.749v14.217Zm-.1-26.16a2.691,2.691,0,0,1,2,0l12.79,5.118a.9.9,0,0,1,.563.833v15.543a1.794,1.794,0,0,1-1.129,1.665L510.3,378.789a.9.9,0,0,1-.668,0l-12.892-5.157a1.794,1.794,0,0,1-1.13-1.666V356.423a.9.9,0,0,1,.564-.833Z"
              fill="#1d9f9d"
              fillRule="evenodd"
            />
            <path
              id="Path_138"
              data-name="Path 138"
              d="M298.005,346.868a1.322,1.322,0,0,1,1.135-.49l3.224,3.475.132-.005.133.005,3.243-3.475a1.3,1.3,0,0,1,1.118.49c.4.566.161-.985-.727-.985h-7.532C297.843,345.882,297.6,347.432,298.005,346.868Zm4.492-.485h2.657l-2.607,2.722v-.016l-.05.057-.049-.057v.016l-2.544-2.722Zm-7.88,30.106h1.63l1.291-2.6h-.907Zm12.981-2.6,1.2,2.6h1.631l-1.926-2.6Zm-8.164-1.017h6.241v-1.813h-6.241Zm12.515-19.606c0-1.6-6.6-1.716-6.6-1.716l-1.109-1.184-3.426-.019-1.43,1.193s-5.483.1-6.281,1.725c0,0,.023,16.048.023,16.876s1.622,2.733,2.731,2.733c1.6,0,2.686.008,2.686.008l-.024-2.7h8.118v2.718s1.422-.027,2.777-.027,2.568-2.392,2.568-2.726C311.982,368.933,311.949,353.263,311.949,353.263Zm-12.225.143a.431.431,0,0,0,.006.063.509.509,0,0,1,.5-.449h4.59a.51.51,0,0,1,.5.449.468.468,0,0,0,.007-.063v.125a.408.408,0,0,0-.007-.061.551.551,0,0,1-.5.5h-4.59a.549.549,0,0,1-.5-.5.4.4,0,0,0-.006.061Zm-3.431,16.117a.732.732,0,1,1,.723-.732.727.727,0,0,1-.723.732m5.845-6.666a1.018,1.018,0,0,1-1.02,1.019h-6.047a1.019,1.019,0,0,1-1.02-1.019v-6.969a1.018,1.018,0,0,1,1.02-1.019h6.047a1.019,1.019,0,0,1,1.02,1.019Zm6.771,6.722a.732.732,0,1,1,.723-.731.727.727,0,0,1-.723.731m2.229-6.722a1.019,1.019,0,0,1-1.02,1.019h-6.075a1.018,1.018,0,0,1-1.019-1.019V355.89a1.018,1.018,0,0,1,1.019-1.02h6.076a1.019,1.019,0,0,1,1.02,1.02Z"
              fill="#fff"
              fillRule="evenodd"
            />
            <path
              id="Path_139"
              data-name="Path 139"
              d="M225.955,353.851h14.9a3.969,3.969,0,0,1,3.958,3.957v8.226a3.97,3.97,0,0,1-3.958,3.958h-14.9A3.97,3.97,0,0,1,222,366.034v-8.226A3.969,3.969,0,0,1,225.955,353.851Zm-2.687,19.937a.555.555,0,0,1,0-1.109h6.023a.555.555,0,1,1,0,1.109Zm7.962-2.033a.555.555,0,1,1,1.109,0v.924h11.2a.555.555,0,0,1,0,1.109h-11.2v.926a.555.555,0,0,1-1.109,0Zm.178-13.9,6.041,3.6a.55.55,0,0,1-.005.951l-6.087,3.624a.551.551,0,0,1-.755-.193.558.558,0,0,1-.078-.282h0v-7.255a.554.554,0,0,1,.885-.444Zm4.682,4.072-4.459-2.656v5.312Z"
              fill="#fff"
              fillRule="evenodd"
            />
            <path
              id="Path_140"
              data-name="Path 140"
              d="M89.364,369.836v0Z"
              fill="#fff"
            />
            <path
              id="Path_141"
              data-name="Path 141"
              d="M100.857,370.01a1.7,1.7,0,0,1-.024.348,1.7,1.7,0,0,0,.024-.348"
              fill="#fff"
            />
            <path
              id="Path_142"
              data-name="Path 142"
              d="M102.747,352.05h-.821c-.672-.746-2.786-.846-5.3-.846-2.96,0-5.6.424-6.492,1.22a3.154,3.154,0,0,0-.7.821c-1.493.547-4.1,1.617-4.1,5.472,0,5.572,3.781,9.2,3.781,10.024v1.99a2.248,2.248,0,0,0,2.165,2.239h7.686a2.387,2.387,0,0,0,2.263-1.965l1.069-13.259c.249-2.388,2.612-5.7,2.612-5.7ZM89.116,364.861c-1.244,0-3.334-8.806,0-9.3Zm9.95,2.96a.374.374,0,1,1-.747,0V356.453a.374.374,0,1,1,.747,0Z"
              fill="#fff"
            />
            <path
              id="Path_143"
              data-name="Path 143"
              d="M176.313,354.142h-24.1a.711.711,0,0,0-.7.7v15.512a.711.711,0,0,0,.7.7h11.137v2.308a10.892,10.892,0,0,0-3.838.886.971.971,0,0,0-.483,1.235.936.936,0,0,0,.859.564.955.955,0,0,0,.375-.08,10.2,10.2,0,0,1,4-.752,10,10,0,0,1,4,.752.938.938,0,0,0,.752-1.719,11.872,11.872,0,0,0-3.838-.886v-2.308h11.137a.711.711,0,0,0,.7-.7V354.84A.711.711,0,0,0,176.313,354.142Zm-.7,15.513H152.911V355.538h22.705Z"
              fill="#fff"
            />
            <path
              id="Path_144"
              data-name="Path 144"
              d="M174.193,356.961h-19.86V368.2h19.86Zm-18.062,2.978,1.208-1.208a.7.7,0,1,1,.993.993l-1.208,1.208a.722.722,0,0,1-.483.215.676.676,0,0,1-.484-.215A.691.691,0,0,1,156.131,359.939Zm5.4.43-3.785,3.757a.72.72,0,0,1-.483.215.672.672,0,0,1-.483-.215.712.712,0,0,1,0-.993l3.784-3.784a.712.712,0,0,1,.993,0A.775.775,0,0,1,161.526,360.369Z"
              fill="#fff"
            />
            <path
              id="Path_145"
              data-name="Path 145"
              d="M590.9,358.019h-3.83a87.01,87.01,0,0,1-.419,9.455,20.087,20.087,0,0,1-1.392,5.865,6.48,6.48,0,0,1-2.349,2.993,6.642,6.642,0,0,1-3.5.838,13.236,13.236,0,0,1-3.68-.509,8.064,8.064,0,0,1-2.873-1.4,2.508,2.508,0,0,1-1.108-1.919q0-.778.015-1.167t.1-1.047a3.407,3.407,0,0,1,.284-1.047,3.863,3.863,0,0,1,.584-.823,3.074,3.074,0,0,1,.928-.7q-.18-.809-.763-2.618a24.283,24.283,0,0,1-.862-3.579,27.748,27.748,0,0,1-.284-4.339h-3.832a7.835,7.835,0,0,1-2.83-.4,1.5,1.5,0,0,1-1-1.512,3.812,3.812,0,0,1,1.167-2.558,3.533,3.533,0,0,1,2.663-1.272,5.52,5.52,0,0,1,2.02.464,9.284,9.284,0,0,1,2.11,1.182,5.247,5.247,0,0,1,2.693-2.561,11.4,11.4,0,0,1,9.336,0,5.247,5.247,0,0,1,2.693,2.559,9.248,9.248,0,0,1,2.11-1.182,5.52,5.52,0,0,1,2.02-.464,3.533,3.533,0,0,1,2.663,1.272,3.813,3.813,0,0,1,1.167,2.559,1.5,1.5,0,0,1-1,1.511,7.864,7.864,0,0,1-2.831.4m-12.448-5.745a7.318,7.318,0,0,0-1.556.134,1.511,1.511,0,0,0-1.227,1.018,2.624,2.624,0,0,0-.089.763,3.408,3.408,0,0,0,.3,1.287q.3.718.658,1.556a13.63,13.63,0,0,1,.658,3.112,43.4,43.4,0,0,1,.3,5.536,9.471,9.471,0,0,1-.314,2.439,2.625,2.625,0,0,1-.643,1.392q-2.872,1.406-2.873,2.873,0,1.287,1.93,2.079a11.634,11.634,0,0,0,4.443.793,3.641,3.641,0,0,0,.359-.344,4.473,4.473,0,0,0,.569-.973,3.557,3.557,0,0,0,.359-1.556,66.659,66.659,0,0,1,.479-7.242q.478-4.279.958-7.481t.479-3.471q0-.809-1.406-1.362a9.225,9.225,0,0,0-3.384-.553"
              fill="#fff"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};
