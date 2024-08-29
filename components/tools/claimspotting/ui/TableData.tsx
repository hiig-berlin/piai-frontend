import React, { useState } from "react";
import styled from "styled-components";
import { ToolSvgBackground } from "../../shared/ToolSvgBackground";
import type { DataRowComponentProps, DataRowProps } from "./types";
import { Tag, Tags } from "../../shared/Styled";
import { TableGrid } from "../Styled";
import { Icon as LabeldIcon } from "../../shared/ui/Icon";

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const truncateText = (text: string, length: number): string =>
  text.length > length ? text.slice(0, length) + "..." : text;

const renderAttributes = (
  polarising: number,
  sensationalist: number,
  // factual: number
) => (
  <Icons>
    <Icon type="polarise" active={polarising === 1 ? true : false} />
    <Icon type="bolt" active={sensationalist === 1 ? true : false} />
    {/* <Icon type="search" active={factual === 1 ? true : false} /> */}
  </Icons>
);

const renderReach = (forwards: number, views: number, siblings: number) => (
  <Icons>
    <Icon type="view">{views}</Icon>
    <Icon type="share">{forwards}</Icon>
    {siblings > 0 && <Icon type="copy">{siblings}</Icon>}
  </Icons>
);

const Icon = ({
  type,
  active,
  children,
}: {
  type: string;
  active?: boolean;
  children?: any;
}) => (
  <IconWrapper active={active}>
    <ToolSvgBackground type={type} width="1rem" />
    {children ? children : null}
  </IconWrapper>
);

export const DataRow: React.FC<DataRowComponentProps> = ({
  row,
  setFilterState,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const columns = [
    "date",
    "text",
    "channel",
    "topics",
    "narrative",
    "attributes",
    "reach",
  ];

  // const renderTopics = (topics: string[]) => (
  //   <Tags>
  //     {topics.map((topic, idx) => (
  //       <CroppedTag
  //         isActive={false}
  //         tool="claim"
  //         key={idx}
  //         onClick={(e) =>{
  //           e.stopPropagation();
  //           setFilterState((prevState) => {
  //             // Check if the topic is already in the array
  //             const isTopicInArray = prevState.topics.includes(topic);

  //             // Add or remove the topic from the array
  //             const updatedTopics = isTopicInArray
  //               ? prevState.topics.filter((t) => t !== topic) // Remove topic if already present
  //               : [...prevState.topics, topic]; // Add topic if not present

  //             // Return the new state
  //             return {
  //               ...prevState,
  //               topics: updatedTopics,
  //             };
  //           })}
  //         }
  //       >
  //         {topic}
  //       </CroppedTag>
  //     ))}
  //   </Tags>
  // );

  const renderTopic = (topic: string) => (
    <Tags>
      <CroppedTag
          isActive={false}
          tool="claim"
          onClick={(e) =>{
            e.stopPropagation();
            setFilterState((prevState) => {
              // Check if the topic is already in the array
              const isTopicInArray = prevState.topics.includes(topic);

              // Add or remove the topic from the array
              const updatedTopics = isTopicInArray
                ? prevState.topics.filter((t) => t !== topic) // Remove topic if already present
                : [...prevState.topics, topic]; // Add topic if not present

              // Return the new state
              return {
                ...prevState,
                topics: updatedTopics,
              };
            })}
          }
        >
          {topic}
        </CroppedTag>
    </Tags>
  );

  const transformedRow: any = {
    date: formatDate(row.Publishing_datetime),
    text: truncateText(row.Text, 50),
    channel: row.Channel_Name,
    topics: renderTopic(row.Topic),
    narrative: truncateText(row.Narratives, 50),
    attributes: renderAttributes(row.Polarising, row.Sensationalist),
    reach: renderReach(row.Forwards, row.Views, row.Siblings.length),
  };

  const handleRowClick = (row: any) => {
    // console.log("Opening details for row", row);
    setShowDetails(!showDetails);
  };

  return (
    <>
      <TableGrid onClick={() => handleRowClick(row)}>
        {columns.map((column, index) => (
          <DataCell key={index}>{transformedRow[column]}</DataCell>
        ))}
      </TableGrid>
      {showDetails && (
        <Details>
          <h2>Post details</h2>
          <div className="row">
            <div className="column">
              <p>{row.Text}</p>
              <div className="row">
                <div className="column">
                  <h3>Channel</h3>
                  <LabeldIcon type="globe" url={row.Link}>
                    {row.Channel_Name}
                  </LabeldIcon>
                </div>
                <div className="column">
                  <h3>Members</h3>
                  <LabeldIcon type="globe" url={row.Link}>
                    {row.Member_count}
                  </LabeldIcon>
                </div>
              </div>
            </div>
            <div className="column">
              <h3>Link to post</h3>
              <LabeldIcon type="globe" url={row.Link}>
                {row.Link}
              </LabeldIcon>
              {row.Siblings.length > 0 && <h3>Silblings or copies</h3>}
              {row.Siblings.map((sibling: any, idx: number) => (
                <LabeldIcon type="copy" url={sibling} key={idx}>
                  {sibling}
                </LabeldIcon>
              ))}
            </div>
          </div>
        </Details>
      )}
    </>
  );
};

const Details = styled.div`
  padding: var(--size-3);
  border-radius: var(--size-2);
  margin: 0 calc(var(--size-3) * -1 - var(--size-2));
  border: solid var(--color-bg-tool);
  border-width: var(--size-2);
  font-size: 0.9em;
  line-height: 1.4;
  color: #fff;
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }

  .row {
    display: flex;
    gap: var(--size-6);
  }

  .column {
    display: flex;
    flex-direction: column;
    gap: var(--size-1);

    h3 {
      margin-top: var(--size-3);
      &:first-of-type {
        margin-top: 0;
      }
    }
  }
`;

const DataCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
`;

const CroppedTag = styled(Tag)<{ isActive: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 6rem;

  &:after {
    content: "";
    display: block;
    width: var(--size-1);
    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 80%);
    right: 0px;
    position: absolute;
    height: 100%;
  }
`;

const Icons = styled.div`
  display: flex;
  gap: var(--size-2);
`;

const IconWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  align-items: center;
  gap: 3px;

  span {
    max-height: 1rem;
    min-height: 0.8rem;
    filter: ${({ active }) =>
      active
        ? "invert(64%) sepia(12%) saturate(3897%) hue-rotate(316deg) brightness(110%) contrast(82%)"
        : "none"};
  }
`;
