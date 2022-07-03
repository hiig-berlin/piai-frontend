import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { LinkButtonAnimated } from "~/components/styled/Button";
import { PiAiTool } from "~/types";
import { LabElement } from "../../ui/LabElement";
import SafeHtmlDiv from "../../ui/SafeHtmlDiv";
import SafeHtmlSpan from "../../ui/SafeHtmlSpan";
import { Box } from "./ui/Box";

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

const Container = styled(Grid)<{ toolColor?: string }>`
  padding: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-right: 100px;
  }

  & .column {
    display: flex;
    gap: var(--size-3);
    flex-direction: column;
  }

  & .labElement {
    margin-bottom: var(--size-3);
  }

  & .cta {
    color: ${({ toolColor }) => toolColor || "#fff"};

    h3{
      font-size: 1.1em;
    }

    a {
      color: ${({ toolColor }) => toolColor || "#fff"};
      border-color: color: ${({ toolColor }) => toolColor || "#fff"};
      float: right;
      display: inline-block;
    }
  }

  p + h2, p + h3, p + h4{
    margin-top: var(--size-4);
  }

  & .details{

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
`;

export const AboutPage = ({
  tool,
  intro,
  content,
  cta,
}: {
  tool: PiAiTool;
  intro: string;
  content: string;
  cta?: ToolAboutPageCTA;
}) => {
  // TODO: cta urls should be able to distinguish between internal and extrenal links
  // also add the ability to add a target

  // VVU: sorry for the #f0f
  return (
    <Container toolColor={tool.colorHighlight}>
      <div className="column about">
        <Box>
          <h1>
            <LabElement
              shortHandle={tool.iconShort}
              longText={tool.iconLong}
              color="white"
              hoverColor={tool.colorHighlight}
              size={1.5}
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
                <LinkButtonAnimated >
                  {cta?.linkTitle}
                </LinkButtonAnimated> 
              </Link>
            )}
          </Box>
        )}
      </div>
      <div className="column details">
        <Box>PRINT, LANGUAGE, SHARE</Box>
        <Box>
          <SafeHtmlDiv html={content} />
        </Box>
      </div>
    </Container>
  );
};
