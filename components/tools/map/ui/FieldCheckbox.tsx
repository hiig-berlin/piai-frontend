import React, { useId } from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";
import { Checkbox } from "~/components/styled/Checkbox";

const Container = styled.div`
  margin-bottom: 0.6em;
`;

const Label = styled.label`
  display: inline-block;
  display: flex;
  align-items: flex-start;
  font-family: var(--font-family-sans-serif);
  font-size: var(--text-small-font-size);
  line-height: var(--text-small-line-height);
  cursor: pointer;
`;

const Input = styled(Checkbox)`
  flex-shrink: 0;
  margin-top: 1px;
`;

const StyledLabel = styled.span`
  display: inline-block;
  padding-left: 0.5em;
`;

export const FieldCheckbox = ({
  name,
  label,
  value,
  isChecked,
  defaultChecked,
  updateState,
}: {
  name: string;
  label: string;
  value: string | number;
  isChecked?: boolean;
  defaultChecked?: boolean;
  updateState: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const id = useId();

  return (
    <Container>
      <Label htmlFor={id}>
        <Input
          type="checkbox"
          name={name}
          id={id}
          value={value}
          defaultChecked={defaultChecked}
          checked={isChecked}
          onChange={updateState}
        />
        <StyledLabel>{safeHtml(label)}</StyledLabel>
      </Label>
    </Container>
  );
};
