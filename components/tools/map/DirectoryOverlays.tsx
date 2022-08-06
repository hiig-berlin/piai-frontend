import React, { useEffect } from "react";
import styled from "styled-components";
import { Counter } from "./Counter";
import { DirectoryFilter } from "./DirectoryFilter";
import { DirectoryList } from "./DirectoryList";
import { ProjectQuickView } from "./ProjectQuickView";
import {
  useToolStateFilterState,
  useToolStateStoreActions,
} from "./state/toolStateStore";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;
`;

export const DirectoryOverlays = () => {
  const filterState = useToolStateFilterState();
  const { updateMapState } = useToolStateStoreActions();

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
      {filterState?.quickViewProjectId && (
        <ProjectQuickView
          key={`directory-qv-${filterState.quickViewProjectId}`}
          id={filterState.quickViewProjectId}
          view="directory"
        />
      )}
      <Counter view="directory" />
    </Container>
  );
};
