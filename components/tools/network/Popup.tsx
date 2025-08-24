import React, { useEffect, useState } from "react";
import { LinkButtonAnimated } from "~/components/styled/Button";
import SafeHtmlDiv from "~/components/ui/SafeHtmlDiv";
import SafeHtmlSpan from "~/components/ui/SafeHtmlSpan";
import { Box } from "../shared/ui/Box";
import Link from "next/link";
import styled from "styled-components";
import { Icon } from "../shared/ui/Icon";
import { textBits } from "~/assets/data/tools/network/textbits";

// Styled wrapper positioned at bottom-right
const PopupWrapper = styled(Box)<{ seen?: boolean }>`
  ${({ seen }) => seen && "display: none; !important"}

  position: fixed;
  bottom: var(--size-3);
  right: var(--size-3);
  z-index: 1000;
  pointer-events: all;

  & * {
    color: var(--color-piai-network);
  }

  h3 {
    font-size: 1.1em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .svg {
      min-width: var(--size-4);
      cursor: pointer;
      filter: brightness(0) saturate(100%) invert(43%) sepia(90%) saturate(328%) hue-rotate(317deg) brightness(100%) contrast(98%);

      ${({ theme }) => theme.breakpoints.tablet} {
        min-width: var(--size-3);
      }
    }
  }

  a {
    color: var(--color-piai-network);
    border-color: var(--color-piai-network);
    align-self: start;
    margin: 0;

    &:hover {
      margin-right: -0.3em;
    }

    &:visited, &:link {
      color: var(--color-piai-network);
    }
  }

  ${({ theme }) => theme.breakpoints.mobileLandscape} {
    max-width: calc((100vw - var(--size-6) - 2 * var(--size-3)) * 0.666);
  }

  ${({ theme }) => theme.breakpoints.tabletLandscape} {
    max-width: calc((100vw - var(--size-6) - 3 * var(--size-3)) * 0.333);
  }
`;



// Helper function to access localStorage safely
const getPopupSeen = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("piai-network-popup-seen") === "true";
  }
  return false;
};

const Strings = textBits.en.index.join;

const Popup = () => {
  const [seen, setSeen] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setSeen(getPopupSeen());
  }, []);

  // Close handler updates localStorage and state
  const handleClose = () => {
    localStorage.setItem("piai-network-popup-seen", "true");
    setSeen(true);
  };

  const cta = {
    title: Strings.title,
    text: Strings.text,
    url: Strings.button.link,
    linkTitle: Strings.button.label,
  };

  return (
    <PopupWrapper className="cta" seen={seen}>
      <h3>
        <SafeHtmlSpan html={cta.title} />
        <Icon active type="close" onClick={handleClose} />
      </h3>

      <SafeHtmlDiv html={cta.text} />

      {cta.url && cta.linkTitle && (
        <Link href={cta.url} passHref legacyBehavior>
          <LinkButtonAnimated>{cta.linkTitle}</LinkButtonAnimated>
        </Link>
      )}
    </PopupWrapper>
  );
};

export default Popup;
