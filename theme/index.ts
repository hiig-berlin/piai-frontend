import { breakpointEMs } from "./breakpoints";
export * from "./breakpoints";

const goldenRatioBase = {
  base: 500,
  mobile: 600,
  tablet: 887,
  desktop: 987,
  screen: 1287,
};

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
  adjust: number = 0
) => {
  let b = breakpoint.replace("Landscape", "");

  if (["base", "mobile"].includes(b) && level >= 9) return 9;

  let space = (goldenRatioBase as any)?.[b] ?? 700;
  const gC = 1.61803398875;

  for (let i = 0; i < level; i++) {
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
  return Array.from(Array(10).keys())
    .reverse()
    .reduce((carry: any, n: number) => {
      return {
        ...carry,
        [`level${n + 1}`]: themeSpace(breakpoint, 10 - n),
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
      [breakpoint]: themeSpace(b, 10 - level),
    };
  }, {});
};

export const theme = {
  pageMaxWidth: 1680,
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
    desktop: 50,
    screen: 90,
  },
  gutterWidth: themeGetBreakpointValue(3),

  bodyCopyMaxWidth: {
    base: 450,
    mobile: 450,
    mobileLandscape: 450,
    tablet: 600,
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
  typography: {
    base: {
      h0: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        fontSize: "35px",
        lineHeight: "40px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h1: {
        fontWeight: 400,
        fontSize: "30px",
        lineHeight: "35px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h2: {
        fontWeight: 400,
        fontSize: "25px",
        lineHeight: "27px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h3: {
        fontWeight: 400,
        fontSize: "22px",
        lineHeight: "25px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      body: {
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: "24px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      caption: {
        fontWeight: 400,
        fontSize: "17px",
        lineHeight: "21px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
    },
    mobile: {
      h0: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        fontSize: "35px",
        lineHeight: "40px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h1: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        fontSize: "30px",
        lineHeight: "35px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h2: {
        fontWeight: 400,
        fontSize: "25px",
        lineHeight: "27px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h3: {
        fontWeight: 400,
        fontSize: "22px",
        lineHeight: "25px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      body: {
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: "24px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      caption: {
        fontWeight: 400,
        fontSize: "17px",
        lineHeight: "21px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
    },
    tablet: {
      h0: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        fontSize: "40px",
        lineHeight: "45px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h1: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        fontSize: "35px",
        lineHeight: "40px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h2: {
        fontWeight: 400,
        fontSize: "28px",
        lineHeight: "32px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h3: {
        fontWeight: 400,
        fontSize: "22px",
        lineHeight: "25px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      body: {
        fontWeight: 400,
        fontSize: "20px",
        lineHeight: "24px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      caption: {
        fontWeight: 400,
        fontSize: "17px",
        lineHeight: "21px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
    },
    desktop: {
      h0: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        fontSize: "50px",
        lineHeight: "55px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h1: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        fontSize: "40px",
        lineHeight: "45px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h2: {
        fontWeight: 400,
        fontSize: "30px",
        lineHeight: "35px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h3: {
        fontWeight: 400,
        fontSize: "25px",
        lineHeight: "30px",
        marginTop: "-2px",
        marginBottom: "0.6em",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      body: {
        fontWeight: 400,
        fontSize: "22px",
        lineHeight: "27px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      caption: {
        fontWeight: 400,
        fontSize: "17px",
        lineHeight: "21px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
    },
    screen: {
      h0: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        fontSize: "60px",
        lineHeight: "65px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h1: {
        fontFamily: "Times New Roman, serif",
        fontWeight: 400,
        fontSize: "50px",
        lineHeight: "55px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h2: {
        fontWeight: 400,
        fontSize: "35px",
        lineHeight: "40px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
      h3: {
        fontWeight: 400,
        fontSize: "25px",
        lineHeight: "30px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      body: {
        fontWeight: 400,
        fontSize: "22px",
        lineHeight: "27px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },

      caption: {
        fontWeight: 400,
        fontSize: "17px",
        lineHeight: "21px",
        // letterSpacing: "1px",
        // textTransform: "uppercase",
      },
    },
  },

  textStyle: function (breakpoint: string, style: string, weight: number) {
    let b = breakpoint.replace("Landscape", "");
    return `
      font-weight: ${
        weight ?? (this as any)?.typography?.[b]?.[style]?.fontWeight ?? 400
      };
      font-size: ${(this as any)?.typography?.[b]?.[style]?.fontSize ?? "14px"};
      line-height: ${
        (this as any)?.typography?.[b]?.[style]?.lineHeight ?? "18px"
      };
      ${
        (this as any)?.typography?.[b]?.[style]?.fontFamily
          ? `font-family: ${
              (this as any)?.typography?.[b]?.[style]?.fontFamily
            };`
          : ""
      }
      ${
        (this as any)?.typography?.[b]?.[style]?.letterSpacing
          ? `letter-spacing: ${
              (this as any)?.typography?.[b]?.[style]?.letterSpacing
            };`
          : ""
      }
      ${
        (this as any)?.typography?.[b]?.[style]?.textTransform
          ? `text-transform: ${
              (this as any)?.typography?.[b]?.[style]?.textTransform
            };`
          : ""
      }
    `;
  },
};

export type SCTheme = typeof theme;

if (typeof window !== "undefined" && process.env.NODE_ENV === "development")
  console.log(theme);

export default theme;
