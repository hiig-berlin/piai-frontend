import React from "react";
import styled, { StyledComponent } from "styled-components";
import safeHtml from "~/utils/sanitize";
import { ApiImage } from "../ui/ApiImage";
import { AspectRatio } from "../ui/AspectRatio";
import { themeImgSizes } from "~/theme/theme";
import { safeAnchorId } from "~/utils/safeAnchorId";
import { Heading } from "../ui/Heading";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";

const imgSizesLandscape: any = {
  full: {
    base: "100vw",
  },
  wide: {
    tablet: "66vw",
    base: "100vw",
  },
  half: {
    tablet: "33vw",
    base: "100vw",
  },
};

const imgSizesPortrait: any = {
  full: {
    base: "66vw",
  },
  wide: {
    base: "50vw",
  },
  half: {
    tablet: "33vw",
    base: "100vw",
  },
};

const StyledFlexibleContentContainer = styled.div<{ isEmpty: boolean }>`
  margin-bottom: var(--size-6);

  ${({ theme }) => theme.breakpoints.tablet} {
    width: 100%;
    max-width: var(--size-page-max-width);
    margin-left: auto;
    margin-right: auto;
    margin-bottom: ${({ isEmpty }) =>
      isEmpty ? "calc(var(--size-6) - var(--size-2))" : ""};
  }
`;

const StyledFlexibleContent = styled.div<{ spaceBottom?: number }>`
  margin-bottom: var(--size-2);
`;

const StyledFlexibleHtmlContent = styled.div<{ shortBottomMargin?: boolean }>`
  margin-bottom: var(
    --size-${({ shortBottomMargin }) => (shortBottomMargin ? 3 : 5)}
  );

  /* TODO: Here you could add further overwrites if wanted (remove if not)
    & h1, & h2 {
      ...
    }

    & h3, & h4, & h5 {
      ...
    }
    */

  & p {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const StyledFlexibleQuote = styled.div`
  ${(props: any) => props.theme.textStyle("h2")};
  margin: calc(var(--size-4) - var(--text-h2-margin-top)) 0
    var(--text-h2-margin-bottom)
    calc(var(--size-4) - var(--text-h2-margin-left));

  & p {
    margin: 0;
    &:last-child {
      max-width: 100%;
      margin-bottom: 0;
    }
  }
`;

const StyleImageTextHeading = styled.div`
  padding-top: var(--size-2);
`;

const StyleImageTextText = styled.div<{ withHeading: boolean }>`
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        padding-top: ${
          props.withHeading ? "0" : props.theme.spacePx(breakpoint, 8)
        };
      
        & h1, & h2 {
          ${props.theme.textStyleBreakpoint(breakpoint, `h2`)};
          margin-top: ${props.theme.marginFontTop(breakpoint, `h2`)};
          margin-bottom: ${props.theme.marginFontBottom(breakpoint, `h2`)};
        }

        & h3, & h4, & h5 {
          ${props.theme.textStyleBreakpoint(breakpoint, `h3`)};
          margin-top: ${props.theme.marginFontTop(breakpoint, `h3`)};
          margin-bottom: ${props.theme.marginFontBottom(breakpoint, `h3`)};
        }
      `;
    })}

  & p {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const StyledImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledImageGrid = styled.div<{ numCols: number }>`
  display: grid;
  width: 100%;

  grid-gap: var(--size-gutter-width);

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        grid-template-columns: repeat(${
          ["base", "mobile"].includes(breakpoint) && props.numCols === 4
            ? 2
            : props.numCols
        }, 1fr);
        
      `;
    })}
`;

export const StyledEmbedCodeContainer = styled.div<{ minHeight: string }>`
  width: 100%;
  min-height: ${({ minHeight }) => minHeight ?? "auto"};
  & iframe {
    border: none;
  }
  ${({ minHeight }) =>
    minHeight
      ? `
    & > div,
    & img,
    & video,
    & iframe {
      width: 100%;
      min-height: ${minHeight};
      border: none;
    }
  `
      : ""}
`;

