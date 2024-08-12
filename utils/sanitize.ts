import xss, { getDefaultWhiteList } from "xss";

export const safeHtml = (html: string) =>
  xss(html, {
    whiteList: {
      ...getDefaultWhiteList(),
      iframe: [
        "allow",
        "allowfullscreen",
        "height",
        "loading",
        "referrerpolicy",
        "src",
        "width",
      ],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
    allowCommentTag: false,
  });
export default safeHtml;
