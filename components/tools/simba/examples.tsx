// Create a component around the below Box element called Examples

// Import dependencies
import styled from "styled-components";
import { Box } from "~/components/tools/shared/ui/Box";
import { Meta } from "~/components/tools/map/Styled";
import { Tags, Tag } from "~/components/tools/simba/styled";
import { InputStyling } from "~/components/tools/simba/styled";
import { input } from "~/components/tools/simba/simbaInput";
import { preGeneratedText } from "~/components/tools/simba/simbaInput";
import React, { useState, useEffect } from "react";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";

const Examples = () => {
  const [currentExample, setCurrentExample] = useState("Newspaper article"); // Current selected Tag
  const [currentOutput, setCurrentOutput] = useState("");
  const [loading, setLoading] = useState(false); // True while loading summary

  let examples = ["Newspaper article", "Wikipedia page", "App description"];

  const renderInput = () => {
    return (
      <SafeHtmlDiv
        html={input.filter((e) => e.example === currentExample)[0].text}
      />
    );
  };

  const renderOutput = () => <SafeHtmlDiv html={currentOutput} />;

  useEffect(() => {
    setLoading(true);
    setCurrentOutput(
      `Generating the summary for a ${currentExample.toLowerCase()}…`
    );
    setCurrentOutput(
      preGeneratedText.filter((e) => e.example === currentExample)[0].text
    );
    setLoading(false);
  }, [currentExample]);

  return (
    <ExamplesWrapper>
      <div className="intro">
        <h2>Explore some examples</h2>
        <Meta col={1}>
          See for yourself how the model behind Simba works by selecting one of
          the input sources.
        </Meta>
      </div>
      <div className="filter">
        <h3>Pick an example</h3>
        <Tags>
          {examples.map((example: any, j: number) => {
            const isActive = currentExample === example;
            return (
              <Tag
                onClick={() => {
                  if (!isActive) setCurrentExample(example);
                }}
                key={`tag-filter-${j}`}
                isActive={isActive}
              >
                {example}
              </Tag>
            );
          })}
        </Tags>
      </div>
      <InputStyling className="input">
        <h3>Input</h3>
        {renderInput()}
      </InputStyling>
      <div className="output">
        <h3>Output</h3>
        {renderOutput()}
      </div>
    </ExamplesWrapper>
  );
};

export default Examples;

// Create styled component
const ExamplesWrapper = styled(Box)`


  display: grid;
  gap: var(--size-4);
  grid-template-columns: 1fr;
  grid-template-areas:
    "title"
    "filter"
    "input"
    "output";

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "title title"
      "filter filter"
      "input output"
    }
  }
}
  .intro  { grid-area: title;   }
  .filter  { grid-area: filter;   }
  .input  { grid-area: input    }
  .output { 
    grid-area: output;
    font-family: var(--font-family-monospace);
    font-size: 0.9em;
  }

`;
