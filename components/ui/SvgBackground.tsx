import React from "react";
import SvgMenu from "../svgs/SvgMenuRounded";
import SvgClose from "../svgs/SvgCloseNeg";
import SvgRightArrow from "../svgs/SvgRightArrow";
import SvgPIAI from "../svgs/SvgPIAI";
import SvgLanguage from "../svgs/SvgLanguage";
import SvgArrow from "../svgs/SvgArrow";
import SvgMap from "../svgs/SvgMap";
import Svgglobe from "../svgs/Svgglobe";
import Svgmoney from "../svgs/Svgmoney";
import Svgpeople from "../svgs/Svgpeople";
import Svgrepo from "../svgs/Svgrepo";
import Svglink from "../svgs/Svglink";
import Svglist from "../svgs/Svglist";
import Svgprint from "../svgs/Svgprint";
import SvgSquare1 from "../svgs/SvgSquare1";
import SvgSquare2 from "../svgs/SvgSquare2";
import SvgSquare3 from "../svgs/SvgSquare3";
import SvgSquare4 from "../svgs/SvgSquare4";
import SvgSquare5 from "../svgs/SvgSquare5";

// use https://jakearchibald.github.io/svgomg/
// use https://yoksel.github.io/url-encoder/

export const SvgBackground = ({
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
  let activeSvg = svg ?? SvgMenu;

  switch (type) {
    case "menu":
      activeSvg = SvgMenu;
      break;

    case "close":
      activeSvg = SvgClose;
      break;

    case "rightArrow":
      activeSvg = SvgRightArrow;
      break;

    case "logo":
      activeSvg = SvgPIAI;
      break;

    case "language":
      activeSvg = SvgLanguage;
      break;

    case "map":
      activeSvg = SvgMap;
      break;

    case  "globe": 
      activeSvg = Svgglobe;
      break;

    case  "money": 
      activeSvg = Svgmoney;
      break;

    case  "people": 
      activeSvg = Svgpeople;
      break;

    case  "repo": 
      activeSvg = Svgrepo;
      break;

    case  "link": 
      activeSvg = Svglink;
      break;

    case  "list": 
      activeSvg = Svglist;
      break;

    case  "print": 
      activeSvg = Svgprint;
      break;

    case "square1":
      activeSvg = SvgSquare1;
      break;

    case "square2":
      activeSvg = SvgSquare2;
      break;

    case "square3":
      activeSvg = SvgSquare3;
      break;

    case "square4":
      activeSvg = SvgSquare4;
      break;

    case "square5":
      activeSvg = SvgSquare5;
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
