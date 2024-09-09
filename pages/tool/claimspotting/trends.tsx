import React, { ReactElement, useEffect, useState } from "react";
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
import {
  NarrativeSearchBar,
  NarrativeSearchResults,
  SearchWrapper,
} from "~/components/tools/claimspotting/NarrativeSearch";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";
import { ButtonNormalized } from "~/components/styled/Button";
import showdown from "showdown";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { Box } from "~/components/tools/shared/ui/Box";
import { start } from "repl";
import TrendingTopics from "~/components/tools/claimspotting/charts/TrendingTopics";

const loadDataFromAPI = async (
  startDate: string,
  endDate: string,
  channel_names: string
) => {
  const params: Record<string, string> = {};

  if (startDate) params.start_day = startDate;
  if (endDate) params.end_day = endDate;
  if (channel_names) params.channel_names = channel_names;

  // Convert the parameters object to a query string
  const url = new URL(
    process.env.NEXT_PUBLIC_CLAIMSPOTTING_API_STATS as string
  );
  const queryString = new URLSearchParams(params).toString();
  // Only append query string if it's not empty
  const fullUrl = queryString ? `${url}?${queryString}` : url.toString();

  if (process.env.NODE_ENV === "development")
    console.log(
      "Fetching data from url: ",
      url + queryString,
      "with those params",
      params
    );
  try {
    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      if (process.env.NODE_ENV === "development")
        console.log("Data loaded successfully: ", data);
      return { error: null, data: data };
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development")
      console.log("Fetch Error:", error);
    return {
      error:
        "Error loading data. Try to refresh the page, the server might be tempoarily at capacity.",
      data: [],
    };
    // throw error;
  }
};

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

  const [data, setData] = useState<any[]>([]);
  const [queryParams, setQueryParams] = useState({
    // startDate: "2024-06-01",
    // endDate: "2024-06-01",
    // channels: "impfen_nein_danke, QAnons_Deutschland, karpfsebastian"
    startDate: "",
    endDate: "",
    channels: "",
  });

  const { strings, language, setLanguage } = useLanguage("claimspotting"); // Use language hook

  // Load data on page load or filter changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    const loadData = async () => {
      const raw = await loadDataFromAPI(
        queryParams.startDate,
        queryParams.endDate,
        queryParams.channels
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
  }, [queryParams]);

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

      {loading && (
        <Placeholder mode="full" tool="claim">
          {strings?.search.statusMessages?.loading}
        </Placeholder>
      )}
      {data.length === 0 && !loading && !error && (
        <Placeholder mode="full" tool="claim">
          {strings?.search.statusMessages?.noData}
        </Placeholder>
      )}
      {error && (
        <Placeholder mode="full" tool="claim" error={true}>
          <ToolSvgBackground type="warning" />
          {(error && strings?.search.statusMessages?.error) || error}
          <ButtonNormalized onClick={() => window.location.reload()}>
            <ToolSvgBackground type="reload" />
          </ButtonNormalized>
        </Placeholder>
      )}

      {data && data.length > 0 && 
      <TrendingTopics 
        data={data} 
        threshold={7}
        exclude={["Other", "Non-thematic"]}
      />}
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
