import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useToolStateContext } from "./context/ContextProviders";
import { MapController } from "./map/MapController";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import useIsMounted from "~/hooks/useIsMounted";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { MapGlobalCss } from "./map/MapGlobalCss";
import { Icon } from "../shared/ui/Icon";

const MapUi = styled.div`
  background-color: #000c;
  border-radius: 8px;
  padding: var(--size-3);
  position: fixed;
  // bottom: var(--size-3);
  top: var(--size-6);
  right: var(--size-3);
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    gap: var(--size-2);
    padding: var(--size-2);
  }
`;

const MapContainer = styled.div`
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
`;
export const Map = ({ isVisible }: { isVisible?: boolean }) => {
  const isMounted = useIsMounted();
  const mapControllerRef = useRef<MapController>();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const config = useConfigContext();

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const { filterSettings, getMapState, updateMapState } = useToolStateContext();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      mapContainerRef.current &&
      filterSettings?.styleUrl?.trim() !== "" &&
      !mapControllerRef.current
    ) {
      const controller = new MapController(
        router,
        config,
        filterSettings?.styleUrl,
        getMapState,
        updateMapState
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
    }
  }, [
    filterSettings?.styleUrl,
    isMounted,
    config,
    router,
    getMapState,
    updateMapState,
  ]);

  return (
    <>
      <MapGlobalCss />
      <LoadingBar isLoading={!isMapLoaded} />
      <MapContainer>
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
      <MapUi>
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
