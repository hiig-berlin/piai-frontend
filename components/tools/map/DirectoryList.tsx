import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  useToolStateContext,
  defaultQueryString,
} from "./context/ContextProviders";
import { SearchItem } from "./SearchItem";
import type { GeoJsonFeature } from "./map/types";
import { Scroller } from "./Styled";
import useIsMounted from "~/hooks/useIsMounted";
import { createQueryFromState } from "./map/utils";

const Container = styled.div<{ isFilterOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: calc(var(--size-3) + var(--size-6));
  z-index: 5;
  height: calc(100vh - var(--lbh) - var(--tool-map-ot));
  width: calc((100vw - var(--size-6) - 3 * var(--size-3)) * 0.33);

  overflow: hidden;
  transition: transform 0.35s;

  transform: ${({ isFilterOpen }) =>
    isFilterOpen
      ? "translateX(calc((100vw - var(--size-6) - 3 * var(--size-3)) * 0.33))"
      : "translateX(0)"};

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-bottom: var(--size-3);
  }
`;

const Header = styled.div`
  display: flex;
  gap: var(--size-3);
  flex-wrap: wrap;
  align-items: center;
  padding-right: var(--size-6);

  h3 {
    margin: 0;
  }

  ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--size-2);
    padding-right: 0;
  }
`;

const Panel = styled.div<{
  isRefetching: boolean;
  isFullHeight: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  box-sizing: border-box;
  background: #000;
  pointer-events: all;
  padding: var(--size-3);
  border-radius: var(--size-3);
  height: ${({ isFullHeight }) =>
    isFullHeight
      ? "calc(100vh - var(--lbh, 0) - var(--size-5))"
      : "calc(50vh - (0.5 * var(--lbh, 0)) - var(--size-5))"};

  & > div {
    flex-grow: 1;
    transition: opacity var(--transition-speed-link);
    opacity: ${({ isRefetching }) => (isRefetching ? 0.5 : 1)};
  }

  & > div:first-child,
  & > span:first-child {
    flex-grow: 0;
    flex-shrink: 0;
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    height: 100%;
    gap: var(--size-3);
  }
`;

export const DirectoryList = () => {
  const isMounted = useIsMounted();

  const { map, filter, updateFilterState } = useToolStateContext();

  const currentlyRenderedQueryStringRef = useRef<string | null>();
  const workerRef = useRef<Worker>();

  const [searchResult, setSearchResult] = useState<GeoJsonFeature[] | null>(
    null
  );

  const [isFiltering, setIsFiltering] = useState(false);
  const openQuickView = useCallback(
    (feature: GeoJsonFeature) => {
      if (!feature?.properties?.id) return;

      updateFilterState({
        quickViewProjectId: feature?.properties?.id,
      });
    },
    [updateFilterState]
  );

  const onWorkerMessage = useCallback(
    (e: MessageEvent<any>) => {
      if (!isMounted) return;

      setIsFiltering(false);
      setSearchResult(e?.data?.result ?? []);
    },
    [isMounted]
  );

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./worker/filterByIds.ts", import.meta.url)
    );

    workerRef.current.onmessage = onWorkerMessage;

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, [onWorkerMessage]);

  const currentQueryString = createQueryFromState(filter).join("&");

  useEffect(() => {
    if (typeof window === "undefined" || !map.geoJson || !workerRef.current)
      return;

    if (Array.isArray(filter.filteredIds) && currentQueryString !== "") {
      if (
        filter.filterQueryString !== currentlyRenderedQueryStringRef.current
      ) {
        currentlyRenderedQueryStringRef.current = filter.filterQueryString;
        workerRef.current.postMessage({
          ids: filter.filteredIds,
          geoJson: map.geoJson,
        });
        setIsFiltering(true);
      }
    } else {
      setSearchResult(null);
    }
  }, [
    filter.filteredIds,
    filter.filterQueryString,
    currentQueryString,
    map.geoJson,
  ]);

  const hasNoResults = searchResult?.length === 0;

  return (
    <Container isFilterOpen={true}>
      <Panel
        isRefetching={isFiltering || filter.isFetchingFilteredIds}
        isFullHeight={false}
      >
        <Header>
          <h3>
            All Projects{" "}
            {defaultQueryString.replace("onlyIds=1", "") !== currentQueryString
              ? "(filtered)"
              : ""}
          </h3>
        </Header>
        <Scroller opacity={1}>
          {hasNoResults && <p>No projects found</p>}

          {!hasNoResults &&
            (searchResult ?? map?.geoJson?.features ?? []).map(
              (feature: GeoJsonFeature, index: number) => {
                return (
                  <SearchItem
                    feature={feature}
                    key={`search-${index}`}
                    openQuickView={openQuickView}
                  />
                );
              }
            )}
        </Scroller>
      </Panel>
    </Container>
  );
};
