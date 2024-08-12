// add imports
import React from "react";
import styled from "styled-components";
import { Icon } from "~/components/tools/shared/ui/Icon";
import { narrow } from "~/components/tools/map/Styled";
import { LabElement } from "~/components/ui/LabElement";
import {
  useCssVarsStateIsDesktopAndUpState,
  useCssVarsStateIsTabletAndUpState,
} from "~/components/state/CssVarsState";

const ToolHeader = ({
  tool,
  title,
  description,
  links,
}: {
  tool: {
    iconShort: string | undefined;
    iconLong: string | undefined;
    colorBase: string | undefined;
  };
  title: string;
  description: string;
  links: { type: string; url: string; ariaLabel: string; label: string }[];
}) => {
  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();

  return (
    <HeaderWrapper>
      {isTabletAndUp && (
        <LabElement
          shortHandle={tool.iconShort}
          longText={tool.iconLong}
          color="white"
          hoverColor={tool.colorBase}
          size={2}
        />
      )}
      <div className="toolIntro">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {isDesktopAndUp && (
        <ul>
          {links.map((link, index) => (
            <Icon
              key={index}
              type={link.type}
              className="textLink"
              spaceBefore
              url={link.url}
              aria-label={link.ariaLabel}
            >
              <span>{link.label}</span>
            </Icon>
          ))}
        </ul>
      )}
    </HeaderWrapper>
  );
};

export default ToolHeader;

const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: row;
  gap: var(--size-3);
  margin-top: 100px;

  ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: unset;
    margin-right: 100px;
  }

  & .toolIntro {
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  & h1 {
    ${({ theme }) => theme.applyMixin("uppercase")};
    margin-bottom: var(--size-1);
    font-weight: bold;
    line-height: 1.1em;
  }

  & p {
    ${narrow}
    margin-bottom: 0;
  }

  ul {
    margin-left: auto;
    display: flex;
    gap: var(--size-3);
  }

  button,
  li {
    max-height: 1.5em;
    margin-top: 13px;
    font-size: calc(var(--text-body-font-size-tool) * 0.85);
    line-height: 1em;
  }
`;
