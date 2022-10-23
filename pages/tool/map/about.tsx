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
          content: `<h2>Background</h2><p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.
            Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <h3>Some subheadline</h3>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum. Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <h3>Some subheadline</h3>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum. Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <h3>Some subheadline</h3>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum. Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>`,
          contentSimple: `<h2>Background</h2><p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <p>Integer eu eros et ligula porttitor rutrum. Phasellus condimentum feugiat sagittis. Suspendisse pretium tellus ac orci luctus, nec maximus risus molestie. Pellentesque blandit lacus ac nulla congue feugiat. Etiam id nisi id arcu ultricies fringilla ut quis ipsum.</p>
              <h3>Some subheadline</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>`,

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
