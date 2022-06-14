import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  :root {
    --size-page-max-width: ${({theme}) => (theme as any).pageMaxWidth}px;
  }


  ${(props: any) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        :root {
          ${props.theme.getBreakpointRootVars(breakpoint)};
        }
    `;
    })}

  body {
    ${(props: any) => props.theme.textStyle("body")}
  }

  p {
    max-width: var(--size-content-max-width);
    margin: 0 0 var(--text-body-margin-bottom) 0;
  }

  a{
    text-decoration: none;
  }

  h1, .h1 {
    ${(props: any) => props.theme.textStyle("h1", true)}
  }

  h2, .h2 {
    ${(props: any) => props.theme.textStyle("h2", true)}
  }

  h3, .h3 {
    ${(props: any) => props.theme.textStyle("h3", true)}
  }

  h4, .h4 {
    ${(props: any) => props.theme.textStyle("h4", true)}
  }

  small {
    display: inline-block;
    padding-left: 0.2em;
    ${(props: any) => props.theme.textStyle("caption")}
  }
`;
