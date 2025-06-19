import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";

export const BoxHightight = styled(Box)`
  background: ${({ theme }) => theme.color("piai-network", 0.6)} !important;
`;

// Wrapper  
export const NetworkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);

  h2 {
    font-size: var(--text-body-font-size-tool) * 1.1;
    font-weight: bold;
    margin-top: 0 !important;
  }

  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")};
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: calc(0px - var(--size-2));
  }

  p a {
    text-decoration: underline dotted 0.5px;
    text-decoration-color: inherit;
    text-underline-offset: 3px;
    transition: all ease-out 0.5s;

    &:hover{
      text-decoration: underline solid 2px;
      text-underline-offset: 2px;
      margin-right: 0;
      margin-left: 0;
    }
  }
`;

export const Label = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")};
  font-weight: 300;
  font-size: calc(var(--text-body-font-size-tool) * 0.9);
`;