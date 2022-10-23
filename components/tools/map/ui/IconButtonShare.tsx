import React from "react";
import { Icon } from "../../shared/ui/Icon";

export const IconButtonShare = ({
  label,
  title,
  url,
  text,
  spaceBefore,
}: {
  label: string;
  title: string;
  url: string;
  text: string;
  spaceBefore?: boolean;
}) => {
  if (typeof navigator?.share === "undefined") return <></>;

  return (
    <Icon
      type="share"
      aria-label={label}
      spaceBefore={spaceBefore}
      onClick={async () => {
        try {
          await navigator.share({
            title,
            url,
            text,
          });
        } catch (err) {}
      }}
    />
  );
};
