import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Box } from "../shared/ui/Box";
import {Dropdown} from "./ui/FormElements";

import {
  Checkbox,
  InputText,
} from "~/components/tools/claimspotting/ui/FormElements";
import { AttributeSelector } from "~/components/tools/claimspotting/ui/AttributeSelector";

// Define the type for the state
type FilterState = {
  startDate: string;
  endDate: string;
  narrative: string;
  topics: string[];
  attributes: {
    polarising: boolean;
    sensational: boolean;
    factual: boolean;
    highDiffusion: boolean;
    manyTwins: boolean;
  };
  lastWeek: boolean;
  lastMonth: boolean;
};

// Define the type for attribute keys
type AttributeKey = keyof FilterStateProps["attributes"];

const attributes = [
  { key: "polarising", label: "Polarising", dataField: "Polarising" },
  { key: "sensational", label: "Sensational", dataField: "Sensationalist" },
  { key: "factual", label: "Factual", dataField: "Factual" },
  {
    key: "highDiffusion",
    label: "High diffusion",
    dataField: "High_Diffusion",
  },
  { key: "manyTwins", label: "Many siblings", dataField: "Many_Siblings" },
];

const Filter = ({
  data,
  onFilterChange,
  dataLengthTotal,
  dataLengthFiltered,
}: {
  data: any[];
  onFilterChange: (filteredData: any[]) => void;
  dataLengthTotal: number;
  dataLengthFiltered: number;
}) => {
  // Initialize state with explicit type
  const [filterState, setFilterState] = useState<FilterState>({
    startDate: "",
    endDate: "",
    narrative: "",
    topics: [],
    attributes: {
      polarising: false,
      sensational: false,
      factual: false,
      highDiffusion: false,
      manyTwins: false,
    },
    lastWeek: false,
    lastMonth: false,
  });

  // Generate unique topics and narratives only when data changes
  const uniqueTopics = React.useMemo(
    () => Array.from(new Set(data.flatMap((item: any) => item.Topic))),
    [data]
  );
  const uniqueNarratives = React.useMemo(
    () => Array.from(new Set(data.map((item: any) => item.Narratives))),
    [data]
  );

  // Helper function to calculate dates
  const getDateRange = (range: "week" | "month") => {
    const endDate = moment().format("YYYY-MM-DD");
    const startDate = moment()
      .subtract(range === "week" ? 7 : 1, range === "week" ? "days" : "months")
      .format("YYYY-MM-DD");
    console.log("Date range:", { startDate, endDate }); // Debugging statement
    return { startDate, endDate };
  };

  // Update state based on user input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterState((prevState) => ({
      ...prevState,
      [name]: value,
      lastWeek: false,
      lastMonth: false,
    }));
  };

  // Handled by AttributeSelector Component
  // const handleTopicChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const options = Array.from(
  //     e.target.selectedOptions,
  //     (option: any) => option.value
  //   );
  //   setFilterState((prevState) => ({
  //     ...prevState,
  //     topics: options,
  //   }));
  // };

  const handleNarrativeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterState((prevState) => ({
      ...prevState,
      narrative: e.target.value,
    }));
  };

  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilterState((prevState) => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        [name]: checked,
      },
    }));
  };

  const handleDatePresetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const { startDate, endDate } = checked
      ? getDateRange(name === "lastWeek" ? "week" : "month")
      : { startDate: "", endDate: "" };

    setFilterState((prevState) => ({
      ...prevState,
      startDate,
      endDate,
      [name]: checked,
      lastWeek: name === "lastWeek" ? checked : prevState.lastWeek,
      lastMonth: name === "lastMonth" ? checked : prevState.lastMonth,
    }));
  };

  useEffect(() => {
    // Compute filtered data based on current filter state
    const filteredData = data.filter((item: any) => {
      const itemDate = new Date(item.Publishing_datetime);
      const startDate = filterState.startDate
        ? new Date(filterState.startDate)
        : null;
      const endDate = filterState.endDate
        ? new Date(filterState.endDate)
        : null;

      const matchesDateRange =
        (!startDate || itemDate >= startDate) &&
        (!endDate || itemDate <= endDate);
      const matchesNarrative = filterState.narrative
        ? item.Narratives === filterState.narrative
        : true;
      const matchesTopics = filterState.topics.length
        ? filterState.topics.some((topic) => item.Topic.includes(topic))
        : true;

      const matchesAttributes = Object.keys(filterState.attributes).every(
        (key) => {
          const attributeKey = key as AttributeKey;
          const dataField = attributes.find(
            (attribute) => attribute.key === attributeKey
          )?.dataField;
          return (
            !filterState.attributes[attributeKey] ||
            item[dataField as string] === 1
          );
        }
      );

      return (
        matchesDateRange &&
        matchesNarrative &&
        matchesTopics &&
        matchesAttributes
      );
    });

    console.log("Filtered data:", filteredData); // Debugging statement
    onFilterChange(filteredData);
  }, [filterState, data, onFilterChange]);

  return (
    <FilterWrapper>
      <Box>
        <h3>Claim counter</h3>
        <p>
          Showing {dataLengthFiltered} claims of {dataLengthTotal} total
        </p>
      </Box>
      <Box>
        <h3>Date range</h3>
        <InputText
          type="date"
          name="startDate"
          value={filterState.startDate}
          onChange={handleDateChange}
          disabled={filterState.lastWeek || filterState.lastMonth}
        />
        <InputText
          type="date"
          name="endDate"
          value={filterState.endDate}
          onChange={handleDateChange}
          disabled={filterState.lastWeek || filterState.lastMonth}
        />
        <CheckboxList>
          <label>
            <Checkbox
              type="checkbox"
              name="lastWeek"
              checked={filterState.lastWeek}
              onChange={handleDatePresetChange}
            />
            Last week
          </label>
          <label>
            <Checkbox
              type="checkbox"
              name="lastMonth"
              checked={filterState.lastMonth}
              onChange={handleDatePresetChange}
            />
            Last month
          </label>
        </CheckboxList>
      </Box>

      <Box>
        <h3>Topics</h3>
        <AttributeSelector
          label="Select topics"
          labelAllShown="All topics"
          options={uniqueTopics} // Simplified to just names
          activeTerms={filterState.topics} // Array of names
          updateState={(name, isChecked) => {
            console.log("Topic updateState", name, isChecked); // Debugging statement

            setFilterState((prevState) => {
              // Toggle topic in the topics array
              const updatedTopics = isChecked
                ? [...prevState.topics, name] // Add topic
                : prevState.topics.filter((topic) => topic !== name); // Remove topic

              console.log("Updated topics", updatedTopics); // Debugging statement
              return {
                ...prevState,
                topics: updatedTopics,
              };
            });
          }}
          clearAllOnClick={() => {
            setFilterState((prevState) => ({
              ...prevState,
              topics: [],
            }));
          }}
        />
        

        <h3>Narratives</h3>
        
        <Dropdown value={filterState.narrative} onChange={handleNarrativeChange}>
          <option value="">All Narratives</option>
          {uniqueNarratives.map((narrative) => (
            <option key={narrative} value={narrative}>
              {narrative}
            </option>
          ))}
        </Dropdown>
      </Box>

      <Box>
        <h3>Attributes</h3>
        <CheckboxList>
          {Object.keys(filterState.attributes).map((attribute) => (
            <label key={attribute}>
              <Checkbox
                type="checkbox"
                name={attribute}
                checked={filterState.attributes[attribute as AttributeKey]}
                onChange={handleAttributeChange}
              />
              {attribute}
            </label>
          ))}
        </CheckboxList>
      </Box>
    </FilterWrapper>
  );
};

export default Filter;

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(200px, 1fr));
  grid-gap: var(--size-3);
`;

const CheckboxList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--size-3);

  label {
    display: flex;
    gap: var(--size-1);
    align-items: center;
  }
`;
