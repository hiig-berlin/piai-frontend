import { useRouter } from "next/router";
import React, {
  startTransition,
  useEffect,
  useState,
  useCallback,
} from "react";
import styled from "styled-components";
import cloneDeep from "lodash/cloneDeep";

import DisplayAbove from "~/components/styled/DisplayAbove";
import DisplayBelow from "~/components/styled/DisplayBelow";
import { useModal } from "~/hooks/useModal";
import { Icon } from "../shared/ui/Icon";

import {
  defaultToolState,
  FilterState,
  useToolStateContext,
} from "./context/ContextProviders";
import { createQueryFromState } from "./map/utils";
import { TaxonomyCheckboxGroup } from "./ui/TaxonomyCheckboxGroup";
import { ActiveFilterOption } from "./ui/ActiveFilterOption";

const FilterContainer = styled.div<{
  isOpen: boolean;
  isOpening: boolean;
  isClosing: boolean;
}>`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 4;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s;
  opacity: ${({ isOpening, isOpen, isClosing }) =>
    isOpening || (isOpen && !isClosing) ? 1 : 0};
  transform: ${({ isOpening, isOpen, isClosing }) =>
    isOpening || isOpen || isClosing ? "translateX(0)" : "translateX(-105vw)"};

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    padding-left: var(--size-6);
    padding-bottom: var(--size-3);
    height: calc(100% - var(--lbh) - var(--tool-map-ot));
    max-width: calc(
      var(--size-6) + (100vw - var(--size-6) - 2 * var(--size-3)) * 0.3
    );

    opacity: 1;

    transition: transform 0.3s;

    transform: ${({ isOpening, isOpen, isClosing }) =>
      (isOpening || isOpen) && !isClosing
        ? "translateX(0)"
        : "translateX(calc(-100% - var(--size-6)))"};
  }
`;

const Panel = styled.div<{
  isLoading: boolean;
  isRefetching: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  box-sizing: border-box;
  background: #000;
  pointer-events: all;
  padding: var(--size-3) var(--size-4) calc(var(--size-7) + var(--size-2))
    var(--size-4);

  height: 100%;

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
    padding: var(--size-3);
    border-top-right-radius: var(--size-3);
    border-bottom-right-radius: var(--size-3);
  }
`;

const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Footer = styled.div``;

const Scroller = styled.div`
  height: 100%;
  overflow-y: auto;

  ${({ theme }) => theme.applyMixin("styledScrollbar")}
`;

const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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

  const { isOpen, isOpening, isClosing, open, close } = useModal({
    defaultIsOpen: false,
    openingAnimationLength: 350,
    closeAnimationLength: 350,
  });

  const [isInit, setIsInit] = useState(false);
  const closeFilter = () => {
    setFilterState({
      ...getFilterState(),
      isFilterOpen: false,
    });
  };

  useEffect(() => {
    startTransition(() => {
      if (filter.isFilterOpen) {
        open();
      } else {
        close();
      }
    });
  }, [filter.isFilterOpen, open, close]);

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
    <FilterContainer {...{ isOpen, isOpening, isClosing }}>
      <Panel isLoading={false} isRefetching={false}>
        <Header>
          <DisplayBelow breakpoint="tabletLandscape">
            <Icon
              onClick={closeFilter}
              type="back"
              className="textLink back inBox"
            >
              <span>Close</span>
            </Icon>
          </DisplayBelow>
          <h3>FILTER PROJECTS</h3>
        </Header>

        <Scroller>
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
        </Scroller>

        <Footer>
          <DisplayAbove breakpoint="tabletLandscape">
            <CloseButtonContainer>
              <Icon
                onClick={closeFilter}
                type="back"
                className="textLink back inBox"
              >
                <span>Close</span>
              </Icon>
            </CloseButtonContainer>
          </DisplayAbove>
        </Footer>
      </Panel>
    </FilterContainer>
  );
};
