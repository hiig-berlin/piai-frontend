import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { Tile } from "./Tile";
import Button from "../styled/Button";
import { Logo } from "../app/Logo";
import { LabElement } from "../ui/LabElement";

import background from "~/assets/img/globe.jpg";

const Grid = styled.div<{ bg: string }>`
  display: grid;
  // position: relative;
  // overflow: hidden;

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

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  z-index: -100;
`;

// const Column = styled.div`
//    display: grid;

//   ${({ theme }) => theme.breakpoints.tabletLandscape} {
//     flex-direction: row;
//     align-items: stretch;

//   }
// `;

export const Tiles = () => {
  return (
    <Grid bg={background.src}>
      {/* TODO: Replace this with CMS Content */}
      <Tile
        bgOverlay="piaiMap"
        element={
          <LabElement shortHandle="Ma" longText="Project Map" color="white" hoverColor="#ffffff"/>
        }
        headline="Public Interest AI Project Map"
        buttons={[
          <Button key="1">View project map</Button>,
          <Button key="2">Submit a project</Button>,
        ]}
      >
        <>
          <p>
            There is a lack of accumulated and detailed data on public interest
            AI projects, including their specific objectives, methods, and
            frameworks. This is why we created a survey.
          </p>
          <p>
            View all submitted projects, read their take on public interest AI
            or submit your own project.
          </p>
        </>
      </Tile>
      <Tile
        bgOverlay="piaiInterface"
        element={<Logo color="white" hoverColor="white"/>}
        headline="A global discourse"
        // TODO: Buttons here only on mobile
        buttons={[
          <Button key="1">Watch the video</Button>,
          <Button key="2">Read on</Button>,
        ]}
      >
        <>
          <p>
            Defining public interest AI is as difficult as it is crucial for our
            society. Academia and various societal stakeholder have entered a
            discourse to sharpen the edges of this explanation.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
            nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
            et ea rebum.
          </p>
        </>
      </Tile>
    </Grid>
  );
};