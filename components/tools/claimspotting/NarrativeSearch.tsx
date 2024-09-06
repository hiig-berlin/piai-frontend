import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { Box, BoxLight } from "~/components/tools/shared/ui/Box";
import { SearchForm } from "./ui/FieldSearch";
import { HeaderRow } from "./ui/TableHeader";
import {
  ColumnProps,
  SortState,
  DataRowProps,
} from "~/components/tools/claimspotting/ui/types";
import { DataRow } from "./ui/TableData";
import { formatDate } from "~/components/tools/claimspotting/utils";
import { Icon } from "~/components/tools/shared/ui/Icon";


export const NarrativeSearchBar = ({
  searchQuery,
  setSearchQuery,
  strings,
}: {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  strings: any;
}) => {

  const [inputValue, setInputValue] = useState(searchQuery);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  // Update searchQuery when user stops typing
  useEffect(() => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 500); // Adjust the delay here (500ms is typical for debounce)

    setTypingTimeout(timeout);

    return () => clearTimeout(timeout);
  }, [inputValue, setSearchQuery]);

  const handleInputChange = (value: string) => {
    setInputValue(value); // Update input field value as user types
  };

  return (
    <BoxLight className="searchInput">
      <h2>Search by narrative</h2>
      <SearchForm
        placeholder={strings?.placeholder}
        onSubmit={(value: string) => setSearchQuery(value)}
        onChange={(value: string) => handleInputChange(value)}
        onResetClick={() => setSearchQuery("")}
        isError={false}
        query={inputValue}
      />
    </BoxLight>
  );
};

export const NarrativeSearchResults = ({
  data,
  strings,
  searchQuery,
}: {
  data: any;
  strings: any;
  searchQuery: string;
}) => {
  const NUM_ROWS = 50;
  const [rows, setRows] = useState<DataRowProps[]>(data.slice(0, NUM_ROWS));
  const [sort, setSort] = useState<SortState>({ column: "Date", order: "asc" });

  useEffect(() => {
    // Load initial rows when data is available
    if (data.length > 0) {
      setRows(data.slice(0, NUM_ROWS));
    }
    // setRows(data.slice(0, NUM_ROWS));
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

  const renderLink = (link: string) => (
    <Icon type="globe" url={link}>
      {link}
  </Icon>
  );

  const columns: ColumnProps[] = [
    {
      label: strings.columns.date,
      slug: "Publishing_datetime",
      sortable: true,
    },
    { label: strings.columns.channel, slug: "Channel_Name", sortable: true },
    { label: strings.columns.link, slug: "Link", sortable: true },
  ];

  const transformedRows = rows.map((row) => ({
    date: formatDate(row.Publishing_datetime),
    channel: row.Channel_Name,
    link: renderLink(row.Link),
  }));

  return (
    <Box className="searchResults">
      <h2>Pots with a matching narrative</h2>
      {searchQuery != "" ? (
        <>
          <HeaderRow
            columns={columns}
            sortData={sortData}
            sort={sort}
            grid="search"
          ></HeaderRow>
          {transformedRows.map((item: any, index: number) => (

            <DataRow key={index} transformedRow={item} grid="search"/>

          ))}
        </>
      ) : (
        <p>Please enter a search phrase to find matching posts.</p>
      )}
    </Box>
  );
};

export const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-columns: 1fr;
  gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
`;
