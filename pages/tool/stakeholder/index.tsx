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
import { stakeholderList } from "~/assets/data/tools/stakeholder/stakeholderList";
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

// Wrapper + General tool styles
const StakeholderWrapper = styled.div`
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
`;

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

const Label = styled.h3`
  ${({ theme }) => theme.applyMixin("uppercase")};
  font-weight: 300;
  font-size: calc(var(--text-body-font-size-tool) * 0.9);
`;

// Individual elements

const Entry = styled(Box)<{ isExpanded: boolean }>`
  grid-row: auto;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 1px 1px 0.5px var(--color-piai-stakeholder);
  }

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

const EntryDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-3);
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

      <ToolHeader
        tool={tool}
        title="Would you like to get an overview of the stakeholders in the PIAI
        field?"
        description="We have started to identify organisations and institutions that can play an important role in the development of the field or Public Interest AI (PIAI). Are you missing a stakeholder? Let us know and we’ll be happy to add it!"
        links={[
          {
            type: "info",
            url: "/tool/stakeholder/about",
            ariaLabel: "About this tool",
            label: "About",
          },
        ]}
      />
     

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
            <Entry 
              key={`entry-${i}`} 
              isExpanded={isExpanded}
              onClick={() =>
                isExpanded ? setSelectedEntry(undefined) : setSelectedEntry(i)
              }
            >
              <h2>
                {entry.name}
              </h2>
              <Meta col={1}>
                <Icon stc type="marker">
                  {entry.location}
                </Icon>
              </Meta>
              <Tags onClick={(e) => e.stopPropagation()}>
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
                <EntryDetails onClick={(e) => e.stopPropagation()}>
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
                </EntryDetails>
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
