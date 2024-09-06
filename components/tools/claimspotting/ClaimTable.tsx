import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { Button } from "~/components/styled/Button";
import { DataRowProps } from "~/components/tools/claimspotting/ui/types";
import { ClaimTableProps } from "~/components/tools/claimspotting/ui/types";
import { SortState } from "~/components/tools/claimspotting/ui/types";
import { HeaderRow } from "~/components/tools/claimspotting/ui/TableHeader";
import { DataRow } from "~/components/tools/claimspotting/ui/TableData";
import { FilterStateProps } from "~/components/tools/claimspotting/ui/types";

const ClaimTable = ({
  data,
  setFilterState,
  strings,
}: {
  data: any;
  setFilterState: React.Dispatch<React.SetStateAction<FilterStateProps>>;
  strings: any;
}) => {
  const NUM_ROWS = 50;
  const [rows, setRows] = useState<DataRowProps[]>(data.slice(0, NUM_ROWS));
  const [sort, setSort] = useState<SortState>({ column: "Date", order: "asc" });

  useEffect(() => {
    // Load initial rows when data is available
    // if (data.length > 0) {
    //   setRows(data.slice(0, NUM_ROWS));
    // }
    setRows(data.slice(0, NUM_ROWS));
  }, [data]);

  const sortData = (column: string) => {
    const order =
      sort.column === column && sort.order === "asc" ? "desc" : "asc";
    setSort({ column, order });
    setRows(
      [...rows].sort((a, b) => {
        const aVal = a[column as keyof DataRowProps];
        const bVal = b[column as keyof DataRowProps];
        if (aVal < bVal) return order === "asc" ? -1 : 1;
        if (aVal > bVal) return order === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  const loadMore = () => {
    setRows(data.slice(0, rows.length + NUM_ROWS));
  };

  return (
    <ClaimTableWrapper>
      <HeaderRow sortData={sortData} sort={sort} strings={strings} />
      {rows.map((row, index) => (
        <DataRow key={index} row={row} setFilterState={setFilterState} strings={strings} />
      ))}
      {rows.length < data.length && <LoadMore onClick={loadMore}>Load more</LoadMore>}
    </ClaimTableWrapper>
  );
};
export default ClaimTable;

const ClaimTableWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%
  ${({ theme }) => theme.breakpoints.tablet} {
    width: calc(100vw - 4 * var(--size-3) - 3rem);
  }
`;

const LoadMore = styled(Button)`
  margin-top: 1rem;
  align-self: center;
`;
