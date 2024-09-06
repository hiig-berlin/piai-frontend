// components/TrendingTopics.tsx
import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box } from "../shared/ui/Box";

// Define the type for the data object structure
type DataPoint = {
  Access_datetime: string;
  Channel_Name: string;
  data: {
    Publishing_date: string;
    Topic: {
      [key: string]: number;
    };
  };
};

// Props for the component
interface TrendingTopicsProps {
  data: DataPoint[];
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ data }) => {
  // Extracts and formats the data for the AreaChart non normalised
  // const processChartData = () => {
  //   return data.map((entry) => {
  //     const {
  //       Access_datetime,
  //       data: { Topic },
  //     } = entry;

  //     return {
  //       date: new Date(Access_datetime).toLocaleDateString("en-GB"), // Format date to "dd/mm/yyyy"
  //       ...Topic, // Spread all topics into this object
  //     };
  //   });
  // };

  const processChartData = () => {
    return data.map((entry) => {
      const {
        Access_datetime,
        data: { Topic },
      } = entry;
      const total = Object.values(Topic).reduce((sum, value) => sum + value, 0); // Get total count for the date

      // Calculate raw percentages and round off
      const rawPercentages = Object.keys(Topic).reduce((acc, key) => {
        acc[key] = (Topic[key] / total) * 100;
        return acc;
      }, {} as { [key: string]: number });

      // Adjust the values so they sum to exactly 100%
      const totalPercentage = Object.values(rawPercentages).reduce(
        (sum, value) => sum + value,
        0
      );
      const adjustment = 100 - totalPercentage;

      // Find the topic with the maximum value to adjust it
      const maxTopicKey = Object.keys(rawPercentages).reduce((maxKey, key) =>
        rawPercentages[key] > rawPercentages[maxKey] ? key : maxKey
      );

      rawPercentages[maxTopicKey] += adjustment; // Apply the adjustment to the largest value

      // Format the final data for Recharts
      const normalizedData = {
        date: new Date(Access_datetime).toLocaleDateString("en-GB"), // Format date to "dd/mm/yyyy"
        ...rawPercentages, // Spread the adjusted percentages
      };

      return normalizedData;
    });
  };

  // Get the list of topics for the stacked areas
  const getTopics = () => {
    const firstEntry = data[0]?.data?.Topic || {};
    return Object.keys(firstEntry); // Extract topic names from the first entry
  };
  // Assign unique colors to each topic
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#0088FE",
    "#00C49F",
  ];

  // const toPercent = (decimal: any, fixed = 0) =>
  //   `${(decimal * 100).toFixed(fixed)}%`;

  return (
    <Box>
      <h2>Trending Topics</h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={processChartData()}
          width={500}
          height={400}
          stackOffset="expand"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            {getTopics().map((topic, index) => (
              <linearGradient
                id={`color${index}`}
                key={index}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor={colors[index % colors.length]}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={colors[index % colors.length]}
                  stopOpacity={0}
                />
              </linearGradient>
            ))}
          </defs>
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(tick) => `${tick * 100}%`} domain={[0, 1]} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)}%`} />
          <Legend />
          {getTopics().map((topic, index) => (
            <Area
              key={topic}
              type="monotone"
              dataKey={topic}
              stackId="1"
              stroke={colors[index % colors.length]}
              fillOpacity={1}
              fill={`url(#color${index})`}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TrendingTopics;
