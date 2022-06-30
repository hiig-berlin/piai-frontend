import { ReactElement } from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import NextHeadSeo from "next-head-seo";

import Layout from "~/components/tools/map/Layout";
import {
  restApiGetPostBySlugOrFallbackId,
  restApiESGetSettings,
  restApiESQuery,
} from "~/utils/restApi";
import { appConfig } from "~/config";
import { PiAiTool } from "~/types";
import { LabElement } from "~/components/ui/LabElement";

const Project = ({ data, tool }: { data: any; tool: PiAiTool }) => {
  return (
    <>
      <NextHeadSeo
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
      />

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

        <h1>{data?.title}</h1>
        <p>This is the project detail page</p>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Fill in paths that should be prerendered
  // const pages = await restApiESQuery({
  //   type: "page",
  //   perPage: 50,
  //   orderby: "post_date",
  //   order: "desc",
  // });

  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const token = (context?.previewData as any)?.token;

  const slug = context?.params?.slug
    ? Array.isArray(context?.params?.slug) && context?.params?.slug?.length
      ? (context?.params?.slug?.pop() as string)
      : (context?.params?.slug as string)
    : 1;

  // TODO: enable
  // const data = await restApiGetPostBySlugOrFallbackId("page", slug, token);

  const data = {
    title: slug,
    // assume that more data will be loaded from
  };

  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "map");

  if (!data || !tool)
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
      data,
      view: "page",
      slug,
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Project.getLayout = function getLayout(page: ReactElement, props: any) {
  return <Layout props={props}>{page}</Layout>;
};
export default Project;
