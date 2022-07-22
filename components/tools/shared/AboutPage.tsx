import Link from "next/link";
import React, { useState, WheelEvent } from "react";
import styled from "styled-components";
import {
  ButtonNormalized,
  LinkButtonAnimated,
} from "~/components/styled/Button";
import { MapSvgBackground } from "../map/MapSvgBackground";
import { PiAiTool } from "~/types";
import { LabElement } from "../../ui/LabElement";
import SafeHtmlDiv from "../../ui/SafeHtmlDiv";
import SafeHtmlSpan from "../../ui/SafeHtmlSpan";
import { Box } from "./ui/Box";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Icon } from "../map/Icon";

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
  onWheel?: Function;
  direction?: string;
}>`
  padding: var(--size-3);
  

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-right: 100px;
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
 

    /* .labElement {
      // margin-bottom: var(--size-1);
    } */

    .cta {
      & * {
        color: ${({ toolColor }) => toolColor || "#fff"}
      }
  
      h3{
        font-size: 1.1em;
      }
  
      a {
        color: ${({ toolColor }) => toolColor || "#fff"};
        border-color: ${({ toolColor }) => toolColor || "#fff"};
        align-self: end;
        margin-right: 0;
        &:hover{
          margin-right: -0.3em
        }
          
      }
    }

  }

  & .column.details {

    .toolbar{
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

    h2{
      ${({ theme }) => theme.applyMixin("uppercase")};
      color: #fff;
      font-size: 1.3em;
    }

    h3{
      text-transform: none;
      color: #fff;
      font-size: 1em;
      font-weight: 700;
    }
    
  }

  p + h2, p + h3, p + h4 {
    margin-top: var(--size-4);
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
  // TODO: cta urls should be able to distinguish between internal and extrenal links
  // also add the ability to add a target

  const [scrollDir, setScrollDir] = useState("down");
  const [isSimple, setIsSimple] = useState(false);

  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  return (
    <Container
      toolColor={tool.colorHighlight}
      onWheel={(e: WheelEvent) => {
        if (Math.abs(e.deltaY) > 5) {
          e.deltaY > 0 ? setScrollDir("down") : setScrollDir("up");
        }
      }}
      direction={scrollDir}
    >
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
          <Box className="toolbar">
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
          <SafeHtmlDiv html={isSimple ? contentSimple : content} />
        </Box>
      </div>
    </Container>
  );
};
