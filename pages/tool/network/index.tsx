import { useState } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import ToolHeader from "~/components/tools/shared/Header";
import { memberList } from "~/assets/data/tools/network/memberList";
import { textBits } from "~/assets/data/tools/network/textbits";
import { NetworkWrapper } from "~/components/tools/network/Styled";
import InfoGrid from "~/components/tools/network/InfoGrid";
import MemberFilter from "~/components/tools/network/MemberFilter";
import MemberGrid from "~/components/tools/network/MemberGrid";
import {Popup} from "~/components/tools/network/Popup";

const Index = ({ frontendSettings, tool }: { frontendSettings: any; tool: PiAiTool }) => {
  const [currentTag, setCurrentTag] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<number>();

  const filteredList = currentTag
    ? memberList.filter((e) => e.tags.includes(currentTag))
    : memberList;

  const allTags = Array.from(new Set(memberList.flatMap((s) => s.tags)));
  const strings = textBits.en.index;
  const currentTool = appConfig.tools?.find((t) => t.slug === "network");

  return (
    <NetworkWrapper>
      <NextHeadSeo
        title={`${currentTool?.name ? `${currentTool.name} - ` : ""}${appConfig.appTitle}`}
        description={currentTool?.description}
        og={{ title: `${currentTool?.name} - ${appConfig.appTitle}`, siteName: appConfig.appTitle }}
        twitter={{ card: "summary_large_image" }}
      />

      <ToolHeader
        tool={tool}
        title="The Public Interest AI Network"
        description="An international hub to promote research and exchange on AI in the public interest and for the common good."
        links={[{ type: "info", url: "/tool/network/about", ariaLabel: "About the network", label: "About" }]}
      />

      <InfoGrid strings={strings} />
      <MemberFilter tags={allTags} currentTag={currentTag} onTagClick={setCurrentTag} toolSlug="network" />
      <MemberGrid
        list={filteredList}
        currentTag={currentTag}
        onTagClick={setCurrentTag}
        selectedEntry={selectedEntry}
        setSelectedEntry={setSelectedEntry}
      />
      <Popup />
    </NetworkWrapper>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const tool = appConfig.tools.find((tool) => tool.slug === "network");

  if (!tool) return { props: { frontendSettings: await restApiGetSettings() }, notFound: true };

  return {
    props: {
      frontendSettings: await restApiGetSettings(),
      tool,
      view: "page",
      slug: "index",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Index.getLayout = (page: React.ReactElement, props: any) => <LayoutTool props={props}>{page}</LayoutTool>;
export default Index;
