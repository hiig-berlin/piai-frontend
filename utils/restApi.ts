// TODO: VVU-CLEANUP
import { getHeaderValueAsInt } from "~/hooks/restApi/utils";
import inMemoryCache from "~/utils/inMemoryCache";
import { appConfig } from "~/config";

const DEFAULT_CACHE_TTL_MS =
  process.env.NODE_ENV === "development"
    ? 5000
    : 1000 * 60 * appConfig.defaultApiCacheTimeMinutes; // === X minutes default cache time of items ...

export type RestApiResultError = {
  code: string | number;
  message: string;
};

export type RestApiResult = {
  data: Record<string, any> | Record<string, any>[] | null;
  errors: RestApiResultError[] | null;
  postTotal: number | null;
  pageTotal: number | null;
  isError: boolean;
};

export const restApiQueryObjectToQueryString = (
  query: Record<string, string | number | any[]>
) => {
  return Object.keys(query)
    .filter((key: any) => typeof query[key] !== "undefined")
    .map((key: string) => {
      let k = key;
      switch (key) {
        case "metaQuery":
          return Array.isArray(query[key])
            ? (query[key] as any)
                .reduce((carry: string[], mq: any, index: number) => {
                  Object.keys(mq).reduce((mqCarry: any, mqKey: any) => {
                    mqCarry.push(
                      `meta_query[${index}][${mqKey}]=${encodeURIComponent(
                        mq[mqKey]
                      )}`
                    );
                    return mqCarry;
                  }, carry);
                  return carry;
                }, [])
                .join("&")
            : "1";

        case "taxQuery":
          return Array.isArray(query[key])
            ? (query[key] as any)
                .reduce((carry: string[], mq: any, index: number) => {
                  Object.keys(mq).reduce((mqCarry: any, mqKey: any) => {
                    mqCarry.push(
                      `tax_query[${index}][${mqKey}]=${encodeURIComponent(
                        mq[mqKey]
                      )}`
                    );
                    return mqCarry;
                  }, carry);
                  return carry;
                }, [])
                .join("&")
            : "1";

        case "type":
          return Array.isArray(query[key])
            ? (query[key] as any)
                .map((type: any, index: number) => `type[]=${type}`)
                .join("&")
            : `type=${query[key]}`;

        case "id":
          k = "include";
          break;

        case "perPage":
          k = "per_page";
          break;

        case "metaKey":
          k = "meta_key";
          break;

        case "hideEmpty":
          k = "hide_empty";
          break;
      }

      const v = Array.isArray(query[key])
        ? (query[key] as any[]).map((v: any) => `${v}`).join(",")
        : query[key];

      return `${k}=${v}`;
    })
    .join("&");
};

export const restApiGetPostsPromise: any = (
  type: string,
  query: string | number | Record<string, string>,
  token?: string
) => {
  let params: any = "";
  if (typeof query === "number" || typeof query === "string") {
    params = `${query}?acf_format=standard&dataSaver=1`;
  } else if (typeof query === "object") {
    const q: any = {
      ...query,
      acf_format: "standard",
      dataSaver: "1",
    };
    params = `?${restApiQueryObjectToQueryString(q)}`;
  }

  if (token) params = `${params}&status[]=draft&status[]=publish`;

  let headers: any;
  if (token)
    headers = new Headers({
      Authorization: `Bearer ${token}`,
    });

  const endpoint = `${type}s`;

  const controller =
    typeof AbortController !== "undefined" ? new AbortController() : undefined;

  if (process.env.NODE_ENV === "development")
    console.log(`${appConfig.apiUrl}/wp/v2/${endpoint}/${params}`);

  return {
    abortController: controller,
    fetchPromise: fetch(`${appConfig.apiUrl}/wp/v2/${endpoint}/${params}`, {
      headers,
      signal: controller?.signal,
    }),
  };
};

export const restApiGetTermsPromise: any = (
  taxonomy: string,
  query: Record<string, string>
) => {
  let params: any = "";
  if (typeof query === "number" || typeof query === "string") {
    params = `${query}?acf_format=standard&dataSaver=1`;
  } else if (typeof query === "object") {
    const q: any = {
      ...query,
      acf_format: "standard",
      dataSaver: "1",
    };
    params = `?${restApiQueryObjectToQueryString(q)}`;
  }

  const controller =
    typeof AbortController !== "undefined" ? new AbortController() : undefined;

  if (process.env.NODE_ENV === "development")
    console.log(`${appConfig.apiUrl}/wp/v2/${taxonomy}/${params}`);

  return {
    abortController: controller,
    fetchPromise: fetch(`${appConfig.apiUrl}/wp/v2/${taxonomy}/${params}`, {
      signal: controller?.signal,
    }),
  };
};

