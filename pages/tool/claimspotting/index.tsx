import React, { ReactElement, useEffect, useState, useCallback } from "react";
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
import { FilterStateProps } from "~/components/tools/claimspotting/ui/types";
import { ClaimspottingWrapper } from "~/components/tools/claimspotting/Styled";
import axios from "axios"; // Add axios for making HTTP requests
import { Placeholder } from "~/components/tools/shared/Styled";

// Function to load data in development
// const loadLocalData = async () => {
//   const { dummyClaims } = await import(
//     "~/assets/test-data/claimspotting/LarissaDummyShort"
//   );
//   return dummyClaims;
// };

// Function to load data in production
// const loadProductionData = async () => {
//   try {
//     const response = await axios.get("https://res.cloudinary.com/dcipqnhka/raw/upload/v1723592731/claimspotting/LarissaDummyShort.tsx");
//     let data = response.data;

//     if (typeof data === "string" && data.startsWith("export const dummyClaims =")) {
//       // Extract the array from the string using eval
//       data = eval(data.replace("export const dummyClaims =", ""));
//     }

//     console.log("Data loaded successfully:", data);

//     return data;
//   } catch (error) {
//     console.error("Error loading data:", error);
//     return [];
//   }
// };

const loadDataFromAPI = async () => {
  // Parameters for the GET request
  const params = {
    start_date: "2024-08-19",
    end_date: "2024-08-20",
    factual: "true",
    pagination: "true",
    page: "2",
  };

  // Convert the parameters object to a query string
  const url = new URL(process.env.NEXT_PUBLIC_CLAIMSPOTTING_API_URL as string);
  const queryString = new URLSearchParams(params).toString();

  try {
    const response = await fetch(`${url}?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_CLAIMSPOTTING_API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json();
      console.log("Data loaded successfully: ", data);
      return data;
    }
  } catch (error) {
    console.log("Fetch Error:", error);
    throw error;
  }
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

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  // Initialize state with explicit type
  const [filterState, setFilterState] = useState<FilterStateProps>({
    startDate: "",
    endDate: "",
    narrative: "",
    topics: [],
    attributes: {
      polarising: false,
      sensational: false,
      // factual: true,
      highDiffusion: false,
      manyTwins: false,
    },
    lastWeek: false,
    lastMonth: false,
  });

  // Load data asynchronously
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      const rawData = await loadDataFromAPI();
      console.log("Raw data:", rawData);

      const data = rawData.results;
      console.log("Flattened data array:", data, data.flat(2));
      setData(data);
      setFilteredData(data);
      setLoading(false);
    };

    loadData();
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

      {loading ? (
        <Placeholder>Loading data...</Placeholder>
      ) : (
        <>
          <Filter
            data={data}
            onFilterChange={handleFilterChange}
            dataLengthTotal={data.length}
            dataLengthFiltered={filteredData.length}
            filterState={filterState}
            setFilterState={setFilterState}
          />
          <ClaimTable data={filteredData} setFilterState={setFilterState} />
        </>
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
      slug: "index",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Index.getLayout = function getLayout(page: ReactElement, props: any) {
  return <LayoutTool props={props}>{page}</LayoutTool>;
};

export default Index;
