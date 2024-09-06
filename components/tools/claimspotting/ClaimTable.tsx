// ClaimTable.tsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { DataRow } from "~/components/tools/claimspotting/ui/TableData";
import { HeaderRow } from "~/components/tools/claimspotting/ui/TableHeader";
import { formatDate, truncateText } from "~/components/tools/claimspotting/utils";
import { Box } from "~/components/tools/shared/ui/Box";
import { Button } from "~/components/styled/Button";
import type { DataRowProps, SortState, FilterStateProps, ColumnProps } from "~/components/tools/claimspotting/ui/types";
import { Icon, Icons } from "~/components/tools/claimspotting/ui/Icon";
import { Tags, CroppedTag } from "~/components/tools/shared/Styled";


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
    setRows(data.slice(0, NUM_ROWS));
  }, [data]);

  const sortData = (column: string) => {
    const order = sort.column === column && sort.order === "asc" ? "desc" : "asc";
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

  const renderAttributes = (polarising: number, sensationalist: number) => (
    <Icons>
      <Icon type="polarise" active={polarising === 1} />
      <Icon type="bolt" active={sensationalist === 1} />
    </Icons>
  );

  const renderReach = (forwards: number, views: number, siblings: number) => (
    <Icons>
      <Icon type="view">{views}</Icon>
      <Icon type="share">{forwards}</Icon>
      {siblings > 0 && <Icon type="copy">{siblings}</Icon>}
    </Icons>
  );

  const renderTopic = (topic: string) => {
    // console.log("Topic: ", topic, setFilterState);
    return(
    <Tags>
      <CroppedTag
        isActive={false}
        tool="claim"
        onClick={(e) => {
          e.stopPropagation();
          setFilterState &&
            setFilterState((prevState) => {
              const isTopicInArray = prevState.topics.includes(topic);
              const updatedTopics = isTopicInArray
                ? prevState.topics.filter((t) => t !== topic)
                : [...prevState.topics, topic];
              return {
                ...prevState,
                topics: updatedTopics,
              };
            });
        }}
      >
        {topic}
      </CroppedTag>
    </Tags>);
  };


  const columns: ColumnProps[] = [
    { label: strings.columns.date, slug: "Publishing_datetime", sortable: true },
    { label: strings.columns.text, slug: "Text", sortable: true },
    { label: strings.columns.channel, slug: "Channel_Name", sortable: true },
    { label: strings.columns.topics, slug: "Topic", sortable: false },
    { label: strings.columns.narrative, slug: "Narratives", sortable: true },
    { label: strings.columns.attributes, slug: "Polarising", sortable: false },
    { label: strings.columns.reach, slug: "Forwards", sortable: true },
  ];

  const transformedRows = rows.map((row) => ({
    date: formatDate(row.Publishing_datetime),
    text: truncateText(row.Text, 50),
    channel: row.Channel_Name,
    topic: renderTopic(row.Topic),
    narrative: truncateText(row.Narratives, 50),
    attributes: renderAttributes(row.Polarising, row.Sensationalist),
    reach: renderReach(row.Forwards, row.Views, row.Siblings.length),
  }));

  return (
    <ClaimTableWrapper>
      <HeaderRow sortData={sortData} sort={sort} columns={columns} grid="claimlist" />
      {transformedRows.map((transformedRow, index) => (
        <DataRow
          key={index}
          row={rows[index]}
          transformedRow={transformedRow}
          strings={strings}
          showDetails={true} // showDetails only needed in ClaimTable
          grid="claimlist"
        />
      ))}
      {rows.length < data.length && <LoadMore onClick={() => setRows(data.slice(0, rows.length + NUM_ROWS))}>Load more</LoadMore>}
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
