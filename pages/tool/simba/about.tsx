import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { PiAiTool } from "~/types";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { AboutPage } from "~/components/tools/shared/AboutPage";
import showdown from "showdown";
import useLanguage from "~/hooks/useLanguage";
import { isObject } from "lodash";

const About = ({
  tool,
}: {
  tool: PiAiTool;
}) => {
  const currentTool = appConfig.tools?.find((t) => t.slug === "simba");

  const { strings, language, setLanguage } = useLanguage("simba"); // Use language hook

  const converter = new showdown.Converter();

  let contentString: string = "";
  for (var key in strings?.about.content) {
    if (strings?.about.content[key].title)
      contentString += `<h2>${strings?.about.content[key].title}</h2>`;
    if (strings?.about.content[key].text)
      contentString += `<div>${converter.makeHtml(
        strings?.about.content[key].text
      )}</div>`;

    for (var subkey in strings?.about.content[key]) {
      if (isObject(strings?.about.content[key][subkey])) {
        contentString += `<h3>${
          strings?.about.content[key][subkey].title
        }</h3><div>${converter.makeHtml(
          strings?.about.content[key][subkey].text
        )}</div>`;
      }
    }
  }
  // console.log("contentString", contentString);

  let contentSimpleString: string = "";
  for (var key in strings?.about.contentSimple) {
    if (strings?.about.contentSimple[key].title)
      contentSimpleString += `<h2>${strings?.about.contentSimple[key].title}</h2>`;
    if (strings?.about.contentSimple[key].text)
      contentSimpleString += `<p>${converter.makeHtml(
        strings?.about.contentSimple[key].text
      )}</p>`;

    for (var subkey in strings?.about.contentSimple[key]) {
      if (isObject(strings?.about.contentSimple[key][subkey])) {
        contentSimpleString += `<h3>${
          strings?.about.contentSimple[key][subkey].title
        }</h3><p>${converter.makeHtml(
          strings?.about.contentSimple[key][subkey].text
        )}</p>`;
      }
    }
  }
  // console.log("contentSimpleString", contentSimpleString);

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
          contentSimple: contentSimpleString,
          cta: {
            title: strings?.about?.cta.title,
            text: strings?.about?.cta.text,
            url: strings?.about?.cta.url,
            linkTitle: strings?.about?.cta.label,
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

  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "simba");
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
