import React, { useEffect, Suspense, useState } from "react";
import { useQuery, QueryFunctionContext } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import Link from "next/link";
import styled from "styled-components";

import { LinkButtonAnimated } from "~/components/styled/Button";
import { appConfig } from "~/config";
import { LoadingBar } from "~/components/styled/LoadingBar";
import { ProjectCard } from "./ProjectCard";
import { useToolStateContext } from "./context/ContextProviders";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Icon } from "../shared/ui/Icon";
import safeHtml from "~/utils/sanitize";

const DraggableDrawer = dynamic(() => import("./map/DraggableDrawer"), {
  suspense: true,
});

const QuickView = styled.div<{ isFilterOpen: boolean }>`
  position: fixed;
  bottom: var(--size-3);
  left: calc(var(--size-3) + var(--size-6));
  z-index: 5;
  height: auto;
  max-height: 75vh;
  width: calc((100vw - var(--size-6) - 2 * var(--size-3)) * 0.4);
  border-radius: var(--size-3);
  overflow: hidden;
  transition: transform 0.35s;

  transform: ${({ isFilterOpen }) =>
    isFilterOpen
      ? "translateX(calc((100vw - var(--size-6) - 2 * var(--size-3)) * 0.3))"
      : "translateX(0)"};
`;

const Panel = styled.div<{
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
    height: auto;
    max-height: 75vh;
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

const Scroller = styled.div`
  height: 100%;
  overflow-y: auto;

  & > * {
    margin-bottom: var(--size-3);
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    // overflow: visible;
  }
`;

export const ProjectQuickView = ({ id }: { id?: number }) => {
  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();
  const { updateMapState, filter } = useToolStateContext();
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

  useEffect(() => {
    updateMapState({
      isDrawerOpen: hasContent,
    });
  }, [hasContent, updateMapState]);

  if (!id || isError) return <></>;

  let content = <></>;

  if (hasContent)
    content = (
      <Panel
        isLoading={isLoading}
        isRefetching={isRefetching}
        isFullHeight={!isTabletLandscapeAndUp && isDrawerFullHeight}
      >
        <Header>
          <h1>{safeHtml(data?.data?.acf?.details?.nameOfProject?.value)}</h1>
        </Header>
        <Scroller>
          <ProjectCard view="quickview" data={data?.data?.acf?.details} />
        </Scroller>
        <Footer>
          <ViewMore>
            <Link href={`/tool/map/project/${data?.data?.slug}`} passHref>
              <LinkButtonAnimated>View full project profile</LinkButtonAnimated>
            </Link>
          </ViewMore>

          {isTabletLandscapeAndUp && (
            <Icon
              onClick={() => {
                updateMapState({
                  quickViewProjectId: null,
                  isDrawerOpen: false,
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
      <QuickView isFilterOpen={filter.isFilterOpen}>{content}</QuickView>
    );

  return (
    <Suspense fallback={<LoadingBar isLoading />}>
      {isLoading && <LoadingBar isLoading={isLoading} />}
      {content}
    </Suspense>
  );
};