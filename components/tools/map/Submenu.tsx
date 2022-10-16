import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { ToolSvgBackground } from "../shared/ToolSvgBackground";
import { Icon } from "../shared/ui/Icon";
import {
  useToolStateFilterState,
  useToolStateStoreActions,
} from "./state/ToolState";
import { createCompareQueryFromState, createQueryFromState } from "./map/utils";
import { useRouter } from "next/router";
import { useCssVarsStateIsTabletLandscapeAndUpState } from "~/components/state/CssVarsState";

const sidebarPadding = "var(--size-3)";

const ToolSubmenu = styled.div`
  background: #0008;

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${sidebarPadding} 0;
  }

  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  & .subMenuItem {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: 1em;
    white-space: break-spaces;
    width: min-content;
    min-width: 100%;
    line-height: 1.3em;
    text-align: left;
    color: white;
    display: flex;
    gap: var(--size-3);

    .svg {
      font-size: 0.5em;
    }

    ${({ theme }) => theme.breakpoints.tablet} {
      font-size: 0.5em;
      text-align: center;
      display: block;
      gap: 0;

      .svg {
        font-size: 1em;
        margin: 0 auto var(--size-1);
      }
    }
  }
`;

const ActionItems = styled.div`
  display: none;

  ${({ theme }) => theme.breakpoints.tablet} {
    display: flex;
  }

  flex-direction: column;
  align-items: center;
  gap: ${sidebarPadding};
  padding: ${sidebarPadding} 0 var(--size-1);
`;

export const Submenu = ({ tool, slug }: { tool?: string; slug?: string }) => {
  const router = useRouter();
  const filterState = useToolStateFilterState();
  
  const { updateFilterState } = useToolStateStoreActions();
  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();
  return (
    <ToolSubmenu>
      <div>
        <Link passHref href={`/tool/map`}>
          <a
            className="subMenuItem"
            onClick={(e) => {
              e.preventDefault();

              updateFilterState({
                isFilterOpen: isTabletLandscapeAndUp,
                isSearchOpen: false,
                countries: {},
                regions: {},
                quickViewProjectId: null,
              });
              router.push(
                {
                  pathname: "/tool/map",
                  search: createQueryFromState(
                    {
                      ...filterState,
                      countries: {},
                      regions: {},
                      isFilterOpen: true,
                      isSearchOpen: false,
                    },
                    null,
                    ["filter", "search", "keyword", "empty"]
                  ),
                },
                undefined,
                {
                  shallow: true,
                }
              );
            }}
          >
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
              type="filter"
              active={createCompareQueryFromState(filterState) !== ""}
              nonMuted={filterState.isFilterOpen}
              onClick={() => {
                const newState = {
                  ...filterState,
                  isSearchOpen: false,
                  keyword: "",
                  isFilterOpen: !filterState.isFilterOpen,
                };
                updateFilterState(newState);

                router.push(
                  {
                    pathname: "/tool/map",
                    search: createQueryFromState(newState, null, [
                      "search",
                      "keyword",
                      "empty",
                    ]),
                  },
                  undefined,
                  {
                    shallow: true,
                  }
                );
              }}
            />
            <Icon
              type="search"
              nonMuted={filterState.isSearchOpen}
              onClick={() => {
                updateFilterState({
                  isSearchOpen: !filterState.isSearchOpen,
                  isFilterOpen: false,
                  keyword: "",
                });
                router.push(
                  {
                    pathname: "/tool/map",
                    search: `?search=${
                      !filterState.isSearchOpen ? 1 : 0
                    }&keyword=`,
                  },
                  undefined,
                  {
                    shallow: true,
                  }
                );
              }}
            />
          </ActionItems>
        )}
      </div>
      <div className="actionItems">
        <Link passHref href={`/tool/map/directory`}>
          <a
            className="subMenuItem"
            onClick={(e) => {
              e.preventDefault();

              updateFilterState({
                isFilterOpen: isTabletLandscapeAndUp,
                isSearchOpen: false,
                keyword: "",
                quickViewProjectId: null,
              });
              router.push(
                {
                  pathname: "/tool/map/directory",
                  search: createQueryFromState(
                    {
                      ...filterState,
                      isFilterOpen: true,
                      isSearchOpen: false,
                    },
                    null,
                    ["filter", "search", "keyword", "empty"]
                  ),
                },
                undefined,
                {
                  shallow: true,
                }
              );
            }}
          >
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
            <Icon
              type="filter"
              nonMuted={filterState.isFilterOpen}
              active={createCompareQueryFromState(filterState) !== ""}
              onClick={() => {
                const newState = {
                  ...filterState,
                  isSearchOpen: false,
                  keyword: "",
                  isFilterOpen: !filterState.isFilterOpen,
                };
                updateFilterState(newState);

                router.push(
                  {
                    pathname: "/tool/map/directory",
                    search: createQueryFromState(newState, null, [
                      "search",
                      "keyword",
                      "empty",
                    ]),
                  },
                  undefined,
                  {
                    shallow: true,
                  }
                );
              }}
            />
            <Icon
              type="search"
              nonMuted={filterState.isSearchOpen}
              onClick={() => {
                updateFilterState({
                  isFilterOpen: false,
                  isSearchOpen: !filterState.isSearchOpen,
                  keyword: "",
                });
                router.push(
                  {
                    pathname: "/tool/map/directory",
                    search: `?search=${
                      !filterState.isSearchOpen ? 1 : 0
                    }&keyword=`,
                  },
                  undefined,
                  {
                    shallow: true,
                  }
                );
              }}
            />
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
