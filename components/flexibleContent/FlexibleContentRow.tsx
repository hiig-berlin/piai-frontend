import React from "react";
import styled from "styled-components";
import { PageMargins } from "../ui/PageMargins";
import { FlexibleContent } from "./FlexibleContent";
import { RowIntro } from "./RowIntro";

import { safeAnchorId } from "~/utils/safeAnchorId";
import { StyledFlexibleContentRow } from "./StyledFlexibleContentRow";

StyledFlexibleContentRow;
const StyledFlexibleContentRowContainer = styled.div`
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        margin-bottom: ${(
          props.theme.space(breakpoint, 4) - props.theme.space(breakpoint, 5)
        ).toFixed(2)}px;
      `;
    })}
`;

export const FlexibleContentRow = ({
  content,
  field = "content",
  fontStyle = "default",
}: {
  content: any;
  field: string;
  fontStyle?: string;
}) => {
  let renderedIndex = -1;

  const parsedContent: any[] = Array.isArray(content)
    ? content.map((block: any, index: number) => {
        if (block.acf_fc_layout === "intro") {
          renderedIndex++;
          return (
            <RowIntro
              {...{ block, field, index: renderedIndex }}
              key={`flx-${field}-${renderedIndex}`}
              fontStyle={fontStyle}
              shortBottomMargin={content?.length === 1}
            />
          );
        }

        if (
          block.acf_fc_layout === "column_1" &&
          block?.column_content_content?.length
        ) {
          renderedIndex++;
          return (
            <PageMargins
              key={`flx-${field}-${renderedIndex}`}
              spaceBottom={renderedIndex !== content.length - 1 ? 7 : 0}
            >
              <FlexibleContent
                columnWidth="full"
                field={`content-${field}-${renderedIndex}-content`}
                content={block.column_content_content}
                fontStyle={fontStyle}
              />
            </PageMargins>
          );
        }

        if (
          (block.acf_fc_layout === "anchor" ||
            block.acf_fc_layout === "subpage") &&
          block?.name
        ) {
          renderedIndex++;
          return (
            <div
              key={`flx-${field}-${renderedIndex}`}
              id={safeAnchorId(block?.name)}
            />
          );
        }

        return null;
      })
    : [];

  if (parsedContent.length === 0) return <></>;

  return (
    <StyledFlexibleContentRowContainer>
      {parsedContent}
    </StyledFlexibleContentRowContainer>
  );
};
