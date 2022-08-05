import React from "react";
import styled from "styled-components";
import { useToolStateContext } from "./context/ContextProviders";
import { Counter } from "./Counter";
import { MapFilter } from "./MapFilter";
import { ProjectQuickView } from "./ProjectQuickView";
import { MapSearch } from "./MapSearch";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;
`

export const MapOverlays = () => {
  const { filter } = useToolStateContext();  
  
  return (
    <Container>
      <MapSearch />
      <MapFilter />
      {filter?.quickViewProjectId && <ProjectQuickView id={filter.quickViewProjectId} />}
      <Counter />
    </Container>
  );
};
