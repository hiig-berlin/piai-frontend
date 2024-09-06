import React from "react";
import styled from "styled-components";

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
import { Box } from "~/components/tools/shared/ui/Box";
import CustomLegend from "~/components/tools/claimspotting/charts/CustomLegend";
import CustomTooltip from "~/components/tools/claimspotting/charts/CustomTooltip";

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
  threshold?: number; // Add threshold as a prop
  exclude: string[]; // Add exclude as a prop
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({
  data,
  threshold = 0,
  exclude = [],
}) => {
  // Extract and format the data for the AreaChart, normalizing values to percentages
  const processChartData = () => {
    return data.map((entry) => {
      const {
        Access_datetime,
        data: { Topic },
      } = entry;
      const total = Object.values(Topic).reduce((sum, value) => sum + value, 0); // Get total count for the date

      // Filter out the "Other" topic and calculate raw percentages
      const filteredTopic = Object.keys(Topic)
        .filter((key) => !exclude.includes(key))
        .reduce((obj, key) => {
          obj[key] = Topic[key];
          return obj;
        }, {} as { [key: string]: number });

      const totalFiltered = Object.values(filteredTopic).reduce(
        (sum, value) => sum + value,
        0
      );
      const rawPercentages = Object.keys(filteredTopic).reduce((acc, key) => {
        acc[key] = (filteredTopic[key] / totalFiltered) * 100;
        return acc;
      }, {} as { [key: string]: number });

      console.log("rawPercentages", rawPercentages, "Totalfiltered: ", totalFiltered, "Total: ", total);

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

      console.log("normalizedData", normalizedData);

      return normalizedData;
    });
  };

  // Filter topics that had at least one data point exceeding the threshold and sort them by total percentage
  const getTopics = () => {
    const allTopics = data.map((entry) => {
      const { Topic } = entry.data;
      const filteredTopic = Object.keys(Topic)
        .filter((key) => !exclude.includes(key))
        .reduce((obj, key) => {
          obj[key] = Topic[key];
          return obj;
        }, {} as { [key: string]: number });
      return filteredTopic;
    });

    // Compute total percentages for each topic across all data points
    const topicTotals = Object.keys(allTopics[0]).reduce((acc, topic) => {
      acc[topic] = allTopics.reduce((total, entry) => {
        return (
          total +
          (entry[topic] / Object.values(entry).reduce((a, b) => a + b, 0)) * 100
        );
      }, 0);
      return acc;
    }, {} as { [key: string]: number });

    // Sort topics by total percentage and filter by threshold
    const topicsOverThreshold = Object.keys(topicTotals)
      .filter((topic) => topicTotals[topic] / data.length >= threshold)
      .sort((a, b) => topicTotals[b] - topicTotals[a]);

    return topicsOverThreshold;
  };

  // Assign colors based on the provided theme
  const colors = [
    "#BFa226", // yellow
    "#1F9C6C", // dark green
    "#2085C2", // blue
    "#26BF84", // green
    "#99BF26", // lime
    "#2E4EC2", // dark blue
    "#BF7526", // orange
    "#9D26BF", // pink
    "#BF264C", // red
    "#5E4EC2", // purple
    "#26BFB7", // teal
  ];

  // Function to format x-axis ticks to show only the beginning of each month
  const formatXAxis = (tick: number | string) => {
    const date = new Date(tick);
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getFullYear();
    return `${month} ${year}`;
  };

  // Define the topics and their colors in the TrendingTopics component
  const topics = getTopics().reduce((acc, topic, index) => {
    acc[topic] = {
      color: colors[index % colors.length],
      order: index, // Order based on the index or other logic
    };
    return acc;
  }, {} as { [key: string]: { color: string; order: number } });

  return (
    <TrendingTopicsWrapper>
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
                  offset="10%"
                  stopColor={colors[index % colors.length]}
                  stopOpacity={0.9}
                />
                <stop
                  offset="50%"
                  stopColor={colors[index % colors.length]}
                  stopOpacity={0.6}
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
          <CartesianGrid strokeDasharray="1 5" />
          <Tooltip
            content={<CustomTooltip topics={topics} />}
            formatter={(value: number) => `${value.toFixed(2)}%`}
          />
          <Legend
            content={<CustomLegend />}
            layout="vertical"
            align="right"
            verticalAlign="middle"
            wrapperStyle={{ paddingLeft: 0 }} // Adjust this style as needed
          />
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
    </TrendingTopicsWrapper>
  );
};

export default TrendingTopics;

const TrendingTopicsWrapper = styled(Box)`
  .recharts-legend-wrapper {
    height: 90% !important;
    top: 10px !important;
  }
`;
