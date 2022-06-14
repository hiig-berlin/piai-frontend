import React from "react";
import styled from "styled-components";
import { SvgBackground } from "../ui/SvgBackground";
import Link from "next/link";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import { LabElement } from "../ui/LabElement";
import { getStaticProps } from "~/pages";

const LogoContainer = styled.div`
  
  
  & a {
    display: flex;
    height: 2.4em;
    width: 5em;
    justify-content: space-between;

    transition: filter 0.3s;
    &:hover,
    &:active {
      filter: invert(33.33%);
    }

    @media (any-pointer: fine) {
      &:hover {
        filter: invert(33.33%);
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

export const Logo = (
  {color}:{color: string}
) => {
  const config = useConfigContext();

  return (
    <LogoContainer>
      <Link href={`${config?.baseUrl}/`} passHref>
        <a title="Go to homepage">
          <LabElement
            shortHandle="PI"
            longText="Public Interest"
            color={color || "#000)"}
          />
          <LabElement
            shortHandle="AI"
            longText="AI"
            color={color || "#000"}
          />
        </a>
      </Link>
    </LogoContainer>
  );
};
