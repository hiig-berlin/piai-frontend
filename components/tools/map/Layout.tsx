import {
  // Suspense,
  useEffect,
  useState,
  useCallback,
} from "react";

import dynamic from "next/dynamic";

import NextHeadSeo from "next-head-seo";
import styled from "styled-components";

import { useConfigContext } from "~/providers/ConfigContextProvider";
import { Menu } from "~/components/app/Menu";
import { MatomoUserTracking } from "~/components/app/MatomoUserTracking";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { MenuButton } from "~/components/app/MenuButton";

import { Sidebar } from "../shared/Sidebar";
import { Submenu } from "./Submenu";
import ReactQueryContextProvider from "./context/ReactQueryContextProvider";
import { MapOverlays } from "./MapOverlays";
import { DirectoryOverlays } from "./DirectoryOverlays";
import { ToolStateController } from "./state/ToolStateController";
import { usePageStateIsLoadingState } from "~/components/state/PageState";

import {
  useToolStateSettingsState,
  useToolStateStoreActions,
  FilterSettingTaxonomyOptionRegion,
  FilterSettingTaxonomyOptionRegionChild,
} from "./state/ToolState";
import { useRouter } from "next/router";

const Map = dynamic(() => import("./Map"), {
  // suspense: true,
  loading: () => <LoadingBar isLoading />,
});

// Contains:
// transparent when overlaying map
// contains {children}
const ContentContainer = styled.div<{ isTransparent: boolean }>`
  position: absolute;
  display: flex;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;

  // hier kein padding!
  // das wird in den page layouts gesetzt
  // padding: var(--size-3);

  ${({ isTransparent }) =>
    isTransparent
      ? `
    background-color: transparent;
    pointer-events: none;
    
    `
      : `
      background: var(--color-bg-tool);
      min-height: calc(100vh - var(--lbh, 0));
  `}

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: 0 0 0 var(--size-6);
  }

  *::selection {
    background: #fff !important;
    color: #000 !important;
  }
`;

let isInit = false;
let previousPathName = "";

