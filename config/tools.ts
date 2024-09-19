import { PiAiTool } from "~/types";

export const tools: PiAiTool[] = [
  {
    slug: "map",
    name: "Public Interest AI Project Map",
    description: "Map and directory of PIAI projects",
    iconShort: "Ma",
    iconLong: "Project Map",
    colorBase: "var(--color-piai-map)",
    colorHighlight: "var(--color-piai-map-highlight)",
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
        name: "Project directory",
        icon: "list",
      },
      {
        slug: "survey",
        name: "Submit Project",
      },
      {
        slug: "about",
        name: "About",
      },
    ],
    config: {
      minYear: 1996,
      lng: 0,
      lat: 51.557503, //0,
      minZoom: 1,
      maxZoom: 17,
      geoJsonMaxZoom: 15,
      boundingBoxMinZoom: 0,
      boundingBoxMaxZoom: 12,
      clusterRadius: 35,
      // bounds: [[-90, -90], [number, number]],
      zoom: 3,
      colorText: "#000",
      colorCluster: "#ff0",
      colorClusterText: "#000",
      colorDot: "#fff",
      urlGeoJson: "/map/geojson",
    },
  },
  {
    slug: "stakeholder",
    name: "Index of stakeholders around the discussion of AI",
    description: "Index of organisations involved in the discourse",
    colorBase: "var(--color-piai-stakeholder)",
    colorHighlight: "var(--color-piai-stakeholder)",
    iconShort: "St",
    iconLong: "Stakeholder Index",
    menu: [
      {
        name: "Overview",
      },
      {
        slug: "about",
        name: "About the tool",
      },
    ],
  },
  // {
  //   slug: "energy",
  //   name: "GPU’s engery consumption log",
  //   description: "Measure and log your GPU’s engery consumption",
  //   colorBase: "var(--color-piai-energy)",
  //   colorHighlight: "var(--color-piai-energy)",
  //   iconShort: "En",
  //   iconLong: "Energy Log",
  //   menu: [
  //     {
  //       name: "Overview",
  //     },
  //     {
  //       slug: "about",
  //       name: "About the tool",
  //     },
  //   ],
  // },
  {
    slug: "claimspotting",
    name: "Claimspotting",
    description:
      "Monitor of potential misinformation on Telegram",
    colorBase: "var(--color-piai-claim)",
    colorHighlight: "var(--color-piai-claim)",
    iconShort: "Cl",
    iconLong: "Claim-spotting",
    menu: [
      {
        name: "Claim list",
      },
      {
        slug: "search",
        name: "Claim search",
      },
      {
        slug: "trends",
        name: "Trends",
      },
      {
        slug: "about",
        name: "About the tool",
      },
    ],
    submenu: [
      {
        slug: "list",
        name: "Claim list",
        icon: "list",
      },
      {
        slug: "search",
        name: "Claim search",
        icon: "search",
      },
      {
        slug: "trends",
        name: "Trends",
        icon: "trend",
      },
      {
        slug: "about",
        name: "About",
        icon: "info",
      },
    ],
  },
  {
    slug: "simba",
    name: "Simba – Text assistant",
    description: "AI-Powered Text Simplification",
    colorBase: "var(--color-piai-simba)",
    colorHighlight: "var(--color-piai-simba)",
    iconShort: "Si",
    iconLong: "Simba Text Assistant",
    menu: [
      {
        name: "Simplifier",
      },
      {
        slug: "extension",
        name: "Extension",
      },
      {
        slug: "about",
        name: "About the tool",
      },
    ],
    submenu: [
      {
        slug: "simplifier",
        name: "Simplifier",
        icon: "simplifier",
      },
      {
        slug: "extension",
        name: "Extension",
        icon: "plugin",
      },
      {
        slug: "about",
        name: "About",
        icon: "info",
      },
    ],
  },
];
