import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
  useEffect,
  useRef,
  startTransition,
  useMemo,
} from "react";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import cloneDeep from "lodash/cloneDeep";

import useIsMounted from "~/hooks/useIsMounted";
import { appConfig } from "~/config";
import { GeoJson } from "../map/types";
import type { MapController } from "../map/MapController";
import { createQueryFromState } from "../map/utils";

export type MapState = {
  ready: boolean;
  mapController: MapController | null;
  loadGeoJson: boolean;
  geoJson: GeoJson | null;
  hideIntro: boolean;
  totalInViewCount: number;
  filteredInViewCount: number;
};

export type FilterState = {
  totalCount: number;
  filteredCount: number;
  filteredIds: number[] | null;
  filterQueryString: string;
  isFetchingFilteredIds: boolean;
  quickViewProjectId: number | null;
  isDrawerOpen: boolean;
  isFilterOpen: boolean;
  isSearchOpen: boolean;
  genderRatio: boolean;
  dateFrom: string | null | undefined;
  dateUntil: string | null | undefined;
  terms: Record<number, string> | null | undefined;
  s: string | null | undefined;
  continents: Record<number, string> | null | undefined;
  countries: Record<number, string> | null | undefined;
};

export type FilterSettingTaxonomyOption = {
  id: number;
  name: string;
  count: number;
};

type FilterSettingTaxonomyOptionContinentChild = {
  id: number;
  name: string;
  count: number;
  children?: FilterSettingTaxonomyOptionContinentChild[];
  parent: number;
};

type FilterSettingTaxonomyOptionContinent = {
  id: number;
  name: string;
  count: number;
  children?: FilterSettingTaxonomyOptionContinentChild[];
};

export type FilterSettingTaxonomy = {
  label: string;
  options: FilterSettingTaxonomyOption[];
};

type Settings = {
  styleUrl: string;
  continents: FilterSettingTaxonomyOptionContinent[] | null | undefined;
  countries: FilterSettingTaxonomyOption[] | null | undefined;
  funding: FilterSettingTaxonomy | null | undefined;
  industrialSector: FilterSettingTaxonomy | null | undefined;
  useOfAi: FilterSettingTaxonomy | null | undefined;
  isProjectOpenSource: FilterSettingTaxonomy | null | undefined;
};

export type ToolState = {
  map: MapState;
  filter: FilterState;
  settings: Settings;
};

type ToolStateContext = {
  map: MapState;
  filter: FilterState;
  settings: Settings;
  setMapState: (mapState: MapState) => void;
  setFilterState: (filterState: FilterState) => void;
  updateMapState: (state: Partial<MapState>) => void;
  getState: () => ToolState;
  getMapState: () => MapState;
  getFilterState: () => FilterState;
  updateFilterState: (state: Partial<FilterState>) => void;
};

type ToolStateAction = {
  type: string;
  payload?: MapState | FilterState | Partial<FilterState> | Settings | GeoJson;
};

export const defaultToolState: ToolState = {
  map: {
    loadGeoJson: false,
    geoJson: null,
    ready: false,
    mapController: null,
    hideIntro: false,
    totalInViewCount: 0,
    filteredInViewCount: 0,
  },
  filter: {
    filteredCount: 0,
    totalCount: 0,
    filteredIds: null,
    filterQueryString: "",
    isFetchingFilteredIds: false,
    isDrawerOpen: false,
    quickViewProjectId: null,
    isFilterOpen: false,
    isSearchOpen: false,
    dateFrom: null,
    dateUntil: null,
    genderRatio: false,
    terms: {},
    countries: {},
    continents: {},
    s: null,
  },
  settings: {
    styleUrl: "",
    countries: [],
    continents: [],
    funding: null,
    industrialSector: null,
    useOfAi: null,
    isProjectOpenSource: null,
  },
};

const defaultToolStateContext: ToolStateContext = {
  ...defaultToolState,
  setFilterState: (filterState: FilterState) => {},
  getState: () => defaultToolState,
  getMapState: () => defaultToolState.map,
  setMapState: (mapState: MapState) => {},
  updateMapState: (state: Partial<MapState>) => {},
  getFilterState: () => defaultToolState.filter,
  updateFilterState: (state: Partial<FilterState>) => {},
};

const toolStateReducer = function <T>(
  state: ToolState,
  action: ToolStateAction
): ToolState {
  switch (action.type) {
    case "map":
      return {
        ...state,
        map: (action?.payload ?? defaultToolState.map) as MapState,
      };

    case "filter":
      const newState = {
        ...state,
        filter: (action?.payload ?? defaultToolState.filter) as FilterState,
      };

      if (
        createQueryFromState(newState.filter, {
          onlyIds: "1",
        }).join("&") === defaultQueryString
      )
        newState.filter.filteredCount = newState.filter.totalCount;

      return newState;

    case "filterMerge":
      const newMergeState = {
        ...state,
        filter: {
          ...state.filter,
          ...((action?.payload ??
            defaultToolState.filter) as Partial<FilterState>),
        },
      };

      if (
        createQueryFromState(newMergeState.filter, {
          onlyIds: "1",
        }).join("&") === defaultQueryString
      )
        newMergeState.filter.filteredCount = newMergeState.filter.totalCount;

      return newMergeState;

    case "settings":
      return {
        ...state,
        settings: (action?.payload ?? defaultToolState.settings) as Settings,
      };

    case "geoJson":
      state.map.geoJson = (action?.payload as GeoJson) ?? null;
      state.filter.totalCount =
        (action?.payload as GeoJson)?.features?.length ?? 0;
      state.filter.filteredCount = state.filter.totalCount;
      return state;

    default:
      return state;
  }
};

