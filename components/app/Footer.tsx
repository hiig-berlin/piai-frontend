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
  grid-gap: var(--size-gutter-width);
  padding-top: var(--size-3);

  & a {
    text-decoration: none;
    color: var(--color-text-grey);
  }

  @media (any-pointer: fine) {
    a {
      transition: color 0.3s;
      &:hover {
        color: #555;
      }
    }
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: "copyright navigation";
  }
`;

const Copyright = styled.div`
  grid-area: copyright;
  ${({ theme }) => theme.textStyle("small")}

  & p {
    max-width: 100%;

    &:last-child {
      margin-bottom: 0;
    }
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    align-self: end;
  }
`;

const Div = styled.div`
  grid-area: navigation;
  display: flex;
  align-self: end;

  ${({ theme }) => theme.textStyle("small")}

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    justify-content: flex-end;
  }
`;

export const Footer = () => {
  const settings = useSettingsContext();

  return (
    <PageMargins spaceBottom={4} spaceTop={8} bgColor="#f0f0f0">
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
