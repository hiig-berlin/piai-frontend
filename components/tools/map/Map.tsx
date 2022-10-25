import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { MapController } from "./map/MapController";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import useIsMounted from "~/hooks/useIsMounted";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { MapGlobalCss } from "./map/MapGlobalCss";
import { Icon } from "../shared/ui/Icon";
import { createCompareQueryFromState } from "./map/utils";

import {
  useToolStateFilterState,
  useToolStateMapState,
  useToolStateSettingsState,
  useToolStateStoreActions,
  defaultCompareQueryString,
} from "./state/ToolState";

const MapUi = styled.div<{ isMapView: boolean }>`
  background-color: #000c;
  border-radius: 8px;
  padding: var(--size-3);
  position: fixed;
  // bottom: var(--size-3);
  top: var(--size-7);
  right: var(--size-3);
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    gap: var(--size-2);
    padding: var(--size-2);
    top: auto;
    bottom: var(--size-3);
  }

  ${({ isMapView, theme }) => (!isMapView ? theme.applyMixin("noPrint") : "")}
`;

const MapContainer = styled.div<{ isMapView: boolean }>`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  // I used negative not to inferere with
  // non absolute positioned page layout
  // sorry das läuft so nicht, negative
  z-index: 1;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #000;
  ${({ isMapView, theme }) => (!isMapView ? theme.applyMixin("noPrint") : "")}
`;

export const Map = ({ isMapView }: { isMapView?: boolean }) => {
  const isMounted = useIsMounted();
  const router = useRouter();
  const config = useConfigContext();

  const mapControllerRef = useRef<MapController>();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapLastFilterRef = useRef<string>(defaultCompareQueryString);

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  
  const mapState = useToolStateMapState();
  const filterState = useToolStateFilterState();
  const settingsState = useToolStateSettingsState();
  const { getState, updateMapState, updateFilterState } =
    useToolStateStoreActions();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      mapContainerRef.current &&
      settingsState?.styleUrl?.trim() !== "" &&
      !mapControllerRef.current
    ) {
      const controller = new MapController(
        router,
        config,
        settingsState?.styleUrl,
        getState,
        updateMapState,
        updateFilterState
      );
      controller.init(
        "map",
        "clustered",
        mapContainerRef.current,
        (state: boolean) => {
          if (isMounted) setIsMapLoaded(state);
        }
      );
      mapControllerRef.current = controller;

      updateMapState({
        mapController: mapControllerRef.current,
      });

      setIsMapInitialized(true);
    }
  }, [
    settingsState?.styleUrl,
    isMounted,
    config,
    router,
    getState,
    updateMapState,
    updateFilterState,
  ]);

  const currentQueryString = createCompareQueryFromState(filterState);

  useEffect(() => {
    if (isMapInitialized) {
      if (currentQueryString === defaultCompareQueryString) {
        if (mapLastFilterRef.current !== currentQueryString) {
          mapControllerRef.current?.resetViewData("clustered");
          mapControllerRef.current?.showView("clustered");
          mapLastFilterRef.current = defaultCompareQueryString;
        }
      } else {
        if (mapLastFilterRef.current !== filterState.filterQueryString) {
          mapControllerRef.current?.setFilteredViewData(
            "clustered",
            filterState.filteredIds ?? []
          );
          mapControllerRef.current?.showView("clustered");
          mapLastFilterRef.current = filterState.filterQueryString;
        }
      }
    }
  }, [
    isMapInitialized,
    filterState.filteredIds,
    filterState.filterQueryString,
    currentQueryString,
  ]);

  useEffect(() => {
    updateMapState({
      loadGeoJson: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapState.loadGeoJson && mapState.geoJson && mapControllerRef.current)
      mapControllerRef.current.setGeoJson(mapState.geoJson);
  }, [mapState.loadGeoJson, mapState.geoJson]);

  return (
    <>
      <MapGlobalCss />
      <LoadingBar isLoading={!isMapLoaded} />
      <MapContainer isMapView={!!isMapView}>
        <div
          ref={mapContainerRef}
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
          }}
          tabIndex={-1}
          className="map"
        ></div>
      </MapContainer>
      <MapUi isMapView={!!isMapView}>
        <Icon
          type="plus"
          onClick={() => {
            if (mapControllerRef.current && mapControllerRef.current.map) {
              mapControllerRef.current.runTask(() => {
                if (mapControllerRef.current && mapControllerRef.current.map)
                  mapControllerRef.current.map.zoomIn();
              });
            }
          }}
        />
        <Icon
          type="globe"
          onClick={() => {
            if (mapControllerRef.current && mapControllerRef.current.map) {
              mapControllerRef.current.runTask(() => {
                if (mapControllerRef.current && mapControllerRef.current.map)
                  mapControllerRef.current.views.clustered?.fitToBounds(true);
              });
            }
          }}
        />
        <Icon
          type="minus"
          onClick={() => {
            if (mapControllerRef.current && mapControllerRef.current.map) {
              mapControllerRef.current.runTask(() => {
                if (mapControllerRef.current && mapControllerRef.current.map)
                  mapControllerRef.current.map.zoomOut();
              });
            }
          }}
        />
      </MapUi>
    </>
  );
};

export default Map;
