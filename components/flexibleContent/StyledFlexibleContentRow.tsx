import styled from "styled-components";

export const StyledFlexibleContentRow = styled.div<{
  shortBottomMargin?: boolean;
}>`
  margin-bottom: var(
    --size-${({ shortBottomMargin }) => (shortBottomMargin ? 6 : 4)}
  );
`;