export const restApiFetchPromiseThen = async (response: Response) => {
  const out: RestApiResult = {
    data: null,
    errors: null,
    postTotal: null,
    pageTotal: null,
    isError: true,
  };
  try {
    const json = await response.json();
    if (!json) {
      out.errors = [
        {
          code: 1,
          message: "No JSON payload in response",
        },
      ];
    } else if (json?.code && json?.message) {
      out.errors = [json];
    } else {
      out.data = Array.isArray(json) ? json : [json];
      out.postTotal = getHeaderValueAsInt("x-wp-total", response);
      out.pageTotal = getHeaderValueAsInt("x-wp-totalpages", response);
      out.isError = false;
    }
  } catch (err: any) {
    out.errors = [
      {
        code: 2,
        message: "Failed to parse JSON payload",
      },
    ];
  }

  return out;
};

export const restApiFetchESQueryPromiseThen = async (response: Response) => {
  const out: RestApiResult = {
    data: null,
    errors: null,
    postTotal: null,
    pageTotal: null,
    isError: true,
  };
  try {
    const json = await response.json();
    if (!json) {
      out.errors = [
        {
          code: 1,
          message: "No JSON payload in response",
        },
      ];
    } else {
      out.data = Array.isArray(json?.data) ? json?.data : [];
      out.postTotal = json?.postTotal;
      out.pageTotal = json?.pageTotal;
      out.isError = false;
    }
  } catch (err: any) {
    out.errors = [
      {
        code: 2,
        message: "Failed to parse JSON payload",
      },
    ];
  }

  return out;
};

export const restApiFetchPromiseCatch = (err: any) => ({
  data: null,
  errors: [
    {
      code: 3,
      message: err.message ?? "Query error",
    },
  ],
  postTotal: null,
  pageTogal: null,
  isError: true,
});

// TODO: this should be cachable
export const restApiGetPosts: any | null = async (
  type: string,
  query: string | number | Record<string, string>,
  token?: string
): Promise<RestApiResult> => {
  const { fetchPromise } = restApiGetPostsPromise(type, query, token);

  const data: any = await fetchPromise
    .then(restApiFetchPromiseThen)
    .catch(restApiFetchPromiseCatch);

  return data;
};

// TODO: this should be cachable
export const restApiGetTerms: any | null = async (
  taxonomy: string,
  query: Record<string, string>
): Promise<RestApiResult> => {
  const { fetchPromise } = restApiGetTermsPromise(taxonomy, query);

  const data: any = await fetchPromise
    .then(restApiFetchPromiseThen)
    .catch(restApiFetchPromiseCatch);

  return data;
};

export const restApiGetPostById: any | null = async (
  type: string,
  id: number,
  token?: string
) => {
  const { data, isError } = await restApiGetPosts(type, id, token);

  return !isError && Array.isArray(data) && data.length ? data[0] : null;
};

export const restApiGetPostBySlug: any | null = async (
  type: string,
  slug: string,
  token?: string
) => {
  const { data, isError } = await restApiGetPosts(
    type,
    {
      slug,
    },
    token
  );

  return !isError && Array.isArray(data) && data.length ? data[0] : null;
};

export const restApiGetPostBySlugOrFallbackId: any | null = async (
  type: string,
  slug: string,
  token?: string
) => {
  const { data, isError } = await restApiGetPosts(
    type,
    slug && slug.indexOf("id--") !== -1
      ? slug.replace("id--", "")
      : {
          slug,
        },
    token
  );

  return !isError && Array.isArray(data) && data.length ? data[0] : null;
};

export const restApiGetSettings = async () => {
  const url = `${appConfig.apiUrl}/fluxed/v1/settings`;

  const cachedResult = inMemoryCache.get(url);
  if (cachedResult) {
    return cachedResult;
  }

  const settings = await fetch(url).then(
    async (response) => await response.json()
  );

  inMemoryCache.set(url, settings, DEFAULT_CACHE_TTL_MS);

  return settings;
};
