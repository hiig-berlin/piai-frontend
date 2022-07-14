import styled, { css } from "styled-components";
import { ButtonNormalized } from "~/components/styled/Button";
import { MapSvgBackground } from "./MapSvgBackground";

const baseStyling = css<{ spaceBefore?: boolean }>`
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
`;

const IconStatic = styled.li`
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
  nonMuted?: boolean;
  active?: boolean;
}>`
  ${baseStyling}

  opacity: ${({ nonMuted, active}) => ((nonMuted || active) ? "1" : "0.6")};
  transition: opacity 0.5s ease;

  &:hover {
    opacity: ${({ nonMuted }) => (nonMuted === true ? "0.6" : "1")};
  }

  &.languageSwitch,
  &.textLink {
    .svg {
      width: 1em !important;
      align-self: center;
    }

    span:last-child {
      display: inline-block;
      ${({ theme }) => theme.applyMixin("uppercase")};
    }

    &.inBox {
      align-self: end;
      padding: 0 0 var(--size-5);
    }
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
`;

export const Icon = ({
  type,
  spaceBefore,
  children,
  onClick,
  className,
  stc,
  nonMuted,
  link,
  active,
}: {
  type: string;
  spaceBefore?: boolean;
  children?: any;
  onClick?: any;
  className?: string;
  stc?: boolean;
  nonMuted?: boolean;
  link?: boolean;
  active?: boolean;
}) => {
  if (stc) {
    return (
      <IconStatic spaceBefore={spaceBefore} className={className}>
        <MapSvgBackground type={type} />
        {children && children}
      </IconStatic>
    );
  } else if (link) {
    return (
      <IconStatic className={className}>
        <MapSvgBackground type={type} />
        <a href="{children}" target="_blank" rel="nofollow noreferrer">
          {children}
        </a>
      </IconStatic>
    );
  } else {
    return (
      <IconButton
        spaceBefore={spaceBefore}
        onClick={onClick}
        className={className}
        nonMuted={nonMuted}
        active={active}
      >
        <MapSvgBackground type={type} />
        {children && children}
      </IconButton>
    );
  }
};
