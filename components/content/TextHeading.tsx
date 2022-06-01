import React from "react";
import styled from "styled-components";
import { PageMargins } from "../ui/PageMargins";


const StyledHeading = styled.div`
  text-align: center;
  font-family: var(--text-h1-font-family);
  font-weight: var(--text-h1-font-weight);
  font-style: var(--text-h1-font-style);
  font-size: var(--text-h1-font-size);
  line-height: var(--text-h1-line-height);
`;



export const TextHeading = ({children}:{children: React.ReactNode}) => {
  return (
    <PageMargins spaceBottom={5} keepMaxWidth>
      <StyledHeading>{children}</StyledHeading>
    </PageMargins>
  );
};
