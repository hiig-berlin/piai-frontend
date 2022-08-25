import React, { useId } from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";
import { Checkbox } from "~/components/styled/Checkbox";

const Container = styled.div<{ noMargin?: boolean; indent: number }>`
  width: 100%;
  font-family: var(--font-family-sans-serif);
  font-size: var(--text-small-font-size);
  line-height: var(--text-small-line-height);

  margin-bottom: ${({ noMargin }) => (noMargin ? "0" : "0.6em")};
  ${({ indent }) =>
    indent > 0
      ? `padding-left: ${
          indent > 1 ? `calc(${indent} * var(--size-3))` : "var(--size-3)"
        }`
      : ""}
`;

const Label = styled.label`
  display: inline-flex;
  align-items: flex-start;
  max-width: 100%;
  
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
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FieldCheckbox = ({
  name,
  label,
  value,
  isChecked,
  defaultChecked,
  updateState,
  noMargin,
  indent = 0,
}: {
  name: string;
  label: string;
  value: string | number;
  isChecked?: boolean;
  defaultChecked?: boolean;
  noMargin?: boolean;
  indent?: number;
  updateState: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  const id = useId();

  return (
    <Container noMargin={noMargin} indent={indent}>
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
