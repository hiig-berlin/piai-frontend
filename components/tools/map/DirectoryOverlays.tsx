import React, { useEffect } from "react";
import styled from "styled-components";
import { useToolStateContext } from "./context/ContextProviders";
import { Counter } from "./Counter";
import { DirectoryFilter } from "./DirectoryFilter";
import { DirectoryList } from "./DirectoryList";
import { ProjectQuickView } from "./ProjectQuickView";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;
`;

export const DirectoryOverlays = () => {
  const { filter, updateMapState } = useToolStateContext();

  useEffect(() => {
    updateMapState({
      loadGeoJson: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Container>
      <DirectoryFilter />
      <DirectoryList />
      {filter?.quickViewProjectId && (
        <ProjectQuickView
          key={`directory-qv-${filter.quickViewProjectId}`}
          id={filter.quickViewProjectId}
          view="directory"
        />
      )}
      <Counter view="directory" />
    </Container>
  );
};
