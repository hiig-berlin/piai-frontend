import React from "react";
import styled from "styled-components";
import { useCssVarsStateStore } from "~/components/state/CssVarsState";
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
  const cssContext = useCssVarsStateStore();

  let breakpoint = "unknown";
  
  if (cssContext.isScreen) {
    breakpoint = "screen";
  } else if (cssContext.isDesktop) {
    breakpoint = "desktop";
  } else if (cssContext.isTabletLandscape) {
    breakpoint = "tablet landscape";
  } else if (cssContext.isTabletPortrait) {
    breakpoint = "tablet portrait";
  } else if (cssContext.isMobileLandscape) {
    breakpoint = "mobile landscape";
  } else if (cssContext.isMobilePortrait) {
    breakpoint = "mobile portrait";
  } else {
    breakpoint = "base";
  }

  return <Info>{breakpoint}</Info>;
};
