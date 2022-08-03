import type { MouseEvent } from "react";
import { Icon } from "../shared/ui/Icon";
import safeHtml from "~/utils/sanitize";
import styled from "styled-components";
import { ButtonNormalized } from "~/components/styled/Button";
import { GeoJsonFeature } from "./map/types";

const Item = styled(ButtonNormalized)`
  display: inline-block;
  margin-bottom: var(--size-3);
  width: 100%;

  color: #fff;

  text-align: left;
  &:last-child {
    margin-bottom: 0;
  }

  & > span {
    display: flex;
    flex-direction: row;
    gap: var(--size-2);
    width: 100%;
    margin: 0;
    padding: 0;
    font-size: var(--text-small-font-size);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const SearchItem = ({
  feature,
  openQuickView,
}: {
  feature: GeoJsonFeature;
  openQuickView?: any;
}) => {
  return (
    <Item
      onClick={() => {
        openQuickView(feature);
      }}
    >
      <b>{safeHtml(feature?.properties?.name ?? "")}</b>
      <br />
      <span>
        <Icon type="marker" inline>
          {safeHtml(feature?.properties?.city ?? "")},{" "}
          {safeHtml(feature?.properties?.country ?? "")}
        </Icon>
        {(feature?.properties?.organisation ?? "").trim() && (
          <Icon type="company" inline>
            {safeHtml(feature?.properties?.organisation)}
          </Icon>
        )}
      </span>
    </Item>
  );
};
