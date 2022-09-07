import React from "react";
import styled from "styled-components";
import Image from "next/image";

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


const createButtons = (links: any, scope: string) => {
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
        <Link href={link.url} passHref key={`tile-button-${scope}-${index}`}>
          <LinkButtonAnimated {...{ rel, target }}>
            {link.label}
          </LinkButtonAnimated>
        </Link>
      );
    });
  }

  return [];
};

export const Tiles = ({ data }: { data: any }) => {
  const config = useConfigContext();

  const tool = config.tools.find(
    (tool: PiAiTool) => tool.slug === data?.acf?.tileLeft?.toolSlug
  );

  return (
    <Grid bg={background.src}>
      <Tile
        bgOverlay="piaiMap"
        element={
          tool ? (
            <LabElement
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
        buttons={createButtons(data?.acf?.tileLeft?.links, "left")}
      >
        <SafeHtmlDiv html={data?.acf?.tileLeft?.teaser} />
      </Tile>
      <Tile
        bgOverlay="piaiInterface"
        element={<Logo color="white" hoverColor="white" />}
        headline={data?.acf?.tileRight?.title}
        // TODO: Buttons here only on mobile
        buttons={createButtons(data?.acf?.tileRight?.links, "right")}
      >
        <SafeHtmlDiv html={data?.acf?.tileRight?.teaser} />
      </Tile>
    </Grid>
  );
};
