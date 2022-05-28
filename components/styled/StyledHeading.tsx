import styled from "styled-components";

export const StyledHeading = styled.h2<{ heading: "h0" | "h1" | "h2" | "h3" }>`
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
      ${props.theme.textStyle(breakpoint, `${props.heading}`)};
      margin-top: ${props.theme.marginFontTop(
        breakpoint,
        props.heading
      )};
      margin-bottom: ${props.theme.marginFontBottom(
        breakpoint,
        props.heading
      )};

      margin-left: ${props.heading === "h3" ? "0" : "-0.04em"};
    `;
    })}
`;
