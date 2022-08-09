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
  FilterStateRecords,
  FilterSettingTaxonomyOptionRegion,
  FilterSettingTaxonomyOptionRegionChild,
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

  const updateFormStateRecord = (
    key: keyof FilterStateRecords,
    id: string | number,
    label: string,
    checked: boolean
  ) => {
    const currentState: FilterState = getFilterState();

    if (!currentState?.[key] || !currentState[key]) return;

    if (currentState[key] instanceof Object && currentState[key]) {
      if (checked) {
        if (!(id in (currentState[key] ?? {}))) {
          (currentState as any)[key][id] = label;
        }
      } else {
        if (id in (currentState[key] ?? {})) {
          delete (currentState as any)[key][id];
        }
      }

      maybeUpdateQueryString(currentState);
    }
  };

  const updateTaxonomyState = (
    id: number | string,
    label: string,
    checked: boolean
  ) => {
    updateFormStateRecord("terms", id, label, checked);
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

        const regions = params.get("regions") ?? "";
        if (regions !== "" && settingsState.regions) {
          const activeRegions = regions.split(",");

          const flattenRegions = (
            regions:
              | FilterSettingTaxonomyOptionRegion[]
              | FilterSettingTaxonomyOptionRegionChild[],
            carry: any
          ) => {
            if (!regions?.length) return carry;

            return (regions as any).reduce((carry: any, region: any) => {
              carry = {
                ...carry,
                [region.id]: region.name,
                ...(region.children.length
                  ? flattenRegions(region.children, {})
                  : {}),
              };
              return carry;
            }, carry);
          };

          const allRegions = flattenRegions(settingsState.regions, {});

          newState.regions = activeRegions.reduce(
            (carry: any, regionId: string) => ({
              ...carry,
              [regionId]: allRegions[regionId],
            }),
            {}
          );
        } else {
          newState.regions = {};
        }

        ["countries", "license", "genderRatio"].reduce(
          (state: any, key: any) => {
            const selected = params.get(key) ?? "";
            if (selected !== "" && (settingsState as any)?.[key]?.length) {
              const active = selected.split(",");

              const allTerms = ((settingsState as any)[key] as any).reduce(
                (carry: any, term: any) => {
                  carry = {
                    ...carry,
                    [term.id]: term.name,
                  };
                  return carry;
                },
                {}
              );

              (newState as any)[key] = active.reduce(
                (carry: any, id: string) => ({
                  ...carry,
                  [id]: allTerms[id],
                }),
                {}
              );
            } else {
              (newState as any)[key] = {};
            }
            return state;
          },
          newState
        );

        const dateFrom = params.get("dateFrom") ?? "";
        const dateUntil = params.get("dateUntil") ?? "";
        if (dateFrom !== "" && dateUntil !== "") {
          newState.dateFrom = dateFrom;
          newState.dateUntil = dateUntil;
        } else {
          newState.dateFrom = "";
          newState.dateUntil = "";
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

  activeFilters = ["terms", "license", "genderRatio"].reduce(
    (carry: any, key: any) => {
      return [
        ...carry,
        ...Object.keys((filterState as any)[key] ?? {}).map((id: any) => (
          <ActiveFilterOption
            key={`active-${key}-${id}`}
            onRemove={() => {
              updateFormStateRecord(key, id, "", false);
            }}
            label={
              (((filterState as any)[key] ?? {}) as any)?.[id] ?? "unknown"
            }
          />
        )),
      ];
    },
    []
  );

  if (filterState.dateFrom && filterState.dateUntil) {
    activeFilters.push(
      <ActiveFilterOption
        key={`active-date`}
        onRemove={() => {
          const currentState: FilterState = getFilterState();

          currentState.dateFrom = null;
          currentState.dateUntil = null;

          maybeUpdateQueryString(currentState);
        }}
        label={`${filterState.dateFrom} - ${filterState.dateUntil}`}
      />
    );
  }

  return (
    <Container>
      <RegionOrCountrySelector
        label="Regions"
        labelAllShown="All regions (narrow down using the + to the right)"
        activeTerms={filterState?.regions ?? {}}
        options={settingsState?.regions ?? []}
        updateState={(id: number | string, label: string, checked: boolean) => {
          updateFormStateRecord("regions", id, label, checked);
        }}
      />

      <RegionOrCountrySelector
        label="Countries"
        labelAllShown="All countries (narrow down using the + to the right)"
        activeTerms={filterState?.countries ?? {}}
        options={settingsState?.countries ?? []}
        updateState={(id: number | string, label: string, checked: boolean) => {
          updateFormStateRecord("countries", id, label, checked);
        }}
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
        options={settingsState.license}
        updateState={(id: number | string, label: string, checked: boolean) => {
          updateFormStateRecord("license", id, label, checked);
        }}
      />
      <CheckboxGroup
        label="Gender ratio"
        activeTerms={filterState?.genderRatio ?? {}}
        options={settingsState.genderRatio}
        updateState={(id: number | string, label: string, checked: boolean) => {
          updateFormStateRecord("genderRatio", id, label, checked);
        }}
      />
      <RangeSlider
        label="Release date between"
        min={mapTool?.config?.minYear ?? 1996}
        max={new Date().getFullYear()}
        initialValueFrom={
          filterState.dateFrom ?? mapTool?.config?.minYear ?? 1996
        }
        initialValueUntil={
          filterState.dateUntil ?? new Date().getFullYear()
        }
        stepSize={1}
        updateState={(values) => {
          const currentState: FilterState = getFilterState();

          if (values?.length !== 2) return;

          if (
            values[0] === (mapTool?.config?.minYear ?? 1996) &&
            values[1] === new Date().getFullYear()
          ) {
            currentState.dateFrom = null;
            currentState.dateUntil = null;
          } else {
            currentState.dateFrom = values[0];
            currentState.dateUntil = values[1];
          }
          maybeUpdateQueryString(currentState);
        }}
      />
    </Container>
  );
};
