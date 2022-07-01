import styled, { css } from "styled-components";

export const ButtonNormalized = styled.button`
  font-family: var(--text-family-sans-serif);
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  position: relative;
  appearance: none;
  user-select: none;
  color: #000;
`;


const baseStyling = css`
  border: 2px solid;
  border-color: inherit;

  padding: 0.5em 1em;
  margin: var(--size-2);

  color: inherit;
  font-family: var(--font-family-sans-serif);
  font-weight: bold;
  font-size: 0.8em;
  ${({ theme }) => theme.applyMixin("uppercase")};

  transition: all ease 0.5s;
`

const animated = css`
  &:active {
    background: rgba(0, 0, 0, 0.2);
    padding-left: 1.3em;
    padding-right: 1.3em;
    margin-left: calc(var(--size-2) - 0.3em);
    margin-right: calc(var(--size-2) - 0.3em);
  }

  @media (any-pointer: fine) {
    &:hover {
      background: rgba(0, 0, 0, 0.2);
      padding-left: 1.3em;
      padding-right: 1.3em;
      margin-left: calc(var(--size-2) - 0.3em);
      margin-right: calc(var(--size-2) - 0.3em);
    }
  }
`

export const Button = styled(ButtonNormalized)`
  ${baseStyling}
  ${animated}
`;

export const LinkButton = styled.a`
  ${baseStyling}
  color: #fff;
  border-color: #fff;

  &:visited,
  &:link {
    color: #fff;
  }
`;

export const LinkButtonAnimated = styled(LinkButton)`
  ${animated}
`;
