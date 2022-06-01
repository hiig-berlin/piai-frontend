import React from "react";
import styled from "styled-components";
import { PageMargins } from "../ui/PageMargins";
import { Heading } from "../ui/Heading";
import SafeHtmlDiv from "../ui/SafeHtmlDiv";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: var(--size-gutter-width);

  ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: row;
  }
`;

const Column = styled.div`
  
`;

export const TextTwoCol = ({
  left,
  right,
}: {
  left: string;
  right: string;
  
}) => {
  return (
    <PageMargins spaceTop={5} spaceBottom={5} keepMaxWidth bgColor="salmon">
      <Flex>
        <Column>
          <SafeHtmlDiv html={left} />
        </Column>
        <Column>
          <SafeHtmlDiv html={right} />
        </Column>
      </Flex>
    </PageMargins>
  );
};
