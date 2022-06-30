import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { LabElement } from "../ui/LabElement";

const LogoLink = styled.a<{ direction?: string }>`
  display: flex;
  gap: 0.3em;
  flex-direction: ${({ direction }) => direction === "vertical" ? "column" : "row"};

  transition: filter 0.3s, color var(--transition-speed-link);

  &:active {
    color: var(--hc);
  }

  @media (any-pointer: fine) {
    &:hover {
      color: var(--hc);

      div {
        color: var(--hc) !important;
        border-color: var(--hc) !important;
      }
    }
  }
`;

export const Logo = ({
  color,
  hoverColor,
  size,
  direction,
}: {
  color: string;
  hoverColor?: string;
  size?: number;
  direction?: string;
}) => {
  const config = useConfigContext();

  return (
    <div className="logo">
      <Link href={`${config?.baseUrl}`} passHref>
        <LogoLink
          direction={direction}
          title="Go to homepage"
          style={
            {
              "--hc": hoverColor ?? "var(--color-ailab-red)",
            } as React.CSSProperties
          }
        >
          <LabElement
            shortHandle="PI"
            longText="Public Interest"
            color={color}
            size={size}
          />
          <LabElement
            shortHandle="AI"
            longText="AI"
            color={color}
            size={size}
          />
        </LogoLink>
      </Link>
    </div>
  );
};
