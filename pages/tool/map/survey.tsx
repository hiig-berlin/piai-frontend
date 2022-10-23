import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import styled from "styled-components";

import { PiAiTool } from "~/types";
import { appConfig } from "~/config";
import Layout from "~/components/tools/map/Layout";
import { restApiGetSettings } from "~/utils/restApi";

const SurveyWrapper = styled.div`
  margin: 0;
  height: 100%;
  overflow: hidden;

  iframe {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 0;
  }
`;

const Survey = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "map");

  return (
    <SurveyWrapper>
      <NextHeadSeo
        title={`Survey - ${
          currentTool?.name ? `${currentTool?.name} - ` : ""
        } ${appConfig.appTitle}`}
        description={currentTool?.description ?? undefined}
        og={{
          title: `Survey - ${
            currentTool?.name ? `${currentTool?.name} - ` : ""
          } ${appConfig.appTitle}`,
          siteName: appConfig.appTitle,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
      {/* Dont' wrap this in further divs, 
      <main> is set via Layout component "*/}
      <iframe
        src="https://tally.so/r/w79g0m?transparentBackground=1"
        width="100%"
        height="100%"
        frameBorder="0"
        marginHeight={0}
        marginWidth={0}
        title="Add your project to the data set"
      ></iframe>
    </SurveyWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "map");

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
      slug: "survey",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Survey.getLayout = function getLayout(page: ReactElement, props: any) {
  return <Layout props={props}>{page}</Layout>;
};
export default Survey;
