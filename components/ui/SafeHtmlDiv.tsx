import React from "react";
import safeHtml from "~/utils/sanitize";

export const SafeHtmlDiv = ({ html }: { html: string }) => {
  if (typeof html !== "string") return html;
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: safeHtml(html)
      }}
    ></div>
  );
};
export default SafeHtmlDiv;