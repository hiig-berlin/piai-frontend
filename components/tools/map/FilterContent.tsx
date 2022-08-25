import { useRouter } from "next/router";
import React, { useCallback } from "react";
import styled from "styled-components";

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
} from "./state/ToolState";
import { CheckboxGroup } from "./ui/CheckboxGroup";
import { RangeSlider } from "./ui/RangeSlider";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { RegionOrCountrySelector } from "./ui/RegionOrCountrySelector";
import { ClearAll } from "./ui/ClearAll";

const Container = styled.div`
  position: relative;
  display: flex;
  gap: var(--size-3);
  flex-direction: column;
`;

const ActiveFilters = styled.div<{ withRegions: boolean }>`
  width: 100%;
  border-top: ${({ withRegions }) => (withRegions ? "1px solid #fff" : "none")};
  padding-top: var(--size-1);
  margin-top: ${({ withRegions }) => (withRegions ? "var(--size-3)" : "0")};
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-1);
`;

export const FilterContent = ({ view }: { view: string }) => {
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
    id: string | number | number[] | string[],
    label: string | string[],
    checked: boolean | boolean[]
  ) => {
    const currentState: FilterState = getFilterState();

    if (!currentState?.[key] || !currentState[key]) return;

    const ids = Array.isArray(id) ? id : [id];
    const labels = Array.isArray(label) ? label : [label];
    const arrChecked = Array.isArray(checked) ? checked : [checked];

    if (ids.length !== labels.length || labels.length !== arrChecked.length)
      return;

    if (currentState[key] instanceof Object && currentState[key]) {
      ids.forEach((val: any, index: number) => {
        if (arrChecked[index]) {
          if (!(val in (currentState[key] ?? {}))) {
            (currentState as any)[key][val] = labels[index];
          }
        } else {
          if (val in (currentState[key] ?? {})) {
            delete (currentState as any)[key][val];
          }
        }
      });

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
      regions: getFilterState().regions,
      countries: getFilterState().countries,
    };

    setFilterState(newState);
    maybeUpdateQueryString(newState);
  }, [getDefaultState, setFilterState, getFilterState, maybeUpdateQueryString]);

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
      {view !== "map" && (
        <RegionOrCountrySelector
          label="Regions"
          labelAllShown="All regions (narrow down using the + to the right)"
          activeTerms={filterState?.regions ?? {}}
          options={settingsState?.regions ?? []}
          clearAllOnClick={() => {
            updateFilterState({
              regions: {},
            });
          }}
          updateState={(
            id: number | string | number[] | string[],
            label: string | string[],
            checked: boolean | boolean[]
          ) => {
            updateFormStateRecord("regions", id, label, checked);
          }}
        />
      )}

      {view !== "map" && (
        <RegionOrCountrySelector
          label="Countries"
          labelAllShown="All countries (narrow down using the + to the right)"
          activeTerms={filterState?.countries ?? {}}
          options={settingsState?.countries ?? []}
          clearAllOnClick={() => {
            updateFilterState({
              countries: {},
            });
          }}
          updateState={(
            id: number | string | number[] | string[],
            label: string | string[],
            checked: boolean | boolean[]
          ) => {
            updateFormStateRecord("countries", id, label, checked);
          }}
        />
      )}

      {activeFilters?.length > 0 && (
        <ActiveFilters withRegions={view !== "map"}>
          {activeFilters}

          <ClearAll
            onClick={() => {
              resetFilter();
            }}
          />
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
        valueFrom={filterState.dateFrom ?? mapTool?.config?.minYear ?? 1996}
        valueUntil={filterState.dateUntil ?? new Date().getFullYear()}
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
