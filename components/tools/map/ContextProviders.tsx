import React, {
  createContext,
  useContext,
  useCallback,
  useReducer,
} from "react";
import useIsMounted from "~/hooks/useIsMounted";

type MapState = {
  ready: boolean;
  // TODO: extend ...
};

type FilterState = {
  termIds: number[] | null | undefined;
  s: string | null | undefined;
  continents: number[] | null | undefined;
  countries: number[] | null | undefined;
};
type FilterSettingTaxonomyOption = {
  id: number;
  name: string;
  count: number;
}

type FilterSettingTaxonomyOptionContinentChild = {
  id: number;
  name: string;
  count: number;
  children?: FilterSettingTaxonomyOptionContinentChild[];
  parent: number;
}

type FilterSettingTaxonomyOptionContinent = {
  id: number;
  name: string;
  count: number;
  children?: FilterSettingTaxonomyOptionContinentChild[]
}

type FilterSettingTaxonomy = {
  label: string;
  options: FilterSettingTaxonomyOption[];
}
type FilterSettings = {
  continents: FilterSettingTaxonomyOptionContinent[] | null | undefined;
  countries:  FilterSettingTaxonomyOption[] | null | undefined;
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
  setView: (view: View) => void;
  setMapState: (mapState: MapState) => void;
  setFilterState: (filterState: FilterState) => void;
  setFilterSettings: (filterSettings: FilterSettings) => void;
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
  },
  filter: {
    termIds: [],
    countries: [],
    continents: null,
    s: null,
  },
  filterSettings: {
    countries: [],
    continents: [],
    funding: null,
    industrialSector: null,
    useOfAi: null,
    isProjectOpenSource: null,
  }
};

const defaultToolStateContext: ToolStateContext = {
  ...defaultToolState,
  setView: (view: View) => {},
  setMapState: (mapState: MapState) => {},
  setFilterState: (filterState: FilterState) => {},
  setFilterSettings: (filterSettings: FilterSettings) => {},
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
        filterSettings: (action?.payload ?? defaultToolState.filterSettings) as FilterSettings,
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

// context provider
export const ToolStateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useIsMounted();
  const [state, dispatch] = useReducer(toolStateReducer, defaultToolState);

  const setView = useCallback(
    (view: View) => {
      if (!isMounted) return;
      dispatch({
        type: "view",
        payload: view,
      });
    },
    [isMounted]
  );

  const setMapState = useCallback(
    (mapState: MapState) => {
      if (!isMounted) return;
      dispatch({
        type: "map",
        payload: mapState,
      });
    },
    [isMounted]
  );

  const setFilterState = useCallback(
    (filterState: FilterState) => {
      if (!isMounted) return;
      dispatch({
        type: "filter",
        payload: filterState,
      });
    },
    [isMounted]
  );

  const setFilterSettings= useCallback(
    (filterSettings: FilterSettings) => {
      if (!isMounted) return;
      dispatch({
        type: "filterSettings",
        payload: filterSettings,
      });
    },
    [isMounted]
  );

  const reset = useCallback(() => {
    if (!isMounted) return;
    dispatch({
      type: "reset",
    });
  }, [isMounted]);

  return (
    <ToolStateContext.Provider
      value={{
        ...state,
        setView,
        setMapState,
        setFilterState,
        setFilterSettings,
        reset,
      }}
    >
      {children}
    </ToolStateContext.Provider>
  );
};
