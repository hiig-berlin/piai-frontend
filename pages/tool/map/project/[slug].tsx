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
import styled from "styled-components";
import { useCssVarsStateIsTabletLandscapeAndUpState } from "~/components/state/CssVarsState";
import { Box } from "~/components/tools/shared/ui/Box";
import { Icon } from "~/components/tools/shared/ui/Icon";
import { ProjectCard } from "~/components/tools/map/ProjectCard";
import { useRouter } from "next/router";
import { Meta } from "~/components/tools/map/Styled";
import { Question } from "~/components/tools/map/Question";
import { Label } from "~/components/tools/map/Styled";
import safeHtml from "~/utils/sanitize";

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
      .name h4 {
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

  const isTabletLandscapeAndUp = useCssVarsStateIsTabletLandscapeAndUpState();

  const router = useRouter();

  const sectionMotivationAndValues = {
    title: "Motivation and values",
    questions: [
      "whatDefinesPublicInterest",
      "originOfIdea",
      "goalOfProject",
      "usedGuidelines",
    ].reduce((carry: any, key: string) => {
      if (Array.isArray(data?.acf?.motivationAndValues?.[key]?.value)) {
        if (data?.acf?.motivationAndValues?.[key]?.value?.length)
          carry.push({
            question: data?.acf?.motivationAndValues?.[key]?.question?.trim(),
            answer: safeHtml(
              [
                ...data.acf.motivationAndValues[key].value,
                ...(key === "usedGuidelines" &&
                data?.acf?.motivationAndValues?.usedGuidelinesOther2?.value?.trim()
                  ? [
                      data?.acf?.motivationAndValues?.usedGuidelinesOther2?.value?.trim(),
                    ]
                  : []),
              ].join(", ")
            ),
          });
      } else if (data?.acf?.motivationAndValues?.[key]?.value?.trim()) {
        carry.push({
          question: data?.acf?.motivationAndValues?.[key]?.question?.trim(),
          answer: safeHtml(
            data?.acf?.motivationAndValues?.[key]?.value?.trim()
          ),
        });
      }
      return carry;
    }, []),
  };

  const sectionGuidingValues = {
    title: "Guiding Values",
    questions: [
      "guidingValue1",
      "guidingValueMeasures1",
      "guidingValue2",
      "guidingValueMeasures2",
      "guidingValue3",
      "guidingValueMeasures3",
      "guidingValue4",
      "guidingValueMeasures4",
      "guidingValue5",
      "guidingValueMeasures5",
    ].reduce((carry: any, key: string) => {
      if (data?.acf?.guidingValues?.[key]?.value?.trim()) {
        carry.push({
          question: data?.acf?.guidingValues?.[key]?.question?.trim(),
          answer: safeHtml(data?.acf?.guidingValues?.[key]?.value?.trim()),
        });
      }
      return carry;
    }, []),
  };

  const sectionDesignSafeguards = {
    title: "Design & Safeguards",
    questions: [
      "stakeholders",
      "stakeholderEngagement",
      "participatoryDesignMethods",
      "thirdPartyValidation",
      "madeTransparentToPublic",
      "madeTransparentToPublicMethods",
      "involvementOfAffectedPeople",
      "feedbackChannels",
      "verificationMethods",
      "transparencyMeasures",
      "safeguards",
      "sustainabilityMeasures",
      "contributingToUNSustainabilityGoals",
      "contributingToUNSustainabilityGoalsDescription",
      "relyingOnOpenData",
    ].reduce((carry: any, key: string) => {
      if (Array.isArray(data?.acf?.designAndSafeguards?.[key]?.value)) {
        if (data?.acf?.designAndSafeguards?.[key]?.value?.length)
          carry.push({
            question: data?.acf?.designAndSafeguards?.[key]?.question?.trim(),
            answer: safeHtml(
              data.acf.designAndSafeguards[key].value.join(", ")
            ),
          });
      } else if (data?.acf?.designAndSafeguards?.[key]?.value?.trim()) {
        carry.push({
          question: data?.acf?.designAndSafeguards?.[key]?.question?.trim(),
          answer: safeHtml(
            data?.acf?.designAndSafeguards?.[key]?.value?.trim()
          ),
        });
      }
      return carry;
    }, []),
  };

  return (
    <>
      <NextHeadSeo
        canonical={data?.yoast_head_json?.canonical}
        title={data?.yoast_head_json?.title ?? data?.details?.title}
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
          <Box>
            <ProjectCard view="detail" data={data?.acf?.details} />
          </Box>
          <Box className="contact">
            <h3>Contact</h3>
            {data?.acf?.details?.responsiblePerson?.value?.trim() && (
              <div className="name">
                <Label as="h4">Responsible Person</Label>
                <p>{safeHtml(data?.acf?.details?.responsiblePerson?.value)}</p>
              </div>
            )}
            <Meta col={1}>
              {data?.acf?.details?.linkInformation?.value?.trim() && (
                <Icon
                  type="globe"
                  url={data?.acf?.details?.linkInformation?.value}
                />
              )}
              {data?.acf?.details?.linkGit?.value?.trim() && (
                <Icon
                  type="repository"
                  url={data?.acf?.details?.linkGit?.value}
                />
              )}
              {data?.acf?.details?.linkFurther?.value?.trim() && (
                <Icon
                  type="link"
                  url={data?.acf?.details?.linkFurther?.value}
                />
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
            {sectionMotivationAndValues?.questions?.length > 0 && (
              <>
                <h2>{sectionMotivationAndValues.title}</h2>
                {sectionMotivationAndValues.questions.map(
                  (q: any, i: Number) => {
                    return (
                      <Question
                        question={q.question}
                        key={`question-mav-${i}`}
                        expanded={!isCollapsed}
                      >
                        {q.answer}
                      </Question>
                    );
                  }
                )}
              </>
            )}
            {sectionGuidingValues?.questions?.length > 0 && (
              <>
                <h2>{sectionGuidingValues.title}</h2>
                {sectionGuidingValues.questions.map((q: any, i: Number) => {
                  return (
                    <Question
                      question={q.question}
                      key={`question-mav-${i}`}
                      expanded={!isCollapsed}
                    >
                      {q.answer}
                    </Question>
                  );
                })}
              </>
            )}

            {sectionDesignSafeguards?.questions?.length > 0 && (
              <>
                <h2>{sectionDesignSafeguards.title}</h2>
                {sectionDesignSafeguards.questions.map((q: any, i: Number) => {
                  return (
                    <Question
                      question={q.question}
                      key={`question-mav-${i}`}
                      expanded={!isCollapsed}
                    >
                      {q.answer}
                    </Question>
                  );
                })}
              </>
            )}
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

  if (!data || !tool)
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
