import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Logo } from "~/components/app/Logo";
import { ButtonNormalized } from "~/components/styled/Button";
import { LabElement } from "~/components/ui/LabElement";
import { useModal } from "~/hooks/useModal";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
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
  z-index: 4;
  flex-direction: column;

  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};

  ${({ theme }) => theme.breakpoints.tablet} {
    display: none;
  }
`;

const ToolNav = styled(Box)`
`

// Tablet+: Sidebar
// =================================================

const SidebarContainer = styled.div.attrs<{
  isOpen: boolean;
  isOpening: boolean;
  isClosing: boolean;
}>((props) => ({
  style: {
    transition:
      props.isOpen || props.isClosing ? "transform 0.175s" : "transform 0.35s",
    transform:
      props.isOpening || props.isOpen ? "translateX(0)" : "translateX(-105%)",
  },
}))<{
  position: string;
  isVisible: boolean;
}>`
  display: none;
  pointer-events: all;
  padding: ${SIDEBAR_PADDING};
  position: ${({ position }) => position};
  top: 0;
  left: 0;
  height: 100vh;
  /* background: #0003; */
  background-color: #f0f9;
  z-index: 3;
  transition: transform 0.35s;
  transform: translateX(-105%);
  font-size: 1.1em;
  width: var(--size-6);

  ${({ theme }) => theme.breakpoints.tablet} {
    display: ${({ isVisible }) => (isVisible ? "block" : "none")};
    transform: translateX(0) !important;
    padding: ${SIDEBAR_PADDING};
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
  margin-left: calc(-1 * ${SIDEBAR_PADDING});
  margin-right: calc(-1 * ${SIDEBAR_PADDING});
  margin-top: ${SIDEBAR_PADDING};
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
  const { isOpen, isOpening, isClosing, toggle } = useModal({
    defaultIsOpen: false,
    openingAnimationLength: 350,
    closeAnimationLength: 175,
  });

  const currentTool = config?.tools?.find((t) => t.slug === tool);

  const {
    vars: { isTabletAndUp },
  } = useCssVarsContext();

  if (!currentTool) return <></>;

  // TODO: I would change the sizing info of the icons from em to some pixel based value like --size-3, or so.
  // As the dependend on the parent's container font size messed with things arould.
  
  if (isTabletAndUp){
    return(
      <SidebarContainer
        {...{ isOpen, isOpening, isClosing }}
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
      )
  }else{
    return (
        <MobileToolNavContainer isVisible={view !== "page"}>
          <ToolMenuButton
            aria-label={isOpen ? "Close tool's menu" : "open tool's menu"}
            aria-expanded={isOpen}
            aria-controls={`sidebar-${tool}`}
            onClick={(e) => {
              e.preventDefault();
  
              toggle();
            }}
          >
            <LabElement
              shortHandle={currentTool.iconShort}
              longText={currentTool.iconLong}
              color="white"
              hoverColor={currentTool.colorBase}
              size={1.5}
            />
          </ToolMenuButton>
          <ToolNav><Children>{children}</Children></ToolNav>
        </MobileToolNavContainer>
    );
  }
}
