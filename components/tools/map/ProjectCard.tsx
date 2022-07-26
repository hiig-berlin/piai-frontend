import React from "react";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { Box } from "../shared/ui/Box";
import { Icon } from "../shared/ui/Icon";
import { Question } from "./Question";
import { Meta } from "~/components/tools/map/Styled";
import { formatDate } from "~/utils";
import Link from "next/link";
import { LinkButtonAnimated } from "~/components/styled/Button";
import styled from "styled-components";

const ViewMore = styled.div`
  display: flex;
  justify-content: center;
  padding-top: var(--size-3);
  a {
    color: var(--color-piai-map-highlight) !important;
    border-color: var(--color-piai-map-highlight);
    
    &:visited {
      color: var(--color-piai-map-highlight);
    }
  }
`

export const ProjectCard = ({
  view = "detail",
  slug,
  data,
}: {
  view: string;
  slug?: string;
  data: any;
}) => {
  let sourceCode = "Unknown code license";
  switch (data?.isProjectOpenSource?.value?.trim().toLowerCase()) {
    case "no":
      sourceCode = "Closed source";
      break;

    case "yes":
      sourceCode = "Open source";
      break;
  }

  const genderRatio = ["-", "-", "-"];
  if (data?.teamGenderRatioMale?.value)
    genderRatio[0] = data?.teamGenderRatioMale?.value;

  if (data?.teamGenderRatioFemale?.value)
    genderRatio[1] = data?.teamGenderRatioFemale?.value;

  if (data?.teamGenderRatioNonBinary?.value)
    genderRatio[2] = data?.teamGenderRatioNonBinary?.value;

  return (
    <Box>
      <h1>{data?.nameOfProject?.value}</h1>
      <Meta col={2}>
        <Icon type="marker" stc>
          {data?.city?.value}, {data?.country?.value}
        </Icon>
        <Icon type="calendar" stc>
          {formatDate(data?.projectStartDate?.value, {
            year: "numeric",
            month: "long",
          })}
        </Icon>
        {data?.organisation?.value?.trim() && (
          <Icon type="company" stc>
            {data?.organisation?.value}
          </Icon>
        )}
        {data?.size?.value?.trim() && (
          <Icon type="people" stc>
            {data?.size?.value} Team members
          </Icon>
        )}
      </Meta>
      {data?.shortDescription?.value?.trim() && (
        <SafeHtmlDiv html={data?.shortDescription?.value} />
      )}
      <Meta col={3}>
        <Icon type="code" stc>
          {sourceCode}
        </Icon>

        {genderRatio.find((val: any) => val.toLowerCase() !== "-") && (
          <Icon type="genders" stc>
            {genderRatio.join("/")} (% m/f/d)
          </Icon>
        )}

        {data?.funding?.value?.length > 0 && (
          <Icon type="money" stc>
            {data?.funding?.value.join(", ")}
          </Icon>
        )}
      </Meta>

      {view === "detail" && data?.stage?.value?.length > 0 && (
        <Question
          question={`Project stage (in ${formatDate(data?.date, {
            year: "numeric",
            month: "long",
          })}):`}
          showAlways
        >
          {data?.stage?.value}
        </Question>
      )}

      {view === "detail" && data?.implementedBy?.value?.length > 0 && (
        <Question question="Implemented by:" showAlways>
          {data?.implementedBy?.value.join(", ")}
        </Question>
      )}
      {data?.industrialSector?.value?.length > 0 && (
        <Question question="Industrial Sectors:" showAlways>
          {data?.industrialSector?.value.join(", ")}
        </Question>
      )}
      {data?.useOfAi?.value?.length > 0 && (
        <Question question="Usage of AI:" showAlways>
          {data?.useOfAi?.value.join(", ")}
        </Question>
      )}
      {data?.generationMachineLearning?.value?.length > 0 && (
        <Question question="Generation of AI:" expanded>
          {data?.generationMachineLearning?.value.join(", ")}
        </Question>
      )}
      {data?.modelTrainingBuilt?.value?.length > 0 && (
        <Question question="Model training:" showAlways>
          {data?.modelTrainingBuilt?.value.join(", ")}
        </Question>
      )}

      {view === "quickview" && slug && (
        <ViewMore>
          <Link href={`/tool/map/project/${slug}`} passHref>
            <LinkButtonAnimated>View full project profile</LinkButtonAnimated>
          </Link>
        </ViewMore>
      )}
    </Box>
  );
};
