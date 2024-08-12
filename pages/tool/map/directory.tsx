import { ReactElement, useEffect } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import styled from "styled-components";

import Layout from "~/components/tools/map/Layout";
import { restApiGetSettings } from "~/utils/restApi";
import { appConfig } from "~/config";
import { PiAiTool } from "~/types";

const Content = styled.div`
  width: 100%;

  min-height: 100%;
  display: none;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--size-3);

  padding-top: var(--size-6);

  ${({ theme }) => theme.breakpoints.tablet} {
    display: flex;
    padding: var(--size-6) var(--size-3) var(--size-3) 60vw;
    align-items: center;
    justify-content: center;
    font-size: var(--text-h1-font-size);
    color: var(--color-medium-grey);
    font-family: var(--font-family-monospace);
    line-height: 1.3em;
  }

  ${({ theme }) => theme.applyMixin("noPrint")}
`;

const Directory = ({ tool }: { tool: PiAiTool }) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "map");

  return (
    <>
      <NextHeadSeo
        title={`Directory - ${currentTool?.name ? `${currentTool?.name} - ` : ""} ${appConfig.appTitle}`}
        description={currentTool?.description ?? undefined}
        og={{
          title: `Directory - ${currentTool?.name ? `${currentTool?.name} - ` : ""} ${appConfig.appTitle}`,
          siteName: appConfig.appTitle,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      {/* Dont' wrap this in further divs, 
      <main> is set via Layout component "*/}

      <Content>Select a project from <br/>the list on the left <br/>to explore the details.</Content>
    </>
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
      slug: "directory",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Directory.getLayout = function getLayout(page: ReactElement, props: any) {
  return <Layout props={props}>{page}</Layout>;
};
export default Directory;
