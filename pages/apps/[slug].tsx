import { ReactElement } from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutMain from "~/components/layouts/LayoutMain";
import { Header } from "~/components/app/Header";
import {
  restApiGetPostBySlugOrFallbackId,
  restApiGetSettings,
} from "~/utils/restApi";
import { FlexibleContentRow } from "~/components/flexibleContent/FlexibleContentRow";

const Home = ({ currentPage }: { currentPage: any }) => {
  return (
    <>
      <NextHeadSeo
        canonical={currentPage?.yoast_head_json?.canonical}
        title={currentPage?.yoast_head_json?.title ?? currentPage?.title}
        description={currentPage?.yoast_head_json?.description}
        og={{
          title: currentPage?.yoast_head_json?.og_title,
          type: currentPage?.yoast_head_json?.og_type,
          siteName: currentPage?.yoast_head_json?.og_site_name,
          image: currentPage?.yoast_head_json?.twitter_image,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
      <Header isHome slideUpOnScroll={false} />

      <main id="content">
        {/* {currentPage?.acf?.content?.length > 0 ? (
        <FlexibleContentRow field="content" content={currentPage.acf.content} />
      ) : (
        <div />
      )} */}
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: fill in paths that should be prerendered
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const token = (context?.previewData as any)?.token;

  // TODO: Enable const currentPage = await restApiGetPostBySlugOrFallbackId("page", "home", token);
  const currentPage: any = {
    date: new Date().toISOString(),
    modified: new Date().toISOString(),
  };

  if (!currentPage)
    return {
      props: {
        frontendSettings: await restApiGetSettings(),
      },
      notFound: true,
      revalidate: 240,
    };

  return {
    props: {
      frontendSettings: await restApiGetSettings(),
      currentPage: currentPage ?? null,
    },
    revalidate: appConfig.revalidateInterval("homepage", {
      date: currentPage?.date,
      modified: currentPage?.modified,
    }),
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMain>{page}</LayoutMain>;
};
export default Home;
