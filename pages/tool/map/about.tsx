import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { PiAiTool } from "~/types";
import { appConfig } from "~/config";
import Layout from "~/components/tools/map/Layout";
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
      {/* Dont' wrap this in further divs, 
      <main> is set via Layout component "*/}
      <AboutPage
        {...{
          tool,
          intro:
            "<p>This interactive global map of public interest AI projects aims to help foster research on public interest AI projects, demonstrate their self-understanding, and provide publicly accessible data about them to the broader public. The project directory displays information about every project submitted. The answers given in the survey will also be published as a research data set on a public research repository.</p>",
          content: `<h2>About the Public Interest AI data set</h2>
            <p>In recent years, many projects have emerged across the globe that are defined by their initiators as “AI for the social good”, “AI for the common good” or “AI in the public interest”. The goal of this project is to provide answers to the question of what these terms actually mean. A public data set – result of an ongoing survey – is the basis of the interactive global map of public interest AI projects.</p>
            <h2>Who is behind this project?</h2>
            <p> The project is being conducted by the <a href="https://www.hiig.de/en/project/public-interest-ai/" target="_blank" rel="roreferrer  nofollow">Public Interest AI Research Group</a> at the Alexander von Humboldt Institute for Internet and Society (HIIG).</p>
            <h2>What is it about?</h2>
            <p>As a research group focussed on public interest AI, we provide a working definition of what it means for an AI-system to be designed and deployed in the public interest (to learn about it, see here). Secondly, our research group develops AI projects that follow this goal. Thirdly, we want to provide evidence based insights on how the idea of public interest AI is being realised in practice around the world, and how understanding of the concept differs across the field. There is a lack of accumulated and detailed data on public interest AI projects, including their specific objectives, methods, and frameworks. That is the reason for this survey.</p>
            <h2>How will the data set be used?</h2>
            <p>The information gathered from the survey is transmitted to and displayed on the interactive Public Interest AI Project Map. Additionally, the survey results will help foster research on public interest AI projects, demonstrate their self-understanding, and provide publicly accessible data about them to the broader public.</p>`,
          contentSimple: `<p>Please be patient with us while we simplify! Come back in a while, our next version will include simplified texts.</p>`,

          cta: {
            title: "Contribute",
            text: "<p>There is a lack of accumulated and detailed data on public interest AI projects, including their specific objectives, methods, and frameworks. This is why we created a survey.</p><p>Contribute by filling out the online survey and include your project in this interactive map and directory.</p>",
            url: "/",
            linkTitle: "Add your project",
          },
        }}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "map");

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
  return <Layout props={props}>{page}</Layout>;
};
export default About;
