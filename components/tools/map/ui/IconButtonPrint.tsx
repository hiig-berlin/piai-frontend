import React from "react";
import { Icon } from "../../shared/ui/Icon";

export const IconButtonPrint = ({ spaceBefore }: { spaceBefore?: boolean }) => {
  return (
    <Icon
      type="print"
      aria-label="Print page"
      className="print"
      spaceBefore={spaceBefore}
      onClick={() => {
        if (typeof window === "undefined") return;

        window.print();
      }}
    />
  );
};
