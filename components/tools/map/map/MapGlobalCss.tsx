import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    
  .spider-leg-container {
    width: 1px;
    height: 1px;
    overflow: display;
    will-change: transform;

    opacity: 0;
    transition: opacity 0.125s;
    &.fadeIn {
      opacity: 1;

      &.fadeOut {
        opacity: 0 !important;
      }
    }
  }

  .spider-leg-container:hover {
    cursor: pointer;
  }

  // .spider-leg-container .spider-leg-pin {
  //   position: relative;
  //   z-index: 1;
  // }

  .spider-leg-container .spider-leg-pin.default-spider-pin {
    position: relative;
    width: 32px;
    height: 32px;
    border-radius: 32px;
    cursor: pointer;
    transform: translateY(-16px) translateX(-16px);
  }

  .mapboxgl-ctrl.mapboxgl-ctrl-attrib {
    background-color: transparent;
    color: #999;

    a {
      color: #999 !important;
    }
  }

  .maplibregl-popup {
    pointer-events: none;
    max-width: 250px;
    .maplibregl-popup-tip {
      display: none;
    }

    .maplibregl-popup-content {
      background: transparent;
      overflow: hidden;
      padding: 0;
      margin: 0;
      border-radius: 0;
    }
  }

  .popup {
    padding: 6px 8px;
    background-color: #fff;
    color: #000;
    font-family: Berlin Type, Helvetica, Arial, sans-serif;
    font-size: 13px;
    line-height: 17px;
    border-radius: 0;
    opacity: 0;
    transition: opacity 0.25s;

    &.fade-in {
      opacity: 1;
    }

    &.faded-in {
      opacity: 1;
      &.fade-out {
        opacity: 0 !important;
      }
    }
  }

  // .spider-leg-container .spider-leg-line {
  //   position: absolute;
  //   bottom: 0;
  //   left: 0;
  //   width: 1px;
  //   background: transparent; // linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 25%, #660D36 33%, #660D36);
  //   transform-origin: bottom;
  //   z-index: 0;
  //   height: 0;
  // }

  // .spider-leg-container:hover .spider-leg-line { background: linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 28%, #fff 33%, #fff); }

`;

export const MapGlobalCss = () => {
  return <GlobalStyle />;
};
