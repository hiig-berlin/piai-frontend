import { ReactElement, useEffect } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import styled from "styled-components";

import Layout from "~/components/tools/map/Layout";
import { restApiGetSettings } from "~/utils/restApi";
import { appConfig } from "~/config";
import { PiAiTool } from "~/types";
import { useToolStateStoreActions } from "~/components/tools/map/state/ToolState";

const Content = styled.div`
  width: 100%;

  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: var(--size-3);

  padding-top: var(--size-6);

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-left: var(--size-6);
  }

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: var(--size-6) var(--size-3) var(--size-3) var(--size-3);
    align-items: flex-end;
    justify-content: center;
    font-size: var(--text-h1-font-size);
    color: #f0f;
  }

  ${({ theme }) => theme.applyMixin("noPrint")}
`;

const Directory = ({ tool }: { tool: PiAiTool }) => {
  return (
    <>
      {/* TODO: ensure correct meta data is set <NextHeadSeo
        canonical={data?.yoast_head_json?.canonical ?? data?.yoast_head_json?.og_url}
        title={data?.yoast_head_json?.title ?? data?.title}
        description={data?.yoast_head_json?.description}
        og={{
          title: data?.yoast_head_json?.og_title,
          url: data?.yoast_head_json?.og_url,
          type: data?.yoast_head_json?.og_type,
          siteName: data?.yoast_head_json?.og_site_name,
          image: data?.yoast_head_json?.twitter_image,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      /> */}

      {/* Dont' wrap this in further divs, 
      <main> is set via Layout component "*/}

      <Content>This is some teaser text explaining the directory</Content>
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
