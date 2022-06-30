import React from "react";
import styled from "styled-components";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { LabElement } from "../ui/LabElement";
import { Logo } from "./Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import { SvgBackground } from "../ui/SvgBackground";

const SidebarWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  // TODO: Vincent, you know this 100% stuff better
  height: 100%;
  width: fit-content;

  display: flex;
  flex-direction: column;
  gap: 1em;
  padding: var(--size-2);
  background: #0002;
`;

const ToolSubmenu = styled.div`
  background: #000c;
  margin-left: calc(0px - var(--size-2));
  margin-right: calc(0px - var(--size-2));
  padding: var(--size-2) var(--size-1);
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  & .subMenuItem{
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: 0.6em;
    white-space: break-spaces;
    width: min-content;
    min-width: 100%;
    line-height: 1em;
    text-align: center;
    color: white;

    .svg {
      margin: 0 auto var(--size-1);
    }
  }
`;

export const ToolSidebar = () => {
  const config = useConfigContext();
  const router = useRouter();
  // console.log("router:", router.pathname)

  return (
    <SidebarWrapper>
      <Logo
        color="white"
        direction="vertical"
        hoverColor="var(--color-AI-lab)"
      />

      {config?.tools?.length > 0 &&
        config?.tools.map((tool: any, index: number) => {
          tool.menu = tool.menu.filter((menuItem: any) => menuItem.includeInSidebar);
          console.log("item", tool.slug, ", menu: ", tool.menu)
          return (
            <>
              <Link passHref href={`/tool/${tool.slug}`} key={`tool-${index}`}>
                <a>
                  <LabElement
                    shortHandle={tool.iconShort}
                    longText={tool.iconLong}
                    color={tool.colorBase}
                    hoverColor="white"
                  />
                </a>
              </Link>
              {(router.pathname === `/tool/${tool.slug}` && tool.menu.length > 0) &&(
                <ToolSubmenu>
                  {tool.menu.map((menuItem: any, i: number) => {
                    if (menuItem.includeInSidebar) {
                      return (
                        <Link
                          passHref
                          href={`/${menuItem.slug}`}
                          key={`tool-menu-${i}`}
                        >
                          <a className="subMenuItem">
                            <SvgBackground
                              className="svg icon"
                              type={menuItem.icon}
                              position="left center"
                              height="2em"
                              width="2em"
                            />
                            {menuItem.name}
                          </a>
                        </Link>
                      );
                    }
                  })}
                </ToolSubmenu>
              )}
            </>
          );
        })}
    </SidebarWrapper>
  );
};
