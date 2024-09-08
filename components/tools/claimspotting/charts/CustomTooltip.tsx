import React from "react";
import styled from "styled-components";
import { TooltipProps } from "recharts";

// Define the types for the topics
interface CustomTooltipProps extends TooltipProps<any, string> {
  topics: string[];
  absoluteData: any[];  // Pass absoluteData
  percentageData: any[];  // Pass percentageData
  colors: string[];
  active?: boolean;
  payload?: any;
  label?: string;
}

// CustomTooltip component
const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
  topics,
  absoluteData,
  percentageData,
}) => {
  if (active && payload && payload.length) {
    // Find the index in absoluteData and percentageData based on the current label (date)
    const dataIndex = absoluteData.findIndex(
      (entry) => entry.date === label
    );

    //remove "Other topics" from topics
    const otherIndex = topics.indexOf("Other topics");
    if (otherIndex > -1) {
      topics.splice(otherIndex, 1);
    }

    if (dataIndex === -1) return null;  // No matching data

    const absoluteEntry = absoluteData[dataIndex];
    const percentageEntry = percentageData[dataIndex];

    // flip the order of topics
    const invertedTopics = topics.reverse();

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric'});
    };

    return (
      <TooltipWrapper>
        <h2 className="label">{`Number of posts published on ${formatDate(label)}`}</h2>
        <ul className="topic-list">
          {invertedTopics.map((topic, index) => {
            const absoluteValue = absoluteEntry.topics[topic];
            const percentageValue = percentageEntry.topics[topic];
            const color = payload[index].color;  // Reuse colors from the payload

            return (
              <li key={`item-${index}`} style={{ color }}>
                <strong>{topic}:</strong> {absoluteValue} ({percentageValue?.toFixed(2)}%)
              </li>
            );
          })}
        </ul>
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

  .label {
    font-weight: bold;
    margin-bottom: 5px;
  }

  .topic-list {
    display: flex;
    flex-direction: column-reverse;
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      margin: 3px 0;
      list-style: none;
    }
  }
`;


