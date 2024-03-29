import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import Layout from "~/components/tools/map/Layout";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import { Contribute } from "~/components/tools/map/Contribute";
import styled from "styled-components";

const Content = styled.div`
  width: 100%;

  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  gap: var(--size-3);

  padding: var(--size-3);
  padding-bottom: calc(var(--size-6) + 2 * var(--size-3));

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: var(--size-3);
    padding-bottom: calc(2 * var(--size-3) + var(--size-5));
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    padding: var(--size-3);
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    padding: var(--size-6) var(--size-3) calc(var(--size-3)) var(--size-3);
  }
`;

const Index = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "map");

  return (
    <>
      <NextHeadSeo
        title={`${currentTool?.name ? `${currentTool?.name} - ` : ""} ${
          appConfig.appTitle
        }`}
        description={currentTool?.description ?? undefined}
        og={{
          title: `${currentTool?.name ? `${currentTool?.name} - ` : ""} ${
            appConfig.appTitle
          }`,
          siteName: appConfig.appTitle,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
      <Content>
        <Contribute position="bottom" />
      </Content>
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
      view: "map",
      slug: "index",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Index.getLayout = function getLayout(page: ReactElement, props: any) {
  return <Layout props={props}>{page}</Layout>;
};
export default Index;
