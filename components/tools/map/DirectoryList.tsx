import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import styled from "styled-components";

import { SearchItem } from "./SearchItem";
import type { GeoJsonFeature } from "./map/types";
import { Scroller } from "./Styled";
import useIsMounted from "~/hooks/useIsMounted";
import { createCompareQueryFromState } from "./map/utils";
import {
  useToolStateFilterState,
  useToolStateMapState,
  useToolStateStoreActions,
  FilterState,
} from "./state/ToolState";
import { useEffectOnMountOnce } from "~/hooks/useEffectOnMountOnce";
import { Box } from "../shared/ui/Box";
import { IconButtonPrint } from "./ui/IconButtonPrint";
import { Reveal } from "~/components/ui/Reveal";
import { SearchForm } from "./SearchForm";
import { useRouter } from "next/router";

const Container = styled.div<{ isFilterOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: calc(var(--size-3) + var(--size-6));
  z-index: 4;
  height: calc(100vh - var(--lbh) - var(--size-3));

  overflow: hidden;
  transition: transform 0.35s, width 0.35s;
  width: calc((100vw - var(--size-6) - 2 * var(--size-3)));
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-bottom: var(--size-3);
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    width: ${({ isFilterOpen }) =>
      isFilterOpen
        ? "calc((100vw - var(--size-6) - 3 * var(--size-3)) * 0.333)"
        : "calc((100vw - var(--size-6) - 3 * var(--size-3)) * 0.5)"};
    transform: ${({ isFilterOpen }) =>
      isFilterOpen
        ? "translateX(calc((100vw - var(--size-6) - 3 * var(--size-3)) * 0.333))"
        : "translateX(0)"};
  }

  @media print {
    position: static;
    width: 100%;
    height: auto;
    overflow: visible;
    transform: none;
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
    isFullHeight ? "calc(100vh - var(--lbh, 0) - var(--size-5))" : "200px"};

  flex-grow: ${({ isFullHeight }) => (isFullHeight ? 0 : 1)};
  flex-shrink: ${({ isFullHeight }) => (isFullHeight ? 0 : 1)};

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
    height: 50vh;
    // gap: var(--size-3);
  }
`;

const Toolbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ScrollerContainer = styled.div`
  width: 100%;
  height: 50vw;
