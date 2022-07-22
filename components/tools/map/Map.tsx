import React from "react";
import styled from "styled-components";

const MapContainer = styled.div<{ isVisible?: boolean }>`
  display: ${({ isVisible }) => (isVisible ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  // I used negative not to inferere with
  // non absolute positioned page layout
  z-index: -3;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  // background: linear-gradient(#333, #000);
  background: linear-gradient(pink, red);
  // color: #005;
`;
export const Map = ({ isVisible }: { isVisible?: boolean }) => {
  return (
    <MapContainer isVisible={isVisible}>
      The map is not the territory
    </MapContainer>
  );
};
