import { AppProps } from "~/types";
import styled from "styled-components";
import NextHeadSeo from "next-head-seo";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { MatomoUserTracking } from "../app/MatomoUserTracking";

const FullHeightGrid = styled.div`
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  justify-items: stretch;
`;

export const LayoutLogin = ({ children }: AppProps) => {
  const config = useConfigContext();
  return (
    <>
      <MatomoUserTracking />
      <FullHeightGrid>{children}</FullHeightGrid>
    </>
  );
};
export default LayoutLogin;
