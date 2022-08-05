import { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";

import NextHeadSeo from "next-head-seo";
import styled from "styled-components";

import { useConfigContext } from "~/providers/ConfigContextProvider";
import { Menu } from "~/components/app/Menu";
import { UserTracking } from "~/components/app/UserTracking";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { usePageStateContext } from "~/providers/PageStateContextProvider";
import { MenuButton } from "~/components/app/MenuButton";
import { ToolStateContextProvider } from "./context/ContextProviders";

import { Sidebar } from "../shared/Sidebar";
import { Submenu } from "./Submenu";
import ReactQueryContextProvider from "./context/ReactQueryContextProvider";
import { MapOverlays } from "./MapOverlays";
import { DirectoryOverlays } from "./DirectoryOverlays";

const Map = dynamic(() => import("./Map"), {
  suspense: true,
  // loading: () => <LoadingBar isLoading />,
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
  padding: var(--size-3);

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
`;

export const Layout = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props: any;
}) => {
  const config = useConfigContext();
  const { isLoading } = usePageStateContext();

  const [showMap, setShowMap] = useState(props?.view === "map");

  const isMap = props?.view === "map";
  const isDirectory = props?.slug === "directory";

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
      <UserTracking />
      <LoadingBar isLoading={isLoading} />
      <MenuButton />
      <ReactQueryContextProvider>
        <ToolStateContextProvider>
          <Sidebar tool="map" view={props?.view}>
            <Submenu tool="map" slug={props?.slug} />
          </Sidebar>
          {showMap && (
            <>
              {/* 
              <Map />
              {isMap && content}
            */}

              <Suspense fallback={<LoadingBar isLoading />}>
                <Map />
                {isMap && content}
              </Suspense>
            </>
          )}
          {!isMap && content}
          {isMap && <MapOverlays />}
          {isDirectory && <DirectoryOverlays />}
        </ToolStateContextProvider>
      </ReactQueryContextProvider>
      <Menu />
    </>
  );
};
export default Layout;
