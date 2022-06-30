import React from 'react'
import styled from 'styled-components'

const MapContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items:center;
  background: linear-gradient(#333, #000) ;
  color: #005;
`
export const Map = () => {
  return (
    <MapContainer>The map is not the territory</MapContainer>
  )
}
