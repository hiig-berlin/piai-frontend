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

export type MapState = {
  ready: boolean;
  isDrawerOpen: boolean;
  loadGeoJson: boolean;
  geoJson: GeoJson | null;
  hideIntro: boolean;
  quickViewProjectId: number | null;
  totalCount: number;
  totalInViewCount: number;
  filteredCount: number;
  filteredInViewCount: number;
};

export type FilterState = {
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
  payload?: MapState | FilterState | Settings | GeoJson;
};

export const defaultToolState: ToolState = {
  map: {
    loadGeoJson: false,
    geoJson: null,
    ready: false,
    isDrawerOpen: false,
    hideIntro: false,
    quickViewProjectId: null,
    totalCount: 0,
    totalInViewCount: 0,
    filteredCount: 0,
    filteredInViewCount: 0,
  },
  filter: {
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
      return {
        ...state,
        filter: (action?.payload ?? defaultToolState.filter) as FilterState,
      };

    case "settings":
      return {
        ...state,
        settings: (action?.payload ?? defaultToolState.settings) as Settings,
      };

    case "geoJson":
      state.map.geoJson = (action?.payload as GeoJson) ?? null;

      console.log(state.map.geoJson);
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
  console.log(`${appConfig.cmsUrl}${mapTool?.config?.urlGeoJson}`);
  return fetch(`${appConfig.cmsUrl}${mapTool?.config?.urlGeoJson}`, {
    // Pass the signal to one fetch
    signal,
  }).then(async (response) => await response.json());
};

// try {
//       fetch(`${self.config.cmsUrl}${self.toolConfig.urlGeoJson}`)
//         .then(async (response) => {
//           if (response.ok) {
//             const data = await response.json();
//             if (
//               data &&
//               data?.type &&
//               data?.type === "FeatureCollection" &&
//               Array.isArray(data?.features)
//             ) {
//               self.geoJsonAllData = data;
//               self.isBaseDataLoaded = true;

//               self.updateMapState({
//                 totalCount: (data?.features?.length ?? 0) as number,
//                 filteredCount: 0,
//               });

//               maybeProcess();
//             }
//           }
//         })
//         .catch((err: any) => {
//           if (
//             typeof window !== "undefined" &&
//             window.process.env.NODE_ENV === "development"
//           )
//             console.error("Mapcontroller 1: ", err);
//         });
//     } catch (err) {
//       if (
//         typeof window !== "undefined" &&
//         window.process.env.NODE_ENV === "development"
//       )
//         console.error("Mapcontroller 2: ", err);
//     }

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
        type: "filter",
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