// create context
const ToolStateContext = createContext<ToolStateContext>(
  defaultToolStateContext
);

export const useToolStateContext = () => useContext(ToolStateContext);

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
export const ToolStateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useIsMounted();
  const [state, dispatch] = useReducer(
    toolStateReducer,
    cloneDeep(defaultToolState)
  );

  const stateRef = useRef<ToolState>(state);

  stateRef.current = state;

  const queryResultSettings = useQuery(["settings"], fetchSettings);

  const queryResultGeoJson = useQuery(["geojson"], fetchGeoJson, {
    enabled: state.map.loadGeoJson,
  });

  const currentQueryString = createQueryFromState(state.filter, {
    onlyIds: "1",
  }).join("&");

  const queryFilteredIds = useQuery(
    ["map-filter", { queryString: currentQueryString }],
    fetchFilteredQueryIds,
    {
      enabled: defaultQueryString !== currentQueryString,
    }
  );

  const startTransitionDispatch = useCallback(
    (action: ToolStateAction) => {
      startTransition(() => {
        dispatch(action);
      });
    },
    [dispatch]
  );

  const getMapState = useCallback(() => {
    return stateRef.current.map;
  }, []);

  const setMapState = useCallback(
    (mapState: MapState) => {
      if (!isMounted) return;
      startTransitionDispatch({
        type: "map",
        payload: mapState,
      });
    },
    [isMounted, startTransitionDispatch]
  );

  const updateMapState = useCallback(
    (state: Partial<MapState>) => {
      if (!isMounted) return;
      startTransitionDispatch({
        type: "map",
        payload: {
          ...stateRef.current.map,
          ...state,
        },
      });
    },
    [isMounted, startTransitionDispatch]
  );

  const getState = useCallback(() => {
    return stateRef.current;
  }, []);

  const getFilterState = useCallback(() => {
    return stateRef.current.filter;
  }, []);

  const setFilterState = useCallback(
    (filterState: FilterState) => {
      if (!isMounted) return;
      startTransitionDispatch({
        type: "filter",
        payload: filterState,
      });
    },
    [isMounted, startTransitionDispatch]
  );

  const updateFilterState = useCallback(
    (state: Partial<FilterState>) => {
      if (!isMounted) return;

      startTransitionDispatch({
        type: "filterMerge",
        payload: {
          ...stateRef.current.filter,
          ...state,
        },
      });
    },
    [isMounted, startTransitionDispatch]
  );

  if (queryResultSettings.isError)
    throw "Could not fetch needed data from server.";

  useEffect(() => {
    if (
      !queryResultSettings.isLoading &&
      queryResultSettings.isSuccess &&
      queryResultSettings.data
    ) {
      startTransitionDispatch({
        type: "settings",
        payload: queryResultSettings.data as Settings,
      });
    }
  }, [
    queryResultSettings.isLoading,
    queryResultSettings.isSuccess,
    queryResultSettings.data,
    startTransitionDispatch,
  ]);

  useEffect(() => {
    if (
      !queryResultGeoJson.isLoading &&
      queryResultGeoJson.isSuccess &&
      queryResultGeoJson?.data?.type === "FeatureCollection"
    ) {
      startTransitionDispatch({
        type: "geoJson",
        payload: queryResultGeoJson.data as GeoJson,
      });
    }
  }, [
    queryResultGeoJson.isLoading,
    queryResultGeoJson.isSuccess,
    queryResultGeoJson.data,
    startTransitionDispatch,
  ]);

  useEffect(() => {
    if (
      !queryFilteredIds.isLoading &&
      !queryFilteredIds.isFetching &&
      queryFilteredIds.isSuccess &&
      Array.isArray(queryFilteredIds?.data?.data)
    ) {
      startTransitionDispatch({
        type: "filterMerge",
        payload: {
          filteredIds: queryFilteredIds.data.data,
          filteredCount: queryFilteredIds.data.data.length,
          isFetchingFilteredIds: false,
          filterQueryString: currentQueryString,
        },
      });
    } else if (queryFilteredIds.isFetching) {
      startTransitionDispatch({
        type: "filterMerge",
        payload: {
          isFetchingFilteredIds: true,
        },
      });
    }
  }, [
    queryFilteredIds.isLoading,
    queryFilteredIds.isFetching,
    queryFilteredIds.isSuccess,
    queryFilteredIds.data,
    currentQueryString,
    startTransitionDispatch,
  ]);

  return (
    <ToolStateContext.Provider
      value={useMemo(
        () => ({
          ...state,
          getState,
          getFilterState,
          setFilterState,
          updateFilterState,
          getMapState,
          setMapState,
          updateMapState,
        }),
        [
          state,
          getState,
          getFilterState,
          setFilterState,
          updateFilterState,
          getMapState,
          setMapState,
          updateMapState,
        ]
      )}
    >
      {children}
    </ToolStateContext.Provider>
  );
};
