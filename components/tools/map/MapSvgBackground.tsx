import React from "react";
import SvgMap from "../../svgs/SvgMap";
import Svgglobe from "../../svgs/Svgglobe";
import Svgmoney from "../../svgs/Svgmoney";
import Svgpeople from "../../svgs/Svgpeople";
import Svgrepo from "../../svgs/Svgrepo";
import Svglink from "../../svgs/Svglink";
import Svglist from "../../svgs/Svglist";
import Svgprint from "../../svgs/Svgprint";
import Svgsearch from "../../svgs/Svgsearch";
import Svgfilter from "../../svgs/Svgfilter";
import Svgshare from "~/components/svgs/Svgshare";
import SvglanguageNeg from "~/components/svgs/SvglanguageNeg";

// use https://jakearchibald.github.io/svgomg/
// use https://yoksel.github.io/url-encoder/

export const MapSvgBackground = ({
  type,
  width = "100%",
  height = "100%",
  className = "svg",
  size = "contain",
  position = "center center",
  style,
  svg,
}: {
  type?: string;
  width?: string;
  height?: string;
  size?: string;
  className?: string;
  position?: string;
  style?: object | undefined;
  svg?: string;
}) => {
  let activeSvg = svg ?? SvgMap;

  switch (type) {
    case "map":
      activeSvg = SvgMap;
      break;

    case "globe":
      activeSvg = Svgglobe;
      break;

    case "money":
      activeSvg = Svgmoney;
      break;

    case "search":
      activeSvg = Svgsearch;
      break;

    case "filter":
      activeSvg = Svgfilter;
      break;

    case "people":
      activeSvg = Svgpeople;
      break;

    case "repo":
      activeSvg = Svgrepo;
      break;

    case "link":
      activeSvg = Svglink;
      break;

    case "list":
      activeSvg = Svglist;
      break;

    case "print":
      activeSvg = Svgprint;
      break;

    case "share":
      activeSvg = Svgshare;
      break;

    case "language":
      activeSvg = SvglanguageNeg;
      break;
  }
  return (
    <span
      className={className}
      style={{
        ...style,
        display: "block",
        width,
        height,
        backgroundPosition: position,
        backgroundRepeat: "no-repeat",
        backgroundSize: size,
        backgroundImage: `url('data:image/svg+xml,${activeSvg}')`,
      }}
    ></span>
  );
};
