import React from "react";
import safeHtml from "~/utils/sanitize";

export const SafeHtmlDiv = ({
  html,
  style,
  className,
}: {
  html: string;
  style?: any;
  className?: string;
}) => {
  if (typeof html !== "string") return html;
  return (
    <div
      style={style}
      className={className}
      dangerouslySetInnerHTML={{
        __html: safeHtml(html),
      }}
    ></div>
  );
};
export default SafeHtmlDiv;
