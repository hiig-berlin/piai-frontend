import { ReactElement } from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import NextHeadSeo from "next-head-seo";

import Layout from "~/components/tools/map/Layout";
import {
  restApiGetPostBySlugOrFallbackId,
  restApiGetSettings,
  
} from "~/utils/restApi";
import { appConfig } from "~/config";
import { PiAiTool } from "~/types";
import { LabElement } from "~/components/ui/LabElement";

const Directory = ({ tool }: { tool: PiAiTool }) => {
  return (
    <>
      {/* TODO: ensure correct meta data is set <NextHeadSeo
        canonical={data?.yoast_head_json?.canonical}
        title={data?.yoast_head_json?.title ?? data?.title}
        description={data?.yoast_head_json?.description}
        og={{
          title: data?.yoast_head_json?.og_title,
          type: data?.yoast_head_json?.og_type,
          siteName: data?.yoast_head_json?.og_site_name,
          image: data?.yoast_head_json?.twitter_image,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      /> */}

      <main id="content">
        <div style={{ margin: "20px" }}>
          <LabElement
            shortHandle={tool.iconShort}
            longText={tool.iconLong}
            color="#f0f"
            hoverColor={tool.colorHighlight}
            size={3}
          />
        </div>
        <p>This is the directory page</p>
      </main>
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
      slug: "directory",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Directory.getLayout = function getLayout(page: ReactElement, props: any) {
  return <Layout props={props}>{page}</Layout>;
};
export default Directory;
