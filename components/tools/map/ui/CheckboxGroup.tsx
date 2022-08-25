import React from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";

import type { FilterSettingTaxonomyOption } from "../state/ToolState";
import { FieldCheckbox } from "./FieldCheckbox";

const Container = styled.div`
  width: 100%;
`;

const Options = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-2);
`;

const H4 = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5em;
`;

export const CheckboxGroup = ({
  label,
  options,
  activeTerms,
  updateState,
}: {
  label: string;
  activeTerms: Record<number, string> | null | undefined;
  options: FilterSettingTaxonomyOption[] | undefined;
  updateState: (id: string | number, name: string, isChecked: boolean) => void;
}) => {
  if (!options?.length) return <></>;

  return (
    <Container>
      <H4>{safeHtml(label)}</H4>
      <Options>
        {options.map((option) => (
          <FieldCheckbox
            noMargin
            key={`tax-${label}-${option.id}`}
            label={option.name}
            value={option.id}
            name={`field-${option.id}`}
            isChecked={option.id in (activeTerms ?? {})}
            updateState={(event) => {
              updateState(option.id, option.name, event.target.checked);
            }}
          />
        ))}
      </Options>
    </Container>
  );
};
