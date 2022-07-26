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
    config: {
      lng: 0,
      lat: 51.557503, //0,
      minZoom: 1,
      maxZoom: 15,
      boundingBoxMinZoom: 1,
      boundingBoxMaxZoom: 12,
      clusterRadius: 35,
      // bounds: [[-90, -90], [number, number]],
      zoom: 3,
      colorText: "#000",
      colorCluster: '#ff0',
      colorClusterText: '#000',
      colorDot: '#fff',
      urlGeoJson: '/map/geojson'
    }
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
