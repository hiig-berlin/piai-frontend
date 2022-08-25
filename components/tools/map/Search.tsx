import { useEffect, useRef, useCallback, useState } from "react";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { SidebarDrawer } from "./ui/SidebarDrawer";

import type { GeoJsonFeature } from "./map/types";
import { SearchItem } from "./SearchItem";
import { useCssVarsStateIsTabletLandscapeAndUpState } from "~/components/state/CssVarsState";
import { LngLatLike } from "maplibre-gl";

import useIsMounted from "~/hooks/useIsMounted";
import {
  useToolStateFilterState,
  useToolStateMapState,
  useToolStateStoreActions,
} from "./state/ToolState";
import { SearchForm } from "./SearchForm";

export const Search = ({ view }: { view: string }) => {
  const isMounted = useIsMounted();

  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();

  const mapState = useToolStateMapState();
  const filterState = useToolStateFilterState();

  const { updateMapState, updateFilterState } = useToolStateStoreActions();

  const workerRef = useRef<Worker>();
  
  const currentShownKeywordRef = useRef<string>("");

  const [searchResult, setSearchResult] = useState<GeoJsonFeature[] | null>([]);
  const [keyword, setKeyword] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isError, setIsError] = useState(false);

  const onWorkerMessage = useCallback(
    (e: MessageEvent<any>) => {
      if (!isMounted) return;

      if (e?.data?.s === currentShownKeywordRef.current) {
        setIsSearching(false);
        setSearchResult(e?.data?.result ?? []);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./worker/search.ts", import.meta.url)
    );

    workerRef.current.onmessage = onWorkerMessage;

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, [onWorkerMessage]);

  useEffect(() => {
    if (filterState.isSearchOpen && !mapState.geoJson) {
      updateMapState({
        loadGeoJson: true,
      });
    }
  }, [filterState.isSearchOpen, mapState.geoJson, updateMapState]);

  const openQuickView = useCallback(
    (feature: GeoJsonFeature) => {
      if (!feature?.properties?.id) return;

      if (view === "map" && mapState?.mapController?.map) {
        mapState.mapController.showQuickView(
          feature.geometry.coordinates as LngLatLike,
          feature?.properties?.id,
          !isTabletLandscapeAndUp ? false : true
        );
      } else {
        updateFilterState({
          quickViewProjectId: feature?.properties?.id,
        });
      }
    },
    [isTabletLandscapeAndUp, updateFilterState, mapState.mapController, view]
  );

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !mapState.geoJson ||
      !workerRef.current
    )
      return;

    if (keyword.length > 2) {
      if (keyword !== currentShownKeywordRef.current) {
        if (workerRef.current) {
          currentShownKeywordRef.current = keyword;
          workerRef.current.postMessage({
            s: keyword,
            geoJson: mapState.geoJson,
          });
          setIsSearching(true);
        }
      }
    } else {
      currentShownKeywordRef.current = "";
      setSearchResult(null);
    }
  }, [mapState.geoJson, keyword]);

  const hasNoResults = keyword.length > 2 && searchResult?.length === 0;

  return (
    <>
      <LoadingBar isLoading={!mapState.geoJson || isSearching} />
      <SidebarDrawer
        columnWidth={0.333}
        statusFlagKey="isSearchOpen"
        title="Project search"
        dimmContent={isSearching}
        header={
          <SearchForm
            isError={isError}
            keyword={keyword}
            onSubmit={(value: string) => {
              setKeyword(value);

              if (value?.length < 3) setIsError(true);
            }}
            onChange={(value: string) => {
              setKeyword(value);
              setIsError(false);
            }}
            onResetClick={() => {
              setKeyword("");
            }}
          />
        }
      >
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
      </SidebarDrawer>
    </>
  );
};
