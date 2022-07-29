import React from "react";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { Icon } from "../shared/ui/Icon";
import { Question } from "./Question";
import { Meta } from "~/components/tools/map/Styled";
import { formatDate } from "~/utils";
import safeHtml from "~/utils/sanitize";

export const ProjectCard = ({
  view = "detail",
  data,
}: {
  view: string;
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
  try {
    if (data?.teamGenderRatioMale?.value)
      genderRatio[0] = data?.teamGenderRatioMale?.value
        ? `${parseInt(data?.teamGenderRatioMale?.value)}`
        : "-";

    if (data?.teamGenderRatioFemale?.value)
      genderRatio[1] = data?.teamGenderRatioFemale?.value
        ? `${parseInt(data?.teamGenderRatioFemale?.value)}`
        : "-";

    if (data?.teamGenderRatioNonBinary?.value)
      genderRatio[2] = data?.teamGenderRatioNonBinary?.value
        ? `${parseInt(data?.teamGenderRatioNonBinary?.value)}`
        : "-";
  } catch (err) {}

  return (
    <>
      {view !== "quickview" && <h1>{safeHtml(data?.nameOfProject?.value)}</h1>}
      <Meta col={2}>
        <Icon type="marker" stc>
          {safeHtml(data?.city?.value)}, {safeHtml(data?.country?.value)}
        </Icon>
        <Icon type="calendar" stc>
          {formatDate(data?.projectStartDate?.value, {
            year: "numeric",
            month: "long",
          })}
        </Icon>
        {data?.organisation?.value?.trim() && (
          <Icon type="company" stc>
            {safeHtml(data?.organisation?.value)}
          </Icon>
        )}
        {data?.size?.value?.trim() && (
          <Icon type="people" stc>
            {safeHtml(data?.size?.value)} Team members
          </Icon>
        )}
      </Meta>
      {data?.shortDescription?.value?.trim() && (
        <SafeHtmlDiv html={safeHtml(data?.shortDescription?.value)} />
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
            {safeHtml(data?.funding?.value.join(", "))}
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
          {safeHtml(data?.stage?.value)}
        </Question>
      )}

      {view === "detail" && data?.implementedBy?.value?.length > 0 && (
        <Question question="Implemented by:" showAlways>
          {safeHtml(data?.implementedBy?.value.join(", "))}
        </Question>
      )}
      {data?.industrialSector?.value?.length > 0 && (
        <Question question="Industrial Sectors:" showAlways>
          {safeHtml(data?.industrialSector?.value.join(", "))}
        </Question>
      )}
      {data?.useOfAi?.value?.length > 0 && (
        <Question question="Usage of AI:" showAlways>
          {safeHtml(data?.useOfAi?.value.join(", "))}
        </Question>
      )}
      {data?.generationMachineLearning?.value?.length > 0 && (
        <Question question="Generation of AI:" expanded>
          {safeHtml(data?.generationMachineLearning?.value.join(", "))}
        </Question>
      )}
      {data?.modelTrainingBuilt?.value?.length > 0 && (
        <Question question="Model training:" showAlways>
          {safeHtml(data?.modelTrainingBuilt?.value.join(", "))}
        </Question>
      )}
    </>
  );
};
