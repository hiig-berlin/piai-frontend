import styled from "styled-components";

export const HideOnPrint = styled.div`
  @media print {
    display: none;
  }
`

// Styled component for loading placeholder
export const Placeholder = styled.p`
  color: var(--color-piai-simba);
  position: relative;
  animation: loading 4s ease-in-out infinite;
  transform-origin: left bottom;
  padding-bottom: 0.3em;

  &:after {
    content: "";
    width: 100%;
    height: 2px;
    position: absolute;
    display: block;
    top: 100%;
    animation: loadingBar 2s linear infinite alternate;
    background: linear-gradient(
      90deg,
      transparent 25%,
      var(--color-piai-simba) 50%,
      transparent 75%
    );
    background-size: 200% 100%;
    background-position: 0%;
  }

  @keyframes loading {
    0%,
    100% {
      opacity: 0.6;
      transform: scale(0.995);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes loadingBar {
    0% {
      opacity: 0.6;
      background-position: 0%;
    }
    100% {
      opacity: 1;
      background-position: 100%;
    }
  }
`;