import { PiAiTool } from "~/types";

export const tools: PiAiTool[] = [
  {
    slug: "map",
    name: "Public Interest AI Project Map",
    description: "Map and directory of PIAI projects",
    iconShort: "Ma",
    iconLong: "Project Map",
    colorBase: "#fff",
    colorHighlight: "var(--color-piai-map)",
    menu: [
      {
        // menu slugs are always prefixed by "/tool/tool-slug/"
        // entries with no slug and url link to the base
        name: "Map",
      },
      {
        // this will create an internal link to "/tool/map/list"
        slug: "directory",
        name: "Project Directory",
      },
      {
        url: "https://abc.com", // TODO: fix URL
        target: "_blank",
        name: "Submit Project",
      },
      {
        slug: "about",
        name: "About",
      },
    ],
  },
  {
    slug: "energy",
    name: "Energy usage plugin",
    description:
      "A smart browser extension monitoring your internet enegergy usage",
    colorBase: "#fff",
    colorHighlight: "var(--color-piai-energy)",
    iconShort: "En",
    iconLong: "Energy Usage",
    menu: [
      {
        name: "Presentation",
      },
      {
        slug: "about",
        name: "About",
      },
    ],
  },
];
