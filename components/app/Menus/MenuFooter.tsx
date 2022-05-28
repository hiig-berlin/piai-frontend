import React from "react";
import styled from "styled-components";
import { useSettingsContext } from "~/providers/SettingsContextProvider";
import { MenuItem } from "./MenuItem";

const Nav = styled.nav<{ direction: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  
  ${(props) =>
    props.theme.apply("default", (breakpoint: string) => {
      return `
          ${props.theme.textStyle(breakpoint, "caption")};          
          gap: ${props.direction === "row" ? props.theme.spacePx(breakpoint, 2) : 0};
        `;
    })}
`;

export const MenuFooter = ({
  id,
  direction,
}: {
  id: string;
  direction: string;
}) => {
  const settings = useSettingsContext();

  return (
    <Nav direction={direction}>
      {!settings?.menus?.footer?.items?.length && (
        <b>
          No menu items in menu &quot;{settings?.menus?.footer?.name ?? id}
          &quot; added
        </b>
      )}
      {settings?.menus?.footer?.items?.length > 0 &&
        settings?.menus?.footer?.items?.map((item: any, index: number) => (
          <MenuItem key={`${id}-${index}`} item={item} />
        ))}
    </Nav>
  );
};
