import React from "react";
import styled from "styled-components";
import { Counter } from "./Counter";
import { MapFilter } from "./MapFilter";
import { ProjectQuickView } from "./ProjectQuickView";
import { MapSearch } from "./MapSearch";
import { useToolStateFilterState } from "./state/ToolState";
import { Search } from "./Search";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;
`;

export const MapOverlays = () => {
  const filterState = useToolStateFilterState();
  return (
    <Container>
      <Search view="map" />
      <MapFilter />
      {filterState?.quickViewProjectId && (
        <ProjectQuickView
          key={`map-qv-${filterState.quickViewProjectId}`}
          id={filterState.quickViewProjectId}
          view="map"
        />
      )}
      <Counter view="map" />
    </Container>
  );
};
