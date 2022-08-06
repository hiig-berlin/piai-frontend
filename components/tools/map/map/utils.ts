import type { FilterState } from "../state/toolStateStore";
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
  if (additionalParams) {
    for (const param in additionalParams) {
      queryParams.push(`${param}=${additionalParams[param]}`);
    }
  }
  return queryParams;
};
