import React, { useEffect } from "react";
import styled from "styled-components";
import { Counter } from "./Counter";
import { DirectoryFilter } from "./DirectoryFilter";
import { DirectoryList } from "./DirectoryList";
import { ProjectQuickView } from "./ProjectQuickView";
import { Search } from "./Search";
import {
  useToolStateFilterState,
  useToolStateStoreActions,
} from "./state/ToolState";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  pointer-events: none;

  *::selection {
    background: #fff !important;
    color: #000 !important;
  }
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
      <Search view="directory" />
      <DirectoryFilter />

      <DirectoryList />
      {filterState?.quickViewProjectId && (
        <ProjectQuickView
          key={`directory-qv-${filterState.quickViewProjectId}`}
          id={filterState.quickViewProjectId}
          view="directory"
        />
      )}
    </Container>
  );
};
