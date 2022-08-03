import { useRouter } from "next/router";
import React, {
  useEffect,
  useState,
  useCallback,
} from "react";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";

import { Icon } from "../shared/ui/Icon";

import {
  defaultToolState,
  FilterState,
  useToolStateContext,
} from "./context/ContextProviders";
import { createQueryFromState } from "./map/utils";
import { TaxonomyCheckboxGroup } from "./ui/TaxonomyCheckboxGroup";
import { ActiveFilterOption } from "./ui/ActiveFilterOption";
import { SidebarDrawer } from "./ui/SidebarDrawer";

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

const defaultQueryString = createQueryFromState(defaultToolState.filter, {
  onlyIds: "1",
}).join("&");

export const Filter = () => {
  const router = useRouter();

  const { getFilterState, setFilterState, filter, settings } =
    useToolStateContext();

  const [, setIsInit] = useState(false);

  const maybeUpdateQueryString = (state: FilterState) => {
    const currentQuery = createQueryFromState(state, { onlyIds: "1" });
    const currentQueryString = currentQuery.join("&");

    let queryString = "";
    if (currentQuery?.length && currentQueryString !== defaultQueryString) {
      queryString = `?${currentQuery.join("&").replace("&onlyIds=1", "")}`;
    }

    if (
      queryString !== (document.location.search ?? "").replace("&onlyIds=1", "")
    ) {
      router.push(`${document?.location.pathname}${queryString}`, undefined, {
        shallow: true,
      });
    }
  };

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
    setFilterState({
      ...cloneDeep(defaultToolState.filter),
      isFilterOpen: getFilterState().isFilterOpen,
    });
  }, [setFilterState, getFilterState]);

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

    if (settings?.styleUrl !== "") {
      updateFromQuery(true);
      setIsInit(true);
    }

    const onRouterChangeComplete = () => {
      updateFromQuery(false);
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
    <SidebarDrawer statusFlagKey="isFilterOpen" title="Filter Projects">
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
    </SidebarDrawer>
  );
};
