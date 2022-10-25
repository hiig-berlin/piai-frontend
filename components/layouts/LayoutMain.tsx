import styled from "styled-components";
import NextHeadSeo from "next-head-seo";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { AppProps } from "~/types";
import { Menu } from "../app/Menu";
import { Footer } from "../app/Footer";
import { MatomoUserTracking } from "../app/MatomoUserTracking";
import { LoadingBar } from "../styled/LoadingBar";
import { usePageStateIsLoadingState } from "../state/PageState";

const FullHeightGrid = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  justify-items: stretch;
`;

export const LayoutMain = ({ children }: AppProps) => {
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
      <FullHeightGrid>
        {children}

        <Footer />
      </FullHeightGrid>
      <Menu />
    </>
  );
};
export default LayoutMain;
