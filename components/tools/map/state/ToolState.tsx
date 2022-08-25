import type { MapController } from "../map/MapController";
import { GeoJson } from "../map/types";
import create from "zustand";
import { createCompareQueryFromState } from "../map/utils";

export type MapState = {
  ready: boolean;
  mapController: MapController | null;
  loadGeoJson: boolean;
  geoJson: GeoJson | null;
  hideIntro: boolean;
  totalInViewCount: number;
  filteredInViewCount: number;
};

export type FilterStateRecords = {
  license: Record<string, string>;
  genderRatio: Record<string, string>;
  terms: Record<number, string>;
  regions: Record<number, string>;
  countries: Record<number, string>;
};

export type FilterState = FilterStateRecords & {
  keyword: string;
  totalCount: number;
  filteredCount: number;
  filteredIds: number[] | null;
  filterQueryString: string;
  isFetchingFilteredIds: boolean;
  quickViewProjectId: number | null;
  isDrawerOpen: boolean;
  isFilterOpen: boolean;
  isSearchOpen: boolean;
  dateFrom: number | null | undefined;
  dateUntil: number | null | undefined;
  s: string | null | undefined;
};

export type FilterSettingTaxonomyOption = {
  id: number | string;
  name: string;
  count?: number;
};

export type FilterSettingTaxonomyOptionRegion = FilterSettingTaxonomyOption & {
  children?: FilterSettingTaxonomyOptionRegionChild[];
};

export type FilterSettingTaxonomyOptionRegionChild =
  FilterSettingTaxonomyOptionRegion & {
    parent: number;
  };

export type FilterSettingTaxonomy = {
  label: string;
  options: FilterSettingTaxonomyOption[];
};

export type SettingTerm = {
  id: string;
  name: string;
};

export type Settings = {
  styleUrl: string;
  regions: FilterSettingTaxonomyOptionRegion[] | null | undefined;
  countries: FilterSettingTaxonomyOption[] | null | undefined;
  funding: FilterSettingTaxonomy | null | undefined;
  industrialSector: FilterSettingTaxonomy | null | undefined;
  useOfAi: FilterSettingTaxonomy | null | undefined;
  isProjectOpenSource: FilterSettingTaxonomy | null | undefined;
  license: SettingTerm[];
  genderRatio: SettingTerm[];
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
  updateSettingsState: (state: Partial<Settings>) => void;
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
    keyword: "",
    license: {},
    dateFrom: null,
    dateUntil: null,
    genderRatio: {},
    terms: {},
    countries: {},
    regions: {},
    s: null,
  },
  settings: {
    styleUrl: "",
    countries: [],
    regions: [],
    funding: null,
    industrialSector: null,
    useOfAi: null,
    isProjectOpenSource: null,
    license: [
      {
        id: "os",
        name: "Open source",
      },
      {
        id: "cs",
        name: "Closed source",
      },
    ],
    genderRatio: [
      {
        id: "lt50",
        name: "< 50% (female/diverse)",
      },
      {
        id: "gte50",
        name: ">= 50% (female/diverse)",
      },
    ],
  },
};

export const quickClone = (obj: any): any => {
  if (!obj) return obj;

  if (Array.isArray(obj)) return [...obj];

  if (!(obj instanceof Object)) return obj;

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
      const newFilterState: FilterState = {
        ...get().filter,
        ...state,
      };

      if (
        createCompareQueryFromState(newFilterState) ===
        defaultCompareQueryString
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
  updateSettingsState: (state: Partial<Settings>) =>
    set(() => ({
      settings: {
        ...get().settings,
        ...state,
      },
    })),
}));

export const defaultCompareQueryString = createCompareQueryFromState(
  defaultToolState.filter
);

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
