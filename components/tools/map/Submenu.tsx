import React from "react";
import styled from "styled-components";
import Link from "next/link";
import Button, { ButtonNormalized } from "~/components/styled/Button";
import { SvgBackground } from "~/components/ui/SvgBackground";
import { MapSvgBackground } from "./MapSvgBackground";


const ToolSubmenu = styled.div`
  background: #000c;
  margin-left: calc(0px - var(--size-2));
  margin-right: calc(0px - var(--size-2));
  padding: var(--size-2) var(--size-1);
  display: flex;
  flex-direction: column;
  gap: var(--size-3);

  & .subMenuItem {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: 0.5em;
    white-space: break-spaces;
    width: min-content;
    min-width: 100%;
    line-height: 1em;
    text-align: center;
    color: white;

    .svg {
      margin: 0 auto var(--size-1);
    }
  }
`;

export const Submenu = () => {
  return (
    <ToolSubmenu>
      <div>
        <Link passHref href="/tool/map">
          <a className="subMenuItem">
            <SvgBackground
              className="svg icon"
              type="map"
              position="left center"
              height="2em"
              width="2em"
            />
            Map view
          </a>
        </Link>
        <div>
          <ButtonNormalized><SvgBackground
              className="svg icon"
              type="search"
              position="left center"
              height="2em"
              width="2em"
            /></ButtonNormalized>
          <ButtonNormalized><SvgBackground
              className="svg icon"
              type="filter"
              position="left center"
              height="2em"
              width="2em"
            /></ButtonNormalized>
        </div>
      </div>
      <div>
        <Link passHref href="/tool/map">
          <a className="subMenuItem">
            <SvgBackground
              className="svg icon"
              type="map"
              position="left center"
              height="2em"
              width="2em"
            />
            Map view
          </a>
        </Link>
        <div>
          <ButtonNormalized><SvgBackground
              className="svg icon"
              type="search"
              position="left center"
              height="2em"
              width="2em"
            /></ButtonNormalized>
          <ButtonNormalized><SvgBackground
              className="svg icon"
              type="filter"
              position="left center"
              height="2em"
              width="2em"
            /></ButtonNormalized>
        </div>
      </div>
    </ToolSubmenu>
  );
};
