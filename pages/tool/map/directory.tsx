import { ReactElement } from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import NextHeadSeo from "next-head-seo";

import LayoutTool from "~/components/layouts/LayoutTool";
import {
  restApiGetPostBySlugOrFallbackId,
  restApiESGetSettings,
  restApiESQuery,
} from "~/utils/restApi";
import { appConfig } from "~/config";
import { PiAiTool } from "~/types";
import { LabElement } from "~/components/ui/LabElement";

const Project = ({ tool }: {tool: PiAiTool }) => {
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
  const tool = appConfig.tools
    .filter((tool: PiAiTool) => tool.slug === "map")
    ?.pop();

  if (!tool)
    return {
      props: {
        frontendSettings: await restApiESGetSettings(),
      },
      notFound: true,
      revalidate: 240,
    };

  return {
    props: {
      frontendSettings: await restApiESGetSettings(),
      tool,
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Project.getLayout = function getLayout(page: ReactElement) {
  return <LayoutTool>{page}</LayoutTool>;
};
export default Project;
