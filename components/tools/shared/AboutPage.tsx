import Link from "next/link";
import React from "react";
import { PiAiTool } from "~/types";
import { LabElement } from "../../ui/LabElement";
import SafeHtmlDiv from "../../ui/SafeHtmlDiv";
import SafeHtmlSpan from "../../ui/SafeHtmlSpan";

export type ToolAboutPageCTA = {
  title: string;
  url: string;
  linkTitle: string;
  text: string;
};

export const AboutPage = ({
  tool,
  intro,
  content,
  cta,
}: {
  tool: PiAiTool;
  intro: string;
  content: string;
  cta?: ToolAboutPageCTA;
}) => {
  // TODO: cta urls should be able to distinguish between internal and extrenal links
  // also add the ability to add a target

  // VVU: sorry for the #f0f
  return (
    <div>
      <div style={{ margin: "20px" }}>
        <div style={{ margin: "20px" }}>
          <LabElement
            shortHandle={tool.iconShort}
            longText={tool.iconLong}
            color="#f0f"
            hoverColor={tool.colorHighlight}
            size={3}
          />
        </div>

        <SafeHtmlDiv html={intro} />
      </div>
      <div style={{ margin: "20px" }}>
        <SafeHtmlDiv html={content} />
      </div>
      {cta?.title && (
        <div style={{ margin: "20px" }}>
          <h3>
            <SafeHtmlSpan html={cta.title} />
          </h3>
          <SafeHtmlDiv html={cta.text} />

          {cta?.url && cta?.linkTitle && (
            <Link href={cta?.url} passHref>
              <a>{cta?.linkTitle}</a>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
