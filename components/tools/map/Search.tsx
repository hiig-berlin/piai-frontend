import { useEffect, useRef, useCallback, useState } from "react";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { useToolStateContext } from "./context/ContextProviders";
import { SidebarDrawer } from "./ui/SidebarDrawer";

import type { GeoJsonFeature } from "./map/types";
import { SearchItem } from "./SearchItem";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { LngLatLike } from "maplibre-gl";

export const Search = () => {
  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  const { map, filter, getState, updateMapState, updateFilterState } =
    useToolStateContext();

  const searchResultRef = useRef<GeoJsonFeature[] | null>(null);

  const [isSearching, setIsSearching] = useState(false);

  const workerRef = useRef<Worker>();
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./worker/search.ts", import.meta.url)
    );

    workerRef.current.onmessage = (evt) => {
      setIsSearching(false);
      console.log(`WebWorker Response`, evt.data);
    };

    return () => {
      if (workerRef.current) workerRef.current.terminate();
    };
  }, []);

  const handleWork = useCallback(async () => {
    if (workerRef.current) {
      workerRef.current.postMessage({
        s: "lorem",
        geoJson: map.geoJson,
      });
      setIsSearching(true);
    }
  }, [map.geoJson]);

  useEffect(() => {
    if (filter.isSearchOpen && !map.geoJson) {
      updateMapState({
        loadGeoJson: true,
      });
    }
  }, [filter.isSearchOpen, map.geoJson, updateMapState]);

  const openQuickView = useCallback(
    (feature: GeoJsonFeature) => {
      if (!feature?.properties?.id) return;

      updateFilterState({
        isSearchOpen: !isTabletLandscapeAndUp ? false : true,
      });

      if (map?.mapController?.map) {
        map.mapController.showQuickView(
          feature.geometry.coordinates as LngLatLike,
          feature?.properties?.id
        );
      }
    },
    [updateFilterState, isTabletLandscapeAndUp, map.mapController]
  );

  return (
    <>
      <LoadingBar isLoading={!map.geoJson || isSearching} />
      <SidebarDrawer statusFlagKey="isSearchOpen" title="Search by keyword">
        <p>Add search logic here</p>

        {(searchResultRef.current ?? map?.geoJson?.features ?? []).map(
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
