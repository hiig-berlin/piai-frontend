import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { LabElement } from "../ui/LabElement";

const LogoContainer = styled.div<{ 
  size?: number; 
  hoverColor?: string; 
  direction?: string; 
}>`
  & a {
    display: inline-flex;
    // height: calc(2.4em * ${({ size }) => size || 1});
    // width: calc(5em * ${({ size }) => size || 1});
    justify-content: space-between;

    transition: filter 0.3s;
    &:hover,
    &:active {
      color: ${({ hoverColor }) => hoverColor || "var(--color-ailab-red)"};
    }

    @media (any-pointer: fine) {
      &:hover {
        color: ${({ hoverColor }) => hoverColor || "var(--color-ailab-red)"};
      }
    }

    flex-direction: ${({ direction }) => direction === "vertical" ? "column": "row"};
    gap: 0.3em;
  }

  // height: var(--size-6);
  // width: var(--size-6);
  // top: var(--size-3);
  // left: var(--size-page-margin);

  // ${({ theme }) => theme.breakpoints.tablet} {
  //   height: var(--size-5);
  //   width: var(--size-5);
  // }
`;

export const Logo = ({
  color,
  hoverColor,
  size,
  direction = "horizontal",
}: {
  color: string;
  hoverColor?: string;
  size?: number;
  direction?: string;
}) => {
  const config = useConfigContext();

  return (
    <LogoContainer
      size={size}
      hoverColor={hoverColor}
      onMouseEnter={() => isHover(true)}
      onMouseLeave={() => isHover(false)}
      className="logo"
      direction={direction}
    >
      <Link href={`${config?.baseUrl}/`} passHref>
        <a title="Go to homepage">
          <LabElement
            shortHandle="PI"
            longText="Public Interest"
            color={hover ? hoverColor : color}
            hoverColor={hoverColor}
            size={size}
          />
          <LabElement
            shortHandle="AI"
            longText="AI"
            color={hover ? hoverColor : color}
            hoverColor={hoverColor}
            size={size}
          />
        </LogoLink>
      </Link>
    </div>
  );
};
