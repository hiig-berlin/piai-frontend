import React from "react";
import styled from "styled-components";
import { LabElement } from "../ui/LabElement";
import PageMargins from "../ui/PageMargins";
import Button from "../styled/Button";

const AboutContainer = styled.div`
  color: white;
  font-size: 0.85em;

  h2{
    ${({ theme }) => theme.textStyle("h3")}
    ${({ theme }) => theme.applyMixin("uppercase")}
    font-weight: bold;
    color: white;
  }

  p{
    max-width: 80%;
    margin: var(--size-3) 0;
  }

  button{
    margin-left: 0;
  }

  .labElement{
    float: left;
    margin: 0 10px 0 0;
  }

  .labElement + p{
    margin: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--size-gutter-width);
`;

export const About = () => {
  return (
    <PageMargins
      bgColor="var(--color-piai-interface)"
      spaceTop={6}
      spaceBottom={6}
    >
      <AboutContainer>
        <Grid>
          <div>
            <h2>{aboutContent.about.headline}</h2>
            <p>{aboutContent.about.text}</p>
            {/* TODO: Button with href as link */}
            {/* <Button href={aboutContent.about.ctaUrl}> */}
            <Button>
              {aboutContent.about.ctaText}
            </Button>
          </div>
          <div>
            <h2>{aboutContent.toolbox.headline}</h2>
            <p>{aboutContent.toolbox.text}</p>
            <Grid>
              {aboutContent.toolbox.tools.map((tool: any, index: number) => {
                return (
                  <div key={`tool-${index}`}>
                    <LabElement
                      shortHandle={tool.shortHandle}
                      longText={tool.longText}
                      color="white"
                      hoverColor="#ffffffaa"
                      size={1.6}
                    />
                    <p>{tool.description}</p>
                  </div>
                );
              })}
            </Grid>
          </div>
        </Grid>
      </AboutContainer>
    </PageMargins>
  );
};

const aboutContent = {
  about: {
    headline: "Who's behind publicinterest.ai?",
    text: "This website is a space to share knowledge and foster collaboration on AI in the public interest. The research that backs the content of this website is undertaken at the Alexander von Humboldt Institute for Internet and Society (HIIG) in Berlin in cooperation with a wide group of experts. be launched soon. Visit our project website to find out more about our research and other related content.",
    ctaText: "Visit research project website",
    ctaUrl: "https://www.hiig.de/en/project/public-interest-ai/",
  },
  toolbox: {
    headline: "The publicinterest.ai toolbox",
    text: "Besides this knowledge resource, we’re showcaseing a handful of projects on public interest AI. This toolbox is a work in progress and open for ideas and collaborators. So some back, once in a while to see what’s new and contact us, if you want to contribute with a tool.",
    tools: [
      {
        shortHandle: "Ma",
        longText: "Project Map",
        description: "Map and directory of PIAI projects",
      },
      {
        shortHandle: "En",
        longText: "Energy Usage",
        description: "Measure you AI’s energy consumption",
      },
    ],
  },
};
