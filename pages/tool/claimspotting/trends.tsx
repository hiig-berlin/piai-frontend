import React, { ReactElement, use, useEffect, useMemo, useState } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import useLanguage from "~/hooks/useLanguage";
import { Placeholder } from "~/components/tools/shared/Styled";
import ToolHeader from "~/components/tools/shared/Header";
import { ClaimspottingWrapper } from "~/components/tools/claimspotting/Styled";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";
import { ButtonNormalized } from "~/components/styled/Button";
import TrendingTopics from "~/components/tools/claimspotting/charts/TrendingTopics";
import TrendingNarratives from "~/components/tools/claimspotting/charts/TrendingNarratives";
import StatsFilter from "~/components/tools/claimspotting/charts/StatsFilter";
import { FilterStateProps } from "~/components/tools/claimspotting/charts/types";
import ChannelsPerTopic from "~/components/tools/claimspotting/charts/ChannelsPerTopic";
import { loadStatsFromAPI } from "~/components/tools/claimspotting/utils/loadData";


const Trends = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "claimspotting");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // const [isNextpage, setIsNextPage] = useState<boolean>(false);

  const [filterState, setFilterState] = useState<FilterStateProps>({
    startDate: "",
    endDate: "",
    lastDays: false,
    lastWeek: false,
    lastMonth: false,
    threshold: 5,
    channels: [],
  });

  const [data, setData] = useState<any[]>([]);
  const { strings, language, setLanguage } = useLanguage("claimspotting"); // Use language hook

  // Load data on page load or filter changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    const loadData = async () => {
      const raw = await loadStatsFromAPI(
        filterState.startDate,
        filterState.endDate,
        filterState.channels
      );
      if (raw.error) {
        setError(raw.error);
        setLoading(false);
        return;
      }
      const rawData = raw.data;
      // console.log("Raw data:", rawData);

      // Fill data and count depending on pagination true/false
      const dataArray = rawData.results ? rawData.results : rawData;
      setData(dataArray);
      setLoading(false);
    };
    loadData();
  }, [filterState]);

  // Get translated strings for generic topics/narratives
  const translatedGenericTopics = useMemo(() => {
    const genericTopics = ["Other", "Non-thematic"];
    return genericTopics.map((topic) => {
      return strings?.topics[topic];
    });
  }, [strings]);

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
        strings={strings?.header}
        language={language}
        setLanguage={setLanguage}
      />

      <StatsFilter
        strings={strings?.trends.filter}
        filterState={filterState}
        setFilterState={setFilterState}
      />

      {loading && (
        <Placeholder mode="full" tool="claim">
          {strings?.trends.statusMessages?.loading}
        </Placeholder>
      )}
      {data.length === 0 && !loading && !error && (
        <Placeholder mode="full" tool="claim">
          {strings?.trends.statusMessages?.noData}
        </Placeholder>
      )}
      {error && (
        <Placeholder mode="full" tool="claim" error={true}>
          <ToolSvgBackground type="warning" />
          {(error && strings?.trends.statusMessages?.error) || error}
          <ButtonNormalized onClick={() => window.location.reload()}>
            <ToolSvgBackground type="reload" />
          </ButtonNormalized>
        </Placeholder>
      )}

      {data && data.length > 0 && (
        <TrendingTopics
          data={data}
          threshold={filterState.threshold}
          exclude={translatedGenericTopics}
          strings={strings?.trends?.trendingTopics}
          topicLabels={strings?.topics}
        />
      )}

      {data && data.length > 0 && (
        <TrendingNarratives
          data={data}
          threshold={filterState.threshold}
          exclude={["Keins der Narrative trifft zu."]}
          strings={strings?.trends?.trendingNarrratives}
        />
      )}

      {/* {data && data.length > 0 && (
        <ChannelsPerTopic
          data={data}
          threshold={filterState.threshold}
          exclude={["Keins der Narrative trifft zu."]}
          strings={strings?.trends?.trendingNarrratives}
        />
      )} */}
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
      slug: "trends",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Trends.getLayout = function getLayout(page: ReactElement, props: any) {
  return <LayoutTool props={props}>{page}</LayoutTool>;
};

export default Trends;
