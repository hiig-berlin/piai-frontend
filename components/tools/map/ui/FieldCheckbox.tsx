import React, { useId } from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";
import { Checkbox } from "~/components/styled/Checkbox";

const Container = styled.div<{ noMargin?: boolean }>`
  margin-bottom: ${({ noMargin }) => (noMargin ? "0" : "0.6em")};
`;

const Label = styled.label`
  display: inline-block;
  display: flex;
  align-items: flex-start;
  font-family: var(--font-family-sans-serif);
  font-size: var(--text-small-font-size);
  line-height: var(--text-small-line-height);
  
  white-space: nowrap;
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
  noMargin,
}: {
  name: string;
  label: string;
  value: string | number;
  isChecked?: boolean;
  defaultChecked?: boolean;
  noMargin?: boolean;
  updateState: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const id = useId();

  return (
    <Container noMargin={noMargin}>
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
        <StyledLabel dangerouslySetInnerHTML={{ __html: safeHtml(label) }} />
      </Label>
    </Container>
  );
};
