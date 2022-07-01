import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { PiAiTool } from "~/types";
import { LabElement } from "../../ui/LabElement";
import SafeHtmlDiv from "../../ui/SafeHtmlDiv";
import SafeHtmlSpan from "../../ui/SafeHtmlSpan";
import { Box } from "./ui/box";

export type ToolAboutPageCTA = {
  title: string;
  url: string;
  linkTitle: string;
  text: string;
};

const Grid = styled.div<{ col: number }>`
  display: grid;
  gap: var(--size-3);
  grid-template-rows: auto;

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: repeat(${({ col }) => col}, 1fr);
  }
`;

const Container = styled(Grid)`

  padding: var(--size-3);
  ${({ theme }) => theme.breakpoints.tablet} {
    padding-right: 100px;
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
    <Container col={2}>
      <div className="column about">
        <Box>
          <LabElement
            shortHandle={tool.iconShort}
            longText={tool.iconLong}
            color="white"
            hoverColor={tool.colorHighlight}
            size={3}
          />
          <SafeHtmlDiv html={intro} />
        </Box>
        {cta?.title && (
          <Box>
            <h3>
              <SafeHtmlSpan html={cta.title} />
            </h3>
            <SafeHtmlDiv html={cta.text} />

            {cta?.url && cta?.linkTitle && (
              <Link href={cta?.url} passHref>
                <a>{cta?.linkTitle}</a>
              </Link>
            )}
          </Box>
        )}
      </div>
      <div className="column details">
        <Box>
          PRINT, LANGUAGE, SHARE
        </Box>
        <Box>
          <SafeHtmlDiv html={content} />
        </Box>
      </div>
    </Container>
  );
};
