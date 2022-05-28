import styled from "styled-components";

export const Small = styled.span`
  ${(props) =>
    props.theme.apply(
      "default",
      (breakpoint: string) => {
        return `
    
    ${props.theme.textStyle(breakpoint, "caption")};
  `;
      }
    )}
`;

export default Small;
