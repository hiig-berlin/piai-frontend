import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutMain from "~/components/layouts/LayoutMain";
import { Header } from "~/components/app/Header";
import {
  restApiGetPostBySlugOrFallbackId,
  restApiGetSettings,
} from "~/utils/restApi";
import { Intro } from "~/components/content/Intro";
import { Tiles } from "~/components/content/Tiles";
import { TextSection } from "~/components/content/TextSection";
import { About } from "~/components/content/About";
import { Accordion } from "~/components/content/Accordion";

const Home = ({ data }: { data: any }) => {
  
  return (
    <>
      <NextHeadSeo
        canonical={data?.yoast_head_json?.canonical ?? data?.yoast_head_json?.og_url}
        title={data?.yoast_head_json?.title ?? data?.title}
        description={data?.yoast_head_json?.description}
        og={{
          title: data?.yoast_head_json?.og_title,
          url: data?.yoast_head_json?.og_url,
          type: data?.yoast_head_json?.og_type,
          siteName: data?.yoast_head_json?.og_site_name,
          image: data?.yoast_head_json?.twitter_image,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />
      <Header isHome slideUpOnScroll={true} />

      <main id="content">
             

        <Intro data={data} />
        <Tiles data={data} />

        {/* <Video></Video> */} 

        <TextSection data={data} />

        <Accordion data={data} />

        <About data={data} />

      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const token = (context?.previewData as any)?.token;

  const data = await restApiGetPostBySlugOrFallbackId("page", "homepage", token);
  
  if (!data)
    return {
      props: {
        frontendSettings: await restApiGetSettings(),
        themeColorMode: "light",
      },
      notFound: true,
      revalidate: 240,
    };

  return {
    props: {
      frontendSettings: await restApiGetSettings(),
      data: data ?? null,
      themeColorMode: "light",
    },
    revalidate: appConfig.revalidateInterval("homepage", {
      date: data?.date,
      modified: data?.modified,
    }),
  };
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <LayoutMain>{page}</LayoutMain>;
};
export default Home;
