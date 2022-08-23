import React, { useEffect, useRef, useState, useCallback } from "react";
import styled from "styled-components";
import useIsMounted from "~/hooks/useIsMounted";
import debounce from "lodash/debounce";

const Container = styled.div<{
  height: string;
  offset: string;
  duration: number;
  active: boolean;
}>`
  position: ${({ active }) => (active ? "relative" : "static")};
  height: ${({ height, active }) => (active ? height ?? 0 : "auto")};
  transition: ${({ active, duration }) =>
    active ? `height ${duration}ms` : "none"};
  width: 100%;
  overflow: ${({ offset }) => offset};

  @media print { 
    height: auto;
    position: static;
  }
`;

const Payload = styled.div<{
  active: boolean;
  position: string;
}>`
  position: ${({ active }) => (active ? "absolute" : "static")};
  top: ${({ position }) => (position === "top" ? "0" : "auto")};
  bottom: ${({ position }) => (position === "bottom" ? "0" : "auto")};
  left: 0;
  width: 100%;

  @media print { 
    position: static;
  }
`;

export const Reveal = ({
  id,
  role,
  children,
  open,
  duration = 300,
  initiallyOpen,
  active = true,
  position = "bottom",
}: {
  id: string;
  role: string;
  children: React.ReactNode;
  duration?: number;
  open: boolean;
  initiallyOpen?: boolean;
  active?: boolean;
  position?: string;
}) => {
  const isMounted = useIsMounted();
  const offsetTimoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const payloadRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const [height, setHeight] = useState(initiallyOpen ? "auto" : "0px");
  const [offset, setOffset] = useState(open ? "visible" : "hidden");

  const toggleOffset = useCallback(() => {
    if (!isMounted) return;

    setOffset(open ? "visible" : "hidden");
  }, [isMounted, open]);

  const onResize = useCallback(() => {
    if (open) {
      setHeight(`${payloadRef?.current?.offsetHeight ?? 0}px`);
    } else {
      setHeight("0px");
    }
  }, [open]);
  const onResizeDebounced = debounce(onResize, 100);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", onResizeDebounced);

    onResize();

    return () => {
      window.removeEventListener("resize", onResizeDebounced);
    };
  }, [onResize, onResizeDebounced]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    setOffset("hidden");
    onResize();

    if (offsetTimoutRef.current) clearTimeout(offsetTimoutRef.current);

    offsetTimoutRef.current = setTimeout(toggleOffset, duration);
  }, [open, duration, toggleOffset, onResize]);

  return (
    <Container
      id={id}
      height={height}
      duration={duration}
      active={active}
      offset={offset}
      aria-hidden={!open}
      role={role}
      tabIndex={!open ? -1 : undefined}
    >
      <Payload ref={payloadRef} active={active} position={position}>
        {children}
      </Payload>
    </Container>
  );
};
