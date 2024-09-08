import React from "react";
import styled from "styled-components";
import { LegendProps } from "recharts";

interface CustomLegendProps extends LegendProps {
  sum: number;
}

// CustomLegend component to handle the custom legend
const CustomLegend: React.FC<CustomLegendProps> = ({ payload, layout, sum }) => {
  if (!payload) {
    return null; // Handle the case where payload might be undefined
  }

  // Sort payload items based on the order you want
  const sortedPayload = [...payload].sort((a, b) => a.value - b.value);

  return (
    <LegendWrapper sum={sum}>
      {layout === "vertical" && (
        <ul>
          {sortedPayload.map((entry, index) => (
            <li
              key={`item-${index}`}
            >
              <span
                style={{
                  color: entry.color,
                }}
              >
                {entry.value}
              </span>
            </li>
          ))}
        </ul>
      )}
    </LegendWrapper>
  );
};

export default CustomLegend;

const LegendWrapper = styled.div<{sum: any}>`
  height: 100%;
  display: flex;

  ul {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        height: 100%;
        align-self: flex-end;
        list-style: none;
        height: ${({ sum }) => `${sum + 10}%` || "80%"};
        margin: 0 0 0 30px;
        padding: 0;
    
        li {
          list-style: none;

          svg.recharts-surface {
            display: none !important;
          }
  
          span {
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 0.02em;
            font-size: 0.8em;
          }
        }
      }
`;