import { useRouter } from "next/router";
import React, { useEffect, useCallback } from "react";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";

import { Icon } from "../shared/ui/Icon";

import {
  defaultQueryString,
  defaultToolState,
  FilterState,
  useToolStateContext,
} from "./context/ContextProviders";
import { createQueryFromState } from "./map/utils";
import { TaxonomyCheckboxGroup } from "./ui/TaxonomyCheckboxGroup";
import { ActiveFilterOption } from "./ui/ActiveFilterOption";

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

  const { getFilterState, setFilterState, filter, settings } =
    useToolStateContext();

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
      ...cloneDeep(defaultToolState.filter),
      isFilterOpen: true,
      quickViewProjectId: getFilterState().quickViewProjectId,
      totalCount: getFilterState().totalCount,
      filteredCount: getFilterState().totalCount,
    };

    setFilterState(newState);
    maybeUpdateQueryString(newState);
  }, [setFilterState, getFilterState, maybeUpdateQueryString]);

  const updateFromQuery = useCallback(
    (isInitCall: boolean) => {
      if (document.location.search === "") {
        if (!isInitCall) {
          resetFilter();
        }
      } else if (settings?.styleUrl !== "") {
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
              ...((settings as any)?.[key]?.options ?? []).reduce(
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
          setFilterState({
            ...getFilterState(),
            ...newState,
          });
        }
      }
    },
    [settings, setFilterState, getFilterState, resetFilter]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    // bit hacky but as the component is rendered several times we want to make sure to
    // only check the query string once (on load)
    if (settings?.styleUrl !== "" && !isInit) {
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
  }, [settings?.styleUrl]);

  let activeFilters: any[] = [];

  if (Object.keys(filter?.terms ?? {}).length) {
    activeFilters = [
      ...activeFilters,
      ...Object.keys(filter?.terms ?? {}).map((termId: any) => (
        <ActiveFilterOption
          key={`term-${termId}`}
          onRemove={() => {
            updateTaxonomyState(termId, "", false);
          }}
          label={((filter?.terms ?? {}) as any)?.[termId] ?? "unknown"}
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
      {(settings?.industrialSector?.options?.length ?? 0) > 0 && (
        <TaxonomyCheckboxGroup
          label="Industrial Sector"
          activeTerms={filter?.terms ?? {}}
          options={settings?.industrialSector?.options}
          updateState={updateTaxonomyState}
        />
      )}
      {(settings?.industrialSector?.options?.length ?? 0) > 0 && (
        <TaxonomyCheckboxGroup
          label="Use of AI"
          activeTerms={filter?.terms ?? {}}
          options={settings?.useOfAi?.options}
          updateState={updateTaxonomyState}
        />
      )}
      {(settings?.funding?.options?.length ?? 0) > 0 && (
        <TaxonomyCheckboxGroup
          label="Type of funding"
          activeTerms={filter?.terms ?? {}}
          options={settings?.funding?.options}
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
