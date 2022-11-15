import React from "react";
import safeHtml from "~/utils/sanitize";

export const SafeHtmlDiv = ({ html, style}: { html: string; style?: any }) => {
  if (typeof html !== "string") return html;
  return (
    <div style={style}
      dangerouslySetInnerHTML={{
        __html: safeHtml(html)
      }}
    ></div>
  );
};
export default SafeHtmlDiv;