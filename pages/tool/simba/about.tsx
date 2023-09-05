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
  const currentTool = appConfig.tools?.find((t) => t.slug === "simba");

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
          intro:
            "<p>The Simba Text Assistant is designed to improve your online reading experience and support you on your language learning journey. It is a plug-in that runs in your browser and provides summaries of the text found on web pages. Our models and code are open source.</p>",
          content:
            `<h3>WHAT IS THE SIMBA TEXT ASSISTANT?</h3>
            <p>The Simba Text Assistant is a browser plug-in that produces summaries of the text on web pages. The plug-in supports two types of summaries: extractive, where the most important sentences are highlighted on the page, and abstractive, where a new text is generated which reflects the main points in the text. More information on how the summaries are produced can be found <a target="blank" rel"noreferrer nofollow" href="https://github.com/fhewett/simba#how-does-simba-work">here.</a></p>
            
            <p>We offer both summaries as they both have their advantages: the extractive summary is guaranteed to be accurate, whereas the abstractive summary is a stand-alone text that should be more coherent. Both summaries are designed to help language learners understand what a text is about.</p>
            
            <h3>WHAT’S THE AIM?</h3>
            <p>Simba has been created by members of the Public Interest AI research group at the HIIG. The overarching goal of the research group is to carve out what characteristics “public interest AI” should have (our thoughts on this can be found on <a target="blank" rel"noreferrer nofollow" href="/">publicinterest.ai</a>). We also aim to implement these characteristics in practical prototypes; Simba is one of these. Concretely, this means that the code and models behind Simba are open source, which not only allows for collaboration but also complete transparency. The functionality of Simba is also one step in the direction of a larger goal that is definitely in the public interest: making online text (and by proxy, the internet) more accessible.</p>`,
          contentSimple:
            "<p>The “Simba Text Assistant” is a tool that can be used when using the internet. It creates a summary of the web page you are looking at. We are still working on the tool and making it better. There is an option on the tool where you can send us your feedback. This will help us to make the tool better. The code used to create the tool can be looked at. This means that other people can see exactly how the tool was made. It also means that other people can use the code to make other tools.</p>",
          cta: {
            // title: "Install the plug-in",
            // text: `<p>To install the plug-in please go to the <a target="blank" rel"noreferrer nofollow" href="https://addons.mozilla.org/de/firefox/addon/simba-text-assistant/">Simba page in the Firefox app store</a> or the Chrome app store (depending on what browser you use).</p><p>We are currently trialling the plug-in, and are very grateful for any feedback you may have. Feedback can be given directly through the plug-in itself, via <a href="mailto:simba@hiig.de">email</a> or any technical issues can be filed in our GitHub repository.</p>`,
            title: "Feedback",
            text: `<p>We are currently trialling the plug-in, and are very grateful for any feedback you may have. Feedback can be given directly through the plug-in itself, via email or any technical issues can be filed in our <a target="blank" rel"noreferrer nofollow" href="https://github.com/fhewett/simba#how-does-simba-work">GitHub repository</a>.</p>`,
            // text: "<p>To install the plug-in please go to the Simba page in the Firefox app store or the Chrome app store – depending on what browser you use. We are currently trialling the plug-in, and are very grateful for any feedback you may have. Feedback can be given directly through the plug-in itself, via email or any technical issues can be filed in our GitHub repository.</p>",
            url: "mailto:simba@hiig.de",
            linkTitle: "Write us an email",
          },
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
