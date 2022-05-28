import React from "react";
import styled from "styled-components";
import { useSettingsContext } from "~/providers/SettingsContextProvider";
import { MenuItem } from "./MenuItem";

const Nav = styled.nav`
  display: flex;

  & > span > a {
    transition: text-decoration-color 0.3s;
    text-decoration-color: rgba(0, 0, 0, 0);
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-thickness: 1px;

    @media (any-pointer: fine) {
      &:hover {
        text-decoration-color: #000;
        color: #000;
      }
    }
  }

  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
          ${props.theme.textStyle(breakpoint, "h3")};
          & > span {

            margin-right: ${props.theme.spacePx(breakpoint, 4)};
            
            & > a {
              text-underline-offset: ${props.theme.spacePx(breakpoint, 1)};   
              
            }
          }
        `;
    })}
`;

export const MenuHeader = ({ id }: { id: string }) => {
  const settings = useSettingsContext();

  return (
    <Nav>
      {!settings?.menus?.header?.items?.length && (
        <b>
          No menu items in menu &quot;{settings?.menus?.header?.name ?? id}
          &quot; added
        </b>
      )}
      {settings?.menus?.header?.items?.length > 0 &&
        settings?.menus?.header?.items?.map((item: any, index: number) => (
          <MenuItem key={`${id}-${index}`} item={item} />
        ))}
    </Nav>
  );
};
