import React, { useState } from "react";
import styled from "styled-components";
import Button from "../styled/Button";
import { SvgBackground } from "../ui/SvgBackground";
import { ButtonNormalized } from "../styled/Button";

const AccessibleText = styled.div<{simple?: boolean}>`
  font-weight: ${({simple}) => simple ? "400" : "inherit"};
  color: ${({simple}) => simple ? "#000" : "inherit"};
`;

const Icon = styled(ButtonNormalized)`
  position: absolute;
  top: 0;
  right: 0;
  display: block;
  background: #ffffffee;
  padding: 10px 20px 10px 5px;
  margin-top: -6px;
  border-radius: 20px;

  &:hover{
    background: yellow;
  }

  & > span:first-child {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    max-width: 0;
    margin: 0 1em;
    transition: max-width 0.5s ease;
    // opacity: 0;
    

    ${({ theme }) => theme.applyMixin("uppercase")};
  }

  &:hover > span:first-child {
    // opacity: 1;
    max-width: 200px;
  }

  & > span:last-child {
    display: inline-block;
    height: 1.5em;
    width: 1.5em;

    & .svg{
      position: relative;
      top: 2px;
    }
  }
`;

export const Accessible = ({
  simple,
  position = "top right",
  status = "standard",
  children,
}: {
  simple: any;
  position?: string;
  status?: string;
  children: React.ReactNode;
}) => {
  // TODO: Write toggle function depending on toggle or global state/envirnoment variable
  const [isSimple, setIsSimple] = useState(false);

  return (
    <>
      <AccessibleText simple={isSimple}>{isSimple ? simple : children}</AccessibleText>
      <Icon
        onClick={() => setIsSimple(!isSimple)}
        aria-label="change to simple text version"
      >
        <span>{isSimple ? "Show standard text" : "Show simplified text"}</span>
        <span><SvgBackground type="language"/></span>
      </Icon>
    </>
  );
};
