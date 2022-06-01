import React from "react";
import styled from "styled-components";
import { useSettingsContext } from "~/providers/SettingsContextProvider";
import { MenuItem } from "./MenuItem";

const Nav = styled.nav<{ direction: string }>`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  
  gap: var(--size-gutter-width);
  font-family: var(--text-caption-font-family);
  font-weight: var(--text-caption-font-weight);
  font-style: var(--text-caption-font-style);
  font-size: var(--text-caption-font-size);
  line-height: var(--text-caption-line-height);

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
