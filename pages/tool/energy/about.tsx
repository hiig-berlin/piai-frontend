import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { PiAiTool } from "~/types";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiESGetSettings } from "~/utils/restApi";
import { AboutPage } from "~/components/tools/shared/AboutPage";

const About = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  return (
    <>
      {/*
        TODO: Set correct values ... 
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
      />*/}

      <main id="content">
        <AboutPage
          {...{
            tool,
            intro:
              "<p>Curabitur quis lorem justo. Donec lacinia, metus eu ultricies aliquet, velit neque ornare quam, non hendrerit enim arcu nec turpis. Quisque felis nunc, varius at turpis tristique, tempus dapibus nunc. Vivamus volutpat turpis orci. In posuere sem nulla, eget fringilla turpis egestas at. Vivamus sed facilisis risus. Nullam quis augue feugiat, fermentum sapien vitae, efficitur augue. Nunc vestibulum elit sit amet arcu iaculis dignissim.</p>",
            content:
              "<p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>",
            cta: {
              title: "CTA Title",
              text: "<p>Aliquam gravida eu leo a pulvinar. Etiam sollicitudin mauris dolor, et luctus enim volutpat sit amet. Curabitur erat risus, tincidunt at turpis in, molestie efficitur tellus.</p>",
              url: "/",
              linkTitle: "Go back home",
            },
          }}
        />
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const token = (context?.previewData as any)?.token;

  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "energy");
  if (!tool)
    return {
      props: {
        frontendSettings: await restApiESGetSettings(),
      },
      notFound: true,
      revalidate: 240,
    };

  return {
    props: {
      frontendSettings: await restApiESGetSettings(),
      tool,
      view: "page",
      slug: "about",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

About.getLayout = function getLayout(page: ReactElement) {
  return <LayoutTool>{page}</LayoutTool>;
};
export default About;
