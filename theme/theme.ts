import Color from "color";
import { breakpointEMs } from "./breakpoints";
export * from "./breakpoints";

const goldenRatioBase = {
  base: 500,
  mobile: 600,
  tablet: 887,
  desktop: 987,
  screen: 1287,
};

const SPACE_LEVELS = 10;

const camelToDashCase = (camel: string) =>
  camel.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase());

export const themeImgSizes = (
  breakpoints: Record<
    string,
    | string
    | {
        landscape: string;
        portrait: string;
      }
  >
) => {
  return {
    landscape: Object.keys(breakpoints)
      .map((b: string) => {
        return `${
          b !== "base" ? `(min-width: ${(breakpointEMs as any)?.[b]}em) ` : ``
        }${
          typeof breakpoints[b] === "string"
            ? breakpoints[b]
            : (breakpoints[b] as any)?.landscape ?? "100vw"
        }`;
      })
      .join(","),
    portrait: Object.keys(breakpoints)
      .map((b: string) => {
        return `${
          b !== "base" ? `(min-width: ${(breakpointEMs as any)?.[b]}em) ` : ``
        }${
          typeof breakpoints[b] === "string"
            ? breakpoints[b]
            : (breakpoints[b] as any)?.portrait ?? "100vw"
        }`;
      })
      .join(","),
  };
};

export const themeSpace = (
  breakpoint: string,
  level: number = 1,
  adjust: number = 0,
) => {
  let b = breakpoint.replace("Landscape", "");

  const size = SPACE_LEVELS - level + 1;

  if (["base", "mobile"].includes(b) && size >= 9) return 6;

  let space = (goldenRatioBase as any)?.[b] ?? 700;
  const gC = 1.61803398875;

  for (let i = 0; i < size; i++) {
    space = space / gC;
  }
  return space - adjust;
};

export const themeSpacePx = (
  breakpoint: string,
  level: number = 1,
  adjust?: string
) => {
  const px = `${Math.round(themeSpace(breakpoint, level))}px`;

  return adjust ? `calc(${px} ${adjust})` : px;
};

export const themeGetSpaceValues = (breakpoint: string) => {
  return Array.from(Array(SPACE_LEVELS).keys())
    .reverse()
    .reduce((carry: any, n: number) => {
      return {
        ...carry,
        [`level${n + 1}`]: themeSpace(breakpoint, n + 1),
      };
    }, {});
};

export const themeGetBreakpointValue = (level: number) => {
  return [
    "base",
    "mobile",
    "mobileLandscape",
    "tablet",
    "tabletLandscape",
    "desktop",
    "screen",
  ].reduce((carry: any, breakpoint: string) => {
    let b = breakpoint.replace("Landscape", "");
    return {
      ...carry,
      [breakpoint]: themeSpace(b, level),
    };
  }, {});
};

