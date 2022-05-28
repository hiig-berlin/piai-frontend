import React from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";
import omit from "lodash/omit";

const StyledHeading = styled.div<{
  spaceTop?: number;
  spaceBottom?: number;
  heading: string;
  fontWeight?: string;
  maxWidth?: string;
  textTransform?: string;
  lineHeight?: string;
  inline?: boolean;
  trimmed?: boolean;
  noWrap?: boolean;
  maxLines?: number;
}>`
  ${({ trimmed }) =>
    trimmed
      ? `
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
    padding-right: 2px;
  `
      : ""}

  ${({ maxLines }) =>
    maxLines
      ? `
      overflow: hidden;
      text-overflow: ellipsis;
      -moz-box-orient: vertical;
      display: -webkit-box;
      -webkit-line-clamp: ${maxLines};
      -webkit-box-orient: vertical;
  `
      : ""}

  ${({ noWrap }) =>
    noWrap
      ? `
        white-space: nowrap;
      `
      : ""}

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
      ${props.theme.textStyle(breakpoint, props.heading)};
      ${props.textTransform ? `text-transform: ${props.textTransform};` : ""}
      ${props.fontWeight ? `font-weight: ${props.fontWeight};` : ""}
      ${props.lineHeight ? `line-height: ${props.lineHeight};` : ""}
      
      ${
        !props.inline
          ? `
              margin: ${props.theme.marginFontTop(
                breakpoint,
                props.heading
              )} 0 ${props.theme.marginFontBottom(
              breakpoint,
              props.heading
            )} ${
              props.heading === "h0" ||
              props.heading === "h1" ||
              props.heading === "h2"
                ? "-0.04em"
                : ""
            };

            `
          : `
                margin-top: ${
                  props.spaceTop
                    ? `
                    calc(${props.theme.spacePx(
                      breakpoint,
                      props.spaceTop
                    )} + (${props.theme.marginFontTop(
                        breakpoint,
                        props.heading
                      )} * 1))`
                    : `
                    calc(${props.theme.marginFontTop(
                      breakpoint,
                      props.heading
                    )} * -0.5)
                  `
                };
                
                margin-bottom: ${
                  props.spaceBottom
                    ? props.theme.marginFontBottom(
                        breakpoint,
                        props.heading
                      )
                    : "0"
                };

                margin-right: 0;
                
                margin-left: ${
                  props.heading === "h0" ||
                  props.heading === "h1" ||
                  props.heading === "h2"
                    ? "-0.04em"
                    : ""
                };
            `
      }`;
    })}
`;

export const Heading = (props: {
  inline?: boolean;
  noWrap?: boolean;
  id?: string;
  asTag?: boolean | string;
  trimmed?: boolean;
  heading: string;
  className?: string;
  fontWeight?: string;
  textTransform?: string;
  spaceTop?: number;
  maxLines?: number;
  spaceBottom?: number;
  html?: string;
  children?: React.ReactNode;
  lineHeight?: string;
}) => {
  const sanitizedHtml =
    !props.children && props.html
      ? {
          __html: safeHtml(props.html),
        }
      : undefined;

  const headingProps = {
    ...(omit(props, ["children", "html", "asTag"]) as any),
  };

  if (props.asTag) {
    if (
      props.heading === "h0" ||
      props.heading === "h1" ||
      props.asTag === "h1"
    ) {
      return (
        <StyledHeading
          as="h1"
          {...{ ...headingProps, dangerouslySetInnerHTML: sanitizedHtml }}
        >
          {!sanitizedHtml ? props.children : undefined}
        </StyledHeading>
      );
    }
    if (props.heading === "h2" || props.asTag === "h2") {
      return (
        <StyledHeading
          as="h2"
          {...{ ...headingProps, dangerouslySetInnerHTML: sanitizedHtml }}
        >
          {!sanitizedHtml ? props.children : undefined}
        </StyledHeading>
      );
    }
    if (props.heading == "h3" || props.asTag === "h3") {
      return (
        <StyledHeading
          as="h3"
          {...{ ...headingProps, dangerouslySetInnerHTML: sanitizedHtml }}
        >
          {!sanitizedHtml ? props.children : undefined}
        </StyledHeading>
      );
    }
    if (props.heading == "h4" || props.asTag === "h4") {
      return (
        <StyledHeading
          as="h4"
          {...{ ...headingProps, dangerouslySetInnerHTML: sanitizedHtml }}
        >
          {!sanitizedHtml ? props.children : undefined}
        </StyledHeading>
      );
    }
  }
  return (
    <StyledHeading
      {...{ ...headingProps, dangerouslySetInnerHTML: sanitizedHtml }}
    >
      {!sanitizedHtml ? props.children : undefined}
    </StyledHeading>
  );
};
