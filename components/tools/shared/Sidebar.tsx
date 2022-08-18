import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { Logo } from "~/components/app/Logo";
import { ButtonNormalized } from "~/components/styled/Button";
import { LabElement } from "~/components/ui/LabElement";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { useCssVarsStateIsTabletAndUpState } from "~/components/state/CssVarsState";
import { Box } from "./ui/Box";
import { SidebarTool } from "./ui/SidebarTool";


const SIDEBAR_PADDING = "var(--size-3)";

// Mobile: Button and Small Menu
// =================================================

const MobileToolNavContainer = styled.div<{
  isVisible: boolean;
}>`
  pointer-events: all;
  position: fixed;
  top: ${SIDEBAR_PADDING};
  left: ${SIDEBAR_PADDING};
  z-index: 3;
  flex-direction: column;
  gap: var(--size-3);

  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};

  ${({ theme }) => theme.breakpoints.tablet} {
    display: none;
  }
`;

const ToolNav = styled(Box)<{isOpen: boolean;}>`
  transition: opacity 0.2s ease;
  opacity: ${({isOpen}) => isOpen ? "1": "0"};
`

// Tablet+: Sidebar
// =================================================

const SidebarContainer = styled.div<{
  position: string;
  isVisible: boolean;
}>`
  display: none;
  pointer-events: all;
  padding: ${SIDEBAR_PADDING};
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  /* background: #0003; */
  background-color: #0009;
  z-index: 3;
  font-size: 1.1em;
  width: var(--size-6);
  overflow-y: auto;

  ${({ theme }) => theme.applyMixin("styledScrollbar", "var(--size-1)")}

  ${({ theme }) => theme.breakpoints.tablet} {
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
    padding: ${SIDEBAR_PADDING};
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    z-index: 10;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: ${SIDEBAR_PADDING};
  display: none;
  ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;
const Tools = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${SIDEBAR_PADDING};
`;

const ToolMenuButton = styled(ButtonNormalized)`
  font-size: 1.1em;
`;

const Children = styled.div`
${({ theme }) => theme.breakpoints.tablet} {
  margin-left: calc(-1 * ${SIDEBAR_PADDING});
  margin-right: calc(-1 * ${SIDEBAR_PADDING});
  margin-top: ${SIDEBAR_PADDING};
}  


`;

export const Sidebar = ({
  children,
  tool,
  view,
}: {
  children?: React.ReactNode;
  tool: string;
  view?: string;
}) => {
  const config = useConfigContext();
  const [isOpen, setIsOpen] = useState(false);

  const currentTool = config?.tools?.find((t) => t.slug === tool);

  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();

  if (!currentTool) return <></>;

  // TODO: I would change the sizing info of the icons from em to some pixel based value like --size-3, or so.
  // As the dependend on the parent's container font size messed with things arould.

  if (isTabletAndUp) {
    return (
      <SidebarContainer
        id={`sidebar-${tool}`}
        isVisible
        position={view === "map" ? "fixed" : "sticky"}
      >
        <LogoContainer>
          <Logo
            color="white"
            hoverColor="#fff7"
            direction="vertical"
            size={1}
          />
        </LogoContainer>
        <Tools>
          {config?.tools?.length > 0 &&
            config?.tools.map((t: any, index: number) => {
              return (
                <SidebarTool
                  key={`tool-${index}`}
                  tool={t}
                  padding={SIDEBAR_PADDING}
                  isActive={t.slug === tool}
                >
                  {children}
                </SidebarTool>
              );
            })}
        </Tools>
      </SidebarContainer>
    );
  } else {
    return (
        <MobileToolNavContainer isVisible={view !== "page"}>
          <ToolMenuButton
            aria-label={isOpen ? "Close tool's menu" : "open tool's menu"}
            aria-expanded={isOpen}
            aria-controls={`sidebar-${tool}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            <LabElement
              shortHandle={currentTool.iconShort}
              longText={currentTool.iconLong}
              color="white"
              bgColor="bgTool"
              hoverColor={currentTool.colorBase}
              size={1.5}
            />
          </ToolMenuButton>
          <ToolNav isOpen={isOpen}><Children onClick={() => setIsOpen(false)}>{children }</Children></ToolNav>
        </MobileToolNavContainer>
    );
  }
};
