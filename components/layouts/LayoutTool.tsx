import NextHeadSeo from "next-head-seo";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { Menu } from "../app/Menu";
import { UserTracking } from "../app/UserTracking";
import { LoadingBar } from "../styled/LoadingBar";
import { usePageStateContext } from "~/providers/PageStateContextProvider";
import { MenuButton } from "../app/MenuButton";
import { Sidebar } from "../tools/shared/Sidebar";
import styled from "styled-components";

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
`;

export const LayoutTool = ({
  children,
  props,
}: {
  children: React.ReactNode;
  props: any;
}) => {
  const config = useConfigContext();
  const { isLoading } = usePageStateContext();

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

      <ToolContainer>
        <Sidebar tool={props.tool.slug} />
        <ContentContainer>{children}</ContentContainer>
      </ToolContainer>
      <Menu />
    </>
  );
};
export default LayoutTool;
