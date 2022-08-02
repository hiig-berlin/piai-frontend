import { FilterState } from "../context/ContextProviders";

export const EMPTY_GEOJSON = { type: "FeatureCollection", features: [] };

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
