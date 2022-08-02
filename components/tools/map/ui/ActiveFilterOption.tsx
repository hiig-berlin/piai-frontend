import React from "react";
import styled from "styled-components";
import safeHtml from "~/utils/sanitize";
import { Icon } from "../../shared/ui/Icon";

const Option = styled.div`
  display: inline-flex;
  align-items: center;
  font-size: var(--text-small-font-size);
  line-height: var(--text-small-line-height);
  border-radius: 4px;
  background-color: var(--color-dark-grey);
  border: 1px solid #fff;
  padding: 0.3em 0 0.5em 0.5em;
  gap: var(--size-1);
`;

export const ActiveFilterOption = ({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) => {
  return (
    <Option>
      {safeHtml(label)}
      <Icon type="close" onClick={onRemove} />
    </Option>
  );
};
