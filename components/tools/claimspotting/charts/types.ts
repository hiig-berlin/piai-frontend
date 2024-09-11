
export type DataPoint = {
  Access_datetime: string;
  Channel_Name: string;
  data: {
    Publishing_date: string;
    Topic: { [key: string]: number };
  };
};

export interface TrendingTopicsProps {
  data: DataPoint[];
  threshold: number;
  exclude: string[];
  strings: any;
  topicLabels: any;
}

export type rawDataProps = {
  date: string;
  topics: { [key: string]: number };
};

export type sortedDataProps = {
  date: string;
  [key: string]: number | string;
};

export type FilterStateProps = {
  startDate: string;
  endDate: string;
  lastDays: boolean;
  lastWeek: boolean;
  lastMonth: boolean;
  threshold: number;
  channels: string[];
};