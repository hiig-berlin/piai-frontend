import React, { useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import InputText from "~/components/styled/InputText";
import { theme } from "~/theme/theme";
import { ThemeProvider } from "styled-components";
import Cookies from "js-cookie";

import {
  ConfigContextProvider,
  useConfigContext,
} from "~/providers/ConfigContextProvider";

import { GlobalStyle } from "~/theme/globalstyle";

import { appConfig } from "~/config";
import { AccessibiliyHelpers } from "~/components/app/AccessibiliyHelpers";
import { AppDefaultHead } from "./AppDefaultHead";
import Button from "../styled/Button";
import { SvgBackground } from "../ui/SvgBackground";

const GlobalStyleLogin = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: var(--color-bg, #ff0);
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
`;

const LoginContainer = styled.div`
  width: 80%;
  max-width: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`;

const LoginWrapper = styled.div`
  width: 100%;

  position: relative;
  height: var(--size-5);
  
`;

const LoginInput = styled(InputText)<{ isError: boolean }>`
  width: 100%;
  height: 100%;
  border: none;
  background: ${({ isError }) => (isError ? "#f00" : "var(--color-bg, #ff0)")};
  color: ${({ isError }) => (isError ? "#fff" : "#000")};
  vertical-align: top;
  &::placeholder {
    color: #000 !important;
  }
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  border-color: ${({ isError }) => (isError ? "#f00" : "#000")};

  ${(props: any) => props.theme.textStyle("h2")};
`;

const LoginButton = styled(Button)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  opacity: 1;
  transition: opacity 0.3s;

  width: var(--size-5);
  height: var(--size-5);

  ${(props: any) => props.theme.textStyle("h2")};
  
  @media (any-pointer: fine) {
    &:hover {
      opacity: 0.75;
    }
  }

`;

export const Login = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isError, setIsError] = useState(false);

  const config = useConfigContext();

  return (
    <>
      <ThemeProvider theme={theme}>
        <AccessibiliyHelpers />
        <ConfigContextProvider>
          <AppDefaultHead />
          <GlobalStyle />
          <GlobalStyleLogin />
          <form
            onSubmit={(event) => {
              event.preventDefault();

              if (inputRef.current.value.trim() === config.previewPwd) {
                Cookies.set("preview", "yes", { expires: 365 });
                window.location.reload();
              } else {
                setIsError(true);
              }
            }}
          >
            <LoginContainer>
              <LoginWrapper>
                <LoginInput
                  ref={inputRef}
                  placeholder="Password?"
                  type="password"
                  isError={isError}
                  onChange={() => setIsError(false)}
                />
                <LoginButton>
                  <SvgBackground
                    type="arrow"
                    position="center center"
                    width="100%"
                    height="100%"
                  />
                </LoginButton>
              </LoginWrapper>
            </LoginContainer>
          </form>
        </ConfigContextProvider>
      </ThemeProvider>
    </>
  );
};

export default Login;
