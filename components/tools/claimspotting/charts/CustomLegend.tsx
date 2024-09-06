import React from "react";
import styled from "styled-components";
import { LegendProps } from "recharts";

// CustomLegend component to handle the custom legend
const CustomLegend: React.FC<LegendProps> = ({ payload, layout }) => {
  if (!payload) {
    return null; // Handle the case where payload might be undefined
  }

  // Sort payload items based on the order you want
  const sortedPayload = [...payload].sort((a, b) => a.value - b.value);

  return (
    <LegendWrapper>
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

const LegendWrapper = styled.div`
  height: 100%;

  ul {
        display: flex;
        flex-direction: column-reverse;
        justify-content: space-between;
        height: 100%;
        align-self: flex-start;
        list-style: none;
        height: 90%;
    
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