import React, { useState } from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";
import { Reveal } from "~/components/ui/Reveal";
import { Icon } from "../../shared/ui/Icon";

import {
  FilterSettingTaxonomyOption,
  FilterSettingTaxonomyOptionRegion,
  FilterSettingTaxonomyOptionRegionChild,
} from "../state/ToolState";

import { ActiveFilterOption } from "./ActiveFilterOption";
import { FieldCheckbox } from "./FieldCheckbox";
import { ClearAll } from "./ClearAll";

const Container = styled.div``;

const OptionsContainer = styled.div`
  padding-top: var(--size-3);
`;

const H4 = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5em;
  display: flex;
  justify-content: space-between;
`;

const Active = styled.div`
  display: flex;
  width: 100%;
  gap: var(--size-3);
`;

const Selected = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-1);
  flex-grow: 1;

  & .labelAll{
    color: var(--color-light-grey);
    font-family: var(--font-family-monospace);
    font-size: var(--text-small-font-size);
  }
`;

const Add = styled.div`
  flex-grow: 0;

  & .svg{
    min-height: var(--size-2);
  }
`;

const OptionsClose = styled.div`
  margin-bottom: var(--size-3);
`;

type RegionOrCountrySelectorNewState = {
  ids: number[];
  name: string[];
  checked: boolean[];
};

const renderOptions = (
  label: string,
  activeTerms: Record<number, string> | null | undefined,
  options:
    | FilterSettingTaxonomyOption[]
    | FilterSettingTaxonomyOptionRegion[]
    | FilterSettingTaxonomyOptionRegionChild[],
  updateState: (
    id: string | number | number[] | string[],
    name: string | string[],
    isChecked: boolean | boolean[]
  ) => void,
  indent: number = 0,
  allOptions: any
) => {
  if (!options?.length) return <></>;

  return (options as any).reduce((carry: any, option: any, index: number) => {
    carry.push(
      <FieldCheckbox
        indent={indent}
        key={`${label}-${option.id}-${index}`}
        label={option.name}
        value={option.id}
        name={`field-${option.id}`}
        isChecked={option.id in (activeTerms ?? {})}
        updateState={(event) => {
          let newstate: RegionOrCountrySelectorNewState = {
            ids: [],
            name: [],
            checked: [],
          };

          if (option?.children?.length) {
            newstate = option.children.reduce(
              (
                carry: any,
                o:
                  | FilterSettingTaxonomyOption
                  | FilterSettingTaxonomyOptionRegion
                  | FilterSettingTaxonomyOptionRegionChild
              ) => {
                carry.ids.push(o.id);
                carry.name.push(o.name);
                carry.checked.push(event.target.checked);
                return carry;
              },
              newstate
            );
          }

          newstate.ids.push(option.id);
          newstate.name.push(option.name);
          newstate.checked.push(event.target.checked);

          if (!event.target.checked && option?.parent) {
            newstate.ids.push(option.parent);
            newstate.name.push("");
            newstate.checked.push(false);
          }

          updateState(newstate.ids, newstate.name, newstate.checked);
        }}
      />
    );

    if (option?.children?.length)
      carry = renderOptions(
        label,
        activeTerms,
        option?.children,
        updateState,
        indent + 1,
        carry
      );

    return carry;
  }, allOptions);
};

export const RegionOrCountrySelector = ({
  label,
  labelAllShown,
  options,
  activeTerms,
  updateState,
  clearAllOnClick,
}: {
  label: string;
  labelAllShown: string;
  options: FilterSettingTaxonomyOptionRegion[] | FilterSettingTaxonomyOption[];
  activeTerms: Record<number, string> | null | undefined;
  clearAllOnClick?: () => void;
  updateState: (
    id: string | number | number[] | string[],
    name: string | string[],
    isChecked: boolean | boolean[]
  ) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Container>
      <H4>
        {safeHtml(label)}
        <Add>
          <Icon
            className="textLink"
            type={isOpen ? "minus" : "plus"}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >{isOpen ? "Collapse" : "Select"}</Icon>
        </Add>
      </H4>

      <Active>
        <Selected>
          {Object.keys(activeTerms ?? {}).length > 0 &&
            Object.keys(activeTerms ?? {}).map((termId: any) => (
              <ActiveFilterOption
                key={`term-${termId}`}
                onRemove={() => {
                  updateState(termId, "", false);
                }}
                label={((activeTerms ?? {}) as any)?.[termId] ?? "unknown"}
              />
            ))}

          {Object.keys(activeTerms ?? {}).length === 0 && (
            <span
              className="labelAll"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              {labelAllShown}
            </span>
          )}
          {typeof clearAllOnClick === "function" &&
          Object.keys(activeTerms ?? {}).length > 0 && (
            <ClearAll onClick={clearAllOnClick} />
          )}{" "}
        </Selected>
        
        
      </Active>

      <Reveal
        open={isOpen}
        id={`${label}-options`}
        role="region"
        position="top"
      >
        <OptionsContainer>
          {renderOptions(label, activeTerms, options, updateState, 0, [])}
        </OptionsContainer>
      </Reveal>
    </Container>
  );
};
