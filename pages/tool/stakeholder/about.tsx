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
              "<p>An index of organisations and institutions involved in the discourse around public interest AI.</p>",
            content:
              "<p>This index is gathering information about organisations and institutions involved in the discourse around public interest AI. Their involvement may take various forms – from giving funding to NGO work around the issue. This collection is based on the work of the PIAI research group and should be seen as a starting point for mapping the field of stakeholders.</p><p>We hope this overview shows the broad interest in the public interest AI field, it’s influences from many sides and allows new projects to get an overview of the landscape of funders and existing stakeholders. </p>",
            contentSimple:
              "This index is gathering information about organizations and institutions involved in the discourse around public interest AI.",
            cta: {
              title: "Who is missing?",
              text: "This is a living document. Let us know, who else is involved in the dialoge and what their role is.",
              url: "mailto:piai@hiig.de?subject=%5Bpublicinterest.ai%5D%20Add%20stakeholder%20to%20index&body=Dear%20PIAI%20team%2C%0D%0A%0D%0AI%20would%20like%20to%20suggest%20the%20following%20actor%20to%20be%20included%20in%20the%20PIAI%20Stakeholder%20Index.%0D%0A%0D%0Aname%3A%20%22Company%20or%20inititative%20name%22%0D%0Atags%20(Choose%20one%20or%20more%20of%20these)%3A%20%5B%22AI%20Practice%22%2C%20%22Think%20tanks%2FNGOs%22%2C%20%22Research%22%2C%20%22Funding%22%5D%0D%0Alink%3A%20%22https%3A%2F%2Flink-to-their-website.com%22%2C%0D%0Alocation%3A%20%22City%2C%20Country%22%2C%0D%0Adescription%3A%20%22A%20brief%20description%20of%20the%20stakeholder%20and%20their%20activities%22%0D%0A%0D%0ABest%20regards%2C%0D%0A%0D%0A%0D%0A__%0D%0A%0D%0ANote%3A%20The%20stakeholder%20index%20is%20a%20curated%20list%2C%20suggestions%20will%20be%20reviewed%20and%20validated%20by%20the%20team.",
              linkTitle: "Contact us",
            },
          }}
        />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const token = (context?.previewData as any)?.token;

  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "stakeholder");
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
