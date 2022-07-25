import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import SvgarrowsExpand from "~/components/svgs/SvgarrowsExpand";
import SvgarrowsCollapse from "~/components/svgs/SvgarrowsCollapse";

const QuestionWrapper = styled.div<{ svg: string }>`
  h3 {
    text-transform: none;
    margin-bottom: 5px;
    font-size: inherit;
    font-weight: 700;
    cursor: pointer;
    display: inline-block;
    padding-right: 1.5em;

    &:hover {
      opacity: 0.8;
      background-position: right 0.2em;
      background-repeat: no-repeat;
      background-size: 0.8em;
      background-image: url('data:image/svg+xml,${({ svg }) => svg}');
    }
  }
`;
export const Question = ({
  question,
  expanded = true,
  showAlways = false,
  children,
}: {
  question: String;
  expanded?: Boolean;
  showAlways?: Boolean;
  children: any;
}) => {
  const [isExpanded, setIsExpanded] = useState(expanded);

  useEffect(() => {
    setIsExpanded(expanded);
  }, [expanded]);

  return (
    <QuestionWrapper svg={isExpanded ? SvgarrowsCollapse : SvgarrowsExpand}>
      <h3 role="button" onClick={() => setIsExpanded(!isExpanded)}>
        {question}
      </h3>
      {(isExpanded || showAlways) && <SafeHtmlDiv html={children} />}
    </QuestionWrapper>
  );
};
