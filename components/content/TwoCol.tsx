import React from "react";
import styled from "styled-components";

const Grid = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: var(--size-6);
  
  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    flex-direction: row;
    align-items: stretch;
  }
`;

const Column = styled.div`
  display: grid;

  margin-top: var(--size-4);

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    flex-direction: row;
    align-items: stretch;
   
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  height: var(--size-7);
  margin:0 var(--size-page-margin);

  ${({ theme }) => theme.breakpoints.tablet} {
    height: var(--size-5);
  }

`;
const Box = styled.div<{ backgroundColor: string }>`
  display: flex;

  background-color: ${(props) => props.backgroundColor};

  padding: var(--size-7) var(--size-4) var(--size-4) var(--size-4);

`;
export const TwoCol = () => {
  return (
    <Grid>
      <Column>
        <Title>
          Explore existing projects of public interest and their answers.
        </Title>

        <Box backgroundColor="sienna">
          For sit amet consectetur adipiscing elit. Quisque faucibus ex sapien
          vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
          convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
          fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
          malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
          aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
          himenaeos.Lorem ipsum dolor sit amet consectetur adipiscing elit.
          Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
          cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
          urna tempor.
        </Box>
      </Column>
      <Column>
        <Title>
          We have done some research. Read here our proposed definition for a
          public interest AI.
        </Title>

        <Box backgroundColor="teal">
          For sit amet consectetur adipiscing elit. Quisque faucibus ex sapien
          vitae pellentesque sem placerat. In id cursus mi pretium tellus duis
          convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
          fringilla lacus nec metus bibendum egestas. Iaculis massa nisl
          malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
          aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos
          himenaeos.Lorem ipsum dolor sit amet consectetur adipiscing elit.
          Quisque faucibus ex sapien vitae pellentesque sem placerat. In id
          cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
          urna tempor.
        </Box>
      </Column>
    </Grid>
  );
};
