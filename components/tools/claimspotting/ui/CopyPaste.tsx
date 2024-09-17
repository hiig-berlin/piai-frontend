import React from "react";
import { Icon } from "~/components/tools/shared/ui/Icon";

const copyToClipboard = (text: string, successMessage: string) => {
  console.log("Copying to clipboard: ", text);
  navigator.clipboard.writeText(text);
  console.log(successMessage);
};

const CopyPaste = ({
  text,
  successMessage,
}: {
  text: string;
  successMessage: string;
}) => {
  return (
    <Icon onClick={() => copyToClipboard(text, successMessage)} type="copy">
      Copy results to clipboard
    </Icon>
  );
};
export default CopyPaste;
