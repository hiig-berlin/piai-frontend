// TODO: VVU-CLEANUP

import xss from "xss";

export const safeAnchorId = (anchor: string) => {
  const clean = xss(`${anchor}`.toLowerCase().trim(), {
    whiteList: {},
    stripIgnoreTag: true,
    stripIgnoreTagBody: ["script"],
    allowCommentTag: false,
  });

  return clean.replace(/ /g, '-').replace(/[^0-9a-z\-]+/g, "");
}