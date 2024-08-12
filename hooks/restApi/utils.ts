import { restApiQueryObjectToQueryString } from "~/utils/restApi";

export const createCacheKey = (type: string, query: Record<string, string>) => {
  const q: any = {
    ...query,
    acf_format: "standard",
    dataSaver: "1",
  };
  const key = `?${restApiQueryObjectToQueryString(q)}`;

  return `${type}${key}`;
};

export const getHeaderValueAsInt = (name: string, response: Response) => {
  const v = response?.headers?.get(name);
  if (v) {
    return parseInt(v);
  }
  return null;
}