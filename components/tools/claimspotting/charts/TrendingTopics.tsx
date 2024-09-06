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
import { get } from "lodash";

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

// Component
const TrendingTopics: React.FC<TrendingTopicsProps> = ({ data, threshold, exclude }) => {
  const rawData = useMemo(() => {
    return data.map((entry) => {
      const {
        Access_datetime,
        data: { Topic },
      } = entry;
      return {
        date: new Date(Access_datetime).toLocaleDateString("en-GB"),
        ...Topic,
      };
    });
  }, [data]);

  const absoluteData = useMemo(() => {
    return rawData.map((entry) => {
      const total = Object.values(entry).reduce(
        (sum, value) => sum + (typeof value === "number" ? value : 0),
        0
      );
      return {
        ...entry,
        total,
      };
    });
  }, [rawData]);

  const percentageData = useMemo(() => {
    return absoluteData.map((entry) => {
      const total = entry.total || 1;
      const percentages = Object.keys(entry).reduce((acc, key) => {
        const value = entry[key] as number;
        if (key !== 'date' && key !== 'total' && typeof value === 'number') {
          acc[key] = (value / total) * 100;
        }
        return acc;
      }, {} as { [key: string]: number });

      return {
        date: entry.date,
        ...percentages,
      };
    });
  }, [absoluteData]);

  const getTopicsFromData = (data: typeof rawData) => {
    const firstEntry = data[0] || {};
    return Object.keys(firstEntry).reduce((acc, topic) => {
      if (topic !== 'date') {
        acc[topic] = 1;
      }
      return acc;
    }, {} as { [key: string]: number });
  };

  const filteredData = useMemo(() => {
    const topics = getTopicsFromData(rawData);
    const filteredTopics = Object.keys(topics).filter(topic => {
      const count = percentageData[0]?.[topic] as number || 0;
      return count >= threshold && !exclude.includes(topic);
    });
  
    return percentageData.map(entry => {
      const filteredEntry: TopicData = { date: entry.date };
      filteredTopics.forEach(topic => {
        filteredEntry[topic] = entry[topic] as number || 0;
      });
      return filteredEntry;
    });
  }, [percentageData, threshold, exclude, rawData]);

  const excludedCategories = useMemo(() => {
    const allTopics = getTopicsFromData(rawData);
    return Object.keys(allTopics)
      .filter((topic) => exclude.includes(topic))
      .sort();
  }, [rawData, exclude, getT]);

  const colors = [
    "#BFa226", "#1F9C6C", "#2085C2", "#26BF84", "#99BF26",
    "#2E4EC2", "#BF7526", "#9D26BF", "#BF264C", "#5E4EC2", "#26BFB7",
  ];

  const sortedTopics = useMemo(() => {
    return Object.keys(getTopicsFromData(rawData)).filter(topic => !exclude.includes(topic)).sort((a, b) => {
      return (
        (filteredData.findIndex((d) => d.hasOwnProperty(a)) || Infinity) -
        (filteredData.findIndex((d) => d.hasOwnProperty(b)) || Infinity)
      );
    });
  }, [filteredData, exclude, rawData]);

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
            tickFormatter={(tick) => `${tick.toFixed(2)}%`}
            domain={[0, 100]}
          />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip topics={sortedTopics} />} />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            content={({ payload }) => (
              <div style={{ paddingLeft: "20px" }}>
                {payload
                  .slice()
                  .sort((a, b) => (a.payload.y > b.payload.y ? -1 : 1))
                  .map((entry, index) => (
                    <p key={`item-${index}`} style={{ color: entry.color }}>
                      {entry.value} posts
                    </p>
                  ))}
              </div>
            )}
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
    </TrendingTopicsWrapper>
  );
}
export default TrendingTopics;

const TrendingTopicsWrapper = styled(Box)`
  .recharts-legend-wrapper {
    height: 90% !important;
    top: 10px !important;
  }
`;
