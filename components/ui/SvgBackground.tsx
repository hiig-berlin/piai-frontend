import React from "react";
import SvgMenu from "../svgs/SvgMenu";
import SvgClose from "../svgs/SvgClose";
import SvgRightArrow from "../svgs/SvgRightArrow";
import SvgPIAI from "../svgs/SvgPIAI";
import SvgArrow from "../svgs/SvgArrow";

// use https://jakearchibald.github.io/svgomg/
// use https://yoksel.github.io/url-encoder/

export const SvgBackground = ({
  type,
  width,
  height,
  className = "svg",
  size = "contain",
  position = "center center",
  style,
  svg,
}: {
  type?: string;
  width: string;
  height: string;
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
    
    case "arrow":
        activeSvg = SvgArrow;
        break;
 /*
    TODO: more Svgs
    case "play":
      activeSvg = SvgPlay;
      break;

    case "plus":
      activeSvg = SvgPlus;
      break;
      
    

    case "triangle":
      activeSvg = SvgTriangleDown;
      break;

    case "download":
      activeSvg = SvgDownload;
      break;

    case "facebook":
      activeSvg = SvgFacebook;
      break;

    case "instagram":
      activeSvg = SvgInstagram;
      break;

    case "twitter":
      activeSvg = SvgTwitter;
      break;

    case "youtube":
      activeSvg = SvgYouTube;
      break;

    */
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
