import styled, { css } from "styled-components";
import { ButtonNormalized } from "~/components/styled/Button";
import { ToolSvgBackground } from "../ToolSvgBackground";
import safeHtml from "~/utils/sanitize";

const textLinkStyling = css`
  .svg {
    width: 1em !important;
    align-self: center;
  }

  span:last-child {
    display: inline-block;
    ${({ theme }) => theme.applyMixin("uppercase")};
    text-align: left;
  }
`;

const baseStyling = css<{ spaceBefore?: boolean; hideOnPrint?: boolean }>`
  display: flex;
  gap: var(--size-1);
  color: #fff;

  .svg {
    min-height: 1.2em;
    min-width: 1.2em;
    flex: 1em 0 0;
  }

  margin-left: ${({ spaceBefore }) =>
    spaceBefore === true ? "auto" : "unset"};

  &.textLink {
    ${textLinkStyling}
  }

  &.textLink.back {
    margin: var(--size-2) var(--size-1);

    .svg {
      background-size: 54% !important;
      background-position: center !important;
      align-self: center;
    }

    span:last-child {
      font-weight: 700;
    }
  }

  ${({ hideOnPrint }) =>
    hideOnPrint
      ? `@media print {
          display: none;
        }`
      : `@media print {
          & .svg {
            filter: invert(100%) !important;
          }
        }`}
`;

const IconInline = styled.span<{
  spaceBefore?: boolean;
  hideOnPrint?: boolean;
}>`
  ${baseStyling}
`;

const IconStatic = styled.li<{
  spaceBefore?: boolean;
  hideOnPrint?: boolean;
}>`
  ${baseStyling}

  & a {
    // max-height: 1.3em;
    // overflow: hidden;
    // white-space: nowrap;
    // text-overflow: ellipsis;
  }
`;

const IconButton = styled(ButtonNormalized)<{
  spaceBefore?: boolean;
  hideOnPrint?: boolean;
  nonMuted?: boolean;
  active?: boolean;
}>`
  ${baseStyling}

  opacity: ${({ nonMuted, active }) => (nonMuted || active ? "1" : "0.6")};
  transition: opacity 0.5s ease;

  &:hover {
    opacity: ${({ nonMuted }) => (nonMuted === true ? "0.6" : "1")};
  }

  & .svg {
    filter: ${({ active }) =>
      active
        ? "brightness(0) saturate(100%) invert(73%) sepia(90%) saturate(228%) hue-rotate(337deg) brightness(105%) contrast(98%)"
        : "unset"};
  }

  &.inBox {
    align-self: end;
    // padding: 0 0 var(--size-5);
  }
`;

export const Icon = ({
  type,
  spaceBefore,
  children,
  onClick,
  className,
  stc,
  inline,
  nonMuted,
  url,
  hideOnPrint,
  active = false,
}: {
  type: string;
  spaceBefore?: boolean;
  children?: any;
  onClick?: any;
  className?: string;
  inline?: boolean;
  hideOnPrint?: boolean;
  stc?: boolean;
  nonMuted?: boolean;
  url?: string;
  active?: boolean;
}) => {
  if (inline) {
    return (
      <IconInline
        hideOnPrint={hideOnPrint}
        spaceBefore={spaceBefore}
        className={className}
      >
        <ToolSvgBackground type={type} />
        {children && children}
      </IconInline>
    );
  } else if (stc) {
    return (
      <IconStatic
        hideOnPrint={hideOnPrint}
        spaceBefore={spaceBefore}
        className={className}
      >
        <ToolSvgBackground type={type} />
        <span>{children && children}</span>
      </IconStatic>
    );
  } else if (typeof url === "string") {
    if (!url.trim()) return <></>;

    return (
      <IconStatic
        hideOnPrint={hideOnPrint}
        className={className}
        spaceBefore={spaceBefore}
      >
        <ToolSvgBackground type={type} />
        <span>
          {safeHtml(url)
            .split(",")
            .reduce((carry: any, u: any, i: number) => {
              if (!u.trim()) return carry;

              if (carry.length > 0) {
                carry.push(", ");
              }

            carry.push(
              <a href={u.trim()} key={`${url}-${i}`} target="_blank" rel="nofollow noreferrer">
                {u.trim()}
              </a>
            );

              return carry;
            }, [])}
        </span>
      </IconStatic>
    );
  } else {
    return (
      <IconButton
        spaceBefore={spaceBefore}
        hideOnPrint={hideOnPrint}
        onClick={onClick}
        className={className}
        nonMuted={nonMuted}
        active={active}
      >
        <ToolSvgBackground type={type} />
        {children && children}
      </IconButton>
    );
  }
};
