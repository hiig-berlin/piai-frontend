import React, { useState } from "react";
import styled from "styled-components";
import { useModal } from "~/hooks/useModal";
import safeHtml from "~/utils/sanitize";
import { Icon } from "../../shared/ui/Icon";
import {
  FilterSettingTaxonomyOption,
  FilterSettingTaxonomyOptionContinent,
  FilterSettingTaxonomyOptionContinentChild,
} from "../state/ToolState";
import { ActiveFilterOption } from "./ActiveFilterOption";
import { FieldCheckbox } from "./FieldCheckbox";

const Container = styled.div`
  margin-top: var(--size-3);
`;

const OptionsContainer = styled.div<{
  isOpening: boolean;
  isOpen: boolean;
  isClosing: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  transition: opacity 0.3s;
  background-color: #000;
  opacity: ${({ isOpening, isOpen, isClosing }) =>
    (isOpening || isOpen) && !isClosing ? 1 : 0};
  height: 100%;
  width: 100%;
  transform: translateX(
    ${({ isOpening, isOpen, isClosing }) =>
      isOpening || isOpen || isClosing ? "0" : "-105%"}
  );
  pointer-events: none;
`;

const Options = styled.div`
  pointer-events: all;
  background-color: #000;
  height: 100%;
  width: 100%;
`;

const H4 = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5em;
`;

const Active = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: var(--size-3);
`;

const Selected = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-1);
  flex-grow: 1;
`;

const Add = styled.div`
  flex-grow: 0;
`;

const OptionsClose = styled.div`
  margin-bottom: var(--size-3);
`;

const renderOptions = (
  label: string,
  activeTerms: Record<number, string> | null | undefined,
  options:
    | FilterSettingTaxonomyOption[]
    | FilterSettingTaxonomyOptionContinent[]
    | FilterSettingTaxonomyOptionContinentChild[],
  updateState: (id: string | number, name: string, isChecked: boolean) => void,
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
          updateState(option.id, option.name, event.target.checked);
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
}: {
  label: string;
  labelAllShown: string;
  options:
    | FilterSettingTaxonomyOptionContinent[]
    | FilterSettingTaxonomyOption[];
  activeTerms: Record<number, string> | null | undefined;
  updateState: (id: string | number, name: string, isChecked: boolean) => void;
}) => {
  const { open, close, isOpen, isOpening, isClosing } = useModal({
    defaultIsOpen: false,
    openingAnimationLength: 350,
    closeAnimationLength: 350,
  });

  return (
    <>
      <Container>
        <H4>{safeHtml(label)}</H4>
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
              <span>{labelAllShown}</span>
            )}
          </Selected>
          <Add>
            <Icon
              type="plus"
              onClick={() => {
                open();
              }}
            />
          </Add>
        </Active>
      </Container>

      <OptionsContainer {...{ isOpening, isOpen, isClosing }}>
        {(isOpen || isClosing || isOpening) && (
          <Options>
            <OptionsClose>
              <Icon
                type="close"
                onClick={() => {
                  close();
                }}
              >
                Close
              </Icon>
            </OptionsClose>
            {renderOptions(label, activeTerms, options, updateState, 0, [])}
          </Options>
        )}
      </OptionsContainer>
    </>
  );
};
