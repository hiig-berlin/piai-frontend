import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { PiAiTool } from "~/types";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { AboutPage } from "~/components/tools/shared/AboutPage";
import { textBits } from "~/assets/data/tools/network/textbits";
import { renderInfoSection } from "~/components/tools/network/utils/renderInfoSection";

const About = ({
  tool,
}: {
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "map");

  const strings = textBits.en.about;

  const contentString = strings?.info ? renderInfoSection(strings.info) : "";
  

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
          intro: strings?.intro,
          content: contentString,
          contentSimple: contentString,
          cta: {
            title: strings?.CTA.title,
            text: strings?.CTA.text,
            url: strings?.CTA.button.link,
            linkTitle: strings?.CTA.button.label,
          },
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const token = (context?.previewData as any)?.token;

  const tool = appConfig.tools.find(
    (tool: PiAiTool) => tool.slug === "network"
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
