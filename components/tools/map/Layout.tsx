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
import { PiAiTool } from "~/types";
import { Submenu } from "./Submenu";

const GlobalStyle = createGlobalStyle`
  body {
    background: var(--color-bg-tool);
  }
`;

const ToolContainer = styled.div<{ isStacked: boolean }>`
  display: ${({ isStacked }) => (isStacked ? "block" : "flex")};
  flex-direction: row-reverse;
  height: 100vh;
  overflow: hidden;
`



const ContentContainer = styled.div<{ isTransparent: boolean }>`
  position: ${({ isTransparent }) => (isTransparent ? "absolute" : "static")}
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;

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
      background: var(--color-bg-tool);;
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

  const tool = config.tools.find((tool: PiAiTool) => tool.slug === "map");

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
        <ToolContainer isStacked={props?.view === "map"}>
          <Map isVisible={props?.view === "map"} />
          <ContentContainer isTransparent={props?.view === "map"}>
            {children}
          </ContentContainer>
          <Sidebar tool="map" view={props?.view}>
            <Submenu tool="map" slug={props?.slug} />
          </Sidebar>
        </ToolContainer>
      </ToolStateContextProvider>
      <Menu />
    </>
  );
};
export default Layout;
