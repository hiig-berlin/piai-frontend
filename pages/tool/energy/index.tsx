import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import { LabElement } from "~/components/ui/LabElement";
import { Icon } from "~/components/tools/shared/ui/Icon";
import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { Button } from "~/components/styled/Button";

// TODO: Check if main is set in layout or make main
const EnergyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  // TODO: adpat with layout
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
`;

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
  grid-template-columns: repeat(${({ col }) => (col > 1 ? 2 : 1)}, 1fr);

  ${({ theme }) => theme.breakpoints.mobileLandscape} {
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

const Header = styled.header`
  display: flex;
  flex-direction: row;
  gap: var(--size-3);

  h1 {
    font-weight: bold;
    margin-bottom: 0;
  }

  margin-right: 100px;

  .svg {
    height: 30px;
  }
`;

const BoxHighlight = styled(Box)`
  background: ${({theme}) => theme.colors.piaiEnergy};
`;

const Grid = styled.div`
  display: grid;
  gap: var(--size-3);

  grid-template-columns: auto;

  
  ${({theme}) => theme.breakpoints.tablet}{
    grid-template-columns: 2fr 3fr;
  };
`;

const Index = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
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
        <LabElement
          shortHandle={tool.iconShort}
          longText={tool.iconLong}
          color="white"
          hoverColor={tool.colorBase}
          size={2}
        />
        <div>
          <h1>
            How many cows is your AI training’s CO<sub>2</sub> production worth?
          </h1>
          <p>
            Metus vulputate eu scelerisque felis imperdiet. Eget sit amet tellus
            cras. Urna condimentum mattis pellentesque id.
          </p>
        </div>
        <Icon type="share" spaceBefore aria-label="Share this page"></Icon>
        <Icon aria-label="Go to github repository" type="repo"></Icon>
      </Header>

      <Grid className="sources">
        <BoxHighlight>
          <h2>GPU energy usage</h2>
          <Icon type="gpu">
            Metus vulputate eu scelerisque felis imperdiet. Eget sit amet tellus
            cras. Urna condimentum mattis pellentesque id.
          </Icon>
        </BoxHighlight>
        <Box>
          <h2>Other energy consumers</h2>
          <Grid>
            <p>
              Metus vulputate eu scelerisque felis imperdiet. Eget sit amet
              tellus cras. Urna condimentum mattis pellentesque id.
            </p>
            <Icon type="hardware">
              <h3>Hardware procution</h3>
              <p>Metus vulputate eu scelerisque felis imperdiet.</p>
            </Icon>
            <Icon type="cpu">
              <h3>CPU usage</h3>
              <p>Urna condimentum mattis pellentesque id.</p>
            </Icon>
            <Icon type="cooling">
              <h3>Cooling</h3>
              <p>Eget sit amet tellus cras., lorem dolor met.</p>
            </Icon>
          </Grid>
        </Box>
      </Grid>
      <Grid className="GPU">
        <Box>
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
        <Box>
          <h2>Energy consumption relation</h2>
          <Meta col={1}>
            Metus vulputate eu scelerisque felis imperdiet. Eget sit amet tellus
            cras. Urna condimentum mattis pellentesque id.
          </Meta>
          GRAPH
          <h3>Explanaitions</h3>
          <Meta col={2}>
            <Icon type="washing">
              Washing machine: Regular eco cotton programme | AA+ energy class
            </Icon>
            <Icon type="washing">
              Washing machine: Regular eco cotton programme | AA+ energy class
            </Icon>
          </Meta>
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
