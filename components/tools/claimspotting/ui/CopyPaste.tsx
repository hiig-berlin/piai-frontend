import React from "react";
import { Icon } from "~/components/tools/shared/ui/Icon";
import styled from "styled-components";
import useLanguage from "~/hooks/useLanguage";

const copyToClipboard = (text: string, successMessage: string) => {
  // console.log("Copying to clipboard: ", text);
  navigator.clipboard.writeText(text);
  // console.log(successMessage);
};

const CopyPaste = ({
  text
}: {
  text: string;
}) => {

  const { strings } = useLanguage("claimspotting");

  return (
    <CopyIcon onClick={() => copyToClipboard(text, strings?.index.statusMessages.copySuccess)} type="copy">
      {strings?.index.statusMessages.copyResults || "test" }
    </CopyIcon>
  );
};
export default CopyPaste;

const CopyIcon = styled(Icon)`
  flex: 0 1 auto;
  align-items: center;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-family: var(--font-family-sans-serif);
  margin-left: auto;

  span.svg{
    min-width: 1em !important;
  }
`;
