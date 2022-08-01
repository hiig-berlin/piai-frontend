import { ReactElement, useEffect, useRef } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import Layout from "~/components/tools/map/Layout";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import { Counter } from "~/components/tools/map/Counter";
import { Contribute } from "~/components/tools/map/Contribute";
import styled from "styled-components";
import useIsMounted from "~/hooks/useIsMounted";
import { useToolStateContext } from "~/components/tools/map/context/ContextProviders";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";

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
  }
`;

const Index = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const uiRemoveTimoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isMounted = useIsMounted();
  const { updateFilterState } = useToolStateContext();
  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  useEffect(() => {
    if (isTabletLandscapeAndUp) {
      if (uiRemoveTimoutRef.current) clearTimeout(uiRemoveTimoutRef.current);

      uiRemoveTimoutRef.current = setTimeout(() => {
        if (isMounted) {
          updateFilterState({
            isFilterOpen: true,
          });
        }
      }, 2500);
    }
  }, [isTabletLandscapeAndUp, isMounted, updateFilterState]);

  return (
    <>
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
