import React from "react";
import styled from "styled-components";
import { useToolStateContext } from "./context/ContextProviders";
import { Counter } from "./Counter";
import { Filter } from "./Filter";
import { ProjectQuickView } from "./ProjectQuickView";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;
`

export const MapOverlays = () => {
  const { map, filter } = useToolStateContext();  
  
  return (
    <Container>
      <Filter />
      {map?.quickViewProjectId && <ProjectQuickView id={map.quickViewProjectId} />}
      <Counter />
    </Container>
  );
};
