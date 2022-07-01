import NextHeadSeo from "next-head-seo";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { AppProps } from "~/types";
import { Menu } from "../app/Menu";
import { UserTracking } from "../app/UserTracking";
import { LoadingBar } from "../styled/LoadingBar";
import { usePageStateContext } from "~/providers/PageStateContextProvider";
import { MenuButton } from "../app/MenuButton";
import { ToolSidebar } from "../app/ToolSidebar";
import { Sidebar } from "../tools/shared/Sidebar";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    background: var(--color-bg-tool);
  }
`;

export const LayoutTool = ({ children }: AppProps) => {
  const config = useConfigContext();
  const { isLoading } = usePageStateContext();

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
      <Sidebar tool={""} />
      <MenuButton />
      {children}
      <Menu/>
    </>
  );
};
export default LayoutTool;
