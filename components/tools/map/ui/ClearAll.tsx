import React from "react";
import styled from "styled-components";
import { themeImgSizes } from "~/theme/theme";
import { Icon } from "../../shared/ui/Icon";

const ClearAllContainer = styled.div`
  // width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
  
  button{
    ${({theme}) => theme.applyMixin("uppercase")};
    align-items: center;
    gap: 0;
  }
`;

export const ClearAll = ({ onClick }: { onClick: () => void }) => (
  <ClearAllContainer>
    <Icon type="close" onClick={onClick}>
      Clear all
    </Icon>
  </ClearAllContainer>
);
