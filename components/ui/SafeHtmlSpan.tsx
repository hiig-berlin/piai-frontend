import React from "react";
import safeHtml from "~/utils/sanitize";

export const SafeHtmlSpan = ({ html }: { html: string }) => {
  if (typeof html !== "string") return html;
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: safeHtml(html)
      }}
    ></span>
  );
};
export default SafeHtmlSpan;