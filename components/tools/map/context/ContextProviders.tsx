import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
  useEffect,
  useState,
  useRef,
  startTransition,
} from "react";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import useIsMounted from "~/hooks/useIsMounted";
import { appConfig } from "~/config";

export type MapState = {
  ready: boolean;
  isDrawerOpen: boolean;
  hideIntro: boolean;
  quickViewProjectId: number | null;
  // TODO: extend ...
};

export type FilterState = {
  termIds: number[] | null | undefined;
  s: string | null | undefined;
  continents: number[] | null | undefined;
  countries: number[] | null | undefined;
};

type FilterSettingTaxonomyOption = {
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

type FilterSettingTaxonomy = {
  label: string;
  options: FilterSettingTaxonomyOption[];
};

type FilterSettings = {
  styleUrl: string;
  continents: FilterSettingTaxonomyOptionContinent[] | null | undefined;
  countries: FilterSettingTaxonomyOption[] | null | undefined;
  funding: FilterSettingTaxonomy | null | undefined;
  industrialSector: FilterSettingTaxonomy | null | undefined;
  useOfAi: FilterSettingTaxonomy | null | undefined;
  isProjectOpenSource: FilterSettingTaxonomy | null | undefined;
};

type View = "map" | "directory" | "page" | "filterSettings" | null | undefined;

type ToolState = {
  view: View;
  map: MapState;
  filter: FilterState;
  filterSettings: FilterSettings;
};

type ToolStateContext = {
  view: View;
  map: MapState;
  filter: FilterState;
  filterSettings: FilterSettings;
  setView: (view: View) => void;
  setMapState: (mapState: MapState) => void;
  updateMapState: (state: Partial<MapState>) => void;
  setFilterState: (filterState: FilterState) => void;
  getState: () => ToolState;
  getMapState: () => MapState;
  getFilterState: () => FilterState;
  reset: () => void;
};

type ToolStateAction = {
  type: string;
  payload?: MapState | FilterState | View | FilterSettings;
};

const defaultToolState: ToolState = {
  view: null,
  map: {
    ready: false,
    isDrawerOpen: false,
    hideIntro: false,
    quickViewProjectId: null,
  },
  filter: {
    termIds: [],
    countries: [],
    continents: null,
    s: null,
  },
  filterSettings: {
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
  setView: (view: View) => {},
  setFilterState: (filterState: FilterState) => {},
  getState: () => defaultToolState,
  getMapState: () => defaultToolState.map,
  setMapState: (mapState: MapState) => {},
  updateMapState: (state: Partial<MapState>) => {},
  getFilterState: () => defaultToolState.filter,
  reset: () => {},
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
    case "filterSettings":
      return {
        ...state,
        filterSettings: (action?.payload ??
          defaultToolState.filterSettings) as FilterSettings,
      };
    case "view":
      return {
        ...state,
        view: (action?.payload ?? defaultToolState.view) as View,
      };
    case "reset":
      return { ...defaultToolState };
    default:
      return state;
  }
};

// create context
const ToolStateContext = createContext<ToolStateContext>(
  defaultToolStateContext
);

export const useToolStateContext = () => useContext(ToolStateContext);

const fetchFilterSettings = async ({ signal }: QueryFunctionContext) => {
  return fetch(`${appConfig.apiUrl}/fluxed/v1/piai/filter`, {
    // Pass the signal to one fetch
    signal,
  }).then(async (response) => await response.json());
};

// context provider
export const ToolStateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useIsMounted();
  const [state, dispatch] = useReducer(toolStateReducer, defaultToolState);

  const stateRef = useRef<ToolState>(defaultToolState);

  stateRef.current = state;

  const { isLoading, isSuccess, data, isError } = useQuery(
    ["filterSettings"],
    fetchFilterSettings
  );

  const startTransitionDispatch = useCallback(
    (action: ToolStateAction) => {
      dispatch(action);
    },
    [dispatch]
  );

  const setView = useCallback(
    (view: View) => {
      if (!isMounted) return;
      startTransition(() =>
        startTransitionDispatch({
          type: "view",
          payload: view,
        })
      );
    },
    [isMounted, startTransitionDispatch]
  );

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
        }
      });
    },
    [isMounted, startTransitionDispatch]
  );

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

  const reset = useCallback(() => {
    if (!isMounted) return;
    startTransitionDispatch({
      type: "reset",
    });
  }, [isMounted, startTransitionDispatch]);

  const getState = useCallback(() => {
    return stateRef.current;
  }, []);

  const getMapState = useCallback(() => {
    return stateRef.current.map;
  }, []);

  const getFilterState = useCallback(() => {
    return stateRef.current.filter;
  }, []);

  if (isError) throw "Could not fetch needed data from server.";

  useEffect(() => {
    if (!isLoading && isSuccess && data) {
      startTransitionDispatch({
        type: "filterSettings",
        payload: data as FilterSettings,
      });
    }
  }, [isLoading, isSuccess, data, startTransitionDispatch]);

  return (
    <ToolStateContext.Provider
      value={{
        ...state,
        setView,
        setFilterState,
        getState,
        getMapState,
        setMapState,
        updateMapState,
        getFilterState,
        reset,
      }}
    >
      {children}
    </ToolStateContext.Provider>
  );
};
