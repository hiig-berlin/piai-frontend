import React, { useState } from "react";
import { LinkButtonAnimated } from "~/components/styled/Button";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import SafeHtmlSpan from "~/components/ui/SafeHtmlSpan";
import { Box } from "../shared/ui/Box";
import Link from "next/link";
import styled from "styled-components";
import { Icon } from "./Icon";
import { useToolStateContext } from "./context/ContextProviders";

const ContributeBox = styled(Box)<{ seen?: Boolean }>`
  ${({ seen }) => seen && "display: none;"}
  pointer-events: all;
  max-width: 500px;

  & * {
    color: var(--color-piai-map-highlight);
  }

  h3 {
    font-size: 1.1em;
    display: flex;
    justify-content: space-between;
  }

  a {
    color: var(--color-piai-map-highlight);
    border-color: var(--color-piai-map-highlight);
    align-self: end;
    margin-right: 0;
    &:hover {
      margin-right: -0.3em;
    }
    &:visited {
      color: var(--color-piai-map-highlight);
    }
  }
`;

export const Contribute = ({ position }: { position?: String }) => {
  const { setHideMapIntro, map } = useToolStateContext();

  // TODO: get cta from AboutPageData
  const cta = {
    title: "Contribute",
    text: "<p>There is a lack of accumulated and detailed data on public interest AI projects, including their specific objectives, methods, and frameworks. This is why we created a survey.</p><p>Contribute by filling out the online survey and include your project in this interactive map and directory.</p>",
    url: "/",
    linkTitle: "Add your project",
  };

  return (
    <ContributeBox className="cta" seen={map.hideIntro}>
      <h3>
        <SafeHtmlSpan html={cta.title} />
        <Icon type="close" onClick={() => setHideMapIntro(true)} />
      </h3>
      <SafeHtmlDiv html={cta.text} />

      {cta?.url && cta?.linkTitle && (
        <Link href={cta?.url} passHref>
          <LinkButtonAnimated>{cta?.linkTitle}</LinkButtonAnimated>
        </Link>
      )}
    </ContributeBox>
  );
};
