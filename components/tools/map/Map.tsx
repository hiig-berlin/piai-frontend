import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";

import {
  defaultToolState,
  useToolStateContext,
} from "./context/ContextProviders";
import { MapController } from "./map/MapController";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import useIsMounted from "~/hooks/useIsMounted";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { MapGlobalCss } from "./map/MapGlobalCss";
import { Icon } from "../shared/ui/Icon";
import { createQueryFromState } from "./map/utils";
import { appConfig } from "~/config";

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

const fetchFilteredIds = async ({ signal, queryKey }: QueryFunctionContext) => {
  const [_key, { queryString }] = queryKey as any;
  return fetch(`${appConfig.cmsUrl}/map/query?${queryString}`, {
    // Pass the signal to one fetch
    signal,
  }).then(async (response) => await response.json());
};

const defaultQueryString = createQueryFromState(defaultToolState.filter, {
  onlyIds: "1",
}).join("&");

export const Map = ({ isVisible }: { isVisible?: boolean }) => {
  const isMounted = useIsMounted();
  const mapControllerRef = useRef<MapController>();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const mapLastFilterRef = useRef<string>(defaultQueryString);

  const router = useRouter();
  const config = useConfigContext();

  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const { settings, filter, getMapState, updateMapState } =
    useToolStateContext();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (
      mapContainerRef.current &&
      settings?.styleUrl?.trim() !== "" &&
      !mapControllerRef.current
    ) {
      const controller = new MapController(
        router,
        config,
        settings?.styleUrl,
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
      setIsMapInitialized(true);
    }
  }, [
    settings?.styleUrl,
    isMounted,
    config,
    router,
    getMapState,
    updateMapState,
  ]);

  const currentQueryString = createQueryFromState(filter, { onlyIds: "1" }).join("&");

  const { isFetching, data } = useQuery(
    ["map-filter", { queryString: currentQueryString }],
    fetchFilteredIds,
    {
      enabled: defaultQueryString !== currentQueryString,
    }
  );

  useEffect(() => {
    if (isMapInitialized && !isFetching) {
      if (currentQueryString === defaultQueryString) {
        if (mapLastFilterRef.current !== currentQueryString) {
          mapControllerRef.current?.resetViewData("clustered");
          mapControllerRef.current?.showView("clustered");
          mapLastFilterRef.current = defaultQueryString;
        }
      } else {
        if (
          data?.data?.length &&
          mapLastFilterRef.current !== currentQueryString
        ) {
          mapControllerRef.current?.setFilteredViewData(
            "clustered",
            Array.isArray(data?.data) ? data?.data : []
          );
          mapControllerRef.current?.showView("clustered");
          mapLastFilterRef.current = currentQueryString;
        }
      }
    }
  }, [isMapInitialized, isFetching, data, currentQueryString]);

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
