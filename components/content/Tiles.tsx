import React, { useId } from "react";
import styled from "styled-components";

import { Tile } from "./Tile";
import { PiAiTool } from "~/types";
import { LinkButtonAnimated } from "../styled/Button";
import { Logo } from "../app/Logo";
import { LabElement } from "../ui/LabElement";

import background from "~/assets/img/globe.jpg";
import SafeHtmlDiv from "../ui/SafeHtmlDiv";
import { useConfigContext } from "~/providers/ConfigContextProvider";

import Link from "next/link";

const Grid = styled.div<{ bg: string }>`
  display: grid;

  background: url(${(props: any) => props.bg});
  background-blend-mode: multiply;
  background-size: cover;
  background-color: white;
  background-position: top left;

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    background-position: top center;
    grid-template-columns: 50% 50%;
  }
`;

const createButtons = (links: any, scope: string, id: string) => {
  if (links?.length) {
    return links.map((link: any, index: number) => {
      if (!link?.url || link.url.trim() === "") return <></>;

      let target = undefined;
      let rel = undefined;

      if (link?.newTab === true) {
        target = "_blank";
        rel = "norefferer";
      }

      return (
        <Link
          href={link.url}
          passHref
          key={`tile-tile-button-${scope}-${id}-${index}`}
        >
          <LinkButtonAnimated {...{ rel, target }}>
            {link.label}
          </LinkButtonAnimated>
        </Link>
      );
    });
  }
  return <></>;
};

export const Tiles = ({ data }: { data: any }) => {
  const config = useConfigContext();
  const id = useId();
  const tool = config.tools.find(
    (tool: PiAiTool) => tool.slug === data?.acf?.tileLeft?.toolSlug
  );

  return (
    <Grid bg={background.src}>
      <Tile
        key={`tiles-tile-left-${id}`}
        bgOverlay="piaiMap"
        element={
          tool ? (
            <LabElement
              key={`tiles-tile-left-logo-${id}`}
              shortHandle={tool.iconShort}
              longText={tool.iconLong}
              color="white"
              hoverColor="#ffffff"
            />
          ) : (
            <></>
          )
        }
        headline={data?.acf?.tileLeft?.title}
        buttons={createButtons(data?.acf?.tileLeft?.links, "left", id)}
      >
        <SafeHtmlDiv
          key={`tiles-tile-left-html-${id}`}
          html={data?.acf?.tileLeft?.teaser}
        />
      </Tile>
      <Tile
        key={`tiles-tile-right-${id}`}
        bgOverlay="piaiInterface"
        element={
          <Logo
            key={`tiles-tile-right-logo-${id}`}
            color="white"
            hoverColor="white"
          />
        }
        headline={data?.acf?.tileRight?.title}
        buttons={createButtons(data?.acf?.tileRight?.links, "right", id)}
      >
        <SafeHtmlDiv
          key={`tiles-tile-right-html-${id}`}
          html={data?.acf?.tileRight?.teaser}
        />
      </Tile>
    </Grid>
  );
};
