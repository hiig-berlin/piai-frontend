// TableData.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { Icon, Icons } from "./Icon";
import {
  formatDate,
  truncateText,
} from "~/components/tools/claimspotting/utils/formatData";
import { Tags, CroppedTag } from "../../shared/Styled";
import { TableGrid } from "../Styled";
import type { DataRowComponentProps, DataRowProps, NarrativeRowProps, TransformedRowProps } from "./types";
import Details from "~/components/tools/claimspotting/Details";

export const DataRow: React.FC<DataRowComponentProps> = ({
  row,
  transformedRow,
  strings,
  showDetails = false, // Only used in ClaimTable
  grid,
  copyLabels,
}) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  if (!row) return null;
  const dataRow: TransformedRowProps | NarrativeRowProps | DataRowProps = (transformedRow == undefined) ? row : transformedRow;

  const handleRowClick = () => {
    if (showDetails) {
      setDetailsVisible(!detailsVisible);
    }
  };

  return (
    <>
      <TableGrid onClick={handleRowClick} grid={grid}>
        {Object.values(dataRow).map((value, index) => (
          <DataCell key={index}>{value}</DataCell>
        ))}
      </TableGrid>
      {detailsVisible && strings && row && (
        <Details
          row={row as DataRowProps}
          handleClose={() => setDetailsVisible(false)}
          strings={strings.details}
          copyLabels={copyLabels}
        />
      )}
    </>
  );
};

const DataCell = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.8em;
`;
