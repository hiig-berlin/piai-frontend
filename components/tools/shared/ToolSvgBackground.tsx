import React from "react";
import SvgMap from "~/components/svgs/SvgMap";
import Svgglobe from "~/components/svgs/Svgglobe";
import Svgmoney from "~/components/svgs/Svgmoney";
import Svgpeople from "~/components/svgs/Svgpeople";
import Svgrepo from "~/components/svgs/Svgrepo";
import Svglink from "~/components/svgs/Svglink";
import Svglist from "~/components/svgs/Svglist";
import Svgprint from "~/components/svgs/Svgprint";
import Svgsearch from "~/components/svgs/Svgsearch";
import Svgfilter from "~/components/svgs/Svgfilter";
import Svgshare from "~/components/svgs/Svgshare";
import Svgmarker from "~/components/svgs/Svgmarker";
import Svgcompany from "~/components/svgs/Svgcompany";
import SvglanguageNeg from "~/components/svgs/SvglanguageNeg";
import SvgcheckAll from "~/components/svgs/Svgcheckall";
import Svgback from "~/components/svgs/Svgback";
import Svgcalendar from "~/components/svgs/Svgcalendar";
import Svgcode from "~/components/svgs/Svgcode";
import Svgtransgender from "~/components/svgs/Svgtransgender";
import SvgarrowsExpand from "~/components/svgs/SvgarrowsExpand";
import SvgarrowsCollapse from "~/components/svgs/SvgarrowsCollapse";
import SvgClose from "~/components/svgs/SvgCloseNeg";
import SvgCPU from "~/components/svgs/SvgCPU";
import SvgGPU from "~/components/svgs/SvgGPU";
import Svgfan from "~/components/svgs/Svgfan";
import Svgjcow from "~/components/svgs/Svgjcow";
import Svghardware from "~/components/svgs/Svghardware";
import Svgdownload from "~/components/svgs/Svgdownload";
import Svginfo from "~/components/svgs/Svginfo";
import SvgPlus from "~/components/svgs/SvgPlus";
import SvgMinus from "~/components/svgs/SvgMinus";
import Svgkettle from "~/components/svgs/Svgkettle";
import Svgstreaming from "~/components/svgs/Svgstreaming";
import Svgopnv from "~/components/svgs/Svgopnv";
import Svgcar from "~/components/svgs/Svgcar";
import SvgboxSmall from "~/components/svgs/SvgboxSmall";
import SvgboxLarge from "~/components/svgs/SvgboxLarge";
import Svgscreen from "~/components/svgs/Svgscreen";
import Svgscribble from "~/components/svgs/Svgscribble";

// use https://jakearchibald.github.io/svgomg/
// use https://yoksel.github.io/url-encoder/

export const ToolSvgBackground = ({
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

    case "marker":
      activeSvg = Svgmarker;
      break;

    case "company":
      activeSvg = Svgcompany;
      break;
    case "checkAll":
      activeSvg = SvgcheckAll;
      break;

    case "back":
      activeSvg = Svgback;
      break;

    case "calendar":
      activeSvg = Svgcalendar;
      break;

    case "code":
      activeSvg = Svgcode;
      break;

    case "genders":
      activeSvg = Svgtransgender;
      break;

    case "expand":
      activeSvg = SvgarrowsExpand;
      break;

    case "collapse":
      activeSvg = SvgarrowsCollapse;
      break;

    case "close":
      activeSvg = SvgClose;
      break;

    case "CPU": 
      activeSvg = SvgCPU;
      break;

    case "GPU": 
      activeSvg = SvgGPU;
      break;

    case "fan": 
      activeSvg = Svgfan;
      break;

    case "cow": 
      activeSvg = Svgjcow;
      break;

    case "hardware": 
      activeSvg = Svghardware;
      break;

    case "download": 
      activeSvg = Svgdownload;
      break;

    case "info": 
      activeSvg = Svginfo;
      break;

    case "plus"  :
      activeSvg = SvgPlus;
      break;

    case "minus" :
      activeSvg = SvgMinus;
      break;

    case "kettle":
      activeSvg = Svgkettle;
      break;

    case "streaming":
      activeSvg = Svgstreaming;
      break;

    case "opnv":
      activeSvg = Svgopnv;
      break;

    case "car":
      activeSvg = Svgcar;
      break;

    case "boxSmall":
      activeSvg = SvgboxSmall;
      break;

    case "boxLarge":
      activeSvg = SvgboxLarge;
      break;

    case "screen":
      activeSvg = Svgscreen;
      break;

    case "scribble":
      activeSvg = Svgscribble;
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
