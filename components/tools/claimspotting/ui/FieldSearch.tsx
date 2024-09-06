import { useRef } from "react";
import styled from "styled-components";
import InputText from "~/components/styled/InputText";
import { ButtonNormalized } from "~/components/styled/Button";
import { ToolSvgBackground } from "~/components/tools/shared/ToolSvgBackground";

const Form = styled.form`
  position: relative;
  margin-bottom: var(--size-3);
  width: 100%;

  ${({ theme }) => theme.applyMixin("noPrint")}
`;

const Input = styled(InputText)<{ isError: boolean }>`
  // ${({ theme }) => theme.textStyle("h3", true)}
  font-family: var(--font-family-monospace);
  text-transform: none;
  background-color: transparent;
  color: #fff;
  width: 100%;
  margin: 0;
  border: 0px solid;
  border-bottom: 1px solid;
  height: min-content;
    ${({ isError }) => (isError ? "var(--color-ailab-red)" : "#fff")};
  padding: 5px calc(var(--size-1) + var(--size-3));

  &::placeholder {
    color: var(--color-light-grey) !important;
    font-family: var(--font-family-monospace);
  }
`;

const Button = styled(ButtonNormalized)`
  width: var(--size-3);
  height: var(--size-3);

  position: absolute;
  display: inline-block;
  top: 50%;
  transform: translateY(-50%);

  &.searchIcon {
    left: 0;
    .svg {
      max-height: 80%;
    }
  }

  &.resetSearch {
    right: 0;
  }
`;

export const SearchForm = ({
  onSubmit,
  onChange,
  onResetClick,
  isError,
  query,
  placeholder,
}: {
  onSubmit: (value: string) => void;
  onChange: (value: string) => void;
  onResetClick: () => void;
  isError: boolean;
  query: string;
  placeholder: string;
}) => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  return (
    <Form
      action="/"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(inputRef.current.value);
      }}
    >
      <Button
        aria-label="search"
        type="submit"
        className="searchIcon"
        onClick={(e) => {
          e.preventDefault();
          onSubmit(inputRef.current.value);
        }}
      >
        <ToolSvgBackground type="search" />
      </Button>
      <Input
        isError={isError}
        placeholder={placeholder}
        ref={inputRef}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onBlur={(e) => {onSubmit(e.target.value)}}
        value={query}
      />
      {query !== "" && (
        <Button
          type="reset"
          aria-label="reset search"
          className="resetSearch"
          onClick={() => {
            inputRef.current.value = "";
            onResetClick();
          }}
        >
          <ToolSvgBackground type="close" />
        </Button>
      )}
    </Form>
  );
};
