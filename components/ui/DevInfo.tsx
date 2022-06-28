import React from "react";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
const Info = styled.div`
  position: fixed;
  left: 50%;
  bottom: 20px;
  padding: 5px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  z-index: 2000;
  font-size: 10px;
  line-height: 10px;
`;
export const DevInfo = () => {
  const cssContext = useCssVarsContext();

  let breakpoint = "unknown";
  
  if (cssContext.vars.isScreen) {
    breakpoint = "screen";
  } else if (cssContext.vars.isDesktop) {
    breakpoint = "desktop";
  } else if (cssContext.vars.isTabletLandscape) {
    breakpoint = "tablet landscape";
  } else if (cssContext.vars.isTabletPortrait) {
    breakpoint = "tablet portrait";
  } else if (cssContext.vars.isMobileLandscape) {
    breakpoint = "mobile landscape";
  } else if (cssContext.vars.isMobilePortrait) {
    breakpoint = "mobile portrait";
  } else {
    breakpoint = "base";
  }

  return <Info>{breakpoint}</Info>;
};
