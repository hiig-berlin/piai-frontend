import React, { useState } from "react";
import styled from "styled-components";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import SvgarrowsExpand from "~/components/svgs/SvgarrowsExpand";
import SvgarrowsCollapse from "~/components/svgs/SvgarrowsCollapse";


const QuestionWrapper = styled.div<{expanded: Boolean;}>`
  h3 {
    text-transform: none;
    margin-bottom: 5px;
    font-size: inherit;
    font-weight: 700;

    &:hover{
      background-position: top right;
      background-reapeat: no-repeat;
      background-image: `url('data:image/svg+xml,${}')`;
    }
  }
`;
export const Question = ({
  question,
  expanded = false,
  showAlways = false,
  children,
}: {
  question: String;
  expanded?: Boolean;
  showAlways?: Boolean;
  children: any;
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  return (
    <QuestionWrapper>
      <h3 onClick={() => setIsExpanded(!isExpanded)} expanded={expanded}>{question}</h3>
      {(isExpanded || showAlways) && <SafeHtmlDiv html={children} />}
    </QuestionWrapper>
  );
};
