import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { ToolSvgBackground } from "../shared/ToolSvgBackground";
import { Icon } from "../shared/ui/Icon";
import {
  useToolStateFilterState,
  useToolStateStoreActions,
} from "./state/ToolState";
import { createQueryFromState } from "./map/utils";

const sidebarPadding = "var(--size-3)";

const ToolSubmenu = styled.div`
  background: #0008;
  // margin-left: calc(0px - var(--size-2));
  // margin-right: calc(0px - var(--size-2));
  padding: ${sidebarPadding} 0;
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  & .subMenuItem {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: 0.5em;
    white-space: break-spaces;
    width: min-content;
    min-width: 100%;
    line-height: 1.3em;
    text-align: center;
    color: white;
    display: block;

    .svg {
      margin: 0 auto var(--size-1);
    }
  }
`;

const ActionItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${sidebarPadding};
  padding: ${sidebarPadding} 0 var(--size-1);
`;

// TODO: add actionItem onClick events + active status

// TODO: decide if highlight (active filter collapsed) is crucial
//       --> either solve through css filter (with volor variable?)
//           or change icons to inline svgs…

export const Submenu = ({ tool, slug }: { tool?: string; slug?: string }) => {
  const filterState = useToolStateFilterState();
  const { updateFilterState } = useToolStateStoreActions();

  let queryString = createQueryFromState(filterState).join("&")
  queryString = queryString !== "" ? `?${queryString}`:queryString;
  
  return (
    <ToolSubmenu>
      <div>
        <Link passHref href={`/tool/map${queryString}`}>
          <a className="subMenuItem">
            <ToolSvgBackground
              className="svg icon"
              type="map"
              position="left center"
              height="2em"
              width="2em"
            />
            Map view
          </a>
        </Link>
        {slug === "index" && (
          <ActionItems>
            <Icon
              type="search"
              active
              onClick={() => {
                updateFilterState({
                  isSearchOpen: !filterState.isSearchOpen,
                  isFilterOpen: false,
                });
              }}
            />
            <Icon
              type="filter"
              onClick={() => {
                updateFilterState({
                  isSearchOpen: false,
                  isFilterOpen: !filterState.isFilterOpen,
                });
              }}
            />
          </ActionItems>
        )}
      </div>
      <div className="actionItems">
        <Link passHref href={`/tool/map/directory${queryString}`}>
          <a className="subMenuItem">
            <ToolSvgBackground
              className="svg icon"
              type="list"
              position="left center"
              height="2em"
              width="2em"
            />
            Directory
          </a>
        </Link>
        {slug === "directory" && (
          <ActionItems>
            <Icon type="search" />
            <Icon type="filter" />
          </ActionItems>
        )}
      </div>
      <div>
        <Link passHref href="/tool/map/about">
          <a className="subMenuItem">
            <ToolSvgBackground
              className="svg icon"
              type="info"
              position="center center"
              height="2em"
              width="2em"
            />
            About
          </a>
        </Link>
      </div>
    </ToolSubmenu>
  );
};
