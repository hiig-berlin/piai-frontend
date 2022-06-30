import NextHeadSeo from "next-head-seo";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { Menu } from "~/components/app/Menu";
import { UserTracking } from "~/components/app/UserTracking";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { usePageStateContext } from "~/providers/PageStateContextProvider";
import { MenuButton } from "~/components/app/MenuButton";
import {
  ToolStateContextProvider,
  useToolStateContext,
} from "./ContentProviders";
import { Map } from "./Map";
import styled, { createGlobalStyle } from "styled-components";
import { useEffect } from "react";
import { Sidebar } from "../shared/Sidebar";
import { ToolSidebar } from "~/components/app/ToolSidebar"; 

const GlobalStyle = createGlobalStyle`
  body {
    background: #000;
  }
`;

const ContentContainer = styled.div<{ isTransparent: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
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
      background-color: #ccc;
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

  useEffect(() => {
    setView(props?.view ?? "page");
  }, [setView, props?.view]);

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

      <ToolStateContextProvider>
      <ToolSidebar />
        <Map />
        <ContentContainer isTransparent={props?.view === "map"}>
          {children}
        </ContentContainer>
        {/* <Sidebar tool="map" view={props?.view}>
          <div
            style={{
              color: "#ff0",
              fontSize: "12px",
              lineHeight: "14px",
            }}
          >
            Some
            <br />
            Sidebar
            <br />
            content
          </div>
        </Sidebar> */}

      </ToolStateContextProvider>
      <Menu />
    </>
  );
};
export default Layout;
