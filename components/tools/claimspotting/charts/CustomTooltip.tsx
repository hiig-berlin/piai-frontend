import React from 'react';
import { TooltipProps } from 'recharts';

// Define a type for the custom tooltip
interface CustomTooltipProps extends TooltipProps<any, any> {
  topics: { [key: string]: { color: string; order: number } }; // Map of topics to their colors and order
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, topics }) => {
  if (!active || !payload || payload.length === 0) {
    return null; // Return null if there's no active tooltip or payload is empty
  }

  // Extract data from payload
  const data = payload[0]?.payload;
  const total = payload[0]?.payload.total || 1; // Use a total if available or default to 1 to avoid division by zero
  
  if (!data) {
    return null; // Return null if data is undefined
  }

  // Sort topics based on their order
  const sortedKeys = Object.keys(topics).sort((a, b) => topics[a].order - topics[b].order);

  return (
    <div style={{ backgroundColor: '#fff', border: '1px solid #ccc', padding: '10px', borderRadius: '4px' }}>
      <p>{label}</p>
      {sortedKeys.map((key, index) => {
        const value = data[key];
        if (value !== undefined) {
          const percentage = ((value / total) * 100).toFixed(2);
          return (
            <p key={index} style={{ margin: '0', color: topics[key].color }}>
              <strong>{key}:</strong> {value} posts ({percentage}%)
            </p>
          );
        }
        return null;
      })}
    </div>
  );
};

export default CustomTooltip;
