import debounce from "lodash/debounce";
import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { LabElement } from "~/components/ui/LabElement";
import useIsMounted from "~/hooks/useIsMounted";
import { PiAiTool } from "~/types";

const Tool = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? "block" : "none")};
  ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;

const Children = styled.div<{ padding: string }>`
  margin-left: calc(-1 * var(--size-3));
  margin-right: calc(-1 * var(--size-3));
  margin-top: var(--size-3);
`;

export const SidebarTool = ({
  padding,
  tool,
  isActive,
  children,
}: {
  padding: string;
  tool: PiAiTool;
  isActive: boolean;
  children: React.ReactNode;
}) => {
  const childrenRef = useRef<HTMLDivElement>(null);

  const isMounted = useIsMounted();

  const onResize = useCallback(() => {
    if (!isMounted) return;
    if (typeof window === "undefined") return;

    if (childrenRef.current) {
      document.documentElement.style.setProperty(
        `--tool-${tool.slug}-ot`,
        `${childrenRef.current.offsetTop.toFixed(0)}px`
      );
    }
  }, [isMounted, tool.slug]);
  const onResizeDebounced = debounce(onResize, 100);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", onResizeDebounced);

    onResize();

    const triggerOnResize = () => {
      onResize();
    };
    document.addEventListener("DOMContentLoaded", triggerOnResize);

    return () => {
      window.removeEventListener("resize", onResizeDebounced);
      document.removeEventListener("DOMContentLoaded", triggerOnResize);

      document.documentElement.style.setProperty(
        `--tool-${tool.slug}-ot`, ""
      );
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tool isActive={isActive}>
      <Link href={`/tool/${tool.slug}`}>
        <a>
          <LabElement
            shortHandle={tool.iconShort}
            longText={tool.iconLong}
            color={tool.colorBase}
            hoverColor="white"
            size={1}
          />
        </a>
      </Link>
      {isActive && children && (
        <Children padding={padding} ref={childrenRef}>
          {children}
        </Children>
      )}
    </Tool>
  );
};
