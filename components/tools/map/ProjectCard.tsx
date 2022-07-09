import React from "react";
import styled from "styled-components";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { Box } from "../shared/ui/Box";
import { Icon } from "./Icon";

const Meta = styled.ul<{col: number}>`
  // reset
  padding: 0;
  & li{
    margin: 0;
    padding: 0;
  }

  display: grid;
  grid-template-columns: repeat(${({col}) => col}, 1fr);
  gap: var(--size-1);

  font-size: 14px;
  font-family: var(--font-family-narrow);

  .svg{
    min-height: 0.8em;
    min-width: 0.8em;
    max-height: 0.8em;
    max-width: 0.8em;
    align-self: center;
  }
`

export const ProjectCard = ({
  view = "detail",
  data
}: {
  view: string;
  data: any;
}) => {

  return (
    <Box>
      <h1>{data.title}</h1>
      <Meta col={2}>
          <Icon type="marker" stc>{data.meta.location}</Icon>
          <Icon type="date" stc>{new Date(data.meta.startDate).toLocaleDateString("en-UK", {month: "long"} )} {new Date(data.meta.startDate).getFullYear()}</Icon>
          <Icon type="company" stc>{data.meta.organisation}</Icon>
          <Icon type="people" stc>{data.meta.size}</Icon>
      </Meta>
      <SafeHtmlDiv html={data.shortDescription} />
    </Box>
  );
};
