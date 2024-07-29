import { ReactElement, useState, useEffect } from "react";
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
import { LinkButtonAnimated } from "~/components/styled/Button";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";
import {
  useCssVarsStateIsDesktopAndUpState,
  useCssVarsStateIsTabletAndUpState,
} from "~/components/state/CssVarsState";
import { ButtonNormalized } from "~/components/styled/Button";
import { input } from "~/components/tools/simba/simbaInput";
import { preGeneratedText } from "~/components/tools/simba/simbaInput";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { narrow, Meta } from "~/components/tools/map/Styled";
import Simplifier from "~/components/tools/simba/simplifier";
import { findLastIndex } from "lodash";
import SimbaHeader from "~/components/tools/simba/header";
import { SimbaWrapper } from "~/components/tools/simba/Styled";
 
const SimplifierPage = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();

  const currentTool = appConfig.tools?.find((t) => t.slug === "simba");

  const [currentExample, setCurrentExample] = useState("Newspaper article"); // Current selected Tag
  const [currentOutput, setCurrentOutput] = useState("");
  const [loading, setLoading] = useState(false); // True while loading summary
  const [customText, setCustomText] = useState(""); // State to store textarea value

  let examples = ["Newspaper article", "Wikipedia page", "App description"];

  const renderInput = () => {
    return (
      <SafeHtmlDiv
        html={input.filter((e) => e.example === currentExample)[0].text}
      />
    );
  };

  const renderOutput = () => <SafeHtmlDiv html={currentOutput} />;

  useEffect(() => {
    setLoading(true);
    setCurrentOutput(
      `Generating the summary for a ${currentExample.toLowerCase()}…`
    );
    setCurrentOutput(
      preGeneratedText.filter((e) => e.example === currentExample)[0].text
    );
    setLoading(false);
  }, [currentExample]);

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
        tool={tool}
      ></SimbaHeader>

      <Simplifier />

      
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