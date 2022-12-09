import React from "react";
import styled from "styled-components";

import { Container } from "../ui/PageMargins";
import { Wizard } from "./Wizard";

const VideoWrapper = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  overflow-bottom;
  width: 100%;
  height: 0px;
  margin: var(--size-9) 0 0;

  ${({ theme }) => theme.breakpoints.tablet}{
    margin: var(--size-8) 0 0;
  }

  .iframe{
    overflow: hidden;
    border: 0;
    align-self: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Video = ({ embedUrl }: { embedUrl: string }) => {
  return (
    <Container>
      <Wizard
        bend="down right"
        left="10%"
        bottom="-80px"
        width="20%"
        inView
        inViewDelay={1}
      >
        Watch our introduction to Public Interst AI
      </Wizard>
      <VideoWrapper>
        <iframe
          src={embedUrl}
          allowFullScreen
          frameBorder="0"
          className="iframe"
          allow="autoplay"
          title="Video"
        />
      </VideoWrapper>
    </Container>
  );
};
