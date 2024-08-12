import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { Box } from "../shared/ui/Box";
import { DateRangeInput } from "@datepicker-react/styled";
import { FieldCheckbox } from "~/components/tools/map/ui/FieldCheckbox";
import { FilterToggle } from "~/components/tools/shared/ui/FilterToggle";
import { TagSelect } from "~/components/tools/shared/ui/TagSelect";

const initialState = {
  startDate: null,
  endDate: null,
  focusedInput: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "focusChange":
      return { ...state, focusedInput: action.payload };
    case "dateChange":
      return action.payload;
    default:
      throw new Error();
  }
}

const Filter = ({ data }: { data: any }) => {
  const [filterState, setFilterState] = React.useState<any>({
    dateRange: "week",
    narrative: "",
    topics: [],
    attributes: {
      polarising: false,
      sensational: false,
      factual: false,
      highDiffusion: false,
      manyTwins: false,
    },
  });

  const dateRangeOptions = [
    { id: "week", name: "Last week" },
    { id: "month", name: "Last month" },
  ];

  const [datePickerState, dispatch] = useReducer(reducer, initialState);

  const calculateDateRange = (optionId) => {
    const endDate = new Date();
    let startDate = null;

    if (optionId === "week") {
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 7);
    } else if (optionId === "month") {
      startDate = new Date();
      startDate.setDate(endDate.getDate() - 30);
    }

    return { startDate, endDate };
  };

  const handleDateRangeChange = (optionId) => {
    const { startDate, endDate } = calculateDateRange(optionId);

    setFilterState((prevState) => ({
      ...prevState,
      dateRange: optionId,
    }));

    dispatch({
      type: "dateChange",
      payload: { startDate, endDate, focusedInput: null },
    });
  };

  return (
    <FilterWrapper>
      <Box>
        <h3>Claims</h3>
        <p>Showing 10 of 100 claims</p>
      </Box>
      <Box>
        <h3>Date range</h3>
        {dateRangeOptions.map((option) => (
          <div key={option.id}>
          <input
            type="radio"
            id={option.id}
            name="dateRange"
            checked={filterState.dateRange === option.id}
            onChange={() => handleDateRangeChange(option.id)}
          />
          <label htmlFor={option.id}>{option.name}</label>
        </div>
        ))}

          {/* <DateRangeInput
            onDatesChange={(data) =>
              dispatch({ type: "dateChange", payload: data })
            }
            onFocusChange={(focusedInput) =>
              dispatch({ type: "focusChange", payload: focusedInput })
            }
            startDate={datePickerState.startDate} // Date or null
            endDate={datePickerState.endDate} // Date or null
            focusedInput={datePickerState.focusedInput} // START_DATE, END_DATE or null
          /> */}
        
      </Box>
      <Box>
        <h3>Narrative</h3>
        {/* Dropdown      */}
        {/* <TagSelect /> */}
      </Box>
      <Box>
        <h3>Filter</h3>
        {/* filtertoggle      */}
      </Box>
    </FilterWrapper>
  );
};

export default Filter;

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: var(--size-4);
`;
