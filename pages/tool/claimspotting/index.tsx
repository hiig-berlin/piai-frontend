import React, {
  ReactElement,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import moment from "moment";
import {
  BoxHighlight,
  ClaimspottingWrapper,
} from "~/components/tools/claimspotting/Styled";
import { Placeholder } from "~/components/tools/shared/Styled";
import ToolHeader from "~/components/tools/shared/Header";
import useLanguage from "~/hooks/useLanguage";
import styled from "styled-components";
import { loadStatsFromAPI } from "~/components/tools/claimspotting/utils/loadData";
import { loadClaimlistFromAPI } from "~/components/tools/claimspotting/utils/loadData";
import { LittleClaimTable } from "~/components/tools/claimspotting/ClaimTable";
import { LittleTrendingTopics } from "~/components/tools/claimspotting/charts/TrendingTopics";
import { Button, LinkButton } from "~/components/styled/Button";
import { SearchForm } from "~/components/tools/map/SearchForm";
import {
  LittleNarrativeSearchBar,
  NarrativeSearchBar,
} from "~/components/tools/claimspotting/NarrativeSearch";

const DEBUG: boolean = true;

const initialParams = {
  stats: {
    startDate: moment().subtract(14, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    channels: [],
    threshold: 8,
    exclude: ["Other", "Non-thematic"],
  },
  list: {
    startDate: moment().subtract(1, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
    page: 1,
    channels: ["neuesausrussland"],
    pagination: false,
  },
};

const Index = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "claimspotting");

  const [loading, setLoading] = useState<any>({ list: false, trend: false });
  const [error, setError] = useState<string | null>(null);
  // const [isNextpage, setIsNextPage] = useState<boolean>(false);

  const [listData, setListData] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);

  const { strings, language, setLanguage } = useLanguage("claimspotting"); // Use language hook

  // Load data on page load or filter changes
  useEffect(() => {
    setError(null);

    const loadStats = async () => {
      setLoading((prevState: any) => ({ ...prevState, trend: true }));
      const rawStats = await loadStatsFromAPI(
        initialParams.stats.startDate,
        initialParams.stats.endDate,
        initialParams.stats.channels
      );
      if (rawStats.error) {
        setError(rawStats.error);
        setLoading(false);
        return;
      }
      const rawStatsData = rawStats.data;
      DEBUG && console.log("Raw stats data:", rawStatsData);

      // Fill data and count depending on pagination true/false
      const statsDataArray = rawStatsData.results
        ? rawStatsData.results
        : rawStatsData;
      setTrendData(statsDataArray);
      setLoading((prevState: any) => ({ ...prevState, trend: false }));
    };

    const loadList = async () => {
      setLoading((prevState: any) => ({ ...prevState, list: true }));
      const rawList = await loadClaimlistFromAPI(
        initialParams.list.startDate,
        initialParams.list.endDate,
        initialParams.list.page,
        initialParams.list.channels,
        initialParams.list.pagination
      );
      if (rawList.error) {
        setError(rawList.error);
        setLoading(false);
        return;
      }
      const rawListData = rawList.data;
      DEBUG && console.log("Raw list data:", rawListData);

      // Fill data and count depending on pagination true/false
      const listDataArray = rawListData.results
        ? rawListData.results
        : rawListData;
      setListData(listDataArray);
      setLoading((prevState: any) => ({ ...prevState, list: false }));
    };
    loadStats();
    loadList();
  }, []);

  // Get translated strings for generic topics/narratives
  const translatedGenericTopics = useMemo(() => {
    const genericTopics = initialParams.stats.exclude;
    return genericTopics.map((topic) => {
      return strings?.topics[topic];
    });
  }, [strings]);

  // // Translate list topics if language changes
  // useEffect(() => {
  //   const translatedListData = listData.map((row: any) => ({
  //     ...row,
  //     Topic: strings?.topics_DE[row.Topic] || row.Topic,
  //   }));

  //   const translatedTrendData = trendData.map((row: any) => ({
  //     ...row,
  //     Topic: strings?.topics[row.Topic] || row.Topic,
  //   }));

  //   // Check if the translated data is different before setting state
  //   const isDifferentList =
  //     JSON.stringify(translatedListData) !== JSON.stringify(listData);

  //   if (isDifferentList) {
  //     setListData(translatedListData); // Only set the state if the data is actually different
  //     DEBUG && console.log("Data array after translation: ", translatedListData);
  //   }
  // }, [strings?.topics_DE, listData]);

  const handleSearchQuery = (query: string) => {
    
    if(query != "" || query == undefined) {
      // transform query string to url compatible param
      query = query.replace(/ /g, "+");
      // redirect to search page with query params, keep language param
      window.location.href = `/tool/claimspotting/search?lang=${language}&query=${query}`;
    }
  }

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

      <Statusbar>
        {loading.trends ||
          (loading.list && (
            <Placeholder mode="full" tool="claim">
              {strings?.index.statusMessages?.loading}
            </Placeholder>
          ))}
        {(listData.length === 0 || trendData.length === 0) &&
          !loading &&
          !error && (
            <Placeholder mode="full" tool="claim">
              {strings?.index.statusMessages?.noData}
            </Placeholder>
          )}
        {error && (
          <Placeholder mode="full" tool="claim">
            {(error && strings?.index.statusMessages?.error) || error}
          </Placeholder>
        )}
      </Statusbar>

      <Grid>
        <div className="column left">

          <BoxHighlight className="about">
            <h2>{strings?.index.about?.title}</h2>
            <p>{strings?.index.about?.description}</p>
            <LinkButton href={strings?.index.about?.CTA?.url}>
              {strings?.index.about?.CTA?.label}
            </LinkButton>
          </BoxHighlight>

          {listData.length > 0 && (
            <LittleClaimTable
              data={listData}
              strings={strings?.index.table}
              topicLabels={strings?.topics_DE}
            />
          )}

        </div>
        <div className="column right">

          <LittleNarrativeSearchBar
            searchQuery={""}
            setSearchQuery={(query) => {
              handleSearchQuery(query)
            }}
            strings={strings?.index.search}
          />

          {trendData.length > 0 && (
            <LittleTrendingTopics
              data={trendData}
              threshold={initialParams.stats.threshold}
              strings={strings?.index.trends}
              topicLabels={strings?.topics}
              exclude={translatedGenericTopics}
            />
          )}

        </div>
      </Grid>
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: 1fr 1fr;
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: var(--size-3);
  }

  .about {
    a {
      margin: 0;
      align-self: flex-start;
    }
  }

  .searchInput {
    .littleForm {
      display: flex;
      flex-direction: row;
      gap: var(--size-3);

      form {
        flex: auto 1 1;
        margin: 0;
        width: unset;
        align-content: center;
      }

      & > button {
        margin: 0;
        align-self: center;
      }
    }
  }
`;
