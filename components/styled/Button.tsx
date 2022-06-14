import styled from "styled-components";

export const Button = styled.button`
  border: 2px solid;
  border-color: inherit;
  background: none;

  cursor: pointer;
  padding: 0.5em 1em;
  margin: var(--size-2);
  position: relative;
  appearance: none;
  user-select: none;

  color: inherit;
  font-family: var(--font-family-sans-serif);
  font-weight: bold;
  font-size: 0.8em;
  ${({ theme }) => theme.applyMixin("uppercase")};

  transition: all ease 0.5s;

  &:hover,
  &:active {
    background: rgba(0, 0, 0, 0.2);
    padding-left: 1.3em;
    padding-right: 1.3em;
  }
`;

export default Button;
