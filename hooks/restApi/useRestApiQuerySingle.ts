// !!!! ATENTION THIS CODE HAS NOT BEEN USED IN PRACTICE

import useRestApiQueryList from "./useRestApiQueryList";

type RestApiQueryOptions = {
  cacheResult?: boolean;
  lazyLoad?: boolean;
  cacheResultTTL?: number;
};

export const useRestApiQuerySingle = (
  postType: string,
  query: Record<string, any>,
  options?: RestApiQueryOptions
) => {
  const { isLoading, isError, result, refetch, fetch, errors, count } =
    useRestApiQueryList(postType, query, options);

  return {
    isLoading,
    result:
      result && result?.length === 1
        ? result?.[0]
        : result && result?.length > 0
        ? result
        : null,
    count,
    isError,
    errors,
    fetch,
    refetch,
  };
};
