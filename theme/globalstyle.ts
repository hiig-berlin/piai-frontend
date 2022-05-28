import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  ${(props: any) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
      body {
        ${props.theme.textStyle(breakpoint, "body")};
      }

      p {
        max-width: ${props.theme.bodyCopyMaxWidth?.[breakpoint] ?? 600}px;
        margin: 0 0 ${props.theme.marginFontBottom(breakpoint, "body")} 0;
      }

      h1, .h1 {
        ${props.theme.textStyle(breakpoint, "h1")};
        margin: ${props.theme.marginFontTop(breakpoint, "h1")} 0 ${props.theme.marginFontBottom(breakpoint, "h1")} 0;
      }

      h2, .h2 {
        ${props.theme.textStyle(breakpoint, "h2")};
        margin: ${props.theme.marginFontTop(breakpoint, "h2")} 0 ${props.theme.marginFontBottom(breakpoint, "h2")} 0;
      }

      h3, .h3 {
        ${props.theme.textStyle(breakpoint, "h3")};
        margin: ${props.theme.marginFontTop(breakpoint, "h3")} 0 ${props.theme.marginFontBottom(breakpoint, "h3")} 0;
      }

      h4, .h4 {
        ${props.theme.textStyle(breakpoint, "h4")};
        margin: ${props.theme.marginFontTop(breakpoint, "h4")} 0 ${props.theme.marginFontBottom(breakpoint, "h4")} 0;
      }

      sup {
        display: inline-block;
        padding-left: 0.2em;
        ${props.theme.textStyle(breakpoint, "caption")};
      }
    `;
    })}
`;
