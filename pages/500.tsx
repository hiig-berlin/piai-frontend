import React, { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import LayoutMain from "~/components/layouts/LayoutMain";
import { PageMargins } from "~/components/ui/PageMargins";
import { Heading } from "~/components/ui/Heading";
import { Header } from "~/components/app/Header";
import { restApiGetSettings } from "~/utils/restApi";
import { useConfigContext } from "~/providers/ConfigContextProvider";

export function Page500() {
  const config = useConfigContext();
  return (
    <>
      <NextHeadSeo title={`Page not found - ${config.appTitle}`} />
      <Header slideUpOnScroll={false} />
      <main id="content">
        <PageMargins spaceTop={3}>
          <Heading heading="h2">
            OOOPS ...
          </Heading>
          <p>
            Unfortunately, something went wrong on our servers and we could not
            completely process your request. Please try again later!
          </p>
        </PageMargins>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      frontendSettings: await restApiGetSettings(),
      themeColorMode: "light",
    },
    revalidate: 60,
  };
};

Page500.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMain>{page}</LayoutMain>;
};

export default Page500;
