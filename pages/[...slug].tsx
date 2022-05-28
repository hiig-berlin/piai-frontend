import { ReactElement } from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import NextHeadSeo from "next-head-seo";

import LayoutMain from "~/components/layouts/LayoutMain";
import { Header } from "~/components/app/Header";
import {
  restApiGetPostBySlugOrFallbackId,
  restApiESGetSettings,
  restApiESQuery,
} from "~/utils/restApi";
import { FlexibleContentRow } from "~/components/flexibleContent/FlexibleContentRow";
import { appConfig } from "~/config";
import { safeAnchorId } from "~/utils/safeAnchorId";

// TODO: remove if not needed anymore
import { loremIpsum } from "react-lorem-ipsum";

const Page = ({ data }: { data: any }) => {
  const menuItems = data?.acf?.is_microsite
    ? data?.acf?.content?.length > 0
      ? data?.acf?.content.reduce((carry: any, row: any) => {
          if (row?.acf_fc_layout === "subpage") {
            carry.push({
              anchor: `#${safeAnchorId(row?.name)}`,
              title: row?.name,
            });
          }
          return carry;
        }, [])
      : []
    : data?.subMenu?.menu;

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
      <Header />

      <main id="content">
        {data?.acf?.content?.length > 0 ? (
          <FlexibleContentRow
            field="content"
            content={data.acf.content}
            fontStyle={data?.acf?.font_style ?? "default"}
          />
        ) : (
          <div />
        )}
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
    date: new Date().toISOString(),
    modified: new Date().toISOString(),
    acf: {
      content: [
        {
          acf_fc_layout: "column_1",
          column_content_content: [
            {
              acf_fc_layout: "heading",
              heading: slug,
              type: "h1"
            },
            {
              acf_fc_layout: "text",
              text: loremIpsum({ p: 10 })
                .map((text: string) => `<p>${text}</p>`)
                .join(""),
            },
          ],
        },
      ],
    },
  };

  // TODO: remove 404 
  if (!data || slug === "404")
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
      data: data ?? null,
    },
    revalidate: appConfig.revalidateInterval("page", {
      date: data?.date,
      modified: data?.modified,
    }),
  };
};

Page.getLayout = function getLayout(page: ReactElement, props: any) {
  if (props?.data?.acf?.is_microsite) return <LayoutMain>{page}</LayoutMain>;
  return <LayoutMain>{page}</LayoutMain>;
};
export default Page;
