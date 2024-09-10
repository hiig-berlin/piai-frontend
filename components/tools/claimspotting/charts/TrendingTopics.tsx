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
import {
  useCssVarsStateIsTabletAndUpState,
  useCssVarsStateIsDesktopAndUpState,
} from "~/components/state/CssVarsState";
import { TrendingTopicsProps, TopicData } from "~/components/tools/claimspotting/charts/types";

const DEBUG: boolean = false;

const TrendingTopics: React.FC<TrendingTopicsProps> = ({
  data,
  threshold,
  exclude,
  strings,
}) => {
  // Map raw data into a format with topics and dates
  const rawData = useMemo(() => {
    return data.map((entry) => {
      const {
        Access_datetime,
        data: { Topic },
      } = entry;
      return {
        date: new Date(Access_datetime).toLocaleDateString("en-US"),
        topics: {
          ...Topic,
        },
      };
    });
  }, [data]);
  DEBUG && console.log("rawData: ", rawData);

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
  DEBUG && console.log("absoluteData: ", absoluteData);

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
  DEBUG && console.log("percentageData: ", percentageData);

  // Get all topics from raw data
  const allTopics: string[] = useMemo(() => {
    const firstEntry = rawData[0];
    return firstEntry ? Object.keys(firstEntry.topics) : [];
  }, [rawData]);

  // Filter topics based on threshold and excluded topics
  const filteredTopics = useMemo(() => {
    return allTopics.filter((topic) => {
      const isAboveThreshold = percentageData.some(
        (data) => (data.topics[topic] || 0) >= threshold
      );
      return isAboveThreshold && !exclude.includes(topic);
    });
  }, [percentageData, threshold, exclude, allTopics]);
  DEBUG && console.log("filteredTopics: ", filteredTopics);

  // Topics that were excluded
  const excludedTopics = useMemo(() => {
    return allTopics.filter((topic) => !filteredTopics.includes(topic));
  }, [allTopics, filteredTopics]);

  // Prepare filtered data for the chart
  const filteredData = useMemo(() => {
    return percentageData.map(({ date, topics }) => {
      const filteredEntry: TopicData = { date };
      let includedTotal = 0;

      // Add filtered topics to the entry and calculate the total
      filteredTopics.forEach((topic) => {
        const value = topics[topic] || 0;
        filteredEntry[topic] = value;
        includedTotal += value;
      });

      // Calculate the excluded topics percentage
      const excludedPercentage = 100 - includedTotal;
      filteredEntry["Other topics"] = excludedPercentage;

      return filteredEntry;
    });
  }, [percentageData, filteredTopics]);

  // Sort topics
  const sortedTopics = useMemo(() => {
    // Ensure "Other topics" is included in the sortedTopics
    const sortedTopicsOverThreshold = filteredTopics.sort((a, b) => {
      return (
        filteredData.findIndex((d) => d[a]) -
        filteredData.findIndex((d) => d[b])
      );
    });
    return ["Other topics", ...sortedTopicsOverThreshold];
  }, [filteredTopics, filteredData]);
  DEBUG && console.log("sortedTopics: ", sortedTopics);

  const colors = [
    "#333333", //other
    "#1F9C6C", //green

    "#dDb471", //sand
    "#2E4EC2", //dark blue
    "#2085C2", //blue
    "#26BFB7", //teal
    "#99BF26", //lime
    "#BFa226", //yellow
    "#26BF84", //turquoise
    "#5E4EC2", //lila
    "#9D26BF", //purple
    "#BF7526", //orange
    "#BF264C", //red
    "#6F162C", //dark red
    "#BFa226", //yellow
    "#AA936E", //mud

    "#2E4EC2", //dark blue
    "#99BF26", //lime
    "#1F9C6C", //green
  ];

  // Function to format dates as "01 Jun"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  // Calculate the height of the actual topics for the legend
  const lastExcludedValue =
    filteredData[filteredData.length - 1]["Other topics"];
  const lastSum =
    (typeof lastExcludedValue == "number" && 100 - lastExcludedValue) || 80;

  // get dates from filteredData and reduce to 1 and 15 of each month
  const dates = filteredData.map((entry) => entry.date);
  const axisDates: any[] = dates.filter((date, index) => {
    const d = new Date(date);
    const day = d.getDate();
    if (day === 1 || day === 15 || index === dates.length - 1) return d;
  });

  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();

  return (
    <TrendingTopicsWrapper>
      <h2>{strings.title}</h2>

      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={filteredData}
          stackOffset="expand"
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          reverseStackOrder={true}
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
                {index === 0 ? (
                  <>
                    <stop
                      offset="5%"
                      stopColor={colors[index % colors.length]}
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="50%"
                      stopColor={colors[index % colors.length]}
                      stopOpacity={0.3}
                    />
                  </>
                ) : (
                  <>
                    <stop
                      offset="5%"
                      stopColor={colors[index % colors.length]}
                      stopOpacity={0.9}
                    />
                    <stop
                      offset="60%"
                      stopColor={colors[index % colors.length]}
                      stopOpacity={0.5}
                    />
                  </>
                )}

                <stop
                  offset="95%"
                  stopColor={colors[index % colors.length]}
                  stopOpacity={0.2}
                />
              </linearGradient>
            ))}
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(tick) => formatDate(tick)}
            tickMargin={8}
            tickLine={false}
            axisLine={false}
            ticks={axisDates}
            interval="preserveStartEnd"
            color="#333"
            fontSize={14}
          />
          <YAxis
            tickFormatter={(tick) => `${tick.toFixed(2) * 100}%`}
            domain={[0, 1]}
            hide={false}
            fontFamily="var(--font-family-monospace)"
            tickLine={false}
            axisLine={false}
            fontSize={10}
            width={30}
            ticks={[0.5, 1]}
          />
          <CartesianGrid
            strokeDasharray="1 0"
            vertical={false}
            stroke="#333"
            syncWithTicks={false}
            horizontalValues={[0, 0.25, 0.5, 0.75, 1]}
          />
          <Tooltip
            content={
              <CustomTooltip
                absoluteData={absoluteData}
                percentageData={percentageData}
                topics={sortedTopics}
                colors={colors}
              />
            }
          />
          {isDesktopAndUp ? (
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              content={<CustomLegend sum={lastSum} />}
            />
          ) : (
            <Legend
              layout="horizontal"
              align="center"
              verticalAlign="bottom"
              content={<CustomLegend sum={lastSum} />}
            />
          )}
          {sortedTopics.map((topic, index) => (
            <Area
              key={topic}
              type="monotone"
              dataKey={topic}
              stackId="1"
              stroke={colors[index % colors.length]}
              fillOpacity={1}
              fill={`url(#color${index})`}
              activeDot={{ r: 4, strokeWidth: 1, stroke: "#333" }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
      <p>
        {strings.explanationPre}{threshold}{strings.explanationPost}
      </p>

      <div className="excluded">
        <h3>Excluded topics:</h3>
        <p> {excludedTopics.join(", ")}</p>
        {/* <p className="excluded">
        {excludedTopics.map((topic, index) => (
          <span key={index}>{topic}</span>
        ))}
      </p> */}
      </div>
    </TrendingTopicsWrapper>
  );
};

export default TrendingTopics;

const TrendingTopicsWrapper = styled(Box)`
  .recharts-legend-wrapper {

    ${({ theme }) => theme.breakpoints.desktop} {
      height: 90% !important;
      top: 10px !important;
    }
  }

  p {
    max-width: unset;
  }

  .excluded {
    opacity: 0.6;

    p {
      // text-transform: uppercase;
      // letter-spacing: 0.02em;
      // font-size: 0.8em;
      font-family: var(--font-family-monospace);
      font-size: 0.8em;
    }
  }
`;
