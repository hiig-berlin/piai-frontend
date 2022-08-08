import type { FilterState } from "../state/ToolState";
import type { GeoJson } from "./types";
export const EMPTY_GEOJSON: GeoJson = {
  type: "FeatureCollection",
  features: [],
};

export const createQueryFromState = (
  state: FilterState,
  additionalParams?: Record<string, string>
): string[] => {
  const queryParams = [];

  if (state?.terms && Object.keys(state.terms).length) {
    queryParams.push(`term=${Object.keys(state.terms).sort().join(",")}`);
  }

  if (state?.continents && Object.keys(state.continents).length) {
    queryParams.push(`continents=${Object.keys(state.continents).sort().join(",")}`);
  }

  if (state?.countries && Object.keys(state.countries).length) {
    queryParams.push(`countries=${Object.keys(state.countries).sort().join(",")}`);
  }

  if (state?.license && Object.keys(state.license).length) {
    queryParams.push(`license=${Object.keys(state.license).sort().join(",")}`);
  }

  if (state?.genderRatio && Object.keys(state.genderRatio).length) {
    queryParams.push(`genderRatio=${Object.keys(state.genderRatio).sort().join(",")}`);
  }

  if (additionalParams) {
    for (const param in additionalParams) {
      queryParams.push(`${param}=${additionalParams[param]}`);
    }
  }
  return queryParams;
};
