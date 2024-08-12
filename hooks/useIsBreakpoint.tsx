import theme from "~/theme/theme";
import { useSSRSaveMediaQuery } from "./useSSRSaveMediaQuery";

export default function useIsBreakpoint(breakpoint: string): boolean {
  
  
  const matches = useSSRSaveMediaQuery(
    (
      (theme as any)?.breakpoints?.[breakpoint] ?? "(min-width: 40000px)"
    ).replace("@media ","")
  );

  return matches;
}
