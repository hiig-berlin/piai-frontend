import styled from "styled-components";

export const SimbaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);
  min-width: calc(100vw - var(--size-6));
  min-height: 100vh;

  h1,
  h2,
  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")};
  }

  h1 {
    line-height: 1em;
  }

  h2 {
    font-size: var(--text-body-font-size-tool) * 1.1;
    font-weight: bold;
    margin-top: 0 !important;
  }

  h3 {
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    // margin: var(--size-4) 0 calc(0px - var(--size-3));
  }

  ul li::marker {
    content: "— ";
    position: absolute;
  }

  textarea {
    background: transparent;
    boder: 1px solid white;
    color: white;
    font-size: 0.8em;
    padding: var(--size-2);
    border-radius: var(--size-1);
    height: fit-content;
    min-height: 10em;
    width: 100%;
  }
`;