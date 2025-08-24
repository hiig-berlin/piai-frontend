
import { useState, useEffect, useRef, useCallback } from "react";

interface UseAutoSliderOptions {
  length: number;
  duration?: number;
  pause?: boolean;
}

export const useAutoSlider = ({
  length,
  duration = 5000,
  pause = false,
}: UseAutoSliderOptions) => {
  const [index, setIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    intervalRef.current = setInterval(() => {
      setIndex((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, duration);
  }, [clear, duration, length]);

  useEffect(() => {
    if (!pause) start();
    return () => clear();
  }, [pause, start, clear]);

  const goTo = useCallback(
    (newIndex: number) => {
      setIndex(newIndex);
      start(); // reset timer on manual navigation
    },
    [start]
  );

  return { index, goTo };
};
