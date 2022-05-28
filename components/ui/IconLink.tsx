import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { SvgBackground } from "./SvgBackground";

const A = styled.a`
  display: inline-block;
  width: 100%;
  height: 100%;
  transition: filter 0.3s;
  cursor: pointer;
  
  @media (any-pointer: fine) {
    &:hover {
      filter: invert(33%);
    }
  }
`;
export const IconLink = ({
  type = "none",
  title,
  url,
  target,
  className,
  rel,
  svg,
  onClick,
}: {
  type?: string;
  className?: string;
  title: string;
  url?: any;
  target?: string;
  rel?: string;
  svg?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) => {
  if (url) {
    if (url.indexOf("//") !== -1) {
      return (
        <A
          href={url}
          title={title}
          target={target ?? undefined}
          rel={rel ?? undefined}
          className={className}
          onClick={onClick}
        >
          <SvgBackground {...{ width: "100%", height: "100%", type, svg }} />
        </A>
      );
    } else {
      return (
        <Link href={url} passHref>
          <A
            title={title}
            target={target ?? undefined}
            rel={rel ?? undefined}
            className={className}
            onClick={onClick}
          >
            <SvgBackground {...{ width: "100%", height: "100%", type, svg }} />
          </A>
        </Link>
      );
    }
  }

  if (onClick)
    return (
      <A
        title={title}
        target={target ?? undefined}
        rel={rel ?? undefined}
        className={className}
        onClick={onClick}
      >
        <SvgBackground {...{ width: "100%", height: "100%", type, svg }} />
      </A>
    );

  return <></>;
};
