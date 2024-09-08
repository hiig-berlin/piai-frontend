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
import { get } from "lodash";
import { all } from "axios";

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

// interface TopicValue {
//   date: string;
//   value: number;
// }

// interface ProcessedData {
//   date: string;
//   topics: { [key: string]: number };
// }

// Component
const TrendingTopics: React.FC<TrendingTopicsProps> = ({
  data,
  threshold,
  exclude,
}) => {
  console.log("data: ", data);

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

  const percentageData = useMemo(() => {
    return absoluteData.map((entry, total) => {
      const percentages: { [key: string]: number } = {};
      for (var key in entry.topics) {
        percentages[key] = (entry.topics[key] / entry.total) * 100;
      }
      return {
        date: entry.date,
        topics: percentages,
        total: entry.total,
      };
    });
  }, [absoluteData]);
  console.log("percentageData: ", percentageData);

  const getTopicsFromData = (data: typeof rawData) => {
    const firstEntry = data[0] || {};
    return Object.keys(firstEntry.topics).filter((topic) => topic !== "date");
  };
  console.log("getTopicsFromData: ", getTopicsFromData(rawData));

  const allTopics: string[] = getTopicsFromData(rawData);
  console.log("allTopics: ", allTopics);

  const filteredTopics = useMemo(() => {
    return allTopics.filter((topic) => {
      const count = percentageData[0]?.topics[topic] || 0;
      return count >= threshold && !exclude.includes(topic);
    });
  }, [percentageData, threshold, exclude, allTopics]);
  console.log("filteredTopics: ", filteredTopics);

  const filteredData = useMemo(() => {
    return percentageData.map(({ date, topics }) => {
      const filteredEntry: TopicData = { date };
      filteredTopics.forEach((topic: any) => {
        filteredEntry[topic] = allTopics[topic] || 0;
      });
      // console.log("filteredEntry: ", filteredEntry)
      return filteredEntry;
    });
  }, [percentageData, filteredTopics, allTopics]);
  console.log("filteredData: ", filteredData);

  const sortedTopics = useMemo(() => {
    return filteredTopics.sort((a, b) => {
      return (
        (filteredData.findIndex((d) => d.hasOwnProperty(a)) || Infinity) -
        (filteredData.findIndex((d) => d.hasOwnProperty(b)) || Infinity)
      );
    });
  }, [filteredTopics, filteredData]);
  console.log("sortedTopics: ", sortedTopics);

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
            domain={[0, 100]}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
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
        The following topics never had values that exeeded the threshold:<br />
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
