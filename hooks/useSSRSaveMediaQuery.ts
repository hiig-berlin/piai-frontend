import { useLayoutEffect, useCallback, useEffect, useState } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const useSSRSaveMediaQuery = (query: string) => {
  const [targetReached, setTargetReached] = useState(false);

  const updateTarget = useCallback((e: any) => {
    if (e.matches) {
      setTargetReached(true);
    } else {
      setTargetReached(false);
    }
  }, []);

  useIsomorphicLayoutEffect(() => {
    const media = window.matchMedia(query);
    media.addEventListener
      ? media.addEventListener("change", updateTarget)
      : media.addListener(updateTarget);

    // Check on mount (callback is not called until a change occurs)
    if (media.matches) {
      setTargetReached(true);
    }

    return () => {
      media.removeEventListener
        ? media.removeEventListener("change", updateTarget)
        : media.removeListener(updateTarget);
    };
  }, []);

  return targetReached;
};
