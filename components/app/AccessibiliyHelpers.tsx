import { useEffect, useRef, useCallback } from "react";
import useIsMounted from "~/hooks/useIsMounted";

export const AccessibiliyHelpers = () => {
  const isMounted = useIsMounted();
  const uiRemoveTimoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const tabPressed = useCallback((e: KeyboardEvent) => {
    if (isMounted && e.key === "Tab") {
      
      if (uiRemoveTimoutRef.current) clearTimeout(uiRemoveTimoutRef.current);

      uiRemoveTimoutRef.current = setTimeout(() => {

        if (isMounted) 
          document.body.classList.remove("tabbed");
      }, 2500);

      document.body.classList.add("tabbed");
    }
  }, [isMounted]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    document.body.addEventListener("keyup", tabPressed);
    document.body.setAttribute("tabindex", "-1");

    setTimeout(() => {
      if (document.body) {
        document.body.removeAttribute("tabindex");
        document.body.classList.remove("tabbed");
        document.body.focus();
      }
    }, 120)

    return () => {
      document.body.removeEventListener("keyup", tabPressed);
    };
  }, [tabPressed]);

  return <></>;
};