export const theme = {
  pageMaxWidth: 1680,
  colorMode: "dark",
  colors: {
    ailabRed: "#BE0042",
    piaiInterface: "#416F83",
    piaiMap: "#AA936E",
    piaiMapHighlight: "#FDD491",
    piaiEnergy: "#1CADAD",
    bg: "#fff",
    bgTool: "#2B2B2B",
    text: "#000",
    textMuted: "#666",
    grey: "#aaa",
    lightGrey: "#f0f0f0",
    mediumGrey: "#777",
    darkGrey: "#333",
    textMutedDark: "#eee",
    textDark: "#fff",
    // link: "#666",
    // linkHover: "#666",
    // hl: "#ff0",
    loadingBar: "#BE0042",
  },
  breakpoints: {
    base: `@media screen and (min-width: 1em)`,
    mobile: `@media screen and (min-width: ${breakpointEMs.mobile}em)`, // ~360px
    mobileLandscape: `@media screen and (min-width: ${breakpointEMs.mobileLandscape}em)`, // ~448px
    tablet: `@media screen and (min-width: ${breakpointEMs.tablet}em)`, // ~720px
    tabletLandscape: `@media screen and (min-width: ${breakpointEMs.tabletLandscape}em)`, // ~992px
    desktop: `@media screen and (min-width: ${breakpointEMs.desktop}em)`, // 1200px
    screen: `@media screen and (min-width: ${breakpointEMs.screen}em)`, // ~1760px
  },
  zIndex: {
    header: 20,
    logo: 30,
    menu: 40,
    overlay: 50,
  },
  spaceValues: {
    // TODO: overwrite the breakpoint values individually, like page Margin values below.
    base: themeGetSpaceValues("base"),
    mobile: themeGetSpaceValues("mobile"),
    mobileLandscape: themeGetSpaceValues("mobile"),
    tablet: themeGetSpaceValues("tablet"),
    tabletLandscape: themeGetSpaceValues("tablet"),
    desktop: themeGetSpaceValues("desktop"),
    screen: themeGetSpaceValues("screen"),
  },
  // TODO: you could also configure
  pageMarginValues: {
    base: 10,
    mobile: 20,
    mobileLandscape: 30,
    tablet: 30,
    tabletLandscape: 40,
    desktop: 100,
    screen: 0,
  },
  gutterWidth: themeGetBreakpointValue(3),

  // These values destroy the tool page layouts 
  // (make the boxes weirly narrow)

  bodyCopyMaxWidth: {
    // base: 450,
    // mobile: 450,
    // mobileLandscape: 450,
    // tablet: 600,
    tabletLandscape: 600,
    desktop: 750,
    screen: 750,
  },

  pageMargin: function (breakpoint: string) {
    return (this as any).pageMarginValues?.[breakpoint] ?? 0;
  },

  pageMarginPx: function (breakpoint: string) {
    return `${((this as any)?.pageMarginValues?.[breakpoint] ?? 0).toFixed(
      3
    )}px`;
  },

  space: function (breakpoint: string, level: number) {
    return (
      (this as any).spaceValues?.[breakpoint]?.[`level${level}`] ?? level * 10
    );
  },

  spacePx: function (breakpoint: string, level: number) {
    return `${(this as any)?.space(breakpoint, level).toFixed(3)}px`;
  },

  gutter: function (breakpoint: string) {
    return (this as any).gutterWidth?.[breakpoint] ?? 0;
  },

  gutterPx: function (breakpoint: string) {
    return `${((this as any)?.gutterWidth?.[breakpoint] ?? 0).toFixed(3)}px`;
  },

  marginFontTop: function (breakpoint: string, level: number, style: string) {
    return `${
      (this as any)?.typography?.[breakpoint.replace("Landscape", "")]?.[style]
        ?.marginTop ?? "0"
    }`;
  },

  marginFontBottom: function (breakpoint: string, style: string) {
    return `${
      (this as any)?.typography?.[breakpoint.replace("Landscape", "")]?.[style]
        ?.marginBottom ?? "1em"
    }`;
  },

  apply: function (
    breakpoints: string[] | string,
    callback: Function,
    addBaseMediaQuery: boolean = false
  ) {
    let keys = Array.isArray(breakpoints) ? breakpoints : [];

    if (breakpoints === "default")
      keys = ["base", "mobile", "tablet", "desktop", "screen"];

    if (breakpoints === "all")
      keys = [
        "base",
        "mobile",
        "mobileLandscape",
        "tablet",
        "tabletLandscape",
        "desktop",
        "screen",
      ];

    return keys
      .reduce((carry: string[], breakpoint: string) => {
        const payload = callback.call(null, breakpoint);
        carry.push(
          // add css media query if needed
          addBaseMediaQuery || breakpoint !== "base"
            ? `${(this as any).breakpoints[breakpoint]} {
              ${payload};
            }`
            : payload
        );
        return carry;
      }, [])
      .join("\n");
  },
  mixins: {
    // mixins can be objects
    // ${({ theme }) => theme.applyMixin("uppercase")} <-- use in styled components
    uppercase: {
      textTransform: "uppercase",
      letterSpacing: "0.02em",
    },
    monospace: {
      fontFamily: "var(--font-family-monospace)",
      color: "var(--color-text-muted)",
      fontSize: "0.8em",
      lineHight: "1.1em",
    },
    styledScrollbar: (vMargin: string) => {
      return `
        scrollbar-width: thin;
        scrollbar-color: var(--color-light-grey) #000;

        &::-webkit-scrollbar {
          width: 11px;
          display: block;
        };
        
        &::-webkit-scrollbar-track {
          border-left: 3px solid #000;
          border-right: 3px solid #000;
          background-color: #000;
          border-radius: 0;
          margin: ${vMargin ?? "0"} 0;
        };
        
        &::-webkit-scrollbar-thumb {
          width: 11px;
          
          border-left: 3px solid #000;
          border-right: 3px solid #000;
          background-color: var(--color-light-grey)
        }`;
    },
    noPrint: () => {
      return `
        @media print {
          display: none;
        }
      `;
    },
    // ... or function callback so you can access the theme or do calculations
    // and even pass arguments to the function ${({ theme }) => theme.applyMixin("maxWidth", 1000)}
    // maxWidth: {
    //   transform: function (...args) {
    //     return `max-width: ${(this as any).pageMaxWidth < args[0] ? 1000: (this as any).pageMaxWidth }`;
    //   },
    // },
    // ... of simple strings or string templates
    // ${({ theme }) => theme.applyMixin("maxWidth", 1000)}
    // style : "color:#ff0;",
  },
  typography: {
    base: {
      body: {
        fontFamily: "var(--font-family-sans-serif)",
        fontWeight: 300,
        fontStyle: "normal",
        fontSize: "20px",
        fontSizeTool: "16px",
        marginBottom: "0.6em",
        lineHeight: "1.3em",
        color: "var(--color-text-muted)",
      },
      h0: {
        fontFamily: "var(--font-family-sans-serif)",
        fontWeight: 400,
        fontSize: "35px",
        lineHeight: "1.2em",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // marginLeft: "-4px",
        color: "var(--color-text)",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h1: {
        fontFamily: "var(--font-family-sans-serif)",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // marginLeft: "-4px",
        color: "var(--color-text)",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h2: {
        fontFamily: "var(--font-family-sans-serif)",
        fontWeight: 400,
        fontSize: "25px",
        fontStyle: "normal",
        // lineHeight: "27px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        color: "var(--color-text)",
      },
      h3: {
        fontFamily: "var(--font-family-sans-serif)",
        fontWeight: 400,
        fontSize: "22px",
        fontStyle: "normal",
        // lineHeight: "25px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        letterSpacing: "0.02em",
        textTransform: "uppercase",
      },
      caption: {
        fontFamily: "var(--font-family-monospace)",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "12px",
      },
      small: {
        fontWeight: 300,
        fontStyle: "normal",
        fontSize: "0.8em",
        lineHeight: "1.1em",
        color: "var(--color-text-muted)",
      },
    },
    mobile: {
      h0: {
        fontSize: "35px",
        // lineHeight: "40px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // marginLeft: "-4px",
      },
      h1: {
        fontSize: "20px",
        // lineHeight: "35px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // marginLeft: "-4px",
      },
      h2: {
        fontSize: "25px",
        // lineHeight: "27px",
        marginTop: "-2px",
        marginBottom: "0.6em",
      },
      h3: {
        fontSize: "22px",
        // lineHeight: "25px",
        marginTop: "-2px",
        marginBottom: "0.6em",
      },

      body: {
        fontSize: "18px",
        // lineHeight: "24px",
      },

      caption: {
        fontSize: "17px",
        // lineHeight: "21px",
      },
    },
    tablet: {
      h0: {
        fontSize: "40px",
        // lineHeight: "45px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // marginLeft: "-4px",
      },
      h1: {
        fontSize: "20px",
        // lineHeight: "40px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // marginLeft: "-4px",
      },
      h2: {
        fontSize: "28px",
        // lineHeight: "32px",
        marginTop: "-2px",
        marginBottom: "0.6em",
      },
      h3: {
        fontSize: "22px",
        // lineHeight: "25px",
        marginTop: "-2px",
        marginBottom: "0.6em",
      },

      body: {
        fontSize: "20px",
        // lineHeight: "24px",
      },

      caption: {
        fontSize: "17px",
        // lineHeight: "21px",
      },
    },
    desktop: {
      h0: {
        fontSize: "50px",
        // lineHeight: "55px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // marginLeft: "-4px",
      },
      h1: {
        fontSize: "20px",
        // lineHeight: "45px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // marginLeft: "-4px",
      },
      h2: {
        fontSize: "30px",
        // lineHeight: "35px",
        marginTop: "-2px",
        marginBottom: "0.6em",
      },
      h3: {
        fontSize: "22px",
        // lineHeight: "30px",
        marginTop: "-2px",
        marginBottom: "0.6em",
      },

      body: {
        fontSize: "20px",
        // lineHeight: "27px",
      },

      caption: {
        fontSize: "17px",
        // lineHeight: "21px",
      },
    },
    screen: {
      h0: {
        fontSize: "60px",
        // lineHeight: "65px",
      },
      h1: {
        fontSize: "22px",
        // lineHeight: "55px",
      },
      h2: {
        fontSize: "35px",
        // lineHeight: "40px",
      },
      h3: {
        fontSize: "22px",
        // lineHeight: "30px",
      },

      body: {
        fontSize: "22px",
        // lineHeight: "27px",
      },

      caption: {
        fontSize: "17px",
        // lineHeight: "21px",
      },
    },
  },

  textStyleBreakpoint: function (
    breakpoint: string,
    style: string,
    withMargins?: boolean
  ) {
    const t = this as any;
    let b = breakpoint.replace("Landscape", "");
    if (b in t.typography && style in t.typography[b]) {
      return Object.keys(t.typography[b][style])
        .reduce((carry: string[], cssStyle: any) => {
          if (
            t.typography[b][style][cssStyle] &&
            (cssStyle.toLowerCase().indexOf("margin") === -1 || withMargins)
          ) {
            carry.push(
              `${camelToDashCase(
                cssStyle
              )}:var(--text-${style}-${camelToDashCase(cssStyle)});`
            );
          }
          return carry;
        }, [])
        .join("");
    }
    return "";
  },

  textStyle: function (style: string, withMargins: boolean) {
    const t = this as any;
    return t.textStyleBreakpoint("base", style, withMargins);
  },

  textStyleVars: function (breakpoint: string) {
    const t = this as any;
    let b = breakpoint.replace("Landscape", "");
    return `${Object.keys(t.typography?.[b])
      .map((style: any) => {
        return `
          ${Object.keys(t.typography?.[b]?.[style])
            .reduce((carry: string[], cssStyle: any) => {
              if (t?.typography?.[b]?.[style]?.[cssStyle]) {
                carry.push(
                  `--text-${style}-${camelToDashCase(cssStyle)}: ${
                    t?.typography?.[b]?.[style]?.[cssStyle]
                  };`
                );
              }
              return carry;
            }, [])
            .join("")}
        `;
      })
      .join("")}`;
  },

  applyMixin: function (name: string, ...args: any[]) {
    const t = this as any;
    if (name in t.mixins) {
      if (typeof t.mixins?.[name] === "function") {
        return t.mixins?.[name].call(null, ...args);
      } else if (typeof t.mixins?.[name] === "object") {
        return `
          ${Object.keys(t.mixins?.[name])
            .reduce((carry: string[], cssStyle: any) => {
              if (t.mixins?.[name]?.[cssStyle]) {
                carry.push(
                  `${camelToDashCase(cssStyle)}: ${
                    t.mixins?.[name]?.[cssStyle]
                  };`
                );
              }
              return carry;
            }, [])
            .join("")}
        `;
      } else if (typeof t.mixins?.[name] === "string") {
        return t.mixins?.[name];
      }
    }
    return "";
  },

  color: function (color: string, alpha?: number) {
    const t = this as any;
    const key = color.replace(/(\-[a-z])/g, (val) =>
      val.toUpperCase().replace("-", "")
    );
    if (!(key in t.colors)) {
      if (
        typeof window !== "undefined" &&
        process.env.NODE_ENV === "development"
      )
        console.error(`${color} is not a defined theme color`);

      return "#f00";
    }
    if (alpha) {
      return Color(t.colors[key]).alpha(alpha);
    }
    return t.colors[key];
  },

  getColorRootVars: function () {
    const t = this as any;
    return Object.keys(t.colors)
      .map((key: any) => {
        return `--color-${camelToDashCase(key)}: ${t?.colors[key]};`;
      })
      .join("");
  },

  getBreakpointRootVars: function (breakpoint: string) {
    const t = this as any;
    let b = breakpoint.replace("Landscape", "");

    return `
      --size-page-margin: ${t.pageMarginPx(b)};
      --size-gutter-width: ${t.gutterPx(b)};
      --size-content-max-width: ${t.bodyCopyMaxWidth?.[b]}px;
      ${t.textStyleVars(b)}
      ${Array.from(Array(SPACE_LEVELS).keys())
        .reverse()
        .reduce((carry: any, n: number) => {
          return `
            ${carry}
            --size-${n + 1}: ${themeSpacePx(breakpoint, n + 1)};
          `;
        }, "")}
    `;
  },
};

export type SCTheme = typeof theme;

if (typeof window !== "undefined" && process.env.NODE_ENV === "development")
  console.log(theme);

export default theme;
