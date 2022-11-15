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
            "<p>This interactive global map of Public Interest AI projects aims to help foster research on Public Interest AI projects, demonstrate their self-understanding, and provide publicly accessible data about them to the broader public. The project directory displays information about every project submitted. The answers given in the survey will also be published as a research data set on a public research repository.</p>",
          content: `<h2>About the Public Interest AI data set</h2>
            <p>In recent years, many projects have emerged across the globe that are defined by their initiators as “AI for the social good”, “AI for the common good” or “AI in the public interest”. The goal of this project is to provide answers to the question of what these terms actually mean. A public data set – result of an ongoing survey – is the basis of the interactive Global Map of Public Interest AI Projects.</p>
            <h2>Who is behind this project?</h2>
            <p> The project is being conducted by the <a href="https://www.hiig.de/en/project/public-interest-ai/" target="_blank" rel="roreferrer  nofollow">Public Interest AI Research Group</a> at the Alexander von Humboldt Institute for Internet and Society (HIIG).</p>
            <h2>What is it about?</h2>
            <p>As a research group focussed on Public Interest AI, we provide a working definition of what it means for an AI-system to be designed and deployed in the public interest. Secondly, our research group develops AI projects that follow this goal. Thirdly, we want to provide evidence based insights on how the idea of Public Interest AI is being realised in practice around the world, and how understanding of the concept differs across the field. There is a lack of accumulated and detailed data on Public Interest AI projects, including their specific objectives, methods, and frameworks. That is the reason for this survey.</p>
            <h2>How will the data set be used?</h2>
            <p>The information gathered from the survey is transmitted to and displayed on the interactive Public Interest AI Project Map. Additionally, the survey results will help foster research on Public Interest AI projects, demonstrate their self-understanding, and provide publicly accessible data about them to the broader public.</p>`,
          contentSimple: `<p>This is a map which shows public interest AI projects. We hope to help people to research on this topic further. Also, we want to show how many good AI projects already exist.</p>
          <p>We created the survey because there is no information on public interest AI projects yet. We wanted to find out how they work and which problems they have.</p>
          <p>If you are part of a project, feel free to fill out our survey.</p>
          <h2>About the Public Interest AI data set</h2>
          <p>The goal of this survey is to give an answer to the question of what people understand as public interest.</p>
          <h2>Who is behind this project?</h2>
          <p>The project is made by the <a href="https://www.hiig.de/en/project/public-interest-ai/" rel="nofollow noreferrer" target="_blank">Public Interest AI Research Group</a> at the Alexander von Humboldt Institute for Internet and Society (HIIG).</p>
          <h2>What is it about?</h2>
          <p>The research group focuses on public interest AI. It has three goals: 1. Answer the question “What is public interest AI?” 2. Make AI that is in the public interest. 3. Find out how public interest AI is made around the world.</p>
          <h2>How will the data set be used?</h2>
          <p>The data from the survey is shown on the map that you can see on the website. We hope that the survey results will be used to research public interest AI projects.
          </p>`,

          cta: {
            title: "Contribute",
            text: "<p>There is a lack of accumulated and detailed data on Public Interest AI projects, including their specific objectives, methods, and frameworks. This is why we created a survey.</p><p>Contribute by filling out the online survey and include your project in this interactive map and directory.</p>",
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
