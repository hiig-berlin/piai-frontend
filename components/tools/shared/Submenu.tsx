
import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { ToolSvgBackground } from "./ToolSvgBackground";
import { useRouter } from "next/router";
import { useCssVarsStateIsTabletLandscapeAndUpState } from "~/components/state/CssVarsState";

const sidebarPadding = "var(--size-3)";

const ToolSubmenu = styled.div`
  background: #0008;

  ${({ theme }) => theme.breakpoints.tablet} {
    padding: ${sidebarPadding} 0;
  }

  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  & .subMenuItem {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: 1em;
    white-space: break-spaces;
    width: min-content;
    min-width: 100%;
    line-height: 1.3em;
    text-align: left;
    color: white;
    display: flex;
    gap: var(--size-3);

    .svg {
      font-size: 0.5em;
      background-position: center;
    }

    ${({ theme }) => theme.breakpoints.tablet} {
      font-size: 0.5em;
      text-align: center;
      display: block;
      gap: 0;

      .svg {
        font-size: 1em;
        margin: 0 auto var(--size-1);
      }
    }
  }
`;

export const Submenu = ({ tool, menu }: { tool?: string; slug?: string, menu: any }) => {
  const router = useRouter();
  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();
  return (
    <ToolSubmenu>
      {menu.map((item: any, i: number) => {
        return (
          (<Link
            key={`tool-item-${i}`}
            passHref
            href={`/tool/${tool}/${item.slug ?? ""}`}
            className={`subMenuItem ${
              router.asPath === `/tool/${tool}/${item.slug}` ? "active" : ""
            }`}>

            <ToolSvgBackground
              className="svg icon"
              type={item.icon}
              position="center"
              height="2em"
              width="2em"
            />
            {item.name}

          </Link>)
        );
      }
      )} 
    </ToolSubmenu>
  );
};
