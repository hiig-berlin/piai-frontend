import React from "react";
import styled from "styled-components";
import { SvgBackground } from "../ui/SvgBackground";
import Link from "next/link";
import { useConfigContext } from "~/providers/ConfigContextProvider";

const LogoContainer = styled.div`
  position: fixed;
  z-index: ${({ theme }) => theme.zIndex.logo};
  
  & a {
    display: block;
    height: 100%;
    width: 100%;
    filter: invert(70%);

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

  height: var(--size-6);
  width: var(--size-6);
  top: var(--size-3);
  left: var(--size-page-margin);
 
  ${({ theme }) => theme.breakpoints.tablet} {
    height: var(--size-5);
    width: var(--size-5);
  }
`;

export const Logo = () => {
  const config = useConfigContext();

  return (
    <LogoContainer>
      <Link href={`${config?.baseUrl}/`} passHref>
        <a title="Go to homepage">
          <SvgBackground
            type="logo"
            position="left center"
            width="300%"
            height="100%"
          />
        </a>
      </Link>
    </LogoContainer>
  );
};
