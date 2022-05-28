import React from "react";
import safeHtml from "~/utils/sanitize";

export const SafeHtmlSpan = ({ html }: { html: string }) => {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: safeHtml(html)
      }}
    ></span>
  );
};
export default SafeHtmlSpan;