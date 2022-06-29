import { ReactElement } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
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
        <div style={{ margin: "20px" }}>
          <LabElement
            shortHandle={tool.iconShort}
            longText={tool.iconLong}
            color="#f0f"
            hoverColor={tool.colorHighlight}
            size={3}
          />
        </div>

        <h1>This is the energy landing page</h1>
        <p>
          Vivamus condimentum vel nunc et congue. Ut laoreet imperdiet nisi ac
          finibus. Suspendisse molestie risus a justo sagittis efficitur.
          Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla
          sed gravida nunc. Sed ut lacus elementum, aliquam justo sit amet,
          tempus orci.
        </p>
      </main>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tool = appConfig.tools
    .filter((tool: PiAiTool) => tool.slug === "energy")
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

Index.getLayout = function getLayout(page: ReactElement) {
  return <LayoutTool>{page}</LayoutTool>;
};
export default Index;
