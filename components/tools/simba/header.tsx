//add necessary imports
import React from "react";
import styled from "styled-components";
import { Icon } from "~/components/tools/shared/ui/Icon";
import { narrow } from "~/components/tools/map/Styled";
import { LabElement } from "~/components/ui/LabElement";
import { useCssVarsStateIsDesktopAndUpState,
  useCssVarsStateIsTabletAndUpState } from "~/components/state/CssVarsState";

function SimbaHeader({tool}: {
  tool: {
    iconShort: string | undefined;
    iconLong: string | undefined;
    colorBase: string | undefined;
  };
}) {

  const isTabletAndUp = useCssVarsStateIsTabletAndUpState();
  const isDesktopAndUp = useCssVarsStateIsDesktopAndUpState();

  return (
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
      <div>
        <h1>Simba Text assistant</h1>
        <p>
          This web-based tool and browser extension produces summaries of German-language texts. It is designed to
          improve your reading experience or support you on your language
          learning journey.
        </p>
      </div>
      {isDesktopAndUp && (
        <ul>
          {/* <Icon
            type="info"
            className="textLink"
            stc={false}
            spaceBefore
            url="/tool/simba/about"
            aria-label="About this tool"
          >
            <span>About</span>
          </Icon> */}
          <Icon
            type="info"
            className="textLink"
            aria-label="Read privacy policy"
            url="https://github.com/fhewett/simba/blob/main/PRIVACY.md"
          >
            <span>Privacy</span>
          </Icon>
          <Icon
            type="repo"
            className="textLink"
            aria-label="Go to github repository"
            url="https://github.com/fhewett/simba"
          >
            <span>GitHub</span>
          </Icon>
        </ul>
      )}
    </Header>
  );
}

export default SimbaHeader;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  gap: var(--size-3);

  margin-top: 100px;

  ${({ theme }) => theme.breakpoints.tablet} {
    margin-top: unset;
    margin-right: 100px;
  }

  h1 {
    font-weight: bold;
    margin-bottom: 0;
    line-height: 1.1em;
  }

  p {
    
    margin-bottom: 0;
    margin-top: var(--size-1);
  }

  ul {
    display: flex;
    margin-left: auto;
    padding-top: 15px;
    gap: var(--size-3);

    // li:nth-child(2) {
    //   .svg {
    //     display: none !important;
    //   }
    // }
  }

  li {
    max-height: 1em;
    font-size: calc(var(--text-body-font-size-tool) * 0.85);
    line-height: 1em;
  }
`;
