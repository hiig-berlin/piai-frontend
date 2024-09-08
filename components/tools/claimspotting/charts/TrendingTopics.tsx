import React, { useMemo } from "react";
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
import CustomTooltip from "~/components/tools/claimspotting/charts/CustomTooltip";
import CustomLegend from "./CustomLegend";

// Define types
type DataPoint = {
  Access_datetime: string;
  Channel_Name: string;
  data: {
    Publishing_date: string;
    Topic: { [key: string]: number };
  };
};

interface TrendingTopicsProps {
  data: DataPoint[];
  threshold: number;
  exclude: string[];
}

type TopicData = {
  date: string;
  [key: string]: number | string;
};

const TrendingTopics: React.FC<TrendingTopicsProps> = ({
  data,
  threshold,
  exclude,
}) => {
  // Map raw data into a format with topics and dates
  const rawData = useMemo(() => {
    return data.map((entry) => {
      const {
        Access_datetime,
        data: { Topic },
      } = entry;
      return {
        date: new Date(Access_datetime).toLocaleDateString("en-GB"),
        topics: {
          ...Topic,
        },
      };
    });
  }, [data]);
  console.log("rawData: ", rawData);

  // Calculate absolute totals for each entry
  const absoluteData = useMemo(() => {
    return rawData.map((entry) => {
      const total = Object.values(entry.topics).reduce(
        (sum, value) => sum + (typeof value === "number" ? value : 0),
        0
      );
      return {
        date: entry.date,
        topics: entry.topics,
        total,
      };
    });
  }, [rawData]);
  console.log("absoluteData: ", absoluteData);

  // Calculate percentage data
  const percentageData = useMemo(() => {
    return absoluteData.map((entry) => {
      const percentages: { [key: string]: number } = {};
      for (const key in entry.topics) {
        percentages[key] = (entry.topics[key] / entry.total) * 100;
      }
      return {
        date: entry.date,
        topics: percentages,
      };
    });
  }, [absoluteData]);
  console.log("percentageData: ", percentageData);

  // Get all topics from raw data
  const allTopics: string[] = useMemo(() => {
    const firstEntry = rawData[0];
    return firstEntry ? Object.keys(firstEntry.topics) : [];
  }, [rawData]);

  // Filter topics based on threshold and excluded topics
  const filteredTopics = useMemo(() => {
    return allTopics.filter((topic) => {
      const count = percentageData[0]?.topics[topic] || 0;
      return count >= threshold && !exclude.includes(topic);
    });
  }, [percentageData, threshold, exclude, allTopics]);
  console.log("filteredTopics: ", filteredTopics);

  // Prepare filtered data for the chart
  const filteredData = useMemo(() => {
    return percentageData.map(({ date, topics }) => {
      const filteredEntry: TopicData = { date };
      filteredTopics.forEach((topic) => {
        filteredEntry[topic] = topics[topic] || 0;
      });
      return filteredEntry;
    });
  }, [percentageData, filteredTopics]);
  console.log("filteredData: ", filteredData);

  // Sort topics
  const sortedTopics = useMemo(() => {
    return filteredTopics.sort((a, b) => {
      return (
        (filteredData.findIndex((d) => d.hasOwnProperty(a)) || Infinity) -
        (filteredData.findIndex((d) => d.hasOwnProperty(b)) || Infinity)
      );
    });
  }, [filteredTopics, filteredData]);
  console.log("sortedTopics: ", sortedTopics);

  // Topics that were excluded
  const excludedTopics = useMemo(() => {
    return allTopics.filter((topic) => !filteredTopics.includes(topic));
  }, [allTopics, filteredTopics]);

  const colors = [
    "#BFa226",
    "#1F9C6C",
    "#2085C2",
    "#26BF84",
    "#99BF26",
    "#2E4EC2",
    "#BF7526",
    "#9D26BF",
    "#BF264C",
    "#5E4EC2",
    "#26BFB7",
  ];

  return (
    <TrendingTopicsWrapper>
      <h2>Trending Topics</h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={filteredData}
          stackOffset="expand"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {sortedTopics.map((topic, index) => (
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
          <XAxis dataKey="date" tickFormatter={(tick) => tick} />
          <YAxis
            tickFormatter={(tick) => `${tick.toFixed(0)}%`}
            domain={[0, 1]}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip topics={sortedTopics} />} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            content={<CustomLegend />}
          />
          {sortedTopics.map((topic, index) => (
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
      <p>
        The above graph shows the trending topics, meaning they have shown
        values over {threshold}% in the respective period.
      </p>
      <p>
        The following topics never had values that exceeded the threshold:<br />
        {excludedTopics.join(", ")}
      </p>
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