export const StyledImageCaption = styled.div`
  width: 100%;
  ${({ theme }) => theme.textStyleBreakpoint(`caption`)}
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        padding-top: ${props.theme.spacePx(breakpoint, 10)};
        > span {
          margin-top: ${props.theme.marginFontTop(breakpoint, `caption`)};
        } 
      `;
    })}
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  border-bottom: 1px solid #000;
`;

const blockHeading = (heading: any, fontStyle: string) => {
  if (heading && heading.trim())
    return (
      <Heading heading={fontStyle === "bold" ? "h2" : "h3"} html={heading} />
    );

  return <></>;
};

export const FlexibleContent = ({
  content,
  field = "content",
  columnWidth = "full",
  WrapWithContainer,
  WrapWith,
  fontStyle = "default",
}: {
  content: any;
  field: string;
  fontStyle?: string;
  columnWidth: "full" | "wide" | "short" | "50";
  WrapWithContainer?: StyledComponent<any, any>;
  WrapWith?: StyledComponent<any, any>;
}) => {
  const {
    vars: { isMobileLandscape, isTabletLandscape, isDesktopAndUp },
  } = useCssVarsContext();

  const parsedContent: any[] = Array.isArray(content)
    ? content.map((block: any, index: number) => {
        if (
          block.acf_fc_layout === "legacy_html" ||
          block.acf_fc_layout === "text"
        )
          return (
            <StyledFlexibleHtmlContent
              key={`flx-${field}-${index}`}
              className={`${block.acf_fc_layout} flex-content html`}
              dangerouslySetInnerHTML={{
                __html: safeHtml(block.html ?? block.text ?? block.embed_code),
              }}
              shortBottomMargin={
                index < content?.length - 1 &&
                content[index + 1]?.acf_fc_layout === "button"
              }
            />
          );

        if (block.acf_fc_layout === "anchor" && block?.name)
          return (
            <div key={`flx-${field}-${index}`} id={safeAnchorId(block?.name)} />
          );

        if (block.acf_fc_layout === "embed_code")
          return (
            <StyledFlexibleContent
              key={`flx-${field}-${index}`}
              className={`${block.acf_fc_layout} flex-content embed html`}
            >
              {blockHeading(block?.heading, fontStyle)}

              {block.force16by9 || block.format === "16-9" ? (
                <AspectRatio ratio="16 / 9">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: safeHtml(
                        block.html ?? block.text ?? block.embed_code
                      ),
                    }}
                  ></div>
                </AspectRatio>
              ) : (
                <StyledEmbedCodeContainer
                  minHeight={block.format === "300px" ? "300px" : "auto"}
                  dangerouslySetInnerHTML={{
                    __html: safeHtml(block.embed_code),
                  }}
                />
              )}
            </StyledFlexibleContent>
          );

        // if (block.acf_fc_layout === "audio") {}

        if (block.acf_fc_layout === "image") {
          if (
            !block?.image?.width ||
            !block?.image.height ||
            !block?.image?.sizes
          )
            return <></>;

          let portraitAspectRatio = `${block?.image?.width} / ${block?.image?.height}`;

          if (isDesktopAndUp) {
            portraitAspectRatio = "6 / 5";
          } else if (isTabletLandscape) {
            portraitAspectRatio = "110 / 100";
          } else if (isMobileLandscape) {
            portraitAspectRatio = "4 / 3";
          }

          return (
            <StyledFlexibleContent
              key={`flx-${field}-${index}`}
              className={`${block.acf_fc_layout} flex-content`}
            >
              <StyledImageContainer>
                {block?.image?.width < block?.image?.height &&
                (columnWidth === "wide" || columnWidth === "full") ? (
                  <AspectRatio ratio={portraitAspectRatio}>
                    <ApiImage
                      imgSizes={themeImgSizes(
                        imgSizesPortrait?.[columnWidth] ?? {}
                      )}
                      alt={block?.image?.alt}
                      ratio={`${block?.image?.width} / ${block?.image?.height}`}
                      aspectRatioDirection="height"
                      sizes={block?.image?.sizes}
                    />
                  </AspectRatio>
                ) : (
                  <ApiImage
                    imgSizes={themeImgSizes(
                      imgSizesLandscape?.[columnWidth] ?? {}
                    )}
                    alt={block?.image?.alt}
                    ratio={`${block?.image?.width} / ${block?.image?.height}`}
                    sizes={block?.image?.sizes}
                  />
                )}
                {block?.image?.description?.trim() && (
                  <StyledImageCaption>
                    {block?.image?.description?.trim() && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: safeHtml(block?.image?.description),
                        }}
                      />
                    )}
                  </StyledImageCaption>
                )}
              </StyledImageContainer>
            </StyledFlexibleContent>
          );
        }
        if (block.acf_fc_layout === "line") {
          return (
            <StyledFlexibleContent
              key={`flx-${field}-${index}`}
              className={`${block.acf_fc_layout} flex-content line`}
              spaceBottom={9}
            >
              <Line />
            </StyledFlexibleContent>
          );
        }
        if (block.acf_fc_layout === "image_grid") {
          if (!block?.images?.length) return <></>;

          return (
            <StyledFlexibleContent
              key={`flx-${field}-${index}`}
              className={`${block.acf_fc_layout} flex-content grid`}
            >
              <StyledImageContainer>
                <StyledImageGrid numCols={parseInt(block.numCols ?? "")}>
                  {block?.images.map((img: any, imgIndex: number) => (
                    <ApiImage
                      key={`flx-${field}-${index}-${imgIndex}`}
                      ratio={block.forceSquare ? "1 / 1" : undefined}
                      imgSizes={themeImgSizes(
                        imgSizesLandscape?.[columnWidth] ?? {}
                      )}
                      alt={img?.alt}
                      sizes={img?.sizes}
                      objectPosition={img?.cropPosition}
                    />
                  ))}
                </StyledImageGrid>
              </StyledImageContainer>
            </StyledFlexibleContent>
          );
        }

        if (block.acf_fc_layout === "image_text") {
          if (!block?.image?.width || !block?.image?.height) return <></>;

          let portraitAspectRatio = `${block?.image?.width} / ${block?.image?.height}`;

          if (isDesktopAndUp) {
            portraitAspectRatio = "6 / 5";
          } else if (isTabletLandscape) {
            portraitAspectRatio = "110 / 100";
          } else if (isMobileLandscape) {
            portraitAspectRatio = "4 / 3";
          }

          return (
            <StyledFlexibleContent
              key={`flx-${field}-${index}`}
              className={`${block.acf_fc_layout} flex-content`}
            >
              {block?.image?.width &&
                block?.image.height &&
                block?.image?.sizes && (
                  <StyledImageContainer>
                    {block?.image?.width < block?.image?.height &&
                    (columnWidth === "wide" || columnWidth === "full") ? (
                      <AspectRatio ratio={portraitAspectRatio}>
                        <ApiImage
                          imgSizes={themeImgSizes(
                            imgSizesPortrait?.[columnWidth] ?? {}
                          )}
                          alt={block?.image?.alt}
                          ratio={`${block?.image?.width} / ${block?.image?.height}`}
                          aspectRatioDirection="height"
                          sizes={block?.image?.sizes}
                        />
                      </AspectRatio>
                    ) : (
                      <ApiImage
                        imgSizes={themeImgSizes(
                          imgSizesLandscape?.[columnWidth] ?? {}
                        )}
                        alt={block?.image?.alt}
                        ratio={`${block?.image?.width} / ${block?.image?.height}`}
                        sizes={block?.image?.sizes}
                      />
                    )}
                    {block?.image?.description?.trim() && (
                      <StyledImageCaption>
                        {block?.image?.description?.trim() && (
                          <span
                            dangerouslySetInnerHTML={{
                              __html: safeHtml(block?.image?.description),
                            }}
                          />
                        )}
                      </StyledImageCaption>
                    )}
                  </StyledImageContainer>
                )}
              {block?.heading && block?.heading.trim() && (
                <StyleImageTextHeading>
                  {block?.heading_type === "h2" ? (
                    <h2
                      dangerouslySetInnerHTML={{
                        __html: safeHtml(block?.heading),
                      }}
                    />
                  ) : (
                    <h3
                      dangerouslySetInnerHTML={{
                        __html: safeHtml(block?.heading),
                      }}
                    />
                  )}
                </StyleImageTextHeading>
              )}

              {block?.text && block?.text.trim() && (
                <StyleImageTextText
                  withHeading={block?.heading && block?.heading.trim()}
                  dangerouslySetInnerHTML={{
                    __html: safeHtml(block?.text),
                  }}
                />
              )}
            </StyledFlexibleContent>
          );
        }

        if (block.acf_fc_layout === "heading") {
          let heading = block.type;
          if (fontStyle === "bold") {
            heading = block.type === "h2" ? "h1" : "h2";
          }
          return (
            <Heading
              heading={heading}
              key={`flx-${field}-${index}`}
              className={`${block.acf_fc_layout} flex-content heading heading-${block.type}`}
              html={block.heading}
            />
          );
        }

        if (block.acf_fc_layout === "quote") {
          return (
            <StyledFlexibleQuote
              key={`flx-${field}-${index}`}
              className={`${block.acf_fc_layout} flex-content quote`}
              dangerouslySetInnerHTML={{
                __html: safeHtml(block.quote),
              }}
            />
          );
        }

        return null;
      })
    : [];

  if (WrapWithContainer && WrapWith)
    return (
      <WrapWithContainer>
        {parsedContent.map((c: any, index: number) => (
          <WrapWith key={`flx-${field}-wrap-${index}`}>{c}</WrapWith>
        ))}
      </WrapWithContainer>
    );

  return (
    <StyledFlexibleContentContainer
      isEmpty={!Array.isArray(content) || content?.length === 0}
    >
      {parsedContent}
    </StyledFlexibleContentContainer>
  );
};
