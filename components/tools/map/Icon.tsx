import styled, { css } from "styled-components";
import { ButtonNormalized } from "~/components/styled/Button";
import { MapSvgBackground } from "./MapSvgBackground";

const IconContainer = styled(ButtonNormalized)<{
  spaceBefore?: boolean;
}>`
  display: flex;
  gap: 1em;
  color: #fff;

  opacity: 0.6;
  transition: opacity 0.5s ease;

  &:hover {
    opacity: 1;
  }

  .svg {
    min-height: 1.2em;
    min-width: 1.2em;
  }

  &.languageSwitch {
    .svg {
      width: 1em !important;
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

  margin-left: ${({ spaceBefore }) =>
    spaceBefore === true ? "auto" : "unset"};
`;

// export const ButtonNormalized = styled.button`
//   font-family: var(--text-family-sans-serif);
//   border: none;
//   background: none;
//   cursor: pointer;
//   padding: 0;
//   margin: 0;
//   position: relative;
//   appearance: none;
//   user-select: none;
//   color: #000;
// `;

// const baseStyling = css`
//   border: 2px solid;
//   border-color: inherit;

//   padding: 0.5em 1em;
//   margin: var(--size-2);

//   color: inherit;
//   font-family: var(--font-family-sans-serif);
//   font-weight: bold;
//   font-size: 0.8em;
//   ${({ theme }) => theme.applyMixin("uppercase")};

//   transition: all ease 0.5s;
// `

// const animated = css`
//   &:active {
//     background: rgba(0, 0, 0, 0.2);
//     padding-left: 1.3em;
//     padding-right: 1.3em;
//     margin-left: calc(var(--size-2) - 0.3em);
//     margin-right: calc(var(--size-2) - 0.3em);
//   }

//   @media (any-pointer: fine) {
//     &:hover {
//       background: rgba(0, 0, 0, 0.2);
//       padding-left: 1.3em;
//       padding-right: 1.3em;
//       margin-left: calc(var(--size-2) - 0.3em);
//       margin-right: calc(var(--size-2) - 0.3em);
//     }
//   }
// `

// export const Button = styled(ButtonNormalized)`
//   ${baseStyling}
//   ${animated}
// `;

// export const LinkButton = styled.a`
//   ${baseStyling}
//   color: #fff;
//   border-color: #fff;

//   &:visited,
//   &:link {
//     color: #fff;
//   }
// `;

// export const LinkButtonAnimated = styled(LinkButton)`
//   ${animated}
// `;

export const Icon = ({
  type,
  spaceBefore,
  children,
  onClick,
  className,
}: {
  type: string;
  spaceBefore?: boolean;
  children?: any;
  onClick?: any;
  className?: string;
}) => {
  return (
    <IconContainer
      spaceBefore={spaceBefore}
      onClick={onClick}
      className={className}
    >
      <MapSvgBackground type={type} />
      {children && children}
    </IconContainer>
  );
};
