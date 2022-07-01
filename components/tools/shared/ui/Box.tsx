import React from "react";
import styled from "styled-components";

const BoxWrapper = styled.div`
  border-radius: 20px;
  padding: var(--size-3);
  background: #000;
`;
export const Box = ({ children }: { children: any }) => {
  return <BoxWrapper>{children}</BoxWrapper>;
};
