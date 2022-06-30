import { PiAiTool } from "~/types";

export const tools: PiAiTool[] = [
  {
    slug: "map",
    name: "Public Interest AI Project Map",
    description: "Map and directory of PIAI projects",
    iconShort: "Ma",
    iconLong: "Project Map",
    colorBase: "var(--color-piai-map)",
    colorHighlight: "var(--color-piai-map-hightlight)",
    menu: [
      {
        // menu slugs are always prefixed by "/tool/tool-slug/"
        // entries with no slug and url link to the base
        name: "Project map",
        icon: "map",
      },
      {
        // this will create an internal link to "/tool/map/list"
        slug: "directory",
        name: "Project Directory",
        icon: "list",
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
    description: "Measure your AI’s energy consumption",
    colorBase: "var(--color-piai-energy)",
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
