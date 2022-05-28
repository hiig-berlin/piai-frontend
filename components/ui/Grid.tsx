import styled from "styled-components";

type GridProps = {
  templateCols?: string;
  templateRows?: string;
  columnGap?: string;
  rowGap?: string;
};

const StyledGrid = styled.aside<GridProps>`
  display: grid;

  width: 100%;
  ${(props) => props.templateCols ? `grid-template-columns:${props.templateCols};` : ''};
  ${(props) => props.templateRows ? `grid-template-rows:${props.templateRows};` : ''};
  ${(props) => props.columnGap ? `column-gap:${props.columnGap};` : ''};
  ${(props) => props.rowGap ? `row-gap:${props.rowGap};` : ''};
  
`;

export const Grid = (props: GridProps & { children: React.ReactNode }) => {
  return <StyledGrid {...props} />;
};
