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
} from "./state/ToolState";
import { CheckboxGroup } from "./ui/CheckboxGroup";
import { RangeSlider } from "./ui/RangeSlider";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { RegionOrCountrySelector } from "./ui/RegionOrCountrySelector";

const Container = styled.div`
  position: relative;
`;

const ActiveFilters = styled.div`
  width: 100%;
  border-top: 1px solid #fff;
  padding-top: var(--size-1);
  margin-top: var(--size-3);
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
  const config = useConfigContext();
  const mapTool = config?.tools?.find((t) => t.slug === "map");

  const filterState = useToolStateFilterState();
  const settingsState = useToolStateSettingsState();
  const { getDefaultState, getFilterState, setFilterState, updateFilterState } =
    useToolStateStoreActions();

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

  const updateTaxonomyState = (
    id: number | string,
    label: string,
    checked: boolean
  ) => {
    const currentState = getFilterState();

    if (!currentState?.terms) return;

    if (checked) {
      if (!(id in currentState?.terms)) {
        currentState.terms[id as number] = label;
      }
    } else {
      if (id in currentState?.terms) {
        delete currentState.terms[id as number];
      }
    }

    maybeUpdateQueryString(currentState);
  };

  const updateContinentState = (
    id: number | string,
    label: string,
    checked: boolean
  ) => {
    const currentState = getFilterState();

    if (!currentState?.continents) return;

    if (checked) {
      if (!(id in currentState?.continents)) {
        currentState.continents[id as number] = label;
      }
    } else {
      if (id in currentState?.continents) {
        delete currentState.continents[id as number];
      }
    }

    maybeUpdateQueryString(currentState);
  };

  const updateCountryState = (
    id: number | string,
    label: string,
    checked: boolean
  ) => {
    const currentState = getFilterState();

    if (!currentState?.countries) return;

    if (checked) {
      if (!(id in currentState?.countries)) {
        currentState.countries[id as number] = label;
      }
    } else {
      if (id in currentState?.countries) {
        delete currentState.countries[id as number];
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
    <Container>
      <RegionOrCountrySelector
        label="Regions"
        labelAllShown="All regions (narrow down using the + to the right)"
        activeTerms={filterState?.continents ?? {}}
        options={settingsState?.continents ?? []}
        updateState={updateContinentState}
      />

      <RegionOrCountrySelector
        label="Countries"
        labelAllShown="All countries (narrow down using the + to the right)"
        activeTerms={filterState?.countries ?? {}}
        options={settingsState?.countries ?? []}
        updateState={updateCountryState}
      />


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
      <CheckboxGroup
        label="Code license"
        activeTerms={filterState?.license ?? {}}
        options={[
          {
            id: "os",
            name: "Open source",
          },
          {
            id: "cs",
            name: "Close source",
          },
        ]}
        updateState={(id: string | number, label: string, checked: boolean) => {
          const currentState = getFilterState();

          if (!currentState?.license) return;

          if (checked) {
            if (!(id in currentState?.license)) {
              currentState.license[id] = label;
            }
          } else {
            if (id in currentState?.license) {
              delete currentState.license[id];
            }
          }

          maybeUpdateQueryString(currentState);
        }}
      />
      <CheckboxGroup
        label="Gender ratio"
        activeTerms={filterState?.genderRatio ?? {}}
        options={[
          {
            id: "lt50",
            name: "< 50% (female/diverse)",
          },
          {
            id: "gte50",
            name: ">= 50% (female/diverse)",
          },
        ]}
        updateState={(id: string | number, label: string, checked: boolean) => {
          const currentState = getFilterState();

          if (!currentState?.genderRatio) return;

          if (checked) {
            if (!(id in currentState?.genderRatio)) {
              currentState.genderRatio[id] = label;
            }
          } else {
            if (id in currentState?.genderRatio) {
              delete currentState.genderRatio[id];
            }
          }

          maybeUpdateQueryString(currentState);
        }}
      />
      <RangeSlider
        label="Release date between"
        min={mapTool?.config?.minYear ?? 1996}
        max={new Date().getFullYear()}
        stepSize={1}
        updateState={(values) => console.log(values)}
      />
    </Container>
  );
};
