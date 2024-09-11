import React from "react";
import styled from "styled-components";
import { TooltipProps } from "recharts";

// Define the types for the topics
interface CustomTooltipProps extends TooltipProps<any, string> {
  topics: string[];
  absoluteData: any[]; // Pass absoluteData
  percentageData: any[]; // Pass percentageData
  colors: string[];
  active?: boolean;
  payload?: any;
  label?: string;
  strings: any;
}

// CustomTooltip component
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  topics,
  absoluteData,
  percentageData,
  strings,
}) => {
  if (active && payload && payload.length) {
    // Find the index in absoluteData and percentageData based on the current label (date)
    const dataIndex = absoluteData.findIndex((entry) => entry.date === label);
    // console.log("Data index/indices: ", dataIndex, dataIndices);

    //remove "Other topics" from topics
    const otherIndex = topics.indexOf(strings?.exclude.label);
    if (otherIndex > -1) {
      topics.splice(otherIndex, 1);
    }

    if (dataIndex === -1) return null; // No matching data

    // console.log("Absolute entries: ", absoluteEntries);
    // console.log("Percentage entries: ", percentageEntries);

    const absoluteEntry = absoluteData[dataIndex];
    const percentageEntry = percentageData[dataIndex];
    const totalEntry = absoluteData[dataIndex].total;

    // flip the order of topics
    const invertedTopics = [...topics].reverse();

    const formatDate = (dateString: string = "") => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    return (
      <TooltipWrapper>
        <h3>{strings?.tooltip?.title} {formatDate(label)}</h3>
        <ul className="topic-list">
          {invertedTopics.map((topic, index) => {
            const absoluteValue = absoluteEntry.topics[topic];
            const percentageValue = percentageEntry.topics[topic];

            const color = payload[index]?.color; // Reuse colors from the payload

            return (
              <li key={`item-${index}`} style={{ color }}>
                <label>{topic}:</label> {percentageValue?.toFixed(1)}%{" "}
                <span className="absolute">({absoluteValue} posts)</span>
              </li>
            );
          })}
        </ul>
        <p className="total">{strings?.tooltip?.total}: {totalEntry}</p>
      </TooltipWrapper>
    );
  }

  return null;
};
export default CustomTooltip;

// Tooltip styling
const TooltipWrapper = styled.div`
  background-color: black;
  color: white;
  padding: var(--size-3);
  border-radius: var(--size-2);
  font-size: 14px;

  .topic-list {
    display: flex;
    flex-direction: column-reverse;
    list-style-type: none;
    padding: 0;
    margin: var(--size-2) 0;

    li {
      margin: 3px 0;
      list-style: none;

      label {
        font-weight: bold;
        // text-transform: uppercase;
        letter-spacing: 0.04em;
        // font-size: 0.95em;
      }

      .absolute {
        opacity: 0.6;
        display: inline-block;
        margin-left: var(--size-1);
        font-family: var(--font-family-monospace);
        font-size: 0.9em;
        letter-spacing: 0em;
      }
    }
  }

  .total {
    color: #666;
    font-family: var(--font-family-monospace);
    font-size: 0.9em;
  }
`;
