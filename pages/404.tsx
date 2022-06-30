import React, { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import LayoutMain from "~/components/layouts/LayoutMain";
import { PageMargins } from "~/components/ui/PageMargins";
import { Heading } from "~/components/ui/Heading";
import { Header } from "~/components/app/Header";
import { restApiGetSettings } from "~/utils/restApi";
import { useConfigContext } from "~/providers/ConfigContextProvider";

export function Page404() {
  const config = useConfigContext();

  return (
    <>
      <NextHeadSeo title={`Page not found - ${config.appTitle}`} />
      <Header slideUpOnScroll={false} />
      <main id="content">
        <PageMargins spaceTop={3}>
          <Heading heading="h1">
            Page not found
          </Heading>
          <p>The requested URL could not be found</p>
        </PageMargins>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      frontendSettings: await restApiGetSettings(),
    },
    revalidate: 300,
  };
};

Page404.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMain>{page}</LayoutMain>;
};

export default Page404;
