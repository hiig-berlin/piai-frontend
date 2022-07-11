import React from "react";
import styled from "styled-components";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { Box } from "../shared/ui/Box";
import { Icon } from "./Icon";
import { Question } from "./Question";
import { Meta } from "~/components/tools/map/Styled";

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
          <Icon type="calendar" stc>{new Date(data.meta.startDate).toLocaleDateString("en-UK", {month: "long"} )} {new Date(data.meta.startDate).getFullYear()}</Icon>
          <Icon type="company" stc>{data.meta.organisation}</Icon>
          <Icon type="people" stc>{data.meta.size}</Icon>
      </Meta>
      <SafeHtmlDiv html={data.shortDescription} />
      <Meta col={3}>
          <Icon type="code" stc>{data.classification.openSource ? "Open source" : "Closed source"}</Icon>
          <Icon type="genders" stc>{data.classification.genderRatio.male}/{data.classification.genderRatio.female}/{data.classification.genderRatio.diverse} (m/f/d)</Icon>
          <Icon type="money" stc>{data.classification.funding}</Icon>
      </Meta>
      <Question
        question="Industrial Sectors:"
        showAlways  
      >
        {data.classification.sector}
      </Question>
      <Question
        question="Usage of AI:"
        showAlways  
      >
        {data.classification.usageAI}      
      </Question>
      <Question
        question="Generation of AI:"
        expanded  
      >
        {data.classification.generationAI}      
      </Question>
      <Question
        question="Model training:"
        showAlways  
      >
        {data.classification.modelTraining}      
      </Question>
    </Box>
  );
};
