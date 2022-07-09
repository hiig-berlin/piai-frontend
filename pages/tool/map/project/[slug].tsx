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
import { MapSvgBackground } from "~/components/tools/map/MapSvgBackground";
import styled from "styled-components";
import { useCssVarsContext } from "~/providers/CssVarsContextProvider";
import { Box } from "~/components/tools/shared/ui/Box";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import { defaultMaxListeners } from "events";
import { Icon } from "~/components/tools/map/Icon";
import { ProjectCard } from "~/components/tools/map/ProjectCard";

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
 

    .labElement {
      margin-bottom: var(--size-3);
    }

    .cta {
      color: ${({ toolColor }) => toolColor || "#fff"};
  
      h3{
        font-size: 1.1em;
      }
  
      a {
        color: ${({ toolColor }) => toolColor || "#fff"};
        border-color: color: ${({ toolColor }) => toolColor || "#fff"};
        align-self: end;
        margin-right: 0;
        &:hover{
          margin-right: -0.3em
        }
          
      }
    }

  }

  

  & .column.details{

    .toolbar{
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

    h2{
      ${({ theme }) => theme.applyMixin("uppercase")};
      color: #fff;
      font-size: 1.3em;
    }

    h3{
      text-transform: none;
      color: #fff;
      font-size: 1em;
      font-weight: 700;
    }
    
  }

  p + h2, p + h3, p + h4{
    margin-top: var(--size-4);
  }

  `;

const Project = ({ data, tool }: { data: any; tool: PiAiTool }) => {
  const [scrollDir, setScrollDir] = useState("down");
  const [isSimple, setIsSimple] = useState(false);

  const {
    vars: { isTabletLandscapeAndUp },
  } = useCssVarsContext();

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
        <div className="column about">
          <ProjectCard view="detail" data={data} />
          {/* {cta?.title && (
            <Box className="cta">
              <h3>
                <SafeHtmlSpan html={cta.title} />
              </h3>
              <SafeHtmlDiv html={cta.text} />

              {cta?.url && cta?.linkTitle && (
                <Link href={cta?.url} passHref>
                  <LinkButtonAnimated>{cta?.linkTitle}</LinkButtonAnimated>
                </Link>
              )}
            </Box>
          )} */}
        </div>
        <div className="column details">
          {isTabletLandscapeAndUp && (
            <Box className="toolbar">
              <Icon
                onClick={() => setIsSimple(!isSimple)}
                aria-label="Change to simple language"
                className="languageSwitch"
                type="language"
              >
                <span>
                  {isSimple
                    ? "Show standard language"
                    : "Show simplified language"}
                </span>
              </Icon>
              <Icon type="share" spaceBefore aria-label="Share this page"  />
              <Icon type="print" aria-label="Print this page" ></Icon>
            </Box>
          )}
          <Box>
            {!isTabletLandscapeAndUp && (
              <Icon
                onClick={() => setIsSimple(!isSimple)}
                aria-label="Change to simple language"
                className="languageSwitch inBox"
                type="language"
              >
                <span>
                  {isSimple
                    ? "Show standard language"
                    : "Show simplified language"}
                </span>
              </Icon>
            )}
            <SafeHtmlDiv html={isSimple ? "" : "content"} />
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
      question: "This is a question",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  ],
};
