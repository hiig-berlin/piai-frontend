import React, { useState } from 'react';
import styled from "styled-components";
import { SvgBackground } from "../ui/SvgBackground";
import Link from "next/link";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { LabElement } from "../ui/LabElement";
import { getStaticProps } from "~/pages";

const LogoContainer = styled.div<{size?: number, hoverColor?: string;}>`
  
  
  & a {
    display: flex;
    height: calc(2.4em *  ${({size}) => size || 1});
    width: calc(5em *  ${({size}) => size || 1});
    justify-content: space-between;

    transition: filter 0.3s;
    &:hover,
    &:active {
      color: ${({hoverColor}) => hoverColor || "var(--color-ailab-red)"}
    }

    @media (any-pointer: fine) {
      &:hover {
        color: ${({hoverColor}) => hoverColor || "var(--color-ailab-red)"}
      }
    }
  }

  // height: var(--size-6);
  // width: var(--size-6);
  // top: var(--size-3);
  // left: var(--size-page-margin);
 
  // ${({ theme }) => theme.breakpoints.tablet} {
  //   height: var(--size-5);
  //   width: var(--size-5);
  // }
`;  


export const Logo = ({
  color,
  hoverColor,
  size,
} :{
    color: string;
    hoverColor?: string;
    size?: number;
  }
) => {
  const config = useConfigContext();
  const [hover, isHover] = useState(false);

  return (
    <LogoContainer 
      size={size} 
      hoverColor={hoverColor}
      onMouseEnter={()=> isHover(true)} 
      onMouseLeave={()=> isHover(false)}
      className="logo"
    >
      <Link href={`${config?.baseUrl}/`} passHref>
        <a title="Go to homepage">
          <LabElement
            shortHandle="PI"
            longText="Public Interest"
            color={hover? hoverColor : color}
            hoverColor={hoverColor}
            size={size}
          />
          <LabElement
            shortHandle="AI"
            longText="AI"
            color={hover? hoverColor : color}
            hoverColor={hoverColor}
            size={size}
          />
        </a>
      </Link>
    </LogoContainer>
  );
};
