import React, { useState } from "react";
import styled from "styled-components";
import Button from "../styled/Button";
import { SvgBackground } from "../ui/SvgBackground";
import { ButtonNormalized } from "../styled/Button";
import SafeHtmlSpan from "../ui/SafeHtmlSpan";

const AccessibleText = styled.div<{ simple?: boolean }>`
  font-weight: ${({ simple }) => (simple ? "400" : "inherit")};
  color: ${({ simple }) => (simple ? "#000" : "inherit")};
  padding-right: 0em;

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-right: 4em;
  }
`;

const Icon = styled(ButtonNormalized)`
  position: relative;
  top: 0;
  right: 0;
  display: block;
  background: rgba(255, 255, 255, 0.85);
  padding: 10px 20px 10px 5px;
  margin-top: -6px;
  border-radius: 20px;
  text-align: right;
  opacity: 0.3;

  ${({ theme }) => theme.breakpoints.tablet} {
    position: absolute;
    opacity: 1;
  }

  &:hover {
    background: yellow;
  }

  & > span:first-child {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    max-width: auto;
    margin: 0 1em;
    transition: max-width 0.5s ease;

    ${({ theme }) => theme.applyMixin("uppercase")};

    ${({ theme }) => theme.breakpoints.tablet} {
      max-width: 0;
      margin: 0;
    }
  }

  &:hover > span:first-child {
    // opacity: 1;
    max-width: 200px;
    margin: 0 1em;
  }

  & > span:last-child {
    display: inline-block;
    height: 1.5em;
    width: 1.5em;

    & .svg {
      position: relative;
      top: 2px;
    }
  }
`;

const AccessibleContainer = styled.div`
  position: relative;
  display: flex;
  // flex-direction: column-reverse;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.tablet} {
    display: block;
  }
`;

export const Accessible = ({
  simple,
  position = "top right",
  defaultToSimple = false,
  children,
}: {
  simple: any;
  position?: string;
  defaultToSimple?: boolean;
  children: React.ReactNode;
}) => {
  // TODO: Write toggle function depending on toggle or global state/envirnoment variable
  const [isSimple, setIsSimple] = useState(defaultToSimple);

  return (
    <AccessibleContainer>
      <AccessibleText simple={isSimple}>
        <SafeHtmlSpan html={isSimple ? simple : children} />
      </AccessibleText>
      <Icon
        onClick={() => setIsSimple(!isSimple)}
        aria-label="change to simple text version"
      >
        <span>{isSimple ? "Show standard text" : "Show simplified text"}</span>
        <span>
          <SvgBackground type="language" />
        </span>
      </Icon>
    </AccessibleContainer>
  );
};
