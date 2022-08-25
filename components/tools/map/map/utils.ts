import type { FilterState } from "../state/ToolState";
import type { GeoJson } from "./types";
export const EMPTY_GEOJSON: GeoJson = {
  type: "FeatureCollection",
  features: [],
};

const skipParam = (key: string, skip: string[] | undefined | null) => {
  return skip ? skip.includes(key) : false;
};

export const createQueryFromState = (
  state: FilterState,
  additionalParams?: Record<string, string> | null,
  skip?: string[]
): string => {
  const queryParams = [];

  if (typeof state?.isSearchOpen !== "undefined" && !skipParam("search", skip))
    queryParams.push(`search=${state.isSearchOpen ? 1 : 0}`);

  if (typeof state?.isFilterOpen !== "undefined" && !skipParam("filter", skip))
    queryParams.push(`filter=${state.isFilterOpen ? 1 : 0}`);

  if (state.isSearchOpen) {
    if (!skipParam("keyword", skip))
      queryParams.push(`keyword=${state.keyword}`);
  } else {
    if (
      state?.terms &&
      Object.keys(state.terms).length &&
      !skipParam("term", skip)
    ) {
      queryParams.push(`term=${Object.keys(state.terms).sort().join(",")}`);
    }

    if (
      state?.regions &&
      Object.keys(state.regions).length &&
      !skipParam("regions", skip)
    ) {
      queryParams.push(
        `regions=${Object.keys(state.regions).sort().join(",")}`
      );
    }

    if (
      state?.countries &&
      Object.keys(state.countries).length &&
      !skipParam("countries", skip)
    ) {
      queryParams.push(
        `countries=${Object.keys(state.countries).sort().join(",")}`
      );
    }

    if (
      state?.license &&
      Object.keys(state.license).length &&
      !skipParam("license", skip)
    ) {
      queryParams.push(
        `license=${Object.keys(state.license).sort().join(",")}`
      );
    }

    if (
      state?.genderRatio &&
      Object.keys(state.genderRatio).length &&
      !skipParam("genderRatio", skip)
    ) {
      queryParams.push(
        `genderRatio=${Object.keys(state.genderRatio).sort().join(",")}`
      );
    }

    if (
      state?.dateFrom &&
      state?.dateUntil &&
      !skipParam("dateFrom", skip) &&
      !skipParam("dateUntil", skip)
    ) {
      queryParams.push(`dateFrom=${state?.dateFrom}`);
      queryParams.push(`dateUntil=${state?.dateUntil}`);
    }
  }

  if (additionalParams) {
    for (const param in additionalParams) {
      queryParams.push(`${param}=${additionalParams[param]}`);
    }
  }

  return queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
};

export const createCompareQueryFromState = (
  state: FilterState,
  additionalParams?: Record<string, string> | null,
  skip?: string[]
): string => {
  return createQueryFromState(state, additionalParams, [
    "empty",
    "filter",
    "keyword",
    "search",
    ...(Array.isArray(skip) ? skip : []),
  ]);
};
