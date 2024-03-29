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
  const currentTool = appConfig.tools?.find((t) => t.slug === "map");

  return (
    <>
      <NextHeadSeo
        title={`About - ${currentTool?.name ? `${currentTool?.name} - ` : ""} ${
          appConfig.appTitle
        }`}
        description={currentTool?.description ?? undefined}
        og={{
          title: `About - ${
            currentTool?.name ? `${currentTool?.name} - ` : ""
          } ${appConfig.appTitle}`,
          siteName: appConfig.appTitle,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      <AboutPage
        {...{
          tool,
          intro:
            "<p>An index of organisations and institutions involved in the discourse around Public Interest AI.</p>",
          content:
            "<p>This index gathers information about organisations and institutions involved in the discourse around Public Interest AI. Their involvement may take various forms – from giving funding to NGO work around the issue. This collection is based on the work of the PIAI research group and should be seen as a starting point for mapping the field of stakeholders.</p><p>We hope this overview shows the broad interest in the Public Interest AI field, its influences from many sides and allows new projects to get an overview of the landscape of funders and existing stakeholders. </p>",
          contentSimple:
            "<p>This is a list of organisations that are important for public interest AI.</p><p>If you know an organisation who should be on this list, please let us know.</p><p>We collect information with this list. Because so many organisations exist that deal with AI, it is sometimes difficult to find important public interest AI organisations. We collected them here to help people get an overview.</p>",
          cta: {
            title: "Who is missing?",
            text: "This is a living document. Let us know who else is involved in the dialogue and what their role is.",
            url: "mailto:piai@hiig.de?subject=%5Bpublicinterest.ai%5D%20Add%20stakeholder%20to%20index&body=Dear%20PIAI%20team%2C%0D%0A%0D%0AI%20would%20like%20to%20suggest%20the%20following%20actor%20to%20be%20included%20in%20the%20PIAI%20Stakeholder%20Index.%0D%0A%0D%0Aname%3A%20%22Company%20or%20inititative%20name%22%0D%0Atags%20(Choose%20one%20or%20more%20of%20these)%3A%20%5B%22AI%20Practice%22%2C%20%22Think%20tanks%2FNGOs%22%2C%20%22Research%22%2C%20%22Funding%22%2C%20%22Politics%22%5D%0D%0Alink%3A%20%22https%3A%2F%2Flink-to-their-website.com%22%2C%0D%0Alocation%3A%20%22City%2C%20Country%22%2C%0D%0Adescription%3A%20%22A%20brief%20description%20of%20the%20stakeholder%20and%20their%20activities%22%0D%0A%0D%0ABest%20regards%2C%0D%0A%0D%0A%0D%0A__%0D%0A%0D%0ANote%3A%20The%20stakeholder%20index%20is%20a%20curated%20list%2C%20suggestions%20will%20be%20reviewed%20and%20validated%20by%20the%20team.",
            linkTitle: "Contact us",
          },
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const token = (context?.previewData as any)?.token;

  const tool = appConfig.tools.find(
    (tool: PiAiTool) => tool.slug === "stakeholder"
  );
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
