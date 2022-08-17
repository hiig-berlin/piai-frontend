import React from "react";
import styled from "styled-components";
import { Icon } from "../../shared/ui/Icon";

const ClearAllContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

export const ClearAll = ({ onClick }: { onClick: () => void }) => (
  <ClearAllContainer>
    <Icon type="close" onClick={onClick}>
      Clear all
    </Icon>
  </ClearAllContainer>
);
