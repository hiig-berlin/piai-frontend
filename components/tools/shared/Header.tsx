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
import LanguageSwitch from "~/components/tools/shared/LanguageSwitch";

const ToolHeader = ({
  tool,
  title,
  description,
  links,
  language,
  setLanguage,
  strings,
}: {
  tool: {
    iconShort: string | undefined;
    iconLong: string | undefined;
    colorBase: string | undefined;
  };
  title?: string;
  description?: string;
  links?: { type: string; url: string; ariaLabel: string; label: string }[];
  language?: string;
  setLanguage?: (lang: string) => void;
  strings?: any;
}) => {
  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();

  const headerTitle = strings?.title || title;
  const headerSubtitle = strings?.subtitle || description;

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
        <h1>{headerTitle}</h1>
        <p>{headerSubtitle}</p>
      </div>
      {isDesktopAndUp && links && (
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
      {/* Language selection */}
      {language && setLanguage && (
        <LanguageSwitch language={language} setLanguage={setLanguage} />
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
