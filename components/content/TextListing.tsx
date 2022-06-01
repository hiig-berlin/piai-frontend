import React from "react";
import styled from "styled-components";
import { PageMargins } from "../ui/PageMargins";
import { Heading } from "../ui/Heading";
import SafeHtmlDiv from "../ui/SafeHtmlDiv";

const Grid = styled.div`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-template-areas:
    "title"
    "text"
    "cta";

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: 1fr 2fr;
    grid-template-areas:
      "title text"
      "cta text";
  }

  grid-gap: var(--size-gutter-width);
  
`;

const Title = styled.div`
  grid-area: title;
`;

const Cta = styled.div`
  grid-area: cta;
  color: var(--color-text-gray);

  width: 80%;
  text-align: center;
  font-family: var(--text-caption-font-family);
  font-weight: var(--text-caption-font-weight);
  font-style: var(--text-caption-font-style);
  font-size: var(--text-caption-font-size);
  line-height: var(--text-caption-line-height);

  ${({ theme }) => theme.breakpoints.tablet} {
    transform: translateY(-50%);
    width: 60%;
    text-align: left;
  }
`;

const Text = styled.div`
  grid-area: text;
`;

export const TextListing = ({
  title,
  cta,
  text,
}: {
  title: string;
  cta: string;
  text: string;
}) => {
  return (
    <PageMargins spaceBottom={5} keepMaxWidth>
      <Grid>
        <Title>
          <Heading heading="h2" html={title} />
        </Title>
        {cta && (
          <Cta>
            <SafeHtmlDiv html={cta} />
          </Cta>
        )}
        <Text>
          <SafeHtmlDiv html={text} />
        </Text>
      </Grid>
    </PageMargins>
  );
};
