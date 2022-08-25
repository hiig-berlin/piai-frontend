import { useRef } from "react";
import styled from "styled-components";
import InputText from "~/components/styled/InputText";
import { ButtonNormalized } from "~/components/styled/Button";
import { ToolSvgBackground } from "../shared/ToolSvgBackground";

const Form = styled.form`
  position: relative;
  margin-bottom: var(--size-2);
  width: 100%;
`;

const Input = styled(InputText)<{ isError: boolean }>`
  ${({ theme }) => theme.textStyle("h3", true)}
  text-transform: none;
  background-color: #000;
  color: #fff;
  width: 100%;
  margin: 0;
  border-bottom: 1px solid
    ${({ isError }) => (isError ? "var(--color-ailab-red)" : "#fff")};
  padding-bottom: 3px;

  &::placeholder {
    color: var(--color-medium-grey) !important;
  }
`;

const Buttons = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  transform: translateY(-50%);
  gap: var(--size-2);
`;

const Button = styled(ButtonNormalized)`
  width: var(--size-3);
  height: var(--size-3);
`;

export const SearchForm = ({
  onSubmit,
  onChange,
  onResetClick,
  isError,
  keyword,
}: {
  onSubmit: (value: string) => void;
  onChange: (value: string) => void;
  onResetClick: () => void;
  isError: boolean;
  keyword: string;
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
      <Input
        isError={isError}
        placeholder="Keyword"
        ref={inputRef}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <Buttons>
        {keyword !== "" && (
          <Button
            type="reset"
            aria-label="reset search"
            onClick={() => {
              inputRef.current.value = "";
              onResetClick();
            }}
          >
            <ToolSvgBackground type="close" />
          </Button>
        )}
        <Button aria-label="search" type="submit">
          <ToolSvgBackground type="search" />
        </Button>
      </Buttons>
    </Form>
  );
};
