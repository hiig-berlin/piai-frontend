import styled from "styled-components";

export const InputText = styled.input`
  font-family: "TODO:-CUSTOM-FONT", Arial, Helvetica, sans-serif;
  border: 1px solid #000;
  background: #fff;
  position: relative;
  appearance: none;
  width: 100%;
  border-radius: 0;
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  &::placeholder {
    font-family: "TODO:-CUSTOM-FONT", Arial, Helvetica, sans-serif;
  }
`;

export default InputText;