`;

export const DirectoryList = () => {
  const searchFieldId = useId();
  const router = useRouter();

  const isMounted = useIsMounted();

  const mapState = useToolStateMapState();
  const filterState = useToolStateFilterState();
  const { updateFilterState, getDefaultState } = useToolStateStoreActions();

  const currentlyRenderedQueryStringRef = useRef<string | null>();
  const filterWorkerRef = useRef<Worker>();
  const searchWorkerRef = useRef<Worker>();

  const currentShownKeywordRef = useRef<string>("");

  const [searchResult, setSearchResult] = useState<GeoJsonFeature[] | null>(
    null
  );

  const [isFiltering, setIsFiltering] = useState(false);

  const [keyword, setKeyword] = useState("");

  const [isError, setIsError] = useState(false);

  const openQuickView = useCallback(
    (feature: GeoJsonFeature) => {
      if (!feature?.properties?.id) return;

      updateFilterState({
        quickViewProjectId: feature?.properties?.id,
      });
    },
    [updateFilterState]
  );

  const onFilterWorkerMessage = useCallback(
    (e: MessageEvent<any>) => {
      if (!isMounted) return;
      setIsFiltering(false);
      setSearchResult(e?.data?.result ?? []);
    },
    [isMounted]
  );

  const onSearchWorkerMessage = useCallback(
    (e: MessageEvent<any>) => {
      if (!isMounted) return;

      setIsFiltering(false);
      setSearchResult(e?.data?.result ?? []);
    },
    [isMounted]
  );

  useEffectOnMountOnce(() => {
    filterWorkerRef.current = new Worker(
      new URL("./worker/filterByIds.ts", import.meta.url)
    );

    searchWorkerRef.current = new Worker(
      new URL("./worker/search.ts", import.meta.url)
    );

    filterWorkerRef.current.onmessage = onFilterWorkerMessage;
    searchWorkerRef.current.onmessage = onSearchWorkerMessage;

    return () => {
      if (filterWorkerRef.current) {
        filterWorkerRef.current.terminate();
      }
      if (searchWorkerRef.current) {
        searchWorkerRef.current.terminate();
      }
    };
  }, [onFilterWorkerMessage, onSearchWorkerMessage]);

  const maybeUpdateQueryString = useCallback(
    (state: FilterState) => {
      const newQueryString = createCompareQueryFromState(state);

      if (
        newQueryString !==
        (document.location.search ?? "").replace("&empty=1", "")
      ) {
        router.push(
          {
            pathname: router.pathname,
            search: newQueryString !== "" ? newQueryString : "?empty=1",
          },
          undefined,
          {
            shallow: true,
          }
        );
      }
    },
    [router]
  );

  const currentQueryString = createCompareQueryFromState(filterState);

  useEffect(() => {
    if (typeof window === "undefined" || !mapState.geoJson) return;

    if (!filterState.isSearchOpen) {
      currentShownKeywordRef.current = "";

      if (
        filterWorkerRef.current &&
        Array.isArray(filterState.filteredIds) &&
        currentQueryString !== ""
      ) {
        if (
          filterState.filterQueryString !==
          currentlyRenderedQueryStringRef.current
        ) {
          currentlyRenderedQueryStringRef.current =
            filterState.filterQueryString;

          filterWorkerRef.current.postMessage({
            ids: filterState.filteredIds,
            geoJson: mapState.geoJson,
          });
          setIsFiltering(true);
        }
      } else {
        setSearchResult(null);
      }
    } else {
      currentlyRenderedQueryStringRef.current = "";
      if (searchWorkerRef.current && keyword.length > 2) {
        if (keyword !== currentShownKeywordRef.current) {
          if (searchWorkerRef.current) {
            currentShownKeywordRef.current = keyword;
            searchWorkerRef.current.postMessage({
              s: keyword,
              geoJson: mapState.geoJson,
            });

            maybeUpdateQueryString({
              ...filterState,
              isSearchOpen: true,
              keyword,
            });

            setIsFiltering(true);
          }
        }
      } else {
        currentShownKeywordRef.current = "";
        setSearchResult(null);
      }
    }
  }, [
    filterState,
    filterState.isSearchOpen,
    filterState.filteredIds,
    filterState.filterQueryString,
    keyword,
    getDefaultState,
    maybeUpdateQueryString,
    currentQueryString,
    mapState.geoJson,
  ]);

  const hasNoResults = searchResult?.length === 0;

  let count = filterState.totalCount;

  if (filterState.isSearchOpen) {
    count = searchResult?.length ?? filterState.totalCount;
  } else {
    if (filterState.filterQueryString) {
      count = filterState.filteredCount;
    }
  }

  return (
    <Container isFilterOpen={filterState.isFilterOpen}>
      <Box hideOnPrint>
        <Toolbar>
          <div>
            {count}/{filterState.totalCount}
          </div>
          <IconButtonPrint />
        </Toolbar>
      </Box>
      <Panel
        isRefetching={isFiltering || filterState.isFetchingFilteredIds}
        isFullHeight={false}
      >
        <Header>
          <h3>Projects</h3>
          <Reveal
            id={searchFieldId}
            role="region"
            open={filterState.isSearchOpen}
          >
            <SearchForm
              isError={isError}
              keyword={keyword}
              onSubmit={(value: string) => {
                setKeyword(value);

                if (value?.length < 3) {
                  maybeUpdateQueryString({
                    ...getDefaultState().filter,
                    isSearchOpen: true,
                    keyword: "",
                  });
                  setIsError(true);
                }
              }}
              onChange={(value: string) => {
                setKeyword(value);
                setIsError(false);
              }}
              onResetClick={() => {
                maybeUpdateQueryString({
                  ...getDefaultState().filter,
                  isSearchOpen: true,
                  keyword: "",
                });
                setKeyword("");
                setIsFiltering(false);
              }}
            />
          </Reveal>
        </Header>
        <ScrollerContainer>
          <Scroller opacity={1}>
            {hasNoResults && <p>No projects found</p>}

            {!hasNoResults &&
              (searchResult ?? mapState?.geoJson?.features ?? []).map(
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
        </ScrollerContainer>
      </Panel>
    </Container>
  );
};
