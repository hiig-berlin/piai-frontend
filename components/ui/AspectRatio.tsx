import React, { useCallback, useEffect, useRef } from "react";
import debounce from "lodash/debounce";
import styled from "styled-components";
const uA =
  typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
const isChrome = uA.indexOf("chrome") !== -1;
const isSafari = (uA.indexOf("safari") !== -1 || uA.indexOf("applewebkit") !== -1 || uA.indexOf("ipad") !== -1 || uA.indexOf("iphone") !== -1) && !isChrome;

/*
  One coutl also use  potentially use 
  @supports not (aspect-ratio: 16 / 9) {
    ...
  }
*/
const Aspect = styled.div<{
  aRatio: string;
  aRwidth: string;
  aRheight: string;
  objectFit: string;
  objectPosition: string;
  bgColor: string | undefined;
  useAspectRatio: boolean;
}>`
  position: relative;
  width: ${({ aRwidth }) => aRwidth};
  height: ${({ aRheight }) => aRheight};
  aspect-ratio: ${({ useAspectRatio, aRatio }) =>
    useAspectRatio ? aRatio : "auto"};
  overflow: hidden;
  background-color: ${({ bgColor }) => bgColor ?? "transparen"};
  transform: translateZ(0);
  & > div,
  & img,
  & video,
  & iframe {
    width: 100%;
    height: 100%;
    object-fit: ${({ objectFit }) => objectFit};
    object-position: ${({ objectPosition }) => objectPosition};
    border: none;
  }
`;

export const AspectRatio = ({
  ratio,
  mode = "constrain",
  objectFit = "fill",
  objectPosition = "center center",
  children,
  direction = "width",
  bgColor,
  className,
}: {
  ratio: string;
  mode?: "constrain" | "fill";
  children: React.ReactNode;
  objectFit?: string;
  bgColor?: string;
  objectPosition?: string;
  direction?: "width" | "height";
  className?: string;
}) => {
  const aspectContainerRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const onResize = useCallback(() => {
    if (mode === "fill" || !aspectContainerRef.current) return;
    if (aspectContainerRef.current) {
      if (direction === "width") {
        aspectContainerRef.current.style.height = `calc((1 / (${ratio})) * ${aspectContainerRef.current.offsetWidth.toFixed(
          3
        )}px)`;
      } else {
        aspectContainerRef.current.style.width = `calc(((${ratio}) / 1) * ${aspectContainerRef.current.offsetWidth.toFixed(
          3
        )}px)`;
      }
    }
  }, [direction, ratio, mode]);
  const onResizeDebounced = debounce(onResize, 250);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const aRSupported = typeof CSS !== "undefined" && CSS.supports("aspect-ratio", "1/1");

    // Check on mount (callback is not called until a change occurs)
    if (
      mode === "constrain" &&
      (!aRSupported || (isSafari && ratio.replace(/ /ig, "") === "16/9"))
    ) {
      window.addEventListener("resize", onResizeDebounced);

      onResize();

      return () => {
        if (aRSupported) return;

        if (mode === "constrain" && !aRSupported)
          window.removeEventListener("resize", onResizeDebounced);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const aRwidth = mode === "fill" || direction === "width" ? "100%" : "auto";
  const aRheight = mode === "fill" || direction === "height" ? "100%" : "auto";

  return (
    <Aspect
      ref={aspectContainerRef}
      {...{
        aRatio: ratio,
        bgColor,
        aRheight,
        aRwidth,
        objectFit,
        objectPosition,
      }}
      useAspectRatio={
        !isSafari || (isSafari && ratio.replace(/ /ig, "") !== "16/9")
      }
      className={`aspect-ratio ${className}`}
    >
      {children}
    </Aspect>
  );
};
