import NextHeadSeo from "next-head-seo";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { Menu } from "../app/Menu";
import { MatomoUserTracking } from "../app/MatomoUserTracking";
import { LoadingBar } from "../styled/LoadingBar";
import { MenuButton } from "../app/MenuButton";
import { Sidebar } from "../tools/shared/Sidebar";
import styled from "styled-components";
import { usePageStateIsLoadingState } from "../state/PageState";

const ToolContainer = styled.div`
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;
`;

const ContentContainer = styled.div`
  display: flex;

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-left: var(--size-6);
  }

  *::selection {
    background: #fff !important;
    color: #000 !important;
  }
`;

export const LayoutTool = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props: any;
}) => {
  const config = useConfigContext();

  const isLoading = usePageStateIsLoadingState();

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

      <ToolContainer>
        <Sidebar tool={props.tool.slug} />
        <ContentContainer>{children}</ContentContainer>
      </ToolContainer>
      <Menu />
    </>
  );
};
export default LayoutTool;
