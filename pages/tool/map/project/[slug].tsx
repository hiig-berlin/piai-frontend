import React, { ReactElement, useState, WheelEvent } from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import NextHeadSeo from "next-head-seo";
import Layout from "~/components/tools/map/Layout";
import {
  restApiGetPostBySlugOrFallbackId,
  restApiGetSettings,
} from "~/utils/restApi";
import { appConfig } from "~/config";
import { PiAiTool } from "~/types";
import { LabElement } from "~/components/ui/LabElement";
import {
  ButtonNormalized,
  LinkButtonAnimated,
} from "~/components/styled/Button";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Box } from "~/components/tools/shared/ui/Box";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { defaultMaxListeners } from "events";
import { Icon } from "~/components/tools/shared/ui/Icon";
import { ProjectCard } from "~/components/tools/map/ProjectCard";
import { useRouter } from "next/router";
import { Meta } from "~/components/tools/map/Styled";
import { Question } from "~/components/tools/map/Question";
import { Label } from "~/components/tools/map/Styled";

const Container = styled.main<{
  toolColor?: string;
  onWheel?: Function;
  direction?: string;
}>`
  display: grid;
  gap: var(--size-3);
  grid-template-rows: auto;

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 2fr 3fr;
  }

  padding: var(--size-3);

  ${({ theme }) => theme.breakpoints.tablet} {
    padding-right: 100px;
  }

  & .column {
    display: flex;
    gap: var(--size-3);
    flex-direction: column;
  }

  & .column.about {
    ${({ theme }) => theme.breakpoints.tabletLandscape} {
      position: sticky;
      // Prevent jumping on scroll change
      // if column shorter than 100vh
      min-height: calc(100vh - 2 * var(--size-3));

      // Move left column in the beginning
      // of the scroll vs. the end
      ${({ direction }) =>
        direction === "up"
          ? `
    
        align-self: start;
        top: var(--size-3);
    `
          : `
        align-self: end;
        bottom: var(--size-3);
      
    `}
    }

    .contact {
      .name h4{
        margin-bottom: var(--size-1);
      }
    }
  }

  & .column.details {
    .toolbar {
      flex-direction: row;
      justify-content: space-between;
      gap: var(--size-2);

      padding: var(--size-3) var(--size-4);

      ${({ theme }) => theme.breakpoints.tablet} {
        padding: var(--size-3) var(--size-3);
      }

      ${({ theme }) => theme.breakpoints.tablet} {
        padding: var(--size-2) var(--size-3);
      }
    }

    h2 {
      ${({ theme }) => theme.applyMixin("uppercase")};
      color: #fff;
      font-size: 1.3em;
    }

    h3 {
      text-transform: none;
      color: #fff;
      font-size: 1em;
      font-weight: 700;
    }
  }

  p + h2,
  p + h3,
  p + h4 {
    margin-top: var(--size-4);
  }
`;

