import styled from "styled-components";
import type {
  HeaderRowProps,
  HeaderCellProps,
  SortArrowProps,
  ColumnProps,
} from "./types";
import { ButtonNormalized } from "~/components/styled/Button";
import { TableGrid } from "../Styled";
import { narrow } from "../../map/Styled";

export const HeaderRow: React.FC<HeaderRowProps> = ({ sortData, sort, strings }) => {
  // give columns the type columnprops
  const columns: ColumnProps[] = [
    { label: strings.columns.date, slug: "Publishing_datetime", sortable: true },
    { label: strings.columns.text, slug: "Text", sortable: true },
    { label: strings.columns.channel, slug: "Channel_Name", sortable: true },
    { label: strings.columns.topics, slug: "Topic", sortable: false },
    { label: strings.columns.narrative, slug: "Narratives", sortable: true },
    { label: strings.columns.attributes, slug: "Polarising", sortable: false },
    { label: strings.columns.reach, slug: "Forwards", sortable: true },
  ];

  return (
    <TableGrid>
      {columns.map(
        (
          {
            label,
            slug,
            sortable,
          }: { label: string; slug: string; sortable: boolean },
          index: number
        ) => (
          <HeaderCell
            key={index}
            column={{ label, slug, sortable }}
            sortData={sortData}
            sort={sort}
          />
        )
      )}
    </TableGrid>
  );
};

const HeaderCell: React.FC<HeaderCellProps> = ({ column, sortData, sort }) => {
  return (
    <HeaderCellWrapper>
      {column?.sortable && (
        <ButtonNormalized onClick={() => sortData(column.slug)}>
          <h4>{column.label}</h4>
          <SortArrow
            active={sort.column === column?.slug}
            order={sort.order}
          />
        </ButtonNormalized>
      )}
      {!column?.sortable && <h4>{column?.label}</h4>}
    </HeaderCellWrapper>
  );
};

const HeaderCellWrapper = styled.div`
  display: flex;
  align-items: center;

  h4 {
    ${({ theme }) => theme.applyMixin("uppercase")};
    ${narrow}
    letter-spacing: 0.04em;
    font-size: 14px;
    margin: 0;
  }

  button {
    display: flex;
    align-items: center;
    color: white;

    &:hover > div {
      display: flex;
    }
  }
`;

export const SortArrow: React.FC<SortArrowProps> = ({ order, active }) => {
  return (
    <SortArrowWrapper
      active={active}
      direction={order === "asc" ? "up" : "down"}
    >
      <span>▲</span>
      <span>▼</span>
    </SortArrowWrapper>
  );
};

const SortArrowWrapper = styled.div<{ active: boolean; direction: string }>`
  margin-left: var(--size-1);

  display: ${({ active }) => (active ? "flex" : "none")};

  span:first-child {
    opacity: ${({ direction }) => (direction === "up" ? 1 : 0.3)};
  }

  span:last-child {
    opacity: ${({ direction }) => (direction === "down" ? 1 : 0.3)};
  }
`;
