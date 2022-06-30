import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import Layout from "~/components/tools/map/Layout";
import { restApiESGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import { LabElement } from "~/components/ui/LabElement";

const Index = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  return (
    <>
      {/*
        TODO: Set correct values ... 
        <NextHeadSeo
          canonical={currentPage?.yoast_head_json?.canonical}
          title={currentPage?.yoast_head_json?.title ?? currentPage?.title}
          description={currentPage?.yoast_head_json?.description}
          og={{
            title: currentPage?.yoast_head_json?.og_title,
            type: currentPage?.yoast_head_json?.og_type,
            siteName: currentPage?.yoast_head_json?.og_site_name,
            image: currentPage?.yoast_head_json?.twitter_image,
          }}
          twitter={{
            card: "summary_large_image",
          }}
      />*/}
      <main id="content">
        <div
          style={{
            paddingLeft: "100px",
          }}
        >
          <div style={{ margin: "20px" }}>
            <LabElement
              shortHandle={tool.iconShort}
              longText={tool.iconLong}
              color="#f0f"
              hoverColor={tool.colorHighlight}
              size={3}
            />
          </div>

          <h1>This is the map landing page</h1>
          <p>
            The map is placed in the background. ... but only loaded when
            necessary.
          </p>
          <p>
            All other content overlays the map. It can have a fully blocked
            color or be transparent. This is (as many other things controlled
            via a Layout (~/components/tools/map/Layout.tsx)), which receives
            all props created in getStatic props and currently uses the
            &quot;view&quot; prop to distinguish between transparent and
            intransparent mode.
          </p>

          <p>
            Please note that if transparent pointer-events are set to none. So
            people can actuall &quot;reach&quot; through to the map. I&#39;ve
            ensured that for all children of the type &lt;div&gt; are reanbled
            but if you use other container types you might have to reenable them
            by using pointer-events: all; in the CSS.
          </p>

          <p>
            In Layout you can also add further global styles that are only valid
            for the tool. Your could use this to overwrite CSS vars or set e.g.
            a global background color
          </p>

          <p>
            The sidebar is a generic element. It can have custom content for
            each tool.
          </p>
        </div>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "map");
  
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
      view: "map",
      slug: "index",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Index.getLayout = function getLayout(page: ReactElement, props: any) {
  return <Layout props={props}>{page}</Layout>;
};
export default Index;
