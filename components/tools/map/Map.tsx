import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useToolStateContext } from "./context/ContextProviders";
import { MapController } from "./map/MapController";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import useIsMounted from "~/hooks/useIsMounted";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { MapGlobalCss } from "./map/MapGlobalCss";

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
  // color: #005;
  background-color: #000;
`;
export const Map = ({ isVisible }: { isVisible?: boolean }) => {
  const isMounted = useIsMounted();
  const mapControllerRef = useRef<MapController>();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const config = useConfigContext();

  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const { filterSettings } = useToolStateContext();

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
        filterSettings?.styleUrl
      );
      controller.init("map", "clustered", mapContainerRef.current, (state: boolean) => {
        if (isMounted) setIsMapLoaded(state);
      });
      mapControllerRef.current = controller;
    }
  }, [filterSettings?.styleUrl, isMounted, config, router]);

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
    </>
  );
};

export default Map;
