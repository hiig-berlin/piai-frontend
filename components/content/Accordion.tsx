/* eslint-disable react/jsx-key */
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Accessible } from "./Accessible";
import { ButtonNormalized } from "~/components/styled/Button";
import { Arrow, Frame, Borders, BoxSvgs } from "~/components/ui/StaticSvgs";
import SafeHtmlSpan from "~/components/ui/SafeHtmlSpan";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { AspectRatio } from "~/components/ui/AspectRatio";
import PageMargins from "~/components/ui/PageMargins";
import SafeHtmlDiv from "../ui/SafeHtmlDiv";

const boxPadding = "20px";
const boxPaddingMobile = "10vw";
const boxPaddingTablet = "5vw";
const pageContainerWidth = "calc(100vw - 2 * var(--size-page-margin))";
const mobileBoxSize = `calc(${pageContainerWidth} * 0.9)`;

//
//   Styling 5 pillars
// __________________________________

const Pillars = styled.div<{ marginBottom?: number }>`
  display: grid;
  gap: calc(var(--size-gutter-width) * 2);
  position: relative;
  margin-bottom: var(--size-5);

  // Create Pillar grid and adjust margin bottom
  // depending on the height of the absolutly positioned
  // detail box below

  ${({ theme }) => theme.breakpoints.tablet} {
    gap: var(--size-gutter-width);
    grid-template-columns: auto auto;
    grid-auto-rows: calc(${pageContainerWidth} / 2);

    ${({ marginBottom }) =>
      marginBottom && marginBottom > 0
        ? `
      margin-bottom: calc(${marginBottom}px + var(--size-2) + var(--size-6));
      `
        : "margin-bottom: var(--size-5)"}
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: auto auto auto;
    grid-auto-rows: calc(${pageContainerWidth} / 3);
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: repeat(5, 1fr);
    grid-auto-rows: auto;

    ${({ marginBottom }) =>
      marginBottom && marginBottom > 0
        ? `
      margin-bottom: calc(${marginBottom}px + var(--size-7) + var(--size-6));
      `
        : "margin-bottom: var(--size-5)"}
  }
`;

const ToggleBox = styled(ButtonNormalized)`
  text-align: left;
  display: block;
  height: ${mobileBoxSize};
  width: ${mobileBoxSize};
  margin: 0 auto;
  position: relative;

  ${({ theme }) => theme.breakpoints.tablet} {
    height: 100%;
    width: unset;
    margin: unset;
  }

  & svg.box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: -1;
  }

  &[aria-expanded="true"] svg.box g {
    stroke-width: 3;
    stroke: var(--color-piai-interface);
  }

  & h3,
  & p {
    padding: calc(${boxPaddingMobile} + 10px) ${boxPaddingMobile};

    ${({ theme }) => theme.breakpoints.tablet} {
      padding: calc(${boxPaddingTablet} + 10px) ${boxPaddingTablet};
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      padding: calc(${boxPadding} + 10px) ${boxPadding};
    }
  }

  & h3 {
    padding-bottom: 0;
  }

  & p {
    padding-top: 20px;
    font-size: calc(var(--text-body-font-size));
    color: var(--color-text-grey);

    ${({ theme }) => theme.breakpoints.desktop} {
      font-size: calc(var(--text-body-font-size) * 0.85);
    }
  }

  & svg.arrow {
    position: absolute;
    height: 50px;
    bottom: calc(((60px - var(--size-7)) / 2) - 50px);
    left: 42%;
    display: block;

    ${({ theme }) => theme.breakpoints.tablet} {
      height: 100px;
      bottom: calc(((100px - var(--size-7)) / 2) - 100px);
      display: none;
    }

    ${({ theme }) => theme.breakpoints.desktop} {
      height: 100px;
      bottom: calc(((100px - var(--size-7)) / 2) - 100px);
      display: block;
    }
  }
`;

//
//   Styling detail box
// __________________________________

