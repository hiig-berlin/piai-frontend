import React, { useEffect, Suspense, useState } from "react";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import styled from "styled-components";

import { LinkButtonAnimated } from "~/components/styled/Button";
import { appConfig } from "~/config";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { ProjectCard } from "./ProjectCard";
import { useCssVarsStateIsTabletLandscapeAndUpState } from "~/components/state/CssVarsState";
import { Icon } from "../shared/ui/Icon";
import safeHtml from "~/utils/sanitize";
import { Scroller } from "./Styled";
import {
  useToolStateFilterState,
  useToolStateStoreActions,
} from "./state/ToolState";

const DraggableDrawer = dynamic(() => import("./map/DraggableDrawer"), {
  suspense: true,
});

const QuickView = styled.div<{ isFilterOpen: boolean; isDirectory: boolean }>`
  position: fixed;
  bottom: var(--size-3);
  left: calc(var(--size-3) + var(--size-6));
  z-index: 12;
  height: auto;
  max-height: 75vh;
  width: calc((100vw - var(--size-6) - 3 * var(--size-3)) * 0.333);
  border-radius: var(--size-3);
  overflow: hidden;
  transition: transform 0.35s, width 0.35s;
  transform: ${({ isFilterOpen }) =>
    isFilterOpen
      ? "translateX(calc((100vw - var(--size-6) - var(--size-5) - 3 * var(--size-3)) * 0.333))"
      : "translateX(0)"};

  ${({ isDirectory, theme, isFilterOpen }) =>
    isDirectory
      ? `
    max-height: 100%;

    ${theme.breakpoints.tabletLandscape} {
      bottom: ${`${ isDirectory ? "auto" : "0"}`};
      top: ${`${ isDirectory ? "var(--size-3)" : "auto"}`};
      padding-bottom: ${`${ isDirectory ? "0" : "var(--size-3)"}`};
      max-height: ${`${ isDirectory ? "calc(100vh - var(--lbh) - 2 * var(--size-3))" : "75vh"}`};
      height: ${`${ isDirectory ? "calc(100vh - var(--lbh) - var(--size-3))" : "auto"}`};
      transform: ${
        isFilterOpen
          ? "translateX(calc(var(--size-3) + ((100vw - var(--size-6) - var(--size-5) - 3 * var(--size-3)) * 0.666)))"
          : "translateX(calc(var(--size-3) + ((100vw - var(--size-6) - var(--size-5) - 3 * var(--size-3)) * 0.5)))"
      };

      width: ${
        isFilterOpen
          ? "calc((100vw - var(--size-6) - var(--size-5) - 3 * var(--size-3)) * 0.333)"
          : "calc((100vw - var(--size-6) - var(--size-5) - 3 * var(--size-3)) * 0.5)"
      };
    }
  `
      : ``}

  @media print {
    position: static;
    transform: none;
    width: 100%;
    height: auto;
    max-height: auto;
  }
`;

const Panel = styled.div<{
  isDirectory: boolean;
  isLoading: boolean;
  isRefetching: boolean;
  isFullHeight: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  box-sizing: border-box;
  background: #000;
  pointer-events: all;
  padding: var(--size-3);

  height: ${({ isFullHeight }) =>
    isFullHeight
      ? "calc(100vh - var(--lbh, 0) - var(--size-5))"
      : "calc(50vh - (0.5 * var(--lbh, 0)) - var(--size-5))"};

  & > div {
    flex-grow: 1;
    transition: opacity var(--transition-speed-link);
    opacity: ${({ isRefetching }) => (isRefetching ? 0.5 : 1)};
  }

  & > div:first-child,
  & > span:first-child,
  & > div:last-child {
    flex-grow: 0;
    flex-shrink: 0;
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    border-radius: ${({ isDirectory }) =>
      isDirectory ? "var(--size-3)" : "0"};
    height: auto;
    max-height: ${({ isDirectory }) => (isDirectory ? "100%" : "75vh")};
  }

  @media print {
    height: auto;
    max-height: auto;
  }
`;

const Header = styled.div`
  display: flex;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  padding-bottom: var(--size-6);

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    justify-content: space-between;
    padding-bottom: 0;
  }

  ${({ theme }) => theme.applyMixin("noPrint")}
`;

const ViewMore = styled.div`
  display: flex;
  justify-content: center;
  // padding-top: var(--size-3);
  align-self: flex-start;
  a {
    color: var(--color-piai-map-highlight) !important;
    border-color: var(--color-piai-map-highlight);

    &:visited {
      color: var(--color-piai-map-highlight);
    }
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    justify-content: flex-start;

    a {
      margin-left: 0;
      &:hover {
        margin-left: -0.3em;
      }
    }
  }
`;

const QVScroller = styled(Scroller)`
  height: 100%;
  overflow-y: auto;

  & > * {
    margin-bottom: var(--size-3) !important;
  }
`;

export const ProjectQuickView = ({
  id,
  view,
}: {
  id?: number;
  view: string;
}) => {
    const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();

  const filterState = useToolStateFilterState();
  
  const { updateFilterState } = useToolStateStoreActions();
  const [isDrawerFullHeight, setIsDrawerFullHeight] = useState(false);

  const { isLoading, isSuccess, isRefetching, data, isError } = useQuery(
    ["project-quickview", id],
    async ({ signal }: QueryFunctionContext) => {
      return fetch(`${appConfig.cmsUrl}/map/detail/${id}`, {
        // Pass the signal to one fetch
        signal,
      }).then(async (response) => await response.json());
    },
    {
      keepPreviousData: true,
    }
  );

  const hasContent = isSuccess && data?.data?.id;
  console.log(hasContent);
  useEffect(() => {
    updateFilterState({
      isDrawerOpen: hasContent,
    });
  }, [hasContent, updateFilterState]);

  if (!id || isError) return <></>;

  let content = <></>;

  if (hasContent)
    content = (
      <Panel
        isDirectory={view === "directory"}
        isLoading={isLoading}
        isRefetching={isRefetching}
        isFullHeight={!isTabletLandscapeAndUp && isDrawerFullHeight}
      >
        <Header>
          <h1>{safeHtml(data?.data?.acf?.details?.nameOfProject?.value)}</h1>
        </Header>
        <QVScroller>
          <ProjectCard view="quickview" data={data?.data?.acf?.details} />
        </QVScroller>
        <Footer>
          <ViewMore>
            <Link href={`/tool/map/project/${data?.data?.slug}`} passHref>
              <LinkButtonAnimated>View full project profile</LinkButtonAnimated>
            </Link>
          </ViewMore>

          {isTabletLandscapeAndUp && (
            <Icon
              onClick={() => {
                updateFilterState({
                  isDrawerOpen: false,
                  quickViewProjectId: null,
                });
              }}
              type="back"
              className="textLink back inBox"
            >
              <span>Close</span>
            </Icon>
          )}
        </Footer>
      </Panel>
    );

  if (!isTabletLandscapeAndUp && hasContent)
    content = (
      <DraggableDrawer onFullHeightChange={setIsDrawerFullHeight}>
        {content}
      </DraggableDrawer>
    );

  if (isTabletLandscapeAndUp && hasContent)
    content = (
      <QuickView
        isFilterOpen={
          filterState.isFilterOpen ||
          (view !== "directory" && filterState.isSearchOpen)
        }
        isDirectory={view === "directory"}
      >
        {content}
      </QuickView>
    );

  return (
    <Suspense fallback={<LoadingBar isLoading />}>
      {isLoading && <LoadingBar isLoading={isLoading} />}
      {content}
    </Suspense>
  );
};
