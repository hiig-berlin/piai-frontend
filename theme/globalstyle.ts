import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  --size-page-max-width: ${({theme}) => (theme as any).pageMaxWidth}px;


  ${(props: any) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        :root {
          ${props.theme.getBreakpointRootVars(breakpoint)};
        }
    `;
    })}

  body {
    font-family: var(--text-body-font-family);
    font-weight: var(--text-body-font-weight);
    font-style: var(--text-body-font-style);
    font-size: var(--text-body-font-size);
    line-height: var(--text-body-line-height);
  }

  p {
    max-width: var(--size-content-max-width);
    margin: 0 0 var(--text-body-margin-bottom) 0;
  }

  h1, .h1 {
    font-family: var(--text-h1-font-family);
    font-weight: var(--text-h1-font-weight);
    font-style: var(--text-h1-font-style);
    font-size: var(--text-h1-font-size);
    line-height: var(--text-h1-line-height);
    margin: var(--text-h1-margin-top) 0 var(--text-h1-margin-bottom) var(--text-h1-margin-left);
  }

  h2, .h2 {
    font-family: var(--text-h2-font-family);
    font-weight: var(--text-h2-font-weight);
    font-style: var(--text-h2-font-style);
    font-size: var(--text-h2-font-size);
    line-height: var(--text-h2-line-height);
    margin: var(--text-h2-margin-top) 0 var(--text-h2-margin-bottom) var(--text-h2-margin-left);
  }

  h3, .h3 {
    font-family: var(--text-h3-font-family);
    font-weight: var(--text-h3-font-weight);
    font-style: var(--text-h3-font-style);
    font-size: var(--text-h3-font-size);
    line-height: var(--text-h3-line-height);
    margin: var(--text-h3-margin-top) 0 var(--text-h3-margin-bottom) var(--text-h3-margin-left);
  }

  h4, .h4 {
    font-family: var(--text-h4-font-family);
    font-weight: var(--text-h4-font-weight);
    font-style: var(--text-h4-font-style);
    font-size: var(--text-h4-font-size);
    line-height: var(--text-h4-line-height);
    margin: var(--text-h4-margin-top) 0 var(--text-h4-margin-bottom) var(--text-h4-margin-left);
  }

  sup {
    display: inline-block;
    padding-left: 0.2em;
    font-family: var(--text-caption-font-family);
    font-weight: var(--text-caption-font-weight);
    font-style: var(--text-caption-font-style);
    font-size: var(--text-caption-font-size);
    line-height: var(--text-caption-line-height);
  }
`;
