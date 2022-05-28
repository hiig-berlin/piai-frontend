import React from "react";
import styled from "styled-components";
import { PageMargins } from "../ui/PageMargins";


const StyledHeading = styled.div`
  text-align: center;
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        ${props.theme.textStyle(breakpoint, "h1")};
        `;
    })}
`;



export const TextHeading = ({children}:{children: React.ReactNode}) => {
  return (
    <PageMargins spaceBottom={5} keepMaxWidth>
      <StyledHeading>{children}</StyledHeading>
    </PageMargins>
  );
};
