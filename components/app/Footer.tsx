import React from "react";
import styled from "styled-components";
import { PageMargins } from "~/components/ui/PageMargins";
import { useSettingsContext } from "~/providers/SettingsContextProvider";

import safeHtml from "~/utils/sanitize";
import { MenuFooter } from "./Menus/MenuFooter";

const Grid = styled.div`
  
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas:
    "copyright"
    "navigation";
  
  & a {
    text-decoration: none;

    color: var(--color-text-gray);
  }

  @media (any-pointer: fine) {
    a {
      transition: color 0.3s;
      &:hover {
        color: #555;
      }
    }
  }


  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
          padding-top: ${
              props.theme.spacePx(breakpoint, 3)
          };
          grid-gap: ${props.theme.gutterPx(breakpoint)};
        `;
    })}


  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
      "copyright navigation";
  }
`;


const Copyright = styled.div`
  grid-area: copyright;

  & p {
    max-width: 100%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        ${props.theme.textStyle(breakpoint, "caption")};
        `;
    })}

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    align-self: end;
  }
`;

const Div = styled.div`
  grid-area: navigation;
  display: flex;
  align-self: end;

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
        ${props.theme.textStyle(breakpoint, "caption")};
        `;
    })}

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    justify-content: flex-end;
  }
`;


export const Footer = () => {
  const settings = useSettingsContext();
  
  return (
    <PageMargins spaceBottom={4} spaceTop={4}>
      
      <Grid>
        <Copyright
          dangerouslySetInnerHTML={{
            __html: safeHtml(settings?.options?.copyrightNotice ?? ""),
          }}
        />
        <Div>
          <MenuFooter id="footer" direction="row" />
        </Div>
      </Grid>
    </PageMargins>
  );
};
