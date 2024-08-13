import { ReactElement, useEffect, useState, useCallback } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import styled from "styled-components";
import {
  useCssVarsStateIsDesktopAndUpState,
  useCssVarsStateIsTabletAndUpState,
} from "~/components/state/CssVarsState";
import ToolHeader from "~/components/tools/shared/Header";
import Filter from "~/components/tools/claimspotting/Filter";
import ClaimTable from "~/components/tools/claimspotting/ClaimTable";

// Define the type for the state
type FilterState = {
  startDate: string;
  endDate: string;
  narrative: string;
  topics: string[];
  attributes: {
    polarising: boolean;
    sensational: boolean;
    factual: boolean;
    highDiffusion: boolean;
    manyTwins: boolean;
  };
  lastWeek: boolean;
  lastMonth: boolean;
};

const Index = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();
  const currentTool = appConfig.tools?.find((t) => t.slug === "claimspotting");

  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  const filter
  // Load data asynchronously
  useEffect(() => {
    const loadDummyClaims = async () => {
      const { dummyClaims } = await import(
        "~/assets/test-data/claimspotting/LarissaDummyShort"
      );
      setData(dummyClaims);
      setFilteredData(dummyClaims); // Initialize filteredData with dummyClaims
    };

    loadDummyClaims();
  }, []);

  // Memoize filter change handler
  const handleFilterChange = useCallback((filteredData: any[]) => {
    setFilteredData(filteredData);
  }, []);

  return (
    <ClaimspottingWrapper>
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

      <ToolHeader
        tool={tool}
        title="Claimspotting – The spotting tool for fact-checkers"
        description="Metus vulputate eu scelerisque felis imperdiet. Eget sit amet tellus cras. Urna condimentum mattis pellentesque id."
        links={[
          {
            type: "info",
            url: "/tool/claimspotting/about",
            ariaLabel: "About this tool",
            label: "About",
          },
          {
            type: "repo",
            url: "https://github.com/hiig-berlin/claimspotting",
            ariaLabel: "Go to GitHub repository",
            label: "GitHub",
          },
        ]}
      />

      <Filter
        data={data}
        onFilterChange={handleFilterChange}
        dataLengthTotal={data.length}
        dataLengthFiltered={filteredData.length}
      />

      <ClaimTable data={filteredData} />
    </ClaimspottingWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tool = appConfig.tools.find(
    (tool: PiAiTool) => tool.slug === "claimspotting"
  );

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

const ClaimspottingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);
`;
