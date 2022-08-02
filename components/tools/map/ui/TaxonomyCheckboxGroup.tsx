import React from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";

import type {
  FilterSettingTaxonomyOption,
} from "../context/ContextProviders";
import { FieldCheckbox } from "./FieldCheckbox";

const Container = styled.div`

  margin-top: var(--size-3);
`;

const Options = styled.div``;

const H4 = styled.h4`
  margin-top: 0;
  margin-bottom: 0.5em;
`;


export const TaxonomyCheckboxGroup = ({
  label,
  options,
  activeTerms,
  updateState,
}: {
  label: string;
  activeTerms: Record<number, string> | null | undefined;
  options: FilterSettingTaxonomyOption[] | undefined;
  updateState: (id: number, name: string, isChecked: boolean) => void;
}) => {
  if (!options?.length) return <></>;

  return (
    <Container>
      <H4>{safeHtml(label)}</H4>
      <Options>
        {options.map((option) => (
          <FieldCheckbox
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
