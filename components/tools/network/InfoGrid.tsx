import { BoxHighlight, Label } from "./Styled";
import { Box } from "~/components/tools/shared/ui/Box";
import { LinkButton } from "~/components/styled/Button";
import StatementSlider from "./StatementSlider";
import { ToolSvgBackground } from "../shared/ToolSvgBackground";
import styled from "styled-components";
import showdown from "showdown";
import { GoalGrid, InfoGridWrapper, Blurb } from "./Styled";

const converter = new showdown.Converter();

export default function InfoGrid({ strings }: { strings: any }) {
  return (
    <InfoGridWrapper>
      <BoxHighlight className="about">
        <h2>{strings.about.title}</h2>
        <div
          className="description"
          dangerouslySetInnerHTML={{
            __html: converter.makeHtml(strings?.about.text),
          }}
        />
        <LinkButton href={strings?.about.button.link}>
          {strings?.about.button.label}
        </LinkButton>
      </BoxHighlight>

      <Box className="goals">
        <h2>Our Goals</h2>
        <GoalGrid>
          {strings?.goals.map((goal: any, i: number) => (
            <Blurb key={`goal-${i}`}>
              <ToolSvgBackground type="goal" />
              <p
                dangerouslySetInnerHTML={{ __html: converter.makeHtml(goal) }}
              />
            </Blurb>
          ))}
        </GoalGrid>
      </Box>
      <StatementSlider className="endorsement" />
    </InfoGridWrapper>
  );
}
