import React, { useEffect, useMemo, useState } from "react";
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
import { NarrativeTooltip } from "~/components/tools/claimspotting/charts/CustomTooltip";
import CustomLegend from "./CustomLegend";
import {
  useCssVarsStateIsTabletAndUpState,
  useCssVarsStateIsDesktopAndUpState,
} from "~/components/state/CssVarsState";
import {
  TopicCountProps,
  TrendingNarrativesProps,
  rawDataProps,
  sortedDataProps,
} from "~/components/tools/claimspotting/charts/types";
import { Caption, TableGrid } from "~/components/tools/claimspotting/Styled";
import { HeaderRow } from "~/components/tools/claimspotting/ui/TableHeader";
import {
  ColumnProps,
  NarrativeRowProps,
  SortState,
} from "~/components/tools/claimspotting/ui/types";
import { DataRow } from "~/components/tools/claimspotting/ui/TableData";
import { formatLargeNumber } from "~/components/tools/claimspotting/utils/formatInput";
import { set } from "lodash";

const DEBUG: boolean = true;

const TrendingNarratives: React.FC<TrendingNarrativesProps> = ({
  data,
  threshold,
  exclude,
  strings,
}) => {
  const [sort, setSort] = useState<SortState>({
    column: "total",
    order: "desc",
  });
  const [rows, setRows] = useState<NarrativeRowProps[]>([]);

  // Map raw data into a format with topics and dates
  // Group and aggregate data by date
  const rawData = useMemo(() => {
    const groupedData: Record<string, rawDataProps> = {};

    data.forEach((entry) => {
      const {
        Access_datetime,
        data: { Narratives },
      } = entry;
      const date = new Date(Access_datetime).toLocaleDateString("en-US");

      if (!groupedData[date]) {
        groupedData[date] = { date, topics: { ...Narratives } };
      } else {
        // Aggregate the topic values for the same date
        Object.keys(Narratives).forEach((topic) => {
          if (typeof Narratives[topic] === "number") {
            groupedData[date].topics[topic] =
              (groupedData[date].topics[topic] || 0) + Narratives[topic];
          }
        });
      }
    });

    return Object.values(groupedData);
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

  // Make an array with all filteredTopics as keys and 0 as values
  const totalPerTopic: TopicCountProps = useMemo(() => {
    return filteredTopics.reduce((acc: any, topic) => {
      acc[topic] = 0;
      return acc;
    }, {});
  }, [filteredTopics]);

  // Make an array with all filteredTopics as keys and 0 as values
  const peakPerTopic: TopicCountProps = useMemo(() => {
    return filteredTopics.reduce((acc: any, topic) => {
      acc[topic] = 0;
      return acc;
    }, {});
  }, [filteredTopics]);

  // Prepare filtered data for the chart
  const filteredData = useMemo(() => {
    return absoluteData.map(({ date, topics }) => {
      const filteredEntry: sortedDataProps = { date };

      // Add filtered topics to the entry and calculate the total per date
      filteredTopics.forEach((topic) => {
        const value = topics[topic] || 0;
        filteredEntry[topic] = value;
        totalPerTopic[topic] += value;
        peakPerTopic[topic] = Math.max(peakPerTopic[topic], value);
      });

      return filteredEntry;
    });
  }, [absoluteData, filteredTopics, totalPerTopic, peakPerTopic]);

  // Sort topics
  const sortedTopics = useMemo(() => {
    // Ensure "Other topics" is included in the sortedTopics
    const sortedTopicsOverThreshold = filteredTopics.sort((a, b) => {
      return (
        filteredData.findIndex((d) => d[a]) -
        filteredData.findIndex((d) => d[b])
      );
    });
    return [strings.exclude.label, ...sortedTopicsOverThreshold];
  }, [filteredTopics, filteredData, strings.exclude.label]);
  DEBUG && console.log("sortedTopics: ", sortedTopics);

  // Function to format dates as "01 Jun"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  };

  // Calculate the height of the actual topics for the legend
  const lastExcludedValue =
    filteredData[filteredData.length - 1][strings.exclude.label];
  const lastSum =
    (typeof lastExcludedValue == "number" && 100 - lastExcludedValue) || 80;

  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();

  // sort table data
  const sortData = (column: string) => {
    const order =
      sort.column === column && sort.order === "desc" ? "asc" : "desc";
    setSort({ column, order });
    setRows(
      [...rows].sort((a, b) => {
        const aVal = a[column as keyof NarrativeRowProps];
        const bVal = b[column as keyof NarrativeRowProps];
        if (aVal < bVal) return order === "asc" ? -1 : 1;
        if (aVal > bVal) return order === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  // Define table columns
  const columns: ColumnProps[] = [
    { label: strings?.columns.narrative, slug: "narrative", sortable: true },
    { label: strings?.columns.trend, slug: "trend", sortable: false },
    { label: strings?.columns.total, slug: "total", sortable: true },
    { label: strings?.columns.peak, slug: "peak", sortable: true },
  ];

  // Fill table rows
  useEffect(() => {
    const newRows = filteredTopics.map((topic, index) => {
      // Show X-axis for the first and last row
      const hideX =
        index === 0 || index === filteredTopics.length - 1 ? false : true;
      const positionX = index === 0 ? "top" : "bottom";

      // get dates from filteredData and reduce to 1 and 15 of each month
      const dates = filteredData.map((entry) => entry.date);
      const axisDates: any[] = dates.filter((date, index) => {
        const d = new Date(date);
        const day = d.getDate();
        if (day === 1 || index === dates.length - 1) return d;
      });

      // Build row charts
      const rowChart = (
        <ResponsiveContainer width="100%" height={hideX ? 40 : 80}>
          <AreaChart
            width={200}
            height={60}
            data={filteredData}
            margin={{
              top: 0,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorPiai" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-piai-claim)"
                  stopOpacity={0.6}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-piai-claim)"
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              hide={hideX}
              interval={"preserveStartEnd"}
              tickFormatter={(tick) => formatDate(tick)}
              ticks={axisDates}
              fontSize={12}
              tickLine={false}
              axisLine={false}
              orientation={positionX}
              tickMargin={10}
            />

            <Area
              type="monotone"
              dataKey={topic}
              stroke="var(--color-piai-claim)"
              fill="url(#colorPiai)"
              fillOpacity={0.8}
              activeDot={{ r: 4, strokeWidth: 1, stroke: "#333" }}
            />
            <CartesianGrid
              strokeDasharray="1 0"
              horizontal={false}
              stroke="var(--color-piai-claim)"
              strokeOpacity={0.1}
              syncWithTicks={false}
              verticalValues={axisDates}
            />
            <Tooltip content={<NarrativeTooltip />} />
          </AreaChart>
        </ResponsiveContainer>
      );

      return {
        narrative: topic,
        trend: rowChart,
        total: formatLargeNumber(totalPerTopic[topic]),
        peak: formatLargeNumber(peakPerTopic[topic]),
      };
    });
    setRows(newRows);
  }, [filteredData, filteredTopics, totalPerTopic, peakPerTopic]);

  return (
    <TrendingNarrativesWrapper>
      <h2>{strings.title}</h2>

      <HeaderRow
        columns={columns}
        grid="narratives"
        sortData={sortData}
        sort={sort}
      />

      {filteredTopics.map((topic, index) => {
        return <DataRow key={index} row={rows[index]} grid="narratives" />;
      })}

      <Caption>
        {strings.explanationPre}
        {threshold}
        {strings.explanationPost}
        <br />
        {strings.explanationNumbers}
      </Caption>

      <div className="excluded">
        <h3>{strings.exclude.title}</h3>
        <>
          {excludedTopics.map((topic, index) => (
            <p key={index}>{topic}</p>
          ))}
        </>
      </div>
    </TrendingNarrativesWrapper>
  );
};

export default TrendingNarratives;

const TrendingNarrativesWrapper = styled(Box)`
  // width: 50%;
  .recharts-legend-wrapper {
    ${({ theme }) => theme.breakpoints.desktop} {
      height: 90% !important;
      top: 10px !important;
    }
  }
  .excluded {
    opacity: 0.6;

    h3 {
      margin-bottom: var(--size-2);
    }

    p {
      // text-transform: uppercase;
      // letter-spacing: 0.02em;
      // font-size: 0.8em;
      font-family: var(--font-family-monospace);
      font-size: 0.8em;
    }
  }

  label.narrative {
    font-size: 0.8em;
  }
`;

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
