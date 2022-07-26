import React from "react";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { Box } from "../shared/ui/Box";
import { Icon } from "../shared/ui/Icon";
import { Question } from "./Question";
import { Meta } from "~/components/tools/map/Styled";
import { formatDate } from "~/utils";

export const ProjectCard = ({
  view = "detail",
  data,
}: {
  view: string;
  data: any;
}) => {
  let sourceCode = "Unknown code license";
  switch (
    data?.acf?.details?.isProjectOpenSource?.value?.trim().toLowerCase()
  ) {
    case "no":
      sourceCode = "Closed source";
      break;

    case "yes":
      sourceCode = "Open source";
      break;
  }

  const genderRatio = ["-", "-", "-"];
  if (data?.acf?.details?.teamGenderRatioMale?.value)
    genderRatio[0] = data?.acf?.details?.teamGenderRatioMale?.value;

  if (data?.acf?.details?.teamGenderRatioFemale?.value)
    genderRatio[1] = data?.acf?.details?.teamGenderRatioFemale?.value;

  if (data?.acf?.details?.teamGenderRatioNonBinary?.value)
    genderRatio[2] = data?.acf?.details?.teamGenderRatioNonBinary?.value;

  return (
    <Box>
      <h1>{data?.acf?.details?.nameOfProject?.value}</h1>
      <Meta col={2}>
        <Icon type="marker" stc>
          {data?.acf?.details?.city?.value},{" "}
          {data?.acf?.details?.country?.value}
        </Icon>
        <Icon type="calendar" stc>
          {formatDate(data?.acf?.details?.projectStartDate?.value, {
            year: "numeric",
            month: "long",
          })}
        </Icon>
        {data?.acf?.details?.organisation?.value?.trim() && (
          <Icon type="company" stc>
            {data?.acf?.details?.organisation?.value}
          </Icon>
        )}
        {data?.acf?.details?.size?.value?.trim() && (
          <Icon type="people" stc>
            {data?.acf?.details?.size?.value} Team members
          </Icon>
        )}
      </Meta>
      {data?.acf?.details?.shortDescription?.value?.trim() && (
        <SafeHtmlDiv html={data?.acf?.details?.shortDescription?.value} />
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

        {data?.acf?.details?.funding?.value?.length > 0 && (
          <Icon type="money" stc>
            {data?.acf?.details?.funding?.value.join(", ")}
          </Icon>
        )}
      </Meta>

      {view === "detail" && data?.acf?.details?.stage?.value?.length > 0 && (
        <Question
          question={`Project stage (in ${formatDate(data?.date, {
            year: "numeric",
            month: "long",
          })}):`}
          showAlways
        >
          {data?.acf?.details?.stage?.value}
        </Question>
      )}
      
      {view === "detail" &&
        data?.acf?.details?.implementedBy?.value?.length > 0 && (
          <Question question="Implemented by:" showAlways>
            {data?.acf?.details?.implementedBy?.value.join(", ")}
          </Question>
        )}
      {data?.acf?.details?.industrialSector?.value?.length > 0 && (
        <Question question="Industrial Sectors:" showAlways>
          {data?.acf?.details?.industrialSector?.value.join(", ")}
        </Question>
      )}
      {data?.acf?.details?.useOfAi?.value?.length > 0 && (
        <Question question="Usage of AI:" showAlways>
          {data?.acf?.details?.useOfAi?.value.join(", ")}
        </Question>
      )}
      {data?.acf?.details?.generationMachineLearning?.value?.length > 0 && (
        <Question question="Generation of AI:" expanded>
          {data?.acf?.details?.generationMachineLearning?.value.join(", ")}
        </Question>
      )}
      {data?.acf?.details?.modelTrainingBuilt?.value?.length > 0 && (
        <Question question="Model training:" showAlways>
          {data?.acf?.details?.modelTrainingBuilt?.value.join(", ")}
        </Question>
      )}
    </Box>
  );
};
