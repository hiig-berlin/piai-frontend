import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { PiAiTool } from "~/types";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { AboutPage } from "~/components/tools/shared/AboutPage";
import useLanguage from "~/hooks/useLanguage";
import { isObject, isString } from "lodash";

const About = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "energy");

  const { strings, language, setLanguage } = useLanguage("claimspotting"); // Use language hook

  let contentString: string = "";
    for (var key in strings?.about.info) {
      if (strings?.about.info[key].title) contentString += `<h2>${strings?.about.info[key].title}</h2>`;
      if (strings?.about.info[key].text) contentString += `<p>${strings?.about.info[key].text}</p>`;

      for (var subkey in strings?.about.info[key]) {
          if (isObject(strings?.about.info[key][subkey])) {
            contentString += `<h3>${strings?.about.info[key][subkey].title}</h3><p>${strings?.about.info[key][subkey].text}</p>`;
          };
      }
      console.log(contentString);
    };

  return (
    <>
      <NextHeadSeo
        title={`${currentTool?.name ? `${currentTool?.name} - ` : ""} ${
          appConfig.appTitle
        }`}
        description={currentTool?.description ?? undefined}
        og={{
          title: `${currentTool?.name ? `${currentTool?.name} - ` : ""} ${
            appConfig.appTitle
          }`,
          siteName: appConfig.appTitle,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      <AboutPage
        {...{
          tool,
          intro: strings?.about.intro,
          content: contentString,
          contentSimple: contentString,
          cta: {
            title: strings?.about.collaboration.title,
            text: strings?.about.collaboration.text,
            url: strings?.about.collaboration.url,
            linkTitle: strings?.about.collaboration.label,
          },
          language: language,
          setLanguage: setLanguage,
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  // const token = (context?.previewData as any)?.token;

  const tool = appConfig.tools.find(
    (tool: PiAiTool) => tool.slug === "claimspotting"
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
