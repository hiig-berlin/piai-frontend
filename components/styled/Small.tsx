import styled from "styled-components";

export const Small = styled.span`
  ${({ theme }) => theme.textStyle("caption")};
`;

export default Small;
