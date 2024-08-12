// !!!! ATENTION THIS CODE HAS NOT BEEN USED IN PRACTICE

import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import inMemoryCache from "~/utils/inMemoryCache";
import { restApiGetPostsPromise } from "~/utils/restApi";
import useIsMounted from "../useIsMounted";
import { createCacheKey, getHeaderValueAsInt } from "./utils";

type RestApiQueryListOptions = {
  perPage?: number;
  page?: number;
  cacheResult?: boolean;
  lazyLoad?: boolean;
  cacheResultTTL?: number;
};

const restApiQueryListOptionsDefault = {
  lazyLoad: false,
  perPage: 20,
  page: 1,
  cacheResult: true,
  cacheResultTTL: 300,
};

export const useRestApiQueryList = (
  postType: string,
  query: Record<string, any>,
  options?: RestApiQueryListOptions
) => {
  const isMounted = useIsMounted();

  const completeOptions = useMemo(() => {
    return {
      ...restApiQueryListOptionsDefault,
      ...(typeof options === "object" ? options : {}),
    };
  }, [options]);

  const isFetchLoadingRef = useRef(true);
  const isErrorRef = useRef(false);
  const resultRef = useRef<any[] | null>(null);
  const errorsRef = useRef<any>(null);
  const pageTotalRef = useRef<number | null>(null);
  const postTotalRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController>();

  const [isLoading, setIsLoading] = useState(true);

  const key = createCacheKey(
    postType,
    Object.keys(query).reduce((carry: any, key: any) => {
      if (key !== "page")
        return {
          ...carry,
          [key]: query[key],
        };
      return carry;
    }, {})
  );

  const execute = useCallback(
    async (postType: string, query: Record<string, any>, noCache?: boolean) => {
      let process = true;

      if (completeOptions.cacheResult && !noCache) {
        const cachedData = inMemoryCache.get(key);
        if (cachedData && cachedData?.pages?.includes(query.page)) {
          resultRef.current = cachedData.result;
          isErrorRef.current = false;
          setIsLoading(false);
          process = false;
        }
      }

      if (process) {
        isFetchLoadingRef.current = true;

        isErrorRef.current = false;
        setIsLoading(true);

        const { fetchPromise, abortController } = restApiGetPostsPromise(
          postType,
          query
        );

        abortControllerRef.current = abortController;

        let result: any = null;
        let postTotal: any = null;
        let pageTotal: any = null;

        await fetchPromise
          .then(async (response: Response) => {
            isFetchLoadingRef.current = false;
            if (isMounted) {
              try {
                const json = await response.json();
                if (json?.code && json?.message) {
                  errorsRef.current = [json];
                  isErrorRef.current = true;
                } else {
                  result = json ? (Array.isArray(json) ? json : [json]) : [];
                  postTotal = getHeaderValueAsInt(
                    "x-wp-total",
                    response
                  );
                  pageTotal = getHeaderValueAsInt(
                    "x-wp-totalpages",
                    response
                  );
                }
              } catch (err: any) {
                errorsRef.current = [
                  {
                    code: 1,
                    message: err.message,
                  },
                ];
                isErrorRef.current = true;
              }

              setIsLoading(false);
            }
          })
          .catch((err: any) => {
            isFetchLoadingRef.current = true;
            isErrorRef.current = true;
            errorsRef.current = [
              {
                code: 2,
                message: err.message,
              },
            ];
            return;
          });

        if (completeOptions.cacheResult) {
          let cachedResult = inMemoryCache.get(key);
          if (!cachedResult) {
            cachedResult = {
              pages: [],
              result: [],
              postTotal: null,
              pageTotal: null,
            };
          }

          if (!cachedResult.pages.includes(query.page)) {
            cachedResult.pages.push(query.page);
          }

          cachedResult.pageTotal = pageTotal;
          cachedResult.postTotal = postTotal;

          if (Array.isArray(result)) {
            const offset = Math.max(0, query.page - 1) * query.perPage;

            for (let i = 0; i < result?.length; i++) {
              cachedResult.result[offset + i] = result[i];
            }
          }

          inMemoryCache.set(key, cachedResult, completeOptions.cacheResultTTL);

          resultRef.current = cachedResult.result;
        } else {
          resultRef.current = result;
        }
        postTotalRef.current = postTotal;
        pageTotalRef.current = pageTotal;
        setIsLoading(false);
      }
    },
    [
      completeOptions.cacheResult,
      completeOptions.cacheResultTTL,
      isMounted,
      key,
    ]
  );

  const fetchMore = useCallback(
    async (page: number, noCache?: boolean) => {
      setIsLoading(true);
      return execute(
        postType,
        {
          ...{ perPage: completeOptions.perPage },
          ...query,
          page,
        },
        noCache
      );
    },
    [postType, query, completeOptions.perPage, execute]
  );

  const refetch = useCallback(
    async (refetchArgs?: {
      noCache?: boolean;
      queryOverwrites?: Record<string, any>;
    }) => {
      setIsLoading(true);
      return execute(
        postType,
        {
          ...{ perPage: completeOptions.perPage, page: completeOptions.page },
          ...query,
          ...(refetchArgs?.queryOverwrites ?? {}),
        },
        refetchArgs?.noCache
      );
    },
    [postType, query, execute, completeOptions.perPage, completeOptions.page]
  );

  const fetch = useCallback(
    async () => {
      setIsLoading(true);
      return execute(
        postType,
        {
          ...{ perPage: completeOptions.perPage, page: completeOptions.page },
          ...query
        }
      );
    },
    [postType, query, execute, completeOptions.perPage, completeOptions.page]
  );

  useEffect(() => {
    if (isMounted && !completeOptions.lazyLoad) {
      setIsLoading(true);
      execute(postType, {
        ...{ perPage: completeOptions.perPage, page: completeOptions.page },
        ...query,
      });
    }

    return () => {
      if (isFetchLoadingRef.current && abortControllerRef?.current?.abort) {
        abortControllerRef.current.abort();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postType, key, completeOptions.lazyLoad]);

  return {
    isLoading,
    result: resultRef.current,
    count: {
      pages: pageTotalRef.current,
      posts: postTotalRef.current,
    },
    isError: isErrorRef.current,
    errors: errorsRef.current,
    fetch,
    fetchMore,
    refetch,
  };
};

export default useRestApiQueryList;
