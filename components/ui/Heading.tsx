import React from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";
import omit from "lodash/omit";

const StyledHeading = styled.div<{
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
  
  font-family: var(--text-${({ heading }) => heading}-font-family);
  font-style: var(--text-${({ heading }) => heading}-font-style);
  font-size: var(--text-${({ heading }) => heading}-font-size);

  text-transform: ${({ textTransform, heading }) =>
    textTransform ? textTransform : `var(--text-${heading}-text-transform)`};

  line-height: ${({ lineHeight, heading }) =>
    lineHeight ? lineHeight : `var(--text-${heading}-line-height)`};

  font-weight: ${({ fontWeight, heading }) =>
    fontWeight ? fontWeight : `var(--text-${heading}-font-weight)`};

  ${({ inline, heading }) =>
    !inline
      ? `
        margin: var(--text-${heading}-margin-top) 0
        var(--text-${heading}-margin-bottom)
        var(--text-${heading}-margin-left);
      `
      : ``};
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
  maxLines?: number;
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
