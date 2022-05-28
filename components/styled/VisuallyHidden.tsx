import styled from "styled-components";

export const VisuallyHidden = styled.div<{ disabled?: boolean }>`
  ${({ disabled }) =>
    !disabled
      ? `
        border: 0px;
        clip: rect(0px, 0px, 0px, 0px);
        height: 1px;
        width: 1px;
        margin: -1px;
        padding: 0px;
        overflow: hidden;
        white-space: nowrap;
        position: absolute;
        overflow: hidden;
      `
      : ``}
`;
