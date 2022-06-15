import React from "react";
import styled from "styled-components";
import Button from "../styled/Button";

const AccessibleText = styled.div``;

// TODO: Write toggle function depending on toggle or global state/envirnoment variable
const toggleText = {
  // do something
}

export const Accessible = ({
  simple,
  position = "top right",
  status = "standard",
  children,
}: {
  simple: any;
  position?: string;
  status?: string;
  children: React.ReactNode;
}) => {
  let text;
  if (status === "simple") {
    text = simple;
  } else {
    text = children;
  }

  return (
    <>
      <AccessibleText>{text}</AccessibleText>
      <Button onClick={() => toggleText}>
        <span>ICON</span>
        <span>Show simplified text</span>
      </Button>
    </>
  );
};
