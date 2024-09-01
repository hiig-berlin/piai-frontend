import React from "react";
import { ButtonNormalized } from "~/components/styled/Button";
import styled from "styled-components";

const LanguageSwitch = ({
  language,
  setLanguage,
}: {
  language: string;
  setLanguage: (lang: string) => void;
}) => (
  <LanguageWrapper>
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
  </LanguageWrapper>
);

export default LanguageSwitch;

const LanguageWrapper = styled.ul`
  gap: var(--size-2);
  margin-left: auto;
  margin-right: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    margin-left: 0px;
  }

  & li::marker {
    content: "" !important;
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
    color: ${({ theme, active }) =>
      active ? "inherit" : theme.color("piai-simba", 1)};
    font-weight: bold;
  }
`;