const Project = ({ data, tool }: { data: any; tool: PiAiTool }) => {
  const [scrollDir, setScrollDir] = useState("down");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

  const router = useRouter();

  // TODO: Remove this when dynamic content
  data = staticData;

  return (
    <>
      <NextHeadSeo
        canonical={data?.yoast_head_json?.canonical}
        title={data?.yoast_head_json?.title ?? data?.title}
        description={data?.yoast_head_json?.description}
        og={{
          title: data?.yoast_head_json?.og_title,
          type: data?.yoast_head_json?.og_type,
          siteName: data?.yoast_head_json?.og_site_name,
          image: data?.yoast_head_json?.twitter_image,
        }}
        twitter={{
          card: "summary_large_image",
        }}
      />

      <Container
        toolColor={tool.colorHighlight}
        onWheel={(e: WheelEvent) => {
          if (Math.abs(e.deltaY) > 5) {
            e.deltaY > 0 ? setScrollDir("down") : setScrollDir("up");
          }
        }}
        direction={scrollDir}
      >
        {/*   LEFT COLUMN
        ========================================= */}

        <div className="column about">
          <Icon
            onClick={() => router.back()}
            aria-label="Back to previous view"
            className="textLink back"
            type="back"
            nonMuted
          >
            <span>back</span>
          </Icon>
          <ProjectCard view="detail" data={data} />
          <Box className="contact">
            <h3>Contact</h3>
            <div className="name">
              <Label as="h4">Responsible Person</Label>
              <p>{data.contact.responsiblePerson}</p>
            </div>
            <Meta col={1}>
              {data.contact.website && (
                <Icon type="globe" link>
                  {data.contact.website}
                </Icon>
              )}
              {data.contact.repository && (
                <Icon type="repository" link>
                  {data.contact.repository}
                </Icon>
              )}
              {data.contact.furtherLink && (
                <Icon type="link" link>
                  {data.contact.furtherLink}
                </Icon>
              )}
            </Meta>
          </Box>
        </div>

        {/*   RIGHT COLUMN
        ========================================= */}

        <div className="column details">
          {isTabletLandscapeAndUp && (
            <Box className="toolbar">
              <Icon
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label="Expand/collapse all answers"
                className="textLink"
                type={isCollapsed ? "expand" : "collapse"}
              >
                <span>
                  {isCollapsed ? "Expand all answers" : "Collapse all answers"}
                </span>
              </Icon>
              <Icon type="share" spaceBefore aria-label="Share this page" />
              <Icon type="print" aria-label="Print this page"></Icon>
            </Box>
          )}
          <Box>
            {!isTabletLandscapeAndUp && (
              <Icon
                onClick={() => setIsCollapsed(!isCollapsed)}
                aria-label="Expand/collapse all answers"
                className="textLink inBox"
                type={isCollapsed ? "expand" : "collapse"}
              >
                <span>
                  {isCollapsed ? "Expand all answers" : "Collapse all answers"}
                </span>
              </Icon>
            )}
            {data?.details?.length > 0 &&
              data?.details?.map((s: any, index: Number) => {
                return (
                  <>
                    <h2>{s.section}</h2>
                    {s.questions?.length > 0 &&
                      s.questions.map((q: any, i: Number) => {
                        return (
                          <Question
                            question={q.question}
                            key={`question-${index}-${i}`}
                            expanded={!isCollapsed}
                          >
                            {q.answer}
                          </Question>
                        );
                      })}
                  </>
                );
              })}
          </Box>
        </div>
      </Container>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  // TODO: Fill in paths that should be prerendered
  // const pages = await restApiESQuery({
  //   type: "page",
  //   perPage: 50,
  //   orderby: "post_date",
  //   order: "desc",
  // });

  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const token = (context?.previewData as any)?.token;

  const slug = context?.params?.slug
    ? Array.isArray(context?.params?.slug) && context?.params?.slug?.length
      ? (context?.params?.slug?.pop() as string)
      : (context?.params?.slug as string)
    : 1;

  const data = await restApiGetPostBySlugOrFallbackId("project", slug, token);

  const tool = appConfig.tools.find((tool: PiAiTool) => tool.slug === "map");

  // if (!data || !tool)
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
      data,
      view: "page",
      slug,
    },
    revalidate: appConfig.revalidateInterval("tool"),
  };
};

Project.getLayout = function getLayout(page: ReactElement, props: any) {
  return <Layout props={props}>{page}</Layout>;
};
export default Project;

const staticData = {
  slug: "testProject",
  title: "Platform Goal Marketing Analysis Tool for Non-Profit Organisations",
  meta: {
    location: "Cologne, Germany",
    startDate: "2012-02-01",
    organisation: "Universität Köln",
    size: "20+ employees",
  },
  shortDescription:
    "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est.",
  classification: {
    openSource: true,
    genderRatio: {
      male: 70,
      female: 30,
      diverse: 0,
    },
    funding: "other",
    fundingOther: "",
    sector:
      "Information and communication, Financial and insurance activities, Administrative and support service activities",
    usageAI:
      "Natural Language Processing, Data Management and Analysis, Information Retrieval",
    generationAI: "Deep Learning (CNN, Transformers, etc.)",
    modelTraining: "Semi-supervised Learning",
  },
  contact: {
    responsiblePerson: "Eric Cartman, South Park Archives",
    website:
      "https://portal.uni-koeln.de/universitaet/aktuell/presseinformationen/detail/letzte-beobachtungskampagne-des-astronomischen-instruments-great-sofia-startet-im-sommer",
    repository: "https://github.com/unikoeln/platmarketinganalysis-tool",
    furtherLink: "https://someotherwebsite.thatis.super/important",
  },
  details: [
    {
      section: "Motivation and values",
      questions: [
        {
          question:
            "What in your view defines the public interest and how does your project meet this purpose?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          question: "How did the idea of your project come about?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          question:
            "Did you follow one or more guidelines for ethical AI, and if yes, which one?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          question: "What are your top 5 guiding-values for the project?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
    {
      section: "Design and safeguards",
      questions: [
        {
          question:
            "Define the type of primary users that interact with the system.",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          question: "How did the idea of your project come about?",
          answer:
            "Which stakeholders were involved in the process of development and implementation of the project?",
        },
        {
          question: "How did you engage relevant stakeholders?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          question:
            "Did you apply specific methods of participatory design, and if yes, which ones?",
          answer:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
    },
  ],
};
