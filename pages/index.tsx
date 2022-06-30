import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutMain from "~/components/layouts/LayoutMain";
import { Header } from "~/components/app/Header";
import {
  restApiGetPostBySlugOrFallbackId,
  restApiGetSettings,
  restApiESQuery,
} from "~/utils/restApi";
import { Intro } from "~/components/content/Intro";
import { Tiles } from "~/components/content/Tiles";
import { TextSection } from "~/components/content/TextSection";
import { About } from "~/components/content/About";

// TODO: remove if not needed anymore
// import { TextHeading } from "~/components/content/TextHeading";
// import { TextListing } from "~/components/content/TextListing";
// import { TextTwoCol } from "~/components/content/TextTwoCol";
// import { loremIpsum } from "react-lorem-ipsum";



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
             

        <Intro />
        <Tiles />

        {/* <Video></Video> */}

        <TextSection />

        <About />

      </main>
    </>
  );
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
