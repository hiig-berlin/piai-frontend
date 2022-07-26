import React from "react";
import styled from "styled-components";
import { useToolStateContext } from "./context/ContextProviders";
import { ProjectQuickView } from "./ProjectQuickView";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;
`

export const MapOverlays = () => {
  const { map } = useToolStateContext();  
  return (
    <Container>
      {map?.quickViewProjectId && <ProjectQuickView id={map.quickViewProjectId} />}
    </Container>
  );
};
