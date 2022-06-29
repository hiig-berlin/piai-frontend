import { PiApiTool } from "~/types";

export const tools: PiApiTool[] = [
  {
    slug: "map",
    name: "Public Interest AI Project Map",
    description: "Map and directory of PIAI projects",
    iconShort: "Ma",
    iconLong: "Project Map",
    colorBase: "#ccc",
    colorHighlight: "#ff0",
    menu: [
      {
        // entries with no slug and url link to the base
        name: "Map",
      },
      {
        slug: "list",
        name: "Project Directory",
      },
      {
        url: "https://abc.com", // TODO: fix URL
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
    colorBase: "#0f0",
    colorHighlight: "#0f0",
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
