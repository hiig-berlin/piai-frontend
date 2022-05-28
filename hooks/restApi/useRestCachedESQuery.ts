import { useEffect, useState, useRef, useCallback } from "react";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import inMemoryCache from "~/utils/inMemoryCache";

export type CachedESQueryResult = {
  items: any;
  postTotal: number;
  pageTotal: number;
};

type CachedESQueryOptions = {
  cacheResult?: boolean;
  cacheResultTTL?: number;
  scrollToTop?: boolean;
  scrollToCenterRef?: React.MutableRefObject<any> | null;
};

const defaultQueryResult: CachedESQueryResult = {
  items: null,
  postTotal: 0,
  pageTotal: 0,
};

const defaultOptions = {
  cacheResult: true,
  cacheResultTTL: 1000 * 60 * 15, // 15 minutes
  scrollToTop: true,
  scrollToCenterRef: null,
};

export const useRestCachedESQuery = (
  filterQuery: string,
  options?: CachedESQueryOptions
) => {
  const config = useConfigContext();

  const isErrorRef = useRef(false);
  const controllerRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [queryResult, setQueryResult] =
    useState<CachedESQueryResult>(defaultQueryResult);

  const cacheResult = options?.cacheResult ?? defaultOptions?.cacheResult;
  const cacheResultTTL =
    options?.cacheResultTTL ?? defaultOptions?.cacheResultTTL;
  const scrollToTop = options?.scrollToTop ?? defaultOptions?.scrollToTop;
  const scrollToCenterRef = options?.scrollToCenterRef;

  const scrollToElement = useCallback(() => {
    if (scrollToTop) {
      if (scrollToCenterRef?.current) {
        scrollToCenterRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }
  }, [scrollToTop, scrollToCenterRef]);

  useEffect(() => {
    if (typeof window === "undefined" || filterQuery === "") return;

    if (controllerRef.current) {
      try {
        controllerRef.current.abort();
      } catch (err: any) {}
    }

    const controller =
      typeof AbortController !== "undefined"
        ? new AbortController()
        : undefined;

    controllerRef.current = controller;

    const query = async () => {
      setIsLoading(true);

      let process = true;

      if (cacheResult) {
        const cachedData = inMemoryCache.get(filterQuery);
        if (cachedData) {
          setQueryResult(cachedData);
          isErrorRef.current = false;
          setIsLoading(false);
          process = false;
        }
      }

      if (process) {
        try {
          const response: any = await fetch(
            `${config.cmsUrl}/wp-content/plugins/ikon-custom/rest-api-query.php${filterQuery}`,
            {
              signal: controller?.signal,
            }
          );

          const data = await response.json();
          if (data?.success) {
            const result = {
              items: data?.data,
              pageTotal: data?.pageTotal,
              postTotal: data?.postTotal,
            };
            isErrorRef.current = false;
            setIsLoading(false);

            if (cacheResult)
              inMemoryCache.set(filterQuery, result, cacheResultTTL);
            setQueryResult(result);
          } else {
            throw "load error";
          }
        } catch (err: any) {
          if (err?.message?.indexOf("aborted") === -1) {
            setQueryResult({...defaultQueryResult});
            isErrorRef.current = true;
            setIsLoading(false);
          }          
        }
      }

      scrollToElement();
    };

    query();

    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [
    filterQuery,
    config.cmsUrl,
    cacheResult,
    cacheResultTTL,
    scrollToElement,
  ]);

  return {
    isLoading,
    isError: isErrorRef.current,
    queryResult,
  };
};

export default useRestCachedESQuery;
