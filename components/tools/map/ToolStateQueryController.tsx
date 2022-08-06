import React, { useEffect } from "react";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import { appConfig } from "~/config";
import { GeoJson } from "./map/types";

import { createQueryFromState } from "./map/utils";
import {
  defaultToolState,
  Settings,
  useToolStateFilterState,
  useToolStateMapState,
  useToolStateStoreActions,
} from "./state/toolStateStore";

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

export const defaultQueryString = createQueryFromState(
  defaultToolState.filter,
  {
    onlyIds: "1",
  }
).join("&");

// context provider
export const ToolStateQueryController = () => {
  const stateMap = useToolStateMapState();
  const stateFilter = useToolStateFilterState();
  const { updateFilterState, updateMapState, setSettingsState } =
    useToolStateStoreActions();

  const queryResultSettings = useQuery(["settings"], fetchSettings);

  const queryResultGeoJson = useQuery(["geojson"], fetchGeoJson, {
    enabled: stateMap.loadGeoJson,
  });

  const currentQueryString = createQueryFromState(stateFilter, {
    onlyIds: "1",
  }).join("&");

  const queryFilteredIds = useQuery(
    ["map-filter", { queryString: currentQueryString }],
    fetchFilteredQueryIds,
    {
      enabled: defaultQueryString !== currentQueryString,
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
      setSettingsState(queryResultSettings.data as Settings);
    }
  }, [
    queryResultSettings.isLoading,
    queryResultSettings.isSuccess,
    queryResultSettings.data,
    setSettingsState,
  ]);

  useEffect(() => {
    if (
      !queryResultGeoJson.isLoading &&
      queryResultGeoJson.isSuccess &&
      queryResultGeoJson?.data?.type === "FeatureCollection"
    ) {
      updateMapState({
        geoJson: queryResultGeoJson.data as GeoJson,
      });
      updateFilterState({
        totalCount: queryResultGeoJson.data?.features?.length ?? 0,
        filteredCount: queryResultGeoJson.data?.features?.length ?? 0,
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
      updateFilterState({
        filteredIds: queryFilteredIds.data.data,
        filteredCount: queryFilteredIds.data.data.length,
        isFetchingFilteredIds: false,
        filterQueryString: currentQueryString,
      });
    } else if (queryFilteredIds.isFetching) {
      updateFilterState({
        isFetchingFilteredIds: true,
      });
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
