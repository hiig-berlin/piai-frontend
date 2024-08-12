import styled from "styled-components";

export const StyledHeading = styled.h2<{ heading: "h0" | "h1" | "h2" | "h3" }>`
  font-family: var(--text-${({ heading }) => heading}-font-family);
  font-weight: var(--text-${({ heading }) => heading}-font-weight);
  font-style: var(--text-${({ heading }) => heading}-font-style);
  font-size: var(--text-${({ heading }) => heading}-font-size);
  line-height: var(--text-${({ heading }) => heading}-line-height);
  margin: var(--text-${({ heading }) => heading}-margin-top) 0
    var(--text-${({ heading }) => heading}-margin-bottom)
    var(--text-${({ heading }) => heading}-margin-left);
`;
