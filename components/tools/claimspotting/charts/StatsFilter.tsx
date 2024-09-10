import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getChannels } from "~/components/tools/claimspotting/utils/getChannels";
import moment from "moment";
import { BoxLight } from "../../shared/ui/Box";
import {
  Checkbox,
  InputText,
} from "~/components/tools/claimspotting/ui/FormElements";
import { FilterStateProps } from "~/components/tools/claimspotting/charts/types";

import { AttributeSelector } from "~/components/tools/claimspotting/ui/AttributeSelector";
import { set } from "lodash";

// Create a filter with the following boxes:
// 1) Date range: start date, end date + Threshold (slider from 3 to 10)
// 2) Channels

const StatsFilter = ({
  strings,
  filterState,
  setFilterState,
}: {
  strings: any;
  filterState: FilterStateProps;
  setFilterState: React.Dispatch<React.SetStateAction<FilterStateProps>>;
}) => {
  const [channels, setChannels] = useState<string[]>([]);

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
    const subtractValue = {
      days: 1,
      week: 7,
      month: 1,
    }[range] as number;

    const subtractDuration: moment.unitOfTime.DurationConstructor = {
      days: "days",
      week: "days",
      month: "months",
    }[range] as moment.unitOfTime.DurationConstructor;

    const endDate = moment().format("YYYY-MM-DD");
    const startDate = moment()
      .subtract(subtractValue, subtractDuration)
      .format("YYYY-MM-DD");
    console.log("Date range:", range, { startDate, endDate }); // Debugging statement
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

  const [extendedChannelList, setExtendedChannelList] = useState<string[]>([]);

  useEffect (() => {
    const fetchChannels = async () => {
      try {
        const channelsList = await getChannels("basic");
        setChannels(channelsList);
      } catch (error) {
        console.error("Failed to fetch channels:", error);
      }
    };
    fetchChannels();
  }, []);

  return (
    <FilterWrapper>
      <DateFilter>
        <h2>{strings?.daterange?.title}</h2>
        <CheckboxList>
          {/* <label>
            <Checkbox
              type="checkbox"
              name="lastDays"
              checked={filterState.lastDays}
              onChange={handleDatePresetChange}
            />
            {strings?.daterange?.lastDays}
          </label> */}
          <label>
            <Checkbox
              type="checkbox"
              name="lastWeek"
              checked={filterState.lastWeek}
              onChange={handleDatePresetChange}
            />
            {strings?.daterange?.lastWeek}
          </label>
          <label>
            <Checkbox
              type="checkbox"
              name="lastMonth"
              checked={filterState.lastMonth}
              onChange={handleDatePresetChange}
            />
            {strings?.daterange?.lastMonth}
          </label>
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
      <ThresholdSlider>
        <h2>{strings?.threshold.title}</h2>
        <p>{strings?.threshold.subtitle}</p>
        <div className="slider">
          <label>{filterState.threshold}%</label>
          <input
            type="range"
            min="2"
            max="10"
            value={filterState.threshold}
            onChange={(e) =>
              setFilterState((prevState) => ({
                ...prevState,
                threshold: parseInt(e.target.value),
              }))
            }
          />
        </div>
      </ThresholdSlider>
      <ChannelsFilter>
        <h2>{strings?.channels?.title}</h2>
        <p>{strings?.channels.subtitle}</p>
        <AttributeSelector
          label={strings?.channels?.selectChannels}
          labelAllShown={strings?.channels?.allChannels}
          options={channels} // Simplified to just names
          activeTerms={filterState.channels} // Array of names
          clearAllOnClick={() => {
            setFilterState((prevState) => ({ ...prevState, channels: [] }));
          }}
          updateState={(name, isChecked) => {
            setFilterState((prevState) => {
              // Toggle topic in the topics array
              const updatedChannels = isChecked
                ? [...prevState.channels, name] // Add topic
                : prevState.channels.filter((channel) => channel !== name); // Remove topic

              return {
                ...prevState,
                channels: updatedChannels,
              };
            });
          }}
        />
      </ChannelsFilter>
    </FilterWrapper>
  );
};
export default StatsFilter;

const FilterWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(150px, 1fr));
  grid-gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, minmax(150px, 1fr));
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns:
      minmax(min-content, 1fr)
      minmax(min-content, 1fr)
      minmax(min-content, 2fr)
      // minmax(min-content, 4.5fr)
;
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

const DateFilter = styled(BoxLight)`
  .range {
    display: flex;
    flex-direction: row;
    gap: var(--size-3);
  }
`;

const ThresholdSlider = styled(BoxLight)`
  display: flex;
  flex-direction: column;
  gap: var(--size-1);

  .slider {
    display: flex;
    flex-direction: row;
    gap: var(--size-2);
    margin-top: var(--size-3);
    align-items: center;

    label {
      color: var(--color-piai-claim);
      font-weight: 600;
      font-size: 1.2rem;
      margin: 0;
      padding: 0;
    }
    input {
      width: 100%;
      opacity: 0.7;
      height: var(--size-1);
      accent-color: var(--color-piai-claim);

      &:hover {
        opacity: 1;
      }
    }
  }
`;

const ChannelsFilter = styled(BoxLight)`
  gap: var(--size-1);

  & > p {
    margin-bottom: auto;
  }

  .optionsContainer {
    display: grid;
    gap: var(--size-1);
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;
