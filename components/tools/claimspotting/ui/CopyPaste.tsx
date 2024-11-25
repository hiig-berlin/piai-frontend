import React, { useState } from "react";
import { Icon } from "~/components/tools/shared/ui/Icon";
import styled from "styled-components";

const SUCCESS_MESSAGE_DURATION = 3000; // 1 second

const CopyPaste = ({
  text,
  mode = "table",
  strings,
}: {
  text: string;
  mode?: string;
  strings: any;
}) => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), SUCCESS_MESSAGE_DURATION);
  };

  return (
    <CopyIcon
      onClick={() => handleCopy()}
      type="copy"
      success={showSuccess}
    >
      {showSuccess
        ? strings?.success
        : mode === "table"
        ? strings?.copyTable
        : strings?.copyRow}
    </CopyIcon>
  );
};
export default CopyPaste;

const CopyIcon = styled(Icon)<{ success: boolean }>`
  flex: 0 1 auto;
  align-items: center;
  margin-left: auto;
  display: flex;
  transform: translateX(${({ success }) => (success ? "0" : "calc(100% - 2em)")});
  transition: opacity 0.5s ease, transform 0.5s ease;
  opacity: 1;

  span.svg {
    min-width: 1em !important;
    opacity: ${({ success }) => success ? 0 : 1};
    transition: opacity 0.5s ease;
  }

  span:nth-child(2) {
    text-transform: uppercase;
    letter-spacing: 0.02em;
    font-family: var(--font-family-sans-serif);
    opacity: ${({ success }) => (success ? 1 : 0)};
    color: ${({ success }) => (success ? "var(--color-piai-claim)" : "white")};
    font-weight: ${({ success }) => (success ? "bold" : "normal")};
    display: inline-block;
    line-height: 1em;
    overflow: hidden;
    white-space: nowrap;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  &:hover {
    transform: translateX(0);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  &:hover span:nth-child(2) {
    opacity: 1;
    transition: opacity 0.5s ease, transform 0.5s ease;
    width: max-content;
  }
`;


// const CopyIcon = styled(Icon)<{success: boolean}>`
//   flex: 0 1 auto;
//   align-items: center;
//   margin-left: auto;
//   display: flex;

//   transition: all 0.5s ease;

//   span.svg {
//     min-width: 1em !important;
//   }

//   span:nth-child(2) {
//     text-transform: uppercase;
//     letter-spacing: 0.02em;
//     font-family: var(--font-family-sans-serif);
//     opacity: 0;
//     max-width: 0;
//     min-width: 0;
//     display: inline-block;
//     line-height: 1em;
//     overflow: hidden;
//     white-space: nowrap;
//     align-content: center;
//     color: ${({ success }) => success ? "var(--color-piai-claim)" : "white"};
//     font-weight: ${({ success }) => success ? "bold" : "normal"};
//   }

//   &:hover span:nth-child(2) {
//     opacity: 1;
//     max-width: max-content;
//     transition: all 1s ease;
//   }

//   span.svg{
//     opacity: ${({ success }) => success ? 0 : 1};
//     transition: all 1s ease;
//   }
// `;

