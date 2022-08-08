import type { MapController } from "../map/MapController";
import { GeoJson } from "../map/types";
import create from "zustand";
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
  license: Record<string, string>;
  genderRatio: Record<string, string>;
  dateFrom: string | null | undefined;
  dateUntil: string | null | undefined;
  terms: Record<number, string> | null | undefined;
  s: string | null | undefined;
  continents: Record<number, string> | null | undefined;
  countries: Record<number, string> | null | undefined;
};

export type FilterSettingTaxonomyOption = {
  id: number | string;
  name: string;
  count?: number;
};

export type FilterSettingTaxonomyOptionContinent =
  FilterSettingTaxonomyOption & {
    children?: FilterSettingTaxonomyOptionContinentChild[];
  };

export type FilterSettingTaxonomyOptionContinentChild =
  FilterSettingTaxonomyOptionContinent & {
    parent: number;
  };

export type FilterSettingTaxonomy = {
  label: string;
  options: FilterSettingTaxonomyOption[];
};

export type Settings = {
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

export type ToolStateActions = {
  getDefaultState: () => ToolState;
  setMapState: (mapState: MapState) => void;
  setFilterState: (filterState: FilterState) => void;
  updateMapState: (state: Partial<MapState>) => void;
  getState: () => ToolState;
  getMapState: () => MapState;
  getFilterState: () => FilterState;
  updateFilterState: (state: Partial<FilterState>) => void;
  setSettingsState: (state: Settings) => void;
};

export type ToolStateStore = ToolState & ToolStateActions;

export type ToolStateAction = {
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
    license: {},
    dateFrom: null,
    dateUntil: null,
    genderRatio: {},
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

export const quickClone = (obj: any): any => {
  if (!obj) return obj;

  if (Array.isArray(obj)) return [...obj];

  if (typeof obj !== "object") return obj;

  return Object.keys(obj).reduce((carry: any, key: any) => {
    return {
      ...carry,
      [key]: quickClone(obj[key]),
    };
  }, {});
};

export const getToolStateDefaultState = (): ToolState => {
  return quickClone(defaultToolState);
};

export const useToolStateStore = create<ToolStateStore>((set, get) => ({
  ...getToolStateDefaultState(),
  getState: () => get(),
  getDefaultState: () => getToolStateDefaultState(),
  getFilterState: () => get().filter,
  setFilterState: (state: FilterState) =>
    set(() => ({
      filter: state,
    })),
  updateFilterState: (state: Partial<FilterState>) =>
    set(() => {
      const newFilterState = {
        ...get().filter,
        ...state,
      };

      if (
        createQueryFromState(newFilterState, {
          onlyIds: "1",
        }).join("&") === defaultQueryString
      )
        newFilterState.filteredCount = newFilterState.totalCount;

      return {
        filter: newFilterState,
      };
    }),
  getMapState: () => get().map,
  setMapState: (state: MapState) =>
    set(() => ({
      map: state,
    })),
  updateMapState: (state: Partial<MapState>) =>
    set(() => ({
      map: {
        ...get().map,
        ...state,
      },
    })),
  setSettingsState: (state: Settings) =>
    set(() => ({
      settings: state,
    })),
}));

export const defaultQueryString = createQueryFromState(
  defaultToolState.filter,
  {
    onlyIds: "1",
  }
).join("&");

export const useToolStateStoreActions = () => {
  return useToolStateStore(
    (state) =>
      Object.keys(state).reduce(
        (carry: Partial<ToolStateStore>, key: string) => {
          if (
            key.startsWith("get") ||
            key.startsWith("set") ||
            key.startsWith("update")
          ) {
            carry = {
              ...carry,
              [key]: state[key as keyof ToolStateStore],
            };
          }
          return carry;
        },
        {}
      ) as ToolStateActions
  );
};

export const useToolStateFilterState = () =>
  useToolStateStore((state) => state.filter);
export const useToolStateMapState = () =>
  useToolStateStore((state) => state.map);
export const useToolStateSettingsState = () =>
  useToolStateStore((state) => state.settings);