const Details = styled.section`
  position: relative;
  left: 0;
  margin-top: var(--size-7);

  ${({ theme }) => theme.breakpoints.tablet} {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    margin-top: var(--size-2);
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    margin-top: var(--size-7);
  }

  & svg.frame {
    position: absolute;
    width: calc(100% + 2 * var(--size-4));
    // height: 100%;
    top: 0;
    left: calc(0px - var(--size-4));
    z-index: -1;

    ${({ theme }) => theme.breakpoints.tablet} {
      width: 100%;
      left: 0;
    }

    g {
      fill: #f5f8f9;
      stroke: #707070;
      stroke-width: 1;

      ${({ theme }) => theme.breakpoints.tablet} {
        fill: none;
      }
    }
  }
`;

const Columns = styled.div`
  display: grid;
  gap: var(--size-gutter-width);
  padding: var(--size-4);

  & > div:last-child {
    ${({ theme }) => theme.applyMixin("monospace")}
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 3fr 1fr;
  }
`;

//
//   Headline styling
// __________________________________

const Title = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")}
  font-weight: 700;
  font-size: calc(var(--text-body-font-size) * 0.8);
  margin: 0;

  section & {
    padding: var(--size-5) var(--size-4) 0;
  }
`;

const Headline = styled.div`
  ${({ theme }) => theme.textStyle("h2")}
  font-size: calc(var(--text-h2-font-size) * 0.85);
  margin: var(--size-2) var(--size-4) var(--size-2);
`;

export const Accordion = ({ data }: { data: any }) => {
  const [activeIndex, setActiveIndex] = useState(6);
  const [height, setHeight] = useState(0);
  const boxesRefs = useRef(new Array());

  const {
    vars: { isTabletAndUp },
  } = useCssVarsContext();

  // Update hight and scroll to details
  // when pillars get (de)selected (i.e. activeIndex changes)
  useEffect(() => {
    if (activeIndex < 5) {
      setHeight(boxesRefs.current[activeIndex].clientHeight);
      boxesRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: isTabletAndUp ? "nearest" : "start",
      });
    } else setHeight(0);
  }, [activeIndex, isTabletAndUp]);

  if (!data?.acf?.conditions?.length) return <></>;

  return (
    <PageMargins spaceBottom={4} spaceTop={0}>
      <Pillars marginBottom={height}>
        {data.acf.conditions.map((pillar: any, index: number) => {
          return (
            <article key={`pillar-${index}`}>
              <ToggleBox
                id={`pillar-header-${index}`}
                aria-expanded={activeIndex === index ? "true" : "false"}
                aria-controls={`pillar-panel-${index}`}
                onClick={() => {
                  activeIndex === index
                    ? setActiveIndex(6)
                    : setActiveIndex(index);
                }}
              >
                <AspectRatio ratio="1">
                  <BoxSvgs i={index + 1} />
                  <Title>{pillar.title}</Title>
                  <p>
                    <SafeHtmlSpan html={pillar.teaser} />
                  </p>
                </AspectRatio>

                {activeIndex === index && <Arrow />}
              </ToggleBox>
              <Details
                id={`pillar-panel-${index}`}
                aria-labelledby={`pillar-header-${index}`}
                hidden={activeIndex !== index}
              >
                {/* This div is needed for height calculation */}
                <div ref={(element) => (boxesRefs.current[index] = element)}>
                  {isTabletAndUp ? <Frame /> : <Borders />}
                  <Title>{pillar.title}</Title>
                  <Headline>{pillar.headline}</Headline>
                  <Columns>
                    <div>
                      <Accessible simple={pillar.textSimple}>
                        {pillar.text}
                      </Accessible>
                    </div>
                    <div>
                      {/* {pillar.sidebar && pillar.sidebar.trim() !== "" && (
                        <SafeHtmlDiv html={pillar.sidebar} />
                      )} */}
                      {pillar?.sidebar?.length > 0 &&
                        pillar?.sidebar?.map((note: any, nIndex: number) => (
                          <SafeHtmlDiv key={`pillar-${index}-sn-${nIndex}`} html={note.sidebarElement} />
                        ))}
                    </div>
                  </Columns>
                </div>
              </Details>
            </article>
          );
        })}
      </Pillars>
    </PageMargins>
  );
};