export const Layout = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props: any;
}) => {
  const router = useRouter();
  const config = useConfigContext();
  const isLoading = usePageStateIsLoadingState();

  const settingsState = useToolStateSettingsState();

  const { updateFilterState, setFilterState, getDefaultState } =
    useToolStateStoreActions();

  const [showMap, setShowMap] = useState(props?.view === "map");

  const isMap = props?.view === "map";
  const isDirectory = router.pathname.indexOf("directory") > -1;
  
  const updateFromQuery = useCallback(
    (isInitCall: boolean) => {
      if (document.location.search === "") {
        if (!isInitCall) {
          setFilterState(getDefaultState().filter);
        }
      } else if (settingsState?.styleUrl !== "") {
        const newState: any = {};

        const params = new URLSearchParams(document.location.search);

        const isDirectory = router.pathname.indexOf("directory") > -1;
        const term = params.get("term") ?? "";
        if (term !== "") {
          const terms = term.split(",");

          const allTerms = [
            "funding",
            "industrialSector",
            "useOfAi",
            "isProjectOpenSource",
          ].reduce((carry: any, key: any) => {
            return {
              ...carry,
              ...((settingsState as any)?.[key]?.options ?? []).reduce(
                (c: any, term: any) => ({
                  ...c,
                  [term.id]: term.name,
                }),
                {}
              ),
            };
          }, {});

          newState.terms = terms.reduce(
            (carry: any, termId: string) => ({
              ...carry,
              [termId]: allTerms[termId],
            }),
            {}
          );
        } else {
          newState.terms = {};
        }
        
        const regions = params.get("regions") ?? "";
        if (regions !== "" && settingsState.regions && isDirectory) {
          const activeRegions = regions.split(",");

          const flattenRegions = (
            regions:
              | FilterSettingTaxonomyOptionRegion[]
              | FilterSettingTaxonomyOptionRegionChild[],
            carry: any
          ) => {
            if (!regions?.length) return carry;

            return (regions as any).reduce((carry: any, region: any) => {
              carry = {
                ...carry,
                [region.id]: region.name,
                ...(region.children.length
                  ? flattenRegions(region.children, {})
                  : {}),
              };
              return carry;
            }, carry);
          };

          const allRegions = flattenRegions(settingsState.regions, {});

          newState.regions = activeRegions.reduce(
            (carry: any, regionId: string) => ({
              ...carry,
              [regionId]: allRegions[regionId],
            }),
            {}
          );
        } else {
          newState.regions = {};
        }

        [
          "license",
          "genderRatio",
          ...(isDirectory ? ["countries"] : []),
        ].reduce((state: any, key: any) => {
          const selected = params.get(key) ?? "";
          if (selected !== "" && (settingsState as any)?.[key]?.length) {
            const active = selected.split(",");

            const allTerms = ((settingsState as any)[key] as any).reduce(
              (carry: any, term: any) => {
                carry = {
                  ...carry,
                  [term.id]: term.name,
                };
                return carry;
              },
              {}
            );

            (newState as any)[key] = active.reduce(
              (carry: any, id: string) => ({
                ...carry,
                [id]: allTerms[id],
              }),
              {}
            );
          } else {
            (newState as any)[key] = {};
          }
          return state;
        }, newState);

        const dateFrom = params.get("dateFrom") ?? "";
        const dateUntil = params.get("dateUntil") ?? "";
        if (dateFrom !== "" && dateUntil !== "") {
          newState.dateFrom = dateFrom;
          newState.dateUntil = dateUntil;
        } else {
          newState.dateFrom = null;
          newState.dateUntil = null;
        }

        const search = params.get("search");
        if (search) newState.isSearchOpen = search === "1";

        if (newState?.isSearchOpen) newState.isFilterOpen = false;

        const filter = params.get("filter");
        if (filter) newState.isFilterOpen = filter === "1";

        if (newState?.isFilterOpen) newState.isSearchOpen = false;

        const keyword = params.get("keyword");
        newState.keyword = keyword ? keyword.trim() : "";

        if (Object.keys(newState).length) {
          updateFilterState({
            ...newState,
          });
        }
      }
    },
    [
      settingsState,
      setFilterState,
      updateFilterState,
      getDefaultState,
      router.pathname
    ]
  );

  const onRouterChangeComplete = useCallback(
    (url: string) => {
      if (
        previousPathName === document.location.pathname &&
        url.replace("?empty=1", "") !== ""
      ) {
        updateFromQuery(false);
      }

      previousPathName = router.pathname;
    },
    [updateFromQuery, router.pathname],
  )
  
  useEffect(() => {
    if (typeof window === "undefined") return;

    // bit hacky but as the component is rendered several times we want to make sure to
    // only check the query string once (on load)
    if (settingsState?.styleUrl !== "" && !isInit) {
      updateFromQuery(true);
      isInit = true;
      previousPathName = document.location.pathname;
    }
    
    router.events.on("routeChangeComplete", onRouterChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouterChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsState?.styleUrl]);

  useEffect(() => {
    if (isMap && !showMap) {
      setShowMap(true);
    }
  }, [isMap, showMap]);

  const content = (
    <ContentContainer isTransparent={isMap}>{children}</ContentContainer>
  );

  return (
    <>
      <NextHeadSeo
        title={`${config.appTitle}`}
        og={{
          image: `${config.baseUrl}/img/poster.jpg`,
          type: "article",
          siteName: `${config.appTitle}`,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
      <MatomoUserTracking />
      <LoadingBar isLoading={isLoading} />
      <MenuButton />
      <ReactQueryContextProvider>
        <ToolStateController />

        <Sidebar tool="map" view={props?.view} slug={props?.slug}>
          <Submenu tool="map" slug={props?.slug} />
        </Sidebar>

        {showMap && (
          <>
            <Map isMapView={isMap} />
            {isMap && content}

            {/*
              Dynamic loading of modules does not play nice width server side rendering 
              at the moment react 18 throws client side hydration error.
              hence we're using next.js dynamic loading: ... above 
              <Suspense fallback={<LoadingBar isLoading />}>
                <Map />
                {isMap && content}
              </Suspense>
            */}
          </>
        )}
        {!isMap && content}
        {isMap && <MapOverlays />}
        {isDirectory && <DirectoryOverlays />}
      </ReactQueryContextProvider>
      <Menu />
    </>
  );
};
export default Layout;
