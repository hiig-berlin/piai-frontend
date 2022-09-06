import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { PiAiTool } from "~/types";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
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

        <AboutPage
          {...{
            tool,
            intro:
              "<p>This index is gathering information about organizations and institutions involved in the discourse around public interest AI.</p>",
            content:
              "<p>This index is gathering information about organizations and institutions involved in the discourse around public interest AI. Their involvement may take various forms - form giving funding to NGO work around the issue. This collection is based on the work of the PIAI research group and should be seen as a starting point for mapping the field of stakeholders. We hope this overview shows the broad interest in the public interest AI field, it’s influences from many sides and allows new projects to get an overview of the landscape of funders and existing stakeholders. </p>",
            contentSimple:
              "<p>This index is gathering information about organizations and institutions involved in the discourse around public interest AI.",
            cta: {
              title: "CTA Title",
              text: "<p>Aliquam gravida eu leo a pulvinar. Etiam sollicitudin mauris dolor, et luctus enim volutpat sit amet. Curabitur erat risus, tincidunt at turpis in, molestie efficitur tellus.</p>",
              url: "/",
              linkTitle: "Go back home",
            },
          }}
        />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const token = (context?.previewData as any)?.token;

  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "energy");
  if (!tool)
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
      tool,
      view: "page",
      slug: "about",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

About.getLayout = function getLayout(page: ReactElement, props: any) {
  return <LayoutTool props={props}>{page}</LayoutTool>;
};
export default About;
