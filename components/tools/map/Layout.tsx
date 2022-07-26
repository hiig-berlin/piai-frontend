import { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";

import NextHeadSeo from "next-head-seo";
import styled, { createGlobalStyle } from "styled-components";

import { useConfigContext } from "~/providers/ConfigContextProvider";
import { Menu } from "~/components/app/Menu";
import { UserTracking } from "~/components/app/UserTracking";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { usePageStateContext } from "~/providers/PageStateContextProvider";
import { MenuButton } from "~/components/app/MenuButton";
import {
  ToolStateContextProvider,
  useToolStateContext,
} from "./context/ContextProviders";

import { Sidebar } from "../shared/Sidebar";
import { Submenu } from "./Submenu";
import ReactQueryContextProvider from "./context/ReactQueryContextProvider";

const Map = dynamic(() => import("./Map"), { suspense: true });

const GlobalStyle = createGlobalStyle`
  body {
    // font-size: 1em;
    // color: #eee;
  }
`;

// Contains:
// Map + ContentContainer +Sidebar
const ToolContainer = styled.div<{ isMap: boolean }>`
  display: ${({ isMap }) => (isMap ? "block" : "flex")};
  background-color: ${({ isMap }) => (isMap ? "#000" : "transparent")};
  flex-direction: row-reverse;
  height: 100vh;
  overflow: hidden;
`;

// Contains:
// transparent when overlaying map
// contains {children}
const ContentContainer = styled.div<{ isTransparent: boolean }>`
  position: ${({ isTransparent }) => (isTransparent ? "absolute" : "static")};
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: none;
  z-index: 2;

  ${({ isTransparent }) =>
    isTransparent
      ? `
    background-color: transparent;
    pointer-events: none;

    & div {
      pointer-events: all;
    }
    
    `
      : `
      background: var(--color-bg-tool);
      min-height: calc(100vh - var(--lbh, 0));
  `}
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
  const { setView } = useToolStateContext();

  const [showMap, setShowMap] = useState(props?.view === "map");

  useEffect(() => {
    setView(props?.view ?? "page");
  }, [setView, props?.view]);

  const isMap = props?.view === "map";

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
      <GlobalStyle />
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
          <ToolContainer isMap={isMap}>
            {showMap && (
              <Suspense fallback={<LoadingBar isLoading />}>
                <Map />
                {isMap && content}
              </Suspense>
            )}
            {!isMap && content}
            <Sidebar tool="map" view={props?.view}>
              <Submenu tool="map" slug={props?.slug} />
            </Sidebar>
          </ToolContainer>
        </ToolStateContextProvider>
      </ReactQueryContextProvider>
      <Menu />
    </>
  );
};
export default Layout;
