import React from "react";
import styled from "styled-components";
import { PageMargins } from "../ui/PageMargins";

const StyledHeading = styled.div`
  text-align: center;
  ${({ theme }) => theme.textStyle("h1")};
`;

export const TextHeading = ({ children }: { children: React.ReactNode }) => {
  return (
    <PageMargins spaceBottom={5} keepMaxWidth>
      <StyledHeading>{children}</StyledHeading>
    </PageMargins>
  );
};
