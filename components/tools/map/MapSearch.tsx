import { useEffect, useRef, useCallback, useState } from "react";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { SidebarDrawer } from "./ui/SidebarDrawer";
import styled from "styled-components";

import type { GeoJsonFeature } from "./map/types";
import { SearchItem } from "./SearchItem";
import { useCssVarsStateIsTabletLandscapeAndUpState } from "~/components/state/CssVarsState";
import { LngLatLike } from "maplibre-gl";
import InputText from "~/components/styled/InputText";
import { ButtonNormalized } from "~/components/styled/Button";
import { ToolSvgBackground } from "../shared/ToolSvgBackground";
import useIsMounted from "~/hooks/useIsMounted";
import { useToolStateFilterState, useToolStateMapState, useToolStateStoreActions } from "./state/ToolState";

const Form = styled.form`
  position: relative;
  margin-bottom: var(--size-2);
  width: 100%;
`;

const Input = styled(InputText)<{ isError: boolean }>`
  // ${({ theme }) => theme.textStyle("h3", true)}
  // text-transform: none;

  font-family: var(--font-family-monospace);
  background-color: #000;
  color: #fff;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid
    ${({ isError }) => (isError ? "var(--color-ailab-red)" : "#fff")};
  padding-bottom: 3px;

  &::placeholder {
    color: var(--color-medium-grey) !important;
  }
`;

const Buttons = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  transform: translateY(-50%);
  gap: var(--size-2);
`;

const Button = styled(ButtonNormalized)`
  width: var(--size-3);
  height: var(--size-3);
`;

export const MapSearch = () => {
  const isMounted = useIsMounted();

  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();

  const mapState = useToolStateMapState();
  const filterState = useToolStateFilterState();

  const { updateMapState } =
    useToolStateStoreActions();

  const workerRef = useRef<Worker>();
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

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

      if (mapState?.mapController?.map) {
        mapState.mapController.showQuickView(
          feature.geometry.coordinates as LngLatLike,
          feature?.properties?.id,
          !isTabletLandscapeAndUp ? false : true
        );
      }
    },
    [isTabletLandscapeAndUp, mapState.mapController]
  );

  useEffect(() => {
    if (typeof window === "undefined" || !mapState.geoJson || !workerRef.current)
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
        statusFlagKey="isSearchOpen"
        title="Project search"
        dimmContent={isSearching}
        header={
          <Form
            action="/"
            onSubmit={(e) => {
              e.preventDefault();
              setKeyword(inputRef.current.value);

              if (inputRef.current.value?.length < 3) setIsError(true);
            }}
          >
            <Button aria-label="search" type="submit">
                <ToolSvgBackground type="search" />
              </Button>
            <Input
              isError={isError}
              placeholder="Search project titles"
              ref={inputRef}
              onChange={(e) => {
                setKeyword(e.target.value);
                setIsError(false);
              }}
            />
            <Buttons>
              {keyword !== "" && (
                <Button
                  type="reset"
                  aria-label="reset search"
                  onClick={() => {
                    inputRef.current.value = "";
                    setKeyword("");
                  }}
                >
                  <ToolSvgBackground type="close" />
                </Button>
              )}
              
            </Buttons>
          </Form>
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
