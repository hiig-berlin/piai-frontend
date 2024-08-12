import { ReactElement, useState, useEffect } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import Simplifier from "~/components/tools/simba/simplifier";
import SimbaHeader from "~/components/tools/simba/header";
import { SimbaWrapper } from "~/components/tools/simba/Styled";
import useLanguage from "~/hooks/useLanguage";

const SimplifierPage = ({ tool }: { tool: PiAiTool }) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "simba");
  const { strings, language, setLanguage } = useLanguage("simba"); // Use language hook
  
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
      <SimbaHeader
        strings={strings?.header}
        tool={tool}
        language={language}
        setLanguage={setLanguage}
      ></SimbaHeader>

      <Simplifier strings={strings?.simplifier} />
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

SimplifierPage.getLayout = function getLayout(page: ReactElement, props: any) {
  return <LayoutTool props={props}>{page}</LayoutTool>;
};

export default SimplifierPage;
