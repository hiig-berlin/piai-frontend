import React from "react";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import DisplayAbove from "../styled/DisplayAbove";
import DisplayBelow from "../styled/DisplayBelow";
import { Heading } from "../ui/Heading";
import PageMargins from "../ui/PageMargins";
import { Wizard } from "./Wizard";
import { Accessible } from "./Accessible";
import SafeHtmlSpan from "../ui/SafeHtmlSpan";

const Grid = styled.div`
  display: grid;

  // auf mobiles stacken wir dir columns
  grid-template-rows: auto auto;
  gap: var(
    --size-gutter-width
  ); // <-- immer gut etwas luft zischen den spalten/reihen zu haben

  margin: 0 0 var(--size-6);
  position: relative;

  // ab tablets gibt es dann genug platz um die spalten
  ${({ theme }) => theme.breakpoints.tablet} {
    // <!-- so kann man breakpoints innerhalb einer styled component verwenden. Alles in den klammern wird nur ab dieser größe dargestellt.
    grid-template-rows: auto;
    grid-template-columns: 1fr 2fr;
  }
`;

const SectionHeading = styled(Heading)`
  margin: var(--size-7) var(--size-2);
  text-align: center;
  font-weight: bold;

  ${({ theme }) => theme.breakpoints.tablet} {
    margin: var(--size-6);
  }
`;

const GridLeftColumn = styled.div`
  ${({ theme }) => theme.breakpoints.tablet} {
    overflow: hidden;
    padding-bottom: 100px;
    align-self: stretch;
  }
`;

export const TextSection = ({ data }: { data: any }) => {
  const {
    vars: { isTabletAndUp },
  } = useCssVarsContext();

  return (
    <>
      <PageMargins spaceBottom={7} spaceTop={4}>
        <SectionHeading asTag="h2" heading="h2">
          <SafeHtmlSpan html={data?.acf?.textSectionsTitle} />
        </SectionHeading>

        {data?.acf?.textSections?.length > 0 &&
          data?.acf?.textSections.map((row: any, index: number) => {
            return (
              <Grid key={`textrow-${index}`}>
                <GridLeftColumn>
                  <h3>
                    <SafeHtmlSpan html={row.title} />
                  </h3>
                  {isTabletAndUp && row?.wizzard && row.wizzard.trim() !== "" && (
                    <Wizard
                      bend="up right"
                      left="0%"
                      top="100px"
                      bottom="auto"
                      width="80%"
                      position="relative"
                      inView
                      inViewDelay={1}
                    >
                      <SafeHtmlSpan html={row.wizzard} />
                    </Wizard>
                  )}
                </GridLeftColumn>
                <div>
                  <Accessible simple={row.textSimple}>{row.text}</Accessible>
                </div>
              </Grid>
            );
          })}
        <DisplayAbove breakpoint="tablet">
          <Wizard
            bend="down right"
            left="0%"
            bottom="0px"
            width="20%"
            inView
            inViewDelay={1}
          >
            Select one of the 6 conditions to find out more.
          </Wizard>
        </DisplayAbove>
        <DisplayBelow
          breakpoint="tablet"
          style={{
            marginBottom: "var(--size-8)",
          }}
        >
          <Wizard
            bend="down below"
            left="0%"
            bottom="0px"
            width="80%"
            inView
            inViewDelay={1}
          >
            Select one of the 6 conditions to find out more.
          </Wizard>
        </DisplayBelow>
      </PageMargins>
    </>
  );
};
