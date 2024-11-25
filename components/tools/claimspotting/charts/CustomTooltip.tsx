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

// Define the types for the topics
interface NarrativeTooltipProps extends TooltipProps<any, string> {
  active?: boolean;
  payload?: any;
  label?: string;
}

const formatDate = (dateString: string = "", mode: string = "long") => {
  const date = new Date(dateString);

  return mode === "short"
    ? date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })
    : date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

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

    return (
      <TooltipWrapper>
        <h3>
          {strings?.tooltip?.title} {formatDate(label)}
        </h3>
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
        <p className="total">
          {strings?.tooltip?.total}: {totalEntry}
        </p>
      </TooltipWrapper>
    );
  }

  return null;
};
export default CustomTooltip;

export const NarrativeTooltip: React.FC<NarrativeTooltipProps> = ({
  payload,
  active,
}) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const data = payload[0].payload;
    const date = formatDate(data.date, "short");
    return (
      <TooltipWrapper opacity={0.7} slim={true}>
        <label>
          {date}: <span className="value">{value} posts</span>
        </label>
      </TooltipWrapper>
    );
  }

  return null;
};

// Tooltip styling
const TooltipWrapper = styled.div<{ opacity?: number; slim?: boolean }>`
  background-color: ${({ theme, opacity }) =>
    opacity ? theme.color("black", opacity) : "black"};
  color: white;
  padding: ${({ slim }) => (slim ? "var(--size-1)" : "var(--size-3)")};
  border-radius: ${({ slim }) => (slim ? "var(--size-1)" : "var(--size-2)")};
  font-size: 14px;
  position: relative;
  top: ${({ slim }) => (slim ? "-10px" : "0")};

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

  .value {
    color: #fff;
    font-weight: bold;
    font-family: var(--font-family-monospace);
    opacity: 0.9;
  }
`;
