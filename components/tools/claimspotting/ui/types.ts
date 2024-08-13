

export interface HeaderCellProps {
  column: ColumnProps;
  sortData: (column: string) => void;
  sort: SortState;
}

export interface DataRowProps {
  Message_ID: number;
  Channel_Name: string;
  Link: string;
  Publishing_datetime: string;
  Member_count: number;
  Views: number;
  Forwards: number;
  Text: string;
  Topic: string[];
  Narratives: string;
  Siblings: string[];
  Polarising: number;
  Sensationalist: number;
  High_Diffusion: number;
  Many_Siblings: number;
}

export interface ClaimTableProps {
  data: DataRowProps[];
}

export interface SortState {
  column: string;
  order: "asc" | "desc";
}

export interface HeaderRowProps {
  sortData: (column: string) => void;
  sort: SortState;
}


export interface SortArrowProps {
  order: "asc" | "desc";
  active: boolean;
}

export interface DataRowComponentProps {
  row: DataRowProps;
}

export interface ColumnProps {
  label: string;
  slug: string;
  sortable: boolean;
}

export interface FilterStateProps {
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