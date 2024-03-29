import React, { startTransition, useEffect } from "react";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { appConfig } from "~/config";
import { GeoJson } from "../map/types";

import {
  createCompareQueryFromState,
  createQueryFromState,
} from "../map/utils";
import {
  defaultCompareQueryString,
  Settings,
  useToolStateFilterState,
  useToolStateMapState,
  useToolStateStoreActions,
} from "./ToolState";

const fetchSettings = async ({ signal }: QueryFunctionContext) => {
  return fetch(`${appConfig.apiUrl}/fluxed/v1/piai/filter`, {
    // Pass the signal to one fetch
    signal,
  }).then(async (response) => await response.json());
};

const fetchGeoJson = async ({ signal }: QueryFunctionContext) => {
  const mapTool = appConfig.tools?.find((t) => t.slug === "map");

  if (!mapTool?.config?.urlGeoJson) return null;

  return fetch(`${appConfig.cmsUrl}${mapTool?.config?.urlGeoJson}`, {
    // Pass the signal to one fetch
    signal,
  }).then(async (response) => await response.json());
};

const fetchFilteredQueryIds = async ({
  signal,
  queryKey,
}: QueryFunctionContext) => {
  const [_key, { queryString }] = queryKey as any;
  return fetch(`${appConfig.cmsUrl}/map/query?${queryString}`, {
    // Pass the signal to one fetch
    signal,
  }).then(async (response) => await response.json());
};

// context provider
export const ToolStateController = () => {
  const stateMap = useToolStateMapState();
  const stateFilter = useToolStateFilterState();
  const { updateFilterState, updateMapState, updateSettingsState } =
    useToolStateStoreActions();

  const queryResultSettings = useQuery(["settings"], fetchSettings);

  const queryResultGeoJson = useQuery(["geojson"], fetchGeoJson, {
    enabled: stateMap.loadGeoJson,
  });

  const currentQueryString = createCompareQueryFromState(stateFilter);

  const newFilterIdsQuery = createQueryFromState(
    stateFilter,
    {
      onlyIds: "1",
    },
    ["filter", "search", "empty", "keyword"]
  );

  const queryFilteredIds = useQuery(
    [
      "map-filter",
      {
        queryString:
          newFilterIdsQuery.length > 0 ? newFilterIdsQuery.slice(1) : "",
      },
    ],
    fetchFilteredQueryIds,
    {
      enabled: defaultCompareQueryString !== currentQueryString,
    }
  );

  if (queryResultSettings.isError)
    throw "Could not fetch needed data from server.";

  useEffect(() => {
    if (
      !queryResultSettings.isLoading &&
      queryResultSettings.isSuccess &&
      queryResultSettings.data
    ) {
      startTransition(() =>
        updateSettingsState(queryResultSettings.data as Settings)
      );
    }
  }, [
    queryResultSettings.isLoading,
    queryResultSettings.isSuccess,
    queryResultSettings.data,
    updateSettingsState,
  ]);

  useEffect(() => {
    if (
      !queryResultGeoJson.isLoading &&
      queryResultGeoJson.isSuccess &&
      queryResultGeoJson?.data?.type === "FeatureCollection"
    ) {
      startTransition(() => {
        updateMapState({
          geoJson: queryResultGeoJson.data as GeoJson,
        });
        updateFilterState({
          totalCount: queryResultGeoJson.data?.features?.length ?? 0,
          filteredCount: queryResultGeoJson.data?.features?.length ?? 0,
        });
      });
    }
  }, [
    queryResultGeoJson.isLoading,
    queryResultGeoJson.isSuccess,
    queryResultGeoJson.data,
    updateMapState,
    updateFilterState,
  ]);

  useEffect(() => {
    if (
      !queryFilteredIds.isLoading &&
      !queryFilteredIds.isFetching &&
      queryFilteredIds.isSuccess &&
      Array.isArray(queryFilteredIds?.data?.data)
    ) {
      startTransition(() =>
        updateFilterState({
          filteredIds: queryFilteredIds.data.data,
          filteredCount: queryFilteredIds.data.data.length,
          isFetchingFilteredIds: false,
          filterQueryString: currentQueryString,
        })
      );
    } else if (queryFilteredIds.isFetching) {
      startTransition(() =>
        updateFilterState({
          isFetchingFilteredIds: true,
        })
      );
    }
  }, [
    queryFilteredIds.isLoading,
    queryFilteredIds.isFetching,
    queryFilteredIds.isSuccess,
    queryFilteredIds.data,
    currentQueryString,
    updateFilterState,
  ]);
  return <></>;
};
