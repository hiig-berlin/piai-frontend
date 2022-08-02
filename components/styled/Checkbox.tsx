import styled from "styled-components";

export const Checkbox = styled.input`
  border: 1px solid #fff;
  background-color: #000;
  appearance: none;
  margin: 0;
  padding: 0;
  position: relative;
  width: var(--size-2);
  height: var(--size-2);
  cursor: pointer;
  
  &:after {
    position: absolute;
    content: "";
    display: block;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    top: 1px;
    left: 1px;
    background-color: #000;
  }

  &:checked {
    &:after {
      background-color: #fff;
    }
  }
`;