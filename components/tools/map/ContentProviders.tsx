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
  continent: number | null | undefined;
  countries: number[] | null | undefined;
};

type View = "map" | "directory" | "page" | null | undefined;

type ToolState = {
  view: View;
  map: MapState;
  filter: FilterState;
};

type ToolStateContext = {
  view: View;
  map: MapState;
  filter: FilterState;
  setView: (view: View) => void;
  setMapState: (mapState: MapState) => void;
  setFilterState: (filterState: FilterState) => void;
  reset: () => void;
};

type ToolStateAction = {
  type: string;
  payload?: MapState | FilterState | View;
};

const defaultToolState: ToolState = {
  view: null,
  map: {
    ready: false,
  },
  filter: {
    termIds: [],
    countries: [],
    continent: null,
    s: null,
  },
};

const defaultToolStateContext: ToolStateContext = {
  ...defaultToolState,
  setView: (view: View) => {},
  setMapState: (mapState: MapState) => {},
  setFilterState: (filterState: FilterState) => {},
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
        reset,
      }}
    >
      {children}
    </ToolStateContext.Provider>
  );
};
