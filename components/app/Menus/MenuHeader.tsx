import React from "react";
import styled from "styled-components";
import { useSettingsContext } from "~/providers/SettingsContextProvider";
import { MenuItem } from "./MenuItem";

const Nav = styled.nav`
  display: flex;
  
  font-family: var(--text-h3-font-family);
  font-weight: var(--text-h3-font-weight);
  font-style: var(--text-h3-font-style);
  font-size: var(--text-h3-font-size);
  line-height: var(--text-h3-line-height);
  
  & > span {
    margin-right: var(--size-4);
  }

  & > span > a {
    transition: text-decoration-color 0.3s;
    text-decoration-color: rgba(0, 0, 0, 0);
    text-decoration-line: underline;
    text-decoration-style: solid;
    text-decoration-thickness: 1px;
    text-underline-offset: 5px; 
    @media (any-pointer: fine) {
      &:hover {
        text-decoration-color: #000;
        color: #000;
      }
    }
  }
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
