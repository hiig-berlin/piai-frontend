//add necessary imports
import React from "react";
import styled from "styled-components";
import { Icon } from "~/components/tools/shared/ui/Icon";
import { LabElement } from "~/components/ui/LabElement";
import {
  useCssVarsStateIsDesktopAndUpState,
  useCssVarsStateIsTabletAndUpState,
} from "~/components/state/CssVarsState";
import { ButtonNormalized } from "~/components/styled/Button";

function ClaimspottingHeader({
  tool,
  language,
  setLanguage,
  strings,
}: {
  tool: {
    iconShort: string | undefined;
    iconLong: string | undefined;
    colorBase: string | undefined;
  };
  language?: string;
  setLanguage?: (lang: string) => void;
  strings?: any;
}) {
  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();

  return (
    <Header>
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
        <h1> {strings?.title || `Simba Text assistant`}</h1>
        <p>
          {strings?.subtitle ||
            `A web-based tool and browser extension that generates summaries of German-language texts. It is designed to improve your reading
          experience or support you on your language learning journey.`}
        </p>
      </div>

      {isDesktopAndUp && (
        <ul>
          <Icon
            type="info"
            className="textLink"
            aria-label="Read privacy policy"
            url="https://github.com/fhewett/simba/blob/main/PRIVACY.md"
          >
            <span>Privacy</span>
          </Icon>
          <Icon
            type="repo"
            className="textLink"
            aria-label="Go to github repository"
            url="https://github.com/fhewett/simba"
          >
            <span>GitHub</span>
          </Icon>
        </ul>
      )}
      {/* Language selection */}
      {language && setLanguage && (
        <ul className="lang">
          <li>
            <LanguageButton
              title="en"
              onClick={() => setLanguage("en")}
              active={language === "en"}
            >
              EN
            </LanguageButton>
          </li>
          <li>
            <LanguageButton
              title="de"
              onClick={() => setLanguage("de")}
              active={language === "de"}
            >
              DE
            </LanguageButton>
          </li>
        </ul>
      )}
    </Header>
  );
}

export default ClaimspottingHeader;

const Header = styled.header`
  display: flex;
  flex-direction: column-reverse;
  gap: var(--size-3);

  margin-top: 40px;

  ${({ theme }) => theme.breakpoints.tablet} {
    flex-direction: row;
    margin-top: unset;
    margin-right: 100px;
  }

  & .toolIntro {
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 0;
    line-height: 1.1em;
  }

  p {
    margin-bottom: 0;
    margin-top: var(--size-1);
  }

  ul {
    display: flex;
    margin-left: auto;
    padding-top: 15px;
    gap: var(--size-3);
    list-style: none;

    // li:nth-child(2) {
    //   .svg {
    //     display: none !important;
    //   }
    // }

    li {
      max-height: 1em;
      font-size: calc(var(--text-body-font-size-tool) * 0.85);
      line-height: 1em;
      &::marker {
        content: "" !important;
      }
    }

    &.lang {
      gap: var(--size-2);
      margin-left: auto;
      margin-right: var(--size-3);

      ${({ theme }) => theme.breakpoints.tablet} {
        margin-left: 0px;
      }
    }
  }
`;

const LanguageButton = styled(ButtonNormalized)<{ active: boolean }>`
  background: none;
  color: inherit;
  border: none;
  cursor: pointer;
  padding: 0;
  // margin: 0;
  // position: relative;
  // appearance: none;
  // user-select: none;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  // font-size: 1em;
  transition: all ease 0.2s;

  cursor: ${({ active }) => (active ? "default" : "pointer")};

  &:hover {
    color: ${({ theme, active }) => (active ? "inherit" : theme.color("piai-simba", 1))};
    font-weight: bold;
  }
`;
