import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { Logo } from "~/components/app/Logo";
import { ButtonNormalized } from "~/components/styled/Button";
import { LabElement } from "~/components/ui/LabElement";
import { useModal } from "~/hooks/useModal";
import { useConfigContext } from "~/providers/ConfigContextProvider";

const Container = styled.div.attrs<{
  isOpen: boolean;
  isOpening: boolean;
  isClosing: boolean;
}>((props) => ({
  style: {
    transition:
      props.isOpen || props.isClosing ? "tranform 0.175s" : "transform 0.35s",
    transform:
      props.isOpening || props.isOpen ? "translateX(0)" : "translateX(-105%)",
  },
}))<{
  isVisible: boolean;
}>`
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  padding: calc(var(--size-7)) calc(var(--size-2)) calc(var(--size-2))
    calc(var(--size-2));
  position: fixed;
  top: 0;
  left: 300px;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
  transition: transform 0.35s;
  transform: translateX(-105%);

  ${({ theme }) => theme.breakpoints.tablet} {
    transform: translateX(0) !important;
    padding: calc(var(--size-2));
  }
`;

const CurrentToolContainer = styled.div<{
  isVisible: boolean;
}>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  padding: calc(var(--size-2));

  display: ${({ isVisible }) => (isVisible ? "block" : "none")};

  ${({ theme }) => theme.breakpoints.tablet} {
    display: none;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: calc(var(--size-3));
  display: none;
  ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;
const Tools = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-1);
`;

const Tool = styled.div<{ isActive: boolean }>`
  display: ${({ isActive }) => (isActive ? "block" : "none")};
  ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;

const Children = styled.div`
  margin-top: var(--size-1);
  margin-bottom: var(--size-2);
`;

const ToolMenuButton = styled(ButtonNormalized)``;

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

  const currentTool =
    config?.tools?.length && config?.tools?.find((t) => t.slug === tool);

  if (!currentTool) return <></>;

  // TODO: I would change the sizing info of the icons from em to some pixel based value like --size-3, or so.
  // As the dependend on the parent's container font size messed with things arould.
  return (
    <>
      <CurrentToolContainer isVisible={view !== "page"}>
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
            color={currentTool.colorHighlight}
            hoverColor="white"
            size={1.8}
          />
        </ToolMenuButton>
      </CurrentToolContainer>
      <Container
        {...{ isOpen, isOpening, isClosing }}
        id={`sidebar-${tool}`}
        isVisible={view !== "page"}
      >
        <LogoContainer>
          <Logo color="white" direction="column" size={1.3} />
        </LogoContainer>
        <Tools>
          {config?.tools?.length > 0 &&
            config?.tools.map((t: any, index: number) => {
              return (
                <Tool key={`tool-${index}`} isActive={t.slug === tool}>
                  <Link href={`/tool/${t.slug}`}>
                    <a>
                      <LabElement
                        shortHandle={t.iconShort}
                        longText={t.iconLong}
                        color={t.colorHighlight}
                        hoverColor="white"
                        size={1.3}
                      />
                    </a>
                  </Link>
                  {t.slug === tool && children && (
                    <Children>{children}</Children>
                  )}
                </Tool>
              );
            })}
        </Tools>
      </Container>
    </>
  );
};
