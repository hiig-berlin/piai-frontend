import styled from "styled-components";
import { ToolSvgBackground } from "../../shared/ToolSvgBackground";
import type { DataRowComponentProps, DataRowProps } from "./types";
import SaveHtmlSpan from "~/components/ui/SafeHtmlSpan";
import { Tag, Tags } from "../../shared/Styled";
import { TableGrid } from "../Styled";

export const DataRow: React.FC<DataRowComponentProps> = ({ row }) => {
  const columns = [
    "date",
    "text",
    "channel",
    "topics",
    "narrative",
    "attributes",
    "reach",
  ];

  const transformedRow : any = {
    date: formatDate(row.Publishing_datetime),
    text: truncateText(row.Text, 50),
    channel: row.Channel_Name,
    topics: renderTopics(row.Topic),
    narrative: row.Narratives,
    attributes: renderAttributes(row.Polarising, row.Sensationalist, 0),
    reach: renderReach(row.Forwards, row.Views, row.Siblings.length),
  };

  return (
    <TableGrid>
      {columns.map((column, index) => (
        <DataCell key={index}>
          {transformedRow[column]}
        </DataCell>
      ))}
    </TableGrid>
  );
};

const DataCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
`;

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const truncateText = (text: string, length: number): string =>
  text.length > length ? text.slice(0, length) + "..." : text;

const renderTopics = (topics: string[]) => (
  <Tags>
    {topics.map((topic, idx) => (
      <CroppedTag isActive={false} tool="claim" key={idx}>
        {topic}
      </CroppedTag>
    ))}
  </Tags>
);

const CroppedTag = styled(Tag)<{ isActive: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 4rem;

  &:after {
    content: "";
    display: block;
    width: var(--size-1);
    background: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 80%);
    right: 0px;
    position: absolute;
    height: 100%;
  }
`;

const renderAttributes = (polarising: number, sensationalist: number, factual: number) => (
  <Icons>
    <Icon type="polarise" active={polarising === 1 ? true : false} />
    <Icon type="bolt" active={sensationalist === 1 ? true : false} />
    <Icon type="search" active={factual === 1 ? true : false} />
  </Icons>
);

const renderReach = (forwards: number, views: number, siblings: number) => (
  <Icons>
    <Icon type="view">{views}</Icon>
    <Icon type="share">{forwards}</Icon>
    {(siblings > 0) && <Icon type="copy">{siblings}</Icon>}
  </Icons>
);

const Icons = styled.div`
  display: flex;
  gap: var(--size-2);
`;

const Icon = ({ type, active, children }: { type: string; active?: boolean; children?: any }) => (
  <IconWrapper active={active}>
    <ToolSvgBackground type={type} width="1rem" />
    {children? children : null}
  </IconWrapper>
);

const IconWrapper = styled.div<{ active?: boolean }>`
  display: flex;
  opacity: ${({ active }) => (active ? 1 : 0.3)};
  align-items: center;
  gap: 3px;

  span {
    max-height: 1rem;
    min-height: 0.8rem;
    filter: ${({ active }) => (active ? "invert(64%) sepia(12%) saturate(3897%) hue-rotate(316deg) brightness(110%) contrast(82%)" : "none")};
  }
`;
