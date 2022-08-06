import { useRouter } from "next/router";
import React, { useEffect, useCallback } from "react";
import styled from "styled-components";

import { Icon } from "../shared/ui/Icon";

import { createQueryFromState } from "./map/utils";
import { TaxonomyCheckboxGroup } from "./ui/TaxonomyCheckboxGroup";
import { ActiveFilterOption } from "./ui/ActiveFilterOption";
import {
  useToolStateFilterState,
  useToolStateSettingsState,
  useToolStateStoreActions,
  defaultQueryString,
  FilterState,
} from "./state/toolStateStore";

const ActiveFilters = styled.div`
  width: 100%;
  border-top: 1px solid #fff;
  padding-top: var(--size-1);

  display: flex;
  flex-wrap: wrap;
  gap: var(--size-1);
`;

const ClearAll = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

let isInit = false;
let previousPathName = "";
export const FilterContent = () => {
  const router = useRouter();

  const filterState = useToolStateFilterState();
  const settingsState = useToolStateSettingsState();
  const { getDefaultState, getFilterState, setFilterState, updateFilterState } = useToolStateStoreActions();

  const maybeUpdateQueryString = useCallback(
    (state: FilterState) => {
      const currentQuery = createQueryFromState(state, { onlyIds: "1" });
      const currentQueryString = currentQuery.join("&");

      let queryString = "";
      if (currentQuery?.length && currentQueryString !== defaultQueryString) {
        queryString = `?${currentQuery.join("&").replace("&onlyIds=1", "")}`;
      }

      if (
        queryString !==
        (document.location.search ?? "")
          .replace("&onlyIds=1", "")
          .replace("&empty=1", "")
      ) {
        router.push(
          {
            pathname: router.pathname,
            search: queryString !== "" ? queryString : "?empty=1",
          },
          undefined,
          {
            shallow: true,
          }
        );
      }
    },
    [router]
  );

  const updateTaxonomyState = (id: number, label: string, checked: boolean) => {
    const currentState = getFilterState();

    if (!currentState?.terms) return;

    if (checked) {
      if (!(id in currentState?.terms)) {
        currentState.terms[id] = label;
      }
    } else {
      if (id in currentState?.terms) {
        delete currentState.terms[id];
      }
    }

    maybeUpdateQueryString(currentState);
  };

  const resetFilter = useCallback(() => {
    const newState = {
      ...getDefaultState().filter,
      isFilterOpen: true,
      quickViewProjectId: getFilterState().quickViewProjectId,
      totalCount: getFilterState().totalCount,
      filteredCount: getFilterState().totalCount,
    };

    setFilterState(newState);
    maybeUpdateQueryString(newState);
  }, [getDefaultState, setFilterState, getFilterState, maybeUpdateQueryString]);

  const updateFromQuery = useCallback(
    (isInitCall: boolean) => {
      if (document.location.search === "") {
        if (!isInitCall) {
          resetFilter();
        }
      } else if (settingsState?.styleUrl !== "") {
        const newState: any = {};

        const params = new URLSearchParams(document.location.search);

        const term = params.get("term") ?? "";
        if (term !== "") {
          const terms = term.split(",");

          const allTerms = [
            "funding",
            "industrialSector",
            "useOfAi",
            "isProjectOpenSource",
          ].reduce((carry: any, key: any) => {
            return {
              ...carry,
              ...((settingsState as any)?.[key]?.options ?? []).reduce(
                (c: any, term: any) => ({
                  ...c,
                  [term.id]: term.name,
                }),
                {}
              ),
            };
          }, {});

          newState.terms = terms.reduce(
            (carry: any, termId: string) => ({
              ...carry,
              [termId]: allTerms[termId],
            }),
            {}
          );
        } else {
          newState.terms = {};
        }

        if (Object.keys(newState).length) {
          updateFilterState({
            ...newState,
          });
        }
      }
    },
    [settingsState, updateFilterState, resetFilter]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    // bit hacky but as the component is rendered several times we want to make sure to
    // only check the query string once (on load)
    if (settingsState?.styleUrl !== "" && !isInit) {
      updateFromQuery(true);
      isInit = true;
      previousPathName = document.location.pathname;
    }

    const onRouterChangeComplete = (url: string) => {
      if (
        previousPathName === document.location.pathname &&
        url.replace("?empty=1", "") !== ""
      )
        updateFromQuery(false);

      previousPathName = document.location.pathname;
    };
    router.events.on("routeChangeComplete", onRouterChangeComplete);

    return () => {
      router.events.off("routeChangeComplete", onRouterChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settingsState?.styleUrl]);

  let activeFilters: any[] = [];

  if (Object.keys(filterState?.terms ?? {}).length) {
    activeFilters = [
      ...activeFilters,
      ...Object.keys(filterState?.terms ?? {}).map((termId: any) => (
        <ActiveFilterOption
          key={`term-${termId}`}
          onRemove={() => {
            updateTaxonomyState(termId, "", false);
          }}
          label={((filterState?.terms ?? {}) as any)?.[termId] ?? "unknown"}
        />
      )),
    ];
  }

  return (
    <>
      {activeFilters?.length > 0 && (
        <ActiveFilters>
          {activeFilters}

          <ClearAll>
            <Icon
              type="close"
              onClick={() => {
                resetFilter();
              }}
            >
              Clear all
            </Icon>
          </ClearAll>
        </ActiveFilters>
      )}
      {(settingsState?.industrialSector?.options?.length ?? 0) > 0 && (
        <TaxonomyCheckboxGroup
          label="Industrial Sector"
          activeTerms={filterState?.terms ?? {}}
          options={settingsState?.industrialSector?.options}
          updateState={updateTaxonomyState}
        />
      )}
      {(settingsState?.industrialSector?.options?.length ?? 0) > 0 && (
        <TaxonomyCheckboxGroup
          label="Use of AI"
          activeTerms={filterState?.terms ?? {}}
          options={settingsState?.useOfAi?.options}
          updateState={updateTaxonomyState}
        />
      )}
      {(settingsState?.funding?.options?.length ?? 0) > 0 && (
        <TaxonomyCheckboxGroup
          label="Type of funding"
          activeTerms={filterState?.terms ?? {}}
          options={settingsState?.funding?.options}
          updateState={updateTaxonomyState}
        />
      )}
      xxx
      <br />
      xxx Open Source
      <br />
      xxx Gender Parity
      <br />
      xxx Date Range
    </>
  );
};
