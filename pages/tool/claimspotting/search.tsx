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
import { loadSeachDataFromAPI } from "~/components/tools/claimspotting/utils/loadData";

const Search = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "claimspotting");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [data, setData] = useState<any[]>([]);
  // const [searchQuery, setSearchQuery] = useState<string>("unsinn");

  const { strings, language, setLanguage } = useLanguage("claimspotting"); // Use language hook
  const converter = new showdown.Converter();
  const disclaimer = converter.makeHtml(strings?.search.disclaimer.text);

  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  // Get URL param 'query' and set searchQuery accordingly
  useEffect(() => {
    // Initialize only on the client after mount
    if (searchQuery === null) {
      // Ensure we initialize only once
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get("query");

      if (q && q.trim() !== "") {
        console.log("Search query from URL:", q);
        setSearchQuery(q.replace(/\+/g, " ")); // Set searchQuery from URL
      } else {
        setSearchQuery(""); // Set to empty string if no query is found
      }
    }
  }, [searchQuery]); // Run only if searchQuery is uninitialized

  // Load data on page load or filter changes
  useEffect(() => {
    console.log("Search query in effect:", searchQuery);
    if (searchQuery === null || searchQuery === "") {
      return;
    }
    setLoading(true);
    setError(null);

    const loadData = async () => {
      const raw = await loadSeachDataFromAPI(searchQuery);
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
  }, [searchQuery]);

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
      {data.length === 0 && !loading && !error && searchQuery != "" && (
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

      <SearchWrapper>
        {searchQuery != null && (
          <NarrativeSearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            strings={strings?.search?.input}
          />
        )}

        {data.length > 0 && searchQuery != null && (
          <NarrativeSearchResults
            data={data}
            strings={strings?.search?.results}
            searchQuery={searchQuery}
          />
        )}

        <Box className="disclaimer">
          <h2>{strings?.search?.disclaimer.title}</h2>
          <SafeHtmlDiv html={disclaimer} />
          <h3>{strings?.search?.disclaimer.subheadline}</h3>
          <SafeHtmlDiv
            html={strings?.search?.disclaimer.explanation}
            className="explanation"
          />
        </Box>
      </SearchWrapper>
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
      slug: "search",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Search.getLayout = function getLayout(page: ReactElement, props: any) {
  return <LayoutTool props={props}>{page}</LayoutTool>;
};

export default Search;
