import Link from "next/link";
import React, { useEffect, useRef, useState, WheelEvent } from "react";
import styled from "styled-components";
import {
  ButtonNormalized,
  LinkButtonAnimated,
} from "~/components/styled/Button";
import { PiAiTool } from "~/types";
import { LabElement } from "../../ui/LabElement";
import SafeHtmlDiv from "../../ui/SafeHtmlDiv";
import SafeHtmlSpan from "../../ui/SafeHtmlSpan";
import { Box } from "./ui/Box";
import { useCssVarsStateIsTabletLandscapeAndUpState } from "~/components/state/CssVarsState";
import { Icon } from "./ui/Icon";
import { emitWarning } from "process";

export type ToolAboutPageCTA = {
  title: string;
  url: string;
  linkTitle: string;
  text: string;
};

const Grid = styled.div<{ col?: number }>`
  display: grid;
  gap: var(--size-3);
  grid-template-rows: auto;

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 2fr 3fr;
  }
`;

const Container = styled(Grid)<{
  toolColor?: string;
  direction?: string;
}>`
  padding: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-right: calc(34px + 2 * var(--size-3) + 6px);
  }

  & .column {
    display: flex;
    gap: var(--size-3);
    flex-direction: column;
  }

  & .column.about {
    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      position: sticky;
      // Prevent jumping on scroll change
      // if column shorter than 100vh
      min-height: calc(100vh - 2 * var(--size-3));

      // Move left column in the beginning
      // of the scroll vs. the end
      ${({ direction }) =>
        direction === "up"
          ? `
      
          align-self: start;
          top: var(--size-3);
      `
          : `
          align-self: end;
          bottom: var(--size-3);
        
      `}
    }

    .cta {
      & * {
        color: ${({ toolColor }) => toolColor || "#fff"};
      }

      h3 {
        font-size: 1.1em;
      }

      a {
        color: ${({ toolColor }) => toolColor || "#fff"};
        border-color: ${({ toolColor }) => toolColor || "#fff"};
        align-self: end;
        margin-right: 0;
        &:hover {
          margin-right: -0.3em;
        }
        &:visited {
          color: ${({ toolColor }) => toolColor || "#fff"};
        }
      }
    }
  }

  & .column.details {
    .toolbar {
      flex-direction: row;
      justify-content: space-between;
      gap: var(--size-2);

      padding: var(--size-3) var(--size-4);

      ${({ theme }) => theme.breakpoints.tablet} {
        padding: var(--size-3) var(--size-3);
      }

      ${({ theme }) => theme.breakpoints.tablet} {
        padding: var(--size-2) var(--size-3);
      }
    }

    h2 {
      ${({ theme }) => theme.applyMixin("uppercase")};
      color: #fff;
      font-size: 1.3em;
    }

    h3 {
      text-transform: none;
      color: #fff;
      font-size: 1em;
      font-weight: 700;
    }
  }

  p + h2,
  p + h3,
  p + h4 {
    margin-top: var(--size-4);
  }

  *::selection {
    background: #fff !important;
    color: #000 !important;
  }
`;

export const AboutPage = ({
  tool,
  intro,
  content,
  contentSimple,
  cta,
}: {
  tool: PiAiTool;
  intro: string;
  content: string;
  contentSimple: string;
  cta?: ToolAboutPageCTA;
}) => {
  // TODO: cta urls should be able to distinguish between internal and external links
  // also add the ability to add a target
  // LARISSA: Is the above needed?

  const [scrollDir, setScrollDir] = useState("down");
  const [isSimple, setIsSimple] = useState(false);

  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();

  const scrollYRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !isTabletLandscapeAndUp) return;

    const onScroll = () => {
      if (Math.abs(scrollYRef.current - window.scrollY) > 1) {
        if (scrollYRef.current - window.scrollY < 0) {
          setScrollDir("down");
        } else {
          setScrollDir("up");
        }

        scrollYRef.current = window.scrollY;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [isTabletLandscapeAndUp]);

  return (
    <Container toolColor={tool.colorHighlight} direction={scrollDir}>
      <div className="column about">
        <Box>
          <h1>
            <LabElement
              shortHandle={tool.iconShort}
              longText={tool.iconLong}
              color="white"
              hoverColor={tool.colorHighlight}
              size={2}
            />
          </h1>
          <SafeHtmlDiv html={intro} />
        </Box>
        {cta?.title && (
          <Box className="cta">
            <h3>
              <SafeHtmlSpan html={cta.title} />
            </h3>
            <SafeHtmlDiv html={cta.text} />

            {cta?.url && cta?.linkTitle && (
              <Link href={cta?.url} passHref>
                <LinkButtonAnimated>{cta?.linkTitle}</LinkButtonAnimated>
              </Link>
            )}
          </Box>
        )}
      </div>
      <div className="column details">
        {isTabletLandscapeAndUp && (
          <Box hideOnPrint className="toolbar">
            <Icon
              onClick={() => setIsSimple(!isSimple)}
              aria-label="Change to simple language"
              className="languageSwitch"
              type="language"
            >
              <span>
                {isSimple
                  ? "Show standard language"
                  : "Show simplified language"}
              </span>
            </Icon>
            <Icon type="share" spaceBefore aria-label="Share this page"></Icon>
            <Icon aria-label="Print this page" type="print"></Icon>
          </Box>
        )}
        <Box>
          {!isTabletLandscapeAndUp && (
            <Icon
              onClick={() => setIsSimple(!isSimple)}
              aria-label="Change to simple language"
              className="languageSwitch inBox"
              type="language"
            >
              <span>
                {isSimple
                  ? "Show standard language"
                  : "Show simplified language"}
              </span>
            </Icon>
          )}
          <SafeHtmlDiv
            style={{ 
              fontSize: isSimple ? "1.1em" : "inherit",
              lineHeight: isSimple ? "1.4em" : "inherit",
            }}
            html={isSimple ? contentSimple : content}
          />
        </Box>
      </div>
    </Container>
  );
};
