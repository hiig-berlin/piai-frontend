import { ReactElement, useState } from "react";
import type { GetStaticProps } from "next";
import NextHeadSeo from "next-head-seo";

import { appConfig } from "~/config";
import LayoutTool from "~/components/layouts/LayoutTool";
import { restApiGetSettings } from "~/utils/restApi";
import { PiAiTool } from "~/types";
import { LabElement } from "~/components/ui/LabElement";
import { Icon } from "~/components/tools/shared/ui/Icon";
import styled, { css } from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { ButtonNormalized } from "~/components/styled/Button";
import {
  useCssVarsStateIsDesktopAndUpState,
  useCssVarsStateIsTabletAndUpState,
} from "~/components/state/CssVarsState";
import { stakeholderList } from "~/components/tools/stakeholder/stakeholderList";
import safeHtml from "~/utils/sanitize";

// Wrapper + General tool styles
// =================================================

const StakeholderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
  padding: var(--size-3);

  h1,
  h2,
  h3 {
    ${({ theme }) => theme.applyMixin("uppercase")};
  }

  h1 {
    line-height: 1em;
  }

  h2 {
    font-size: var(--text-body-font-size-tool) * 1.1;
    font-weight: bold;
    margin-top: 0 !important;
  }

  h3 {
    font-size: 12px;
    font-weight: 300;
    line-height: 1em;
    margin-bottom: calc(0px - var(--size-2));
  }
`;

// Grid and subgrid layouts
// =================================================
const Grid = styled.div`
  display: grid;
  gap: var(--size-3);
  // align-content: space-between;

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// Repeating elements
// =================================================

const narrow = css`
  font-size: var--(--text-small-font-size);
  font-family: var(--font-family-narrow);
  line-height: 18px;
`;

// Meta columns with icon and narrow text
const Meta = styled.ul<{ col: number }>`
  // ul, li reset
  padding: 0;
  margin: 0;
  & li {
    margin: 0;
    padding: 0;
  }

  display: grid;
  gap: var(--size-1);
  grid-template-columns: repeat(${({ col }) => (col > 2 ? 2 : 1)}, 1fr);

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-template-columns: repeat(${({ col }) => col}, 1fr);
  }

  ${narrow}
`;

const Label = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")};
  font-weight: 300;
  font-size: calc(var(--text-body-font-size-tool) * 0.9);
`;

// Individual elements
// =================================================

const Header = styled.header`
  display: flex;
  flex-direction: row;
  gap: var(--size-3);

  margin-top: 100px;

  ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: unset;
    margin-right: 100px;
  }

  & .toolIntro {
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 0;
    line-height: 1.1em;
  }

  & p {
    ${narrow}
    margin-bottom: 0;
    margin-top: var(--size-1);
  }

  button,
  li {
    max-height: 1.5em;
    margin-top: 13px;
    font-size: calc(var(--text-body-font-size-tool) * 0.85);
    line-height: 1em;
  }
`;

const Entry = styled(Box)<{ isExpanded: boolean }>`
  grid-row: auto;

  ${({ theme }) => theme.breakpoints.tablet} {
    grid-row: ${({ isExpanded }) =>
      isExpanded ? "auto / span 3" : "auto / span 1"};
  }

  & h1 {
    text-transform: none;
    // font-size: var(--text-h1-font-size);
    font-size: 18px;
    font-weight: bold;
  }

  & .link {
    ${narrow}
  }

  .svg {
    min-height: 0.8em !important;
    min-width: 0.8em !important;
    max-height: 0.8em;
    max-width: 0.8em;
    align-self: center;
  }
`;

const Tags = styled.div`
  display: flex;
  flex-direction: row;
  gap: var(--size-2);

  &.filter {
    justify-content: end;
  }
`;

const Tag = styled(ButtonNormalized)<{ isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ isActive }) =>
    isActive ? "3px 3px 3px var(--size-1)" : "3px var(--size-1)"};
  gap: var(--size-1);
  max-width: 100%;

  ${narrow}

  background-color: ${({ isActive, theme }) =>
    isActive ? theme.color("piai-stakeholder", 0.4) : "transparent"};
  color: var(--color-piai-stakeholder);
  border: 1px solid var(--color-piai-stakeholder);
  border-radius: 4px;

  & .svg {
    filter: invert(58%) sepia(83%) saturate(375%) hue-rotate(131deg)
      brightness(111%) contrast(101%);
    max-width: 10px;
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

// END STYLES
// =================================================

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

  let filteredList =
    currentTag === ""
      ? stakeholderList
      : stakeholderList.filter((e: any) => {
          return e.tags.includes(currentTag);
        });

  let allTags: any[] = [];
  stakeholderList.forEach((s) => {
    s.tags.forEach((t) => {
      if (allTags.indexOf(t) === -1) {
        allTags.push(t);
      }
    });
  });
  // console.log("Tags: ", allTags);

  return (
    <StakeholderWrapper>
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

      <Header>
        {isTabletAndUp && (
          <LabElement
            shortHandle={tool.iconShort}
            longText={tool.iconLong}
            color="white"
            hoverColor={tool.colorBase}
            size={2}
          />
        )}
        <div className="toolIntro">
          <h1>
            Would you like to get an overview of the stakeholders in the PIAI
            field?
          </h1>
          <p>
            We have started to identify organisations and institutions that can
            play an important role in the development of the field or Public
            Interst AI (PIAI). Are you missing a stakeholder? Let us know and
            we’ll be happy to add it!
          </p>
        </div>
        {isDesktopAndUp && (
          <>
            <Icon
              type="info"
              className="textLink"
              spaceBefore
              url="/tool/stakeholder/about"
              aria-label="About this tool"
            >
              <span>About</span>
            </Icon>
          </>
        )}
      </Header>

      <Tags className="filter">
        {allTags.map((tag: any, j: number) => {
          const isActive = currentTag === tag;
          return (
            <Tag
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
              <h1
                onClick={() =>
                  isExpanded ? setSelectedEntry(undefined) : setSelectedEntry(i)
                }
              >
                {entry.name}
              </h1>
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
    </StakeholderWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const tool = appConfig.tools.find(
    (tool: PiAiTool) => tool.slug === "stakeholder"
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
