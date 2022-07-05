import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  
  :root {
    --size-page-max-width: ${({ theme }) => (theme as any).pageMaxWidth}px;
    --transition-speed-link: 0.3s;

    ${({ theme }) => theme.getColorRootVars()};
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
    ${({ theme }) => theme.textStyle("body")}

    background-color: ${({ theme }) =>
      theme.colorMode === "dark" ? "var(--color-bg-tool)" : "var(--color-bg)"};
  }

  p {
    max-width: var(--size-content-max-width);
    margin: 0 0 var(--text-body-margin-bottom) 0;
  }

  a{
    text-decoration: none;
  }

  h1, .h1 {
    ${({ theme }) => theme.textStyle("h1", true)}
  }

  h2, .h2 {
    ${({ theme }) => theme.textStyle("h2", true)}
  }

  h3, .h3 {
    ${({ theme }) => theme.textStyle("h3", true)}
  }

  h4, .h4 {
    ${({ theme }) => theme.textStyle("h4", true)}
  }

  small {
    display: inline-block;
    padding-left: 0.2em;
    ${({ theme }) => theme.textStyle("caption")}
  }
`;
