import { ReactElement, useState } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";
import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { ButtonNormalized } from "~/components/styled/Button";
import {
  useCssVarsStateIsTabletAndUpState,
  useCssVarsStateIsDesktopAndUpState,
} from "~/components/state/CssVarsState";
import { memberList } from "~/assets/data/tools/network/memberList";
import { statementList } from "~/assets/data/tools/network/statementList";
import safeHtml from "~/utils/sanitize";
import { Meta } from "~/components/tools/map/Styled";
import { narrow } from "~/components/tools/map/Styled";
import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import { Icon } from "~/components/tools/shared/ui/Icon";
import ToolHeader from "~/components/tools/shared/Header";
import { Tags, Tag } from "~/components/tools/shared/Styled";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";
import { Button, LinkButton } from "~/components/styled/Button";
import StatementSlider from "~/components/tools/network/StatementSlider";
import {
  BoxHightight,
  NetworkWrapper,
  Label,
} from "~/components/tools/network/Styled";
import Link from "next/link";
import { textBits } from "~/assets/data/tools/network/textbits";
import showdown from "showdown";

const Index = ({
  frontendSettings,
  tool,
}: {
  frontendSettings: any;
  tool: PiAiTool;
}) => {
  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();

  const [currentTag, setCurrentTag] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<number>();

  const currentTool = appConfig.tools?.find((t) => t.slug === "stakeholder");
  const strings = textBits.en.index;

  const converter = new showdown.Converter();

  let filteredList =
    currentTag === ""
      ? memberList
      : memberList.filter((e: any) => {
          return e.tags.includes(currentTag);
        });

  let allTags: any[] = [];
  memberList.forEach((s) => {
    s.tags.forEach((t) => {
      if (allTags.indexOf(t) === -1) {
        allTags.push(t);
      }
    });
  });

 
  return (
    <NetworkWrapper>
      <NextHeadSeo
        title={`${currentTool?.name ? `${currentTool?.name} - ` : ""} ${
          appConfig.appTitle
        }`}
        description={currentTool?.description ?? undefined}
        og={{
          title: `${currentTool?.name ? `${currentTool?.name} - ` : ""} ${
            appConfig.appTitle
          }`,
          siteName: appConfig.appTitle,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      <ToolHeader
        tool={tool}
        title="The Public Interest AI Network"
        description="An international hub to promote research and exchange on AI in the public interest and for the common good."
        links={[
          {
            type: "info",
            url: "/tool/network/about",
            ariaLabel: "About the network",
            label: "About",
          },
        ]}
      />

      {/* <Tags className="filter">
        {allTags.map((tag: any, j: number) => {
          const isActive = currentTag === tag;
          return (
            <Tag
              tool="stakeholder"
              onClick={() =>
                isActive ? setCurrentTag("") : setCurrentTag(tag)
              }
              key={`tag-filter-${j}`}
              isActive={isActive}
            >
              {tag}
              {isActive && <Icon type="close" stc inline />}
            </Tag>
          );
        })}
      </Tags> */}

      <InfoGrid>
        <Box className="about">
          <h2>{strings.about.title}</h2>
          <div className="description" dangerouslySetInnerHTML={{ __html: converter.makeHtml(strings?.about.text) }} />

          <LinkButton href="/tools/network/about">About</LinkButton>
        </Box>
        <BoxHightight className="join">
          <h2>Join the Network</h2>
          <p>
            If you are interested in joining the network, please fill out our
            brief application form.
          </p>
          <LinkButton href="/tools/network/join">Join now</LinkButton>
        </BoxHightight>

        <Box className="goals">
          <h2>Our Goals</h2>
          <p>
            The Public Interest AI Network aims to foster collaboration and
            knowledge sharing among researchers, practitioners, and policymakers
            working on AI for the public good.
          </p>
          <Grid>
            <Blurb>
              <ToolSvgBackground type="hardware" />
              <h3>Hardware production</h3>
              <p>
                Manufacturing the hardware comes with{" "}
                <em>embodied emissions</em> for mining the materials and
                producing the final product.
              </p>
            </Blurb>
          </Grid>
        </Box>
        <Box className="endorsement">
          <StatementSlider />
        </Box>
      </InfoGrid>

      <Tags className="filter">
        {allTags.map((tag: any, j: number) => {
          const isActive = currentTag === tag;
          return (
            <Tag
              tool="stakeholder"
              onClick={() =>
                isActive ? setCurrentTag("") : setCurrentTag(tag)
              }
              key={`tag-filter-${j}`}
              isActive={isActive}
            >
              {tag}
              {isActive && <Icon type="close" stc inline />}
            </Tag>
          );
        })}
      </Tags>

      <Grid>
        {filteredList.map((entry: any, i: number) => {
          const isExpanded = selectedEntry == i;
          return (
            <Entry key={`entry-${i}`} isExpanded={isExpanded}>
              <h2
                onClick={() =>
                  isExpanded ? setSelectedEntry(undefined) : setSelectedEntry(i)
                }
              >
                {entry.name}
              </h2>
              <Meta col={1}>
                <Icon stc type="marker">
                  {entry.location}
                </Icon>
              </Meta>
              <Tags>
                {entry.tags.map((tag: any, j: number) => {
                  const isActive = currentTag === tag;
                  return (
                    <Tag
                      onClick={() =>
                        isActive ? setCurrentTag("") : setCurrentTag(tag)
                      }
                      key={`tag-${j}`}
                      isActive={isActive}
                      tool="stakeholder"
                    >
                      {tag}
                      {isActive && <Icon type="close" stc inline />}
                    </Tag>
                  );
                })}
              </Tags>
              {isExpanded && (
                <>
                  <Label>Short Description</Label>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: safeHtml(entry.description),
                    }}
                  />
                  <Icon className="link" url={entry.link} type="globe" />

                  {entry.fundingFor && (
                    <>
                      <Label>Funding for the following projects</Label>
                      <ProjectLinks>
                        {entry.fundingFor.map((project: any, ii: number) => {
                          return (
                            <li key={ii}>
                              <a
                                className="projectLink"
                                href={project.url}
                                target="_blank"
                                rel="noreferrer nofollow"
                              >
                                {project.title}
                              </a>
                            </li>
                          );
                        })}
                      </ProjectLinks>
                    </>
                  )}
                </>
              )}
            </Entry>
          );
        })}
      </Grid>
    </NetworkWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tool = appConfig.tools.find(
    (tool: PiAiTool) => tool.slug === "network"
  );

  if (!tool)
    return {
      props: {
        frontendSettings: await restApiGetSettings(),
      },
      notFound: true,
      revalidate: 240,
    };

  return {
    props: {
      frontendSettings: await restApiGetSettings(),
      tool,
      view: "page",
      slug: "index",
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Index.getLayout = function getLayout(page: ReactElement, props: any) {
  return <LayoutTool props={props}>{page}</LayoutTool>;
};

export default Index;

// Grid and subgrid layouts
const Grid = styled.div`
  display: grid;
  gap: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InfoGrid = styled.div`
  display: grid;
  gap: var(--size-3);
  grid-template-areas:
    "about"
    "join"
    "goals"
    "endorsement";

  // equal height per row
  grid-template-rows: auto auto auto auto;
  grid-template-columns: 1fr;
  align-items: start;
  justify-items: stretch;

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      "about join"
      "goals endorsement";
  }

  ${({ theme }) => theme.breakpoints.desktop} {
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "about about join endorsement"
      "goals goals goals endorsement";
  }

  .about {
    grid-area: about;
  }
  .join {
    grid-area: join;
  }
  .goals {
    grid-area: goals;
  }
  .endorsement {
    grid-area: endorsement;
  }

  .about,
  .join,
  .goals,
  .endorsement {
    align-self: flex-start;
    justify-self: stretch;

    a {
      margin: 0;
      align-self: flex-start;
    }
  }
`;

// Individual elements

const Entry = styled(Box)<{ isExpanded: boolean }>`
  grid-row: auto;

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-row: ${({ isExpanded }) =>
      isExpanded ? "auto / span 3" : "auto / span 1"};
  }

  & h2 {
    text-transform: none;
    font-size: 18px;
    font-weight: bold;
  }

  .svg {
    min-height: 0.8em !important;
    min-width: 0.8em !important;
    max-height: 0.8em;
    max-width: 0.8em;
    align-self: center;
    top: 0;
  }
`;

// Bigger icon with text on the side
const Blurb = styled.div`
  display: grid;
  color: #fff;
  height: fit-content;
  align-self: flex-start;
  justify-content: flex-start;

  ${narrow}

  grid-template-areas:
    "icon ."
    "icon .";

  .svg {
    grid-area: icon;
    min-height: 3em;
    min-width: 3em;
    max-width: 3em;
    flex: 1em 0 0;
    margin-right: var(--size-3);

    ${({ theme }) => theme.breakpoints.tablet} {
      margin-right: var(--size-2);
    }
  }

  p,
  h3 {
    margin-bottom: 3px;
  }
`;

const ProjectLinks = styled.ul`
  color: var(--color-piai-stakeholder);
  padding-left: 1em;

  li::marker {
    content: "›  ";
    position: absolute;
    font-size: 1.2em;
    font-weight: bold;
  }
`;
