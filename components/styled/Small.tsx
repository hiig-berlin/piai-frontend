import styled from "styled-components";

export const Small = styled.span`
  ${(props: any) => props.theme.textStyle("caption")};
`;

export default Small;
