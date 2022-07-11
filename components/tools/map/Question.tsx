import React, { useState } from "react";
import styled from "styled-components";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";

const QuestionWrapper = styled.div`
  h3 {
    text-transform: none;
    margin-bottom: 5px;
    font-size: inherit;
    font-weight: 700;
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
      <h3 onClick={() => setIsExpanded(!isExpanded)}>{question}</h3>
      {(isExpanded || showAlways) && <SafeHtmlDiv html={children} />}
    </QuestionWrapper>
  );
};
