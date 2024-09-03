import React, { useState, useEffect } from "react";
import styled from "styled-components";
import moment from "moment";
import { Box } from "../shared/ui/Box";
import { Dropdown } from "./ui/FormElements";
import { BoxHighlight } from "./Styled";

import {
  Checkbox,
  InputText,
} from "~/components/tools/claimspotting/ui/FormElements";
import { AttributeSelector } from "~/components/tools/claimspotting/ui/AttributeSelector";
import { FilterStateProps } from "~/components/tools/claimspotting/ui/types";
import { set } from "lodash";

// Define the type for attribute keys
type AttributeKey = keyof FilterStateProps["attributes"];

const attributes = [
  { key: "polarising", label: "Polarising", dataField: "Polarising" },
  { key: "sensational", label: "Sensational", dataField: "Sensationalist" },
  // { key: "factual", label: "Factual", dataField: "Factual" },
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
  filterState,
  setFilterState,
  strings,
}: {
  data: any[];
  onFilterChange: (filteredData: any[]) => void;
  dataLengthTotal: number;
  dataLengthFiltered: number;
  filterState: FilterStateProps;
  setFilterState: React.Dispatch<React.SetStateAction<FilterStateProps>>;
  strings: any;
}) => {
  // Generate unique topics and narratives only when data changes
  const uniqueTopics = React.useMemo(
    () => Array.from(new Set(data.flatMap((item: any) => item.Topic))),
    [data]
  );
  const uniqueNarratives = React.useMemo(
    () => Array.from(new Set(data.map((item: any) => item.Narratives))),
    [data]
  );

  // Update state based on user input
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterState((prevState: FilterStateProps) => ({
      ...prevState,
      [name]: value,
      lastDays: false,
      lastWeek: false,
      lastMonth: false,
    }));
  };

  // Helper function to calculate dates
  const getDateRange = (range: "days" | "week" | "month") => {
    const endDate = moment().format("YYYY-MM-DD");
    const startDate = moment()
      .subtract(range === "week" ? 7 : range === "days" ? 3 : 1, range === "week" || "days" ? "days" : "months")
      .format("YYYY-MM-DD");
    console.log("Date range:", { startDate, endDate }); // Debugging statement
    return { startDate, endDate };
  };

  const handleDatePresetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    const { startDate, endDate } = checked
      ? getDateRange(
          name === "lastWeek" ? "week" : name === "lastDays" ? "days" : "month"
        )
      : { startDate: "", endDate: "" };

    checked
      ? setFilterState((prevState) => ({
          ...prevState,
          startDate,
          endDate,
          [name]: checked,
          lastDays: name === "lastDays" ? checked : !checked,
          lastWeek: name === "lastWeek" ? checked : !checked,
          lastMonth: name === "lastMonth" ? checked : !checked,
        }))
      : setFilterState((prevState) => ({
          ...prevState,
          [name]: checked,
          lastDays: name === "lastDays" ? checked : prevState.lastDays,
          lastWeek: name === "lastWeek" ? checked : prevState.lastWeek,
          lastMonth: name === "lastMonth" ? checked : prevState.lastMonth,
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

  attributes.forEach((attribute) => {
    attribute.label = strings?.attributes[attribute.key];
  });

  useEffect(() => {
    // Compute filtered data based on current filter state
    const filteredData = data.filter((item: any) => {
      const itemDate = new Date(item.Publishing_datetime.slice(0, 10));
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

    console.log("Filtered data:", filteredData, "from all data:", data); // Debugging statement
    onFilterChange(filteredData);
  }, [filterState, data, onFilterChange]);

  return (
    <FilterWrapper>
      <Counter>
        <h2>{strings?.counter?.title}</h2>
        <p className="numbers">
          <span className="numFiltered">{dataLengthFiltered}</span>
          <span className="of">{strings?.counter?.of}</span>
          <span className="numTotal">{dataLengthTotal}</span>
        </p>
        <small>{strings?.counter?.subtitle}</small>
      </Counter>

      <DateFilter>
        <h2>{strings?.daterange?.title}</h2>
        <CheckboxList>
          <label>
            <Checkbox
              type="checkbox"
              name="lastDays"
              checked={filterState.lastDays}
              onChange={handleDatePresetChange}
            />
            {strings?.daterange?.lastDays}
          </label>
          <label>
            <Checkbox
              type="checkbox"
              name="lastWeek"
              checked={filterState.lastWeek}
              onChange={handleDatePresetChange}
            />
            {strings?.daterange?.lastWeek}
          </label>
          {/* <label>
            <Checkbox
              type="checkbox"
              name="lastMonth"
              checked={filterState.lastMonth}
              onChange={handleDatePresetChange}
            />
            {strings?.daterange?.lastMonth}
          </label> */}
        </CheckboxList>
        <div className="range">
          <InputText
            className="from"
            type="date"
            name="startDate"
            value={filterState.startDate}
            onChange={handleDateChange}
            // disabled={filterState.lastWeek || filterState.lastMonth}
          />
          <InputText
            className="to"
            type="date"
            name="endDate"
            value={filterState.endDate}
            onChange={handleDateChange}
            // disabled={filterState.lastWeek || filterState.lastMonth}
          />
        </div>
      </DateFilter>

      <Box>
        <h2>{strings?.topics?.title}</h2>
        <AttributeSelector
          label={strings?.topics?.selectTopic}
          labelAllShown={strings?.topics?.allTopics}
          options={uniqueTopics} // Simplified to just names
          activeTerms={filterState.topics} // Array of names
          updateState={(name, isChecked) => {
            setFilterState((prevState) => {
              // Toggle topic in the topics array
              const updatedTopics = isChecked
                ? [...prevState.topics, name] // Add topic
                : prevState.topics.filter((topic) => topic !== name); // Remove topic

              return {
                ...prevState,
                topics: updatedTopics,
              };
            });
          }}
        />

        <Dropdown
          value={filterState.narrative}
          onChange={handleNarrativeChange}
        >
          <option value="">{strings?.topics?.allNarratives}</option>
          {uniqueNarratives.map((narrative) => (
            <option key={narrative} value={narrative}>
              {narrative}
            </option>
          ))}
        </Dropdown>
      </Box>

      <AttributeFilter>
        <h2>{strings?.attributes?.title}</h2>
        <CheckboxList>
          {Object.keys(filterState.attributes).map((attribute) => (
            <label key={attribute}>
              <Checkbox
                type="checkbox"
                name={attribute}
                checked={filterState.attributes[attribute as AttributeKey]}
                onChange={handleAttributeChange}
              />
              {attributes.find((a) => a.key === attribute)?.label}
            </label>
          ))}
        </CheckboxList>
      </AttributeFilter>
    </FilterWrapper>
  );
};

export default Filter;

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(150px, 1fr));
  grid-gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns:
      minmax(150px, 3.5fr)
      minmax(150px, 4.5fr)
      minmax(150px, 5fr)
      minmax(150px, 4.5fr);
  }

  // h2{
  //   margin-bottom: auto;
  // }
`;

const CheckboxList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--size-2);

  label {
    display: flex;
    gap: var(--size-1);
    align-items: center;
  }
`;

const Counter = styled(BoxHighlight)`
  font-weight: bold;

  .numbers {
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
    gap: var(--size-1);
    font-size: 3rem;
    font-family: var(--font-family-narrow);
    font-weight: bold;
    position: relative;
    top: 0.2em;
    height: 1.8rem;

    & > span {
      display: inline-block;
      height: fit-content;
    }
  }

  .of {
    font-weight: 500;
    font-family: var(--font-family-narrow);
    font-size: 1rem;
    ${({ theme }) => theme.applyMixin("uppercase")};
  }

  .of,
  .numTotal {
    opacity: 0.5;
    font-weight: normal;
  }

  small {
    font-family: var(--font-family-narrow);
    font-size: 0.9em;
  }
`;

const DateFilter = styled(Box)`
  .range {
    display: flex;
    flex-direction: row;
    gap: var(--size-3);
  }
`;

const AttributeFilter = styled(Box)`
  div {
    // font-family: var(--font-family-narrow);
    display: grid;
    gap: var(--size-3);
    grid-template-columns: repeat(2, 1fr);
  }
`;
