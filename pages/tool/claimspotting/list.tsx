import React, { ReactElement, useEffect, useState, useCallback } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import moment from "moment";
import Filter from "~/components/tools/claimspotting/Filter";
import ClaimTable from "~/components/tools/claimspotting/ClaimTable";
import { FilterStateProps } from "~/components/tools/claimspotting/ui/types";
import { ClaimspottingWrapper } from "~/components/tools/claimspotting/Styled";
import { Placeholder } from "~/components/tools/shared/Styled";
import ToolHeader from "~/components/tools/shared/Header";
import useLanguage from "~/hooks/useLanguage";
import styled from "styled-components";
import CopyPaste from "~/components/tools/claimspotting/ui/CopyPaste";
import { transformToTSV } from "~/components/tools/claimspotting/utils/formatData";
import { loadClaimlistFromAPI } from "~/components/tools/claimspotting/utils/loadData";

const DEBUG: boolean = false;

const List = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "claimspotting");

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  // const [isNextpage, setIsNextPage] = useState<boolean>(false);

  const [data, setData] = useState<any[]>([]);
  const [dataLength, setDataLength] = useState<number>(0);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);

  const { strings, language, setLanguage } = useLanguage("claimspotting"); // Use language hook

  // Initialize state with explicit type
  const [filterState, setFilterState] = useState<FilterStateProps>({
    startDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    narrative: "",
    topics: [],
    attributes: {
      polarising: false,
      sensational: false,
      // factual: true,
      highDiffusion: false,
      manyTwins: false,
    },
    lastDays: false,
    lastWeek: false,
    lastMonth: false,
  });

  // Load data on page load or filter changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    const loadData = async () => {
      const raw = await loadClaimlistFromAPI(
        filterState.startDate,
        filterState.endDate,
        page,
        [],
        undefined
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
      setDataLength(rawData.count ? rawData.count : rawData.length);

      if (page === 1) {
        setData(dataArray);
        setFilteredData(dataArray);
      } else {
        setData((prevData) => [...prevData, ...dataArray]);
        setFilteredData((prevFilteredData) => [
          ...prevFilteredData,
          ...dataArray,
        ]);
      }
      rawData.next && setPage(page + 1);
      setLoading(false);
    };
    loadData();
  }, [filterState.startDate, filterState.endDate, page]);

  // Translate topics if language changes
  useEffect(() => {
    const translatedData = filteredData.map((row: any) => ({
      ...row,
      Topic: strings?.topics_DE[row.Topic] || row.Topic,
    }));

    // Check if the translated data is different before setting state
    const isDifferent =
      JSON.stringify(translatedData) !== JSON.stringify(filteredData);

    if (isDifferent) {
      setFilteredData(translatedData); // Only set the state if the data is actually different
      DEBUG && console.log("Data array after translation: ", translatedData);
    }
  }, [strings?.topics_DE, filteredData]);

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
        strings={strings?.header}
        language={language}
        setLanguage={setLanguage}
      />

      <Filter
        data={data}
        onFilterChange={handleFilterChange}
        dataLengthTotal={dataLength}
        dataLengthFiltered={filteredData.length}
        filterState={filterState}
        setFilterState={setFilterState}
        strings={strings?.list.filter}
        topicLabels={strings?.topics_DE}
      />

      <Statusbar>
        {loading && (
          <Placeholder mode="full" tool="claim">
            {strings?.list.statusMessages?.loadingPre} {page}{" "}
            {strings?.list.statusMessages?.loadingPost}
          </Placeholder>
        )}
        {data.length === 0 && !loading && !error && (
          <Placeholder mode="full" tool="claim">
            {strings?.list.statusMessages?.noData}
          </Placeholder>
        )}
        {error && (
          <Placeholder mode="full" tool="claim">
            {(error && strings?.list.statusMessages?.error) || error}
          </Placeholder>
        )}
        {filteredData.length != 0 && (
          <CopyPaste
            text={transformToTSV(filteredData)}
            strings={strings?.list.copyPaste}
          />
        )}
      </Statusbar>

      {data.length > 0 && (
        <ClaimTable
          data={filteredData}
          setFilterState={setFilterState}
          strings={strings?.list.table}
          topicLabels={strings?.topics_DE}
          copyLabels={strings?.list.copyPaste}
        />
      )}
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
      slug: "list",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

List.getLayout = function getLayout(page: ReactElement, props: any) {
  return <LayoutTool props={props}>{page}</LayoutTool>;
};

export default List;

const Statusbar = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--size-3);
  justify-content: flex-end;

  p {
    margin: 0;
    flex: 1 0 auto;
  }
`;
