import React from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";
import { PageMargins } from "../ui/PageMargins";
import { StyledFlexibleContentRow } from "./StyledFlexibleContentRow";

const IntroLarge = styled.div<{ heading: string }>`
  grid-area: large;

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      const headingSize = ["base", "mobile"].includes(breakpoint) ? `h2` : props.heading;
      return `
        ${props.theme.textStyleBreakpoint(breakpoint, headingSize)};

        h1, h2 {
          ${props.theme.textStyleBreakpoint(breakpoint, headingSize)};
        }

        width: ${
          ["base", "mobile", "tablet"].includes(breakpoint) ||
          props.heading === "h1"
            ? "100%"
            : "80%"
        };
        margin-top: ${props.theme.marginFontTop(
          breakpoint,
          headingSize
        )};
        margin-bottom: ${props.theme.marginFontBottom(
          breakpoint,
          headingSize
        )};

        margin-left:-0.04em;

        & p {
          max-width: 100%;
        }

        & a { 
          text-underline-offset: 3px !important;
          text-decoration-thickness: 2px !important;
        }
      `;
    })}
`;

const IntroSmall = styled.div`
  grid-area: small;
`;

const IntroCoin = styled.div`
  grid-area: coin;
  ${(props) =>
    props.theme.apply(["base", "mobile", "tablet"], (breakpoint: string) => {
      return `
        justify-self: end;
        margin-top: ${props.theme.spacePx(breakpoint, 6)};        
      `;
    })}

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    margin-top: 0;
  }
`;

const IntoGrid = styled.div<{ hasDonate: boolean; hasSmall: boolean }>`
  display: grid;
  grid-template-columns: 1fr;

  ${({ hasDonate, hasSmall }) =>
    hasDonate
      ? `
        grid-template-areas: ${
          hasSmall
            ? `
          "large"
          "small"
          "coin"
        `
            : `
          "large"
          "coin"
        `
        };
      `
      : `
        grid-template-areas: ${
          hasSmall
            ? `
          "large"
          "small"
        `
            : `
          "large"
        `
        };
      `}

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: ${({ hasDonate }) =>
      hasDonate ? `1fr auto` : `auto`};

    ${({ hasDonate, hasSmall }) =>
      hasDonate
        ? `
        grid-template-areas: ${
          hasSmall
            ? `
          "large large"
          "small coin"
        `
            : `
          "large"
          "coin"
        `
        };
      `
        : `
        grid-template-areas: ${
          hasSmall
            ? `
          "large"
          "small"
        `
            : `
          "large"
        `
        };
      `}
  }
`;

export const RowIntro = ({
  block,
  index,
  fontStyle,
  shortBottomMargin,
}: {
  block: any;
  index: number;
  fontStyle: string;
  shortBottomMargin?: boolean;
}) => {
  return (
    block.intro && (
      <PageMargins spaceTop={index === 0 ? 7 : 0}>
        <StyledFlexibleContentRow
          className={`${block.acf_fc_layout} flex-content html`}
          shortBottomMargin={shortBottomMargin}
        >
          <IntoGrid hasDonate={block.donateButton} hasSmall={!!block.text}>
            <IntroLarge
              heading={block.largeFont || fontStyle === "bold" ? "h1" : "h2"}
              dangerouslySetInnerHTML={{
                __html: safeHtml(block.intro),
              }}
            />
            {block.text && (
              <IntroSmall
                dangerouslySetInnerHTML={{
                  __html: safeHtml(block.text),
                }}
              />
            )}
          </IntoGrid>
        </StyledFlexibleContentRow>
      </PageMargins>
    )
  );
};
