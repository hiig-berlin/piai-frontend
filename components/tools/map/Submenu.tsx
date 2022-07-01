import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Button, { ButtonNormalized } from "~/components/styled/Button";
import { SvgBackground } from "~/components/ui/SvgBackground";
import { MapSvgBackground } from "./MapSvgBackground";

const sidebarPadding = "var(--size-3)";

const ToolSubmenu = styled.div`
  background: #0008;
  // margin-left: calc(0px - var(--size-2));
  // margin-right: calc(0px - var(--size-2));
  padding: ${sidebarPadding} 0;
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  & .subMenuItem {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: 0.5em;
    white-space: break-spaces;
    width: min-content;
    min-width: 100%;
    line-height: 1.3em;
    text-align: center;
    color: white;
    display: block;

    .svg {
      margin: 0 auto var(--size-1);
    }
  }
`;

const ActionItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${sidebarPadding};
  padding: ${sidebarPadding} 0 var(--size-1);
`

export const Submenu = () => {
  return (
    <ToolSubmenu>
      <div>
        <Link passHref href="/tool/map">
          <a className="subMenuItem">
            <MapSvgBackground
              className="svg icon"
              type="map"
              position="left center"
              height="2em"
              width="2em"
            />
            Map view
          </a>
        </Link>
        <ActionItems>
          <ButtonNormalized><MapSvgBackground
              className="svg icon"
              type="search"
              position="left center"
              height="1.3em"
              width="1.3em"
            /></ButtonNormalized>
          <ButtonNormalized><MapSvgBackground
              className="svg icon"
              type="filter"
              position="left center"
              height="1.3em"
              width="1.3em"
            /></ButtonNormalized>
        </ActionItems>
      </div>
      <div className="actionItems">
        <Link passHref href="/tool/map">
          <a className="subMenuItem">
            <MapSvgBackground
              className="svg icon"
              type="list"
              position="left center"
              height="2em"
              width="2em"
            />
            Directory
          </a>
        </Link>
        <ActionItems>
          <ButtonNormalized><MapSvgBackground
              className="svg icon"
              type="search"
              position="left center"
              height="1.3em"
              width="1.3em"
            /></ButtonNormalized>
          <ButtonNormalized><MapSvgBackground
              className="svg icon"
              type="filter"
              position="left center"
              height="1.3em"
              width="1.3em"
            /></ButtonNormalized>
        </ActionItems>
      </div>
    </ToolSubmenu>
  );
};
