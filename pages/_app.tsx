import "../styles/global.scss";

import { ReactElement, ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { primaryInput, deviceType } from "detect-it";

import { theme } from "~/theme";
import { ThemeProvider } from "styled-components";

import { ConfigContextProvider } from "~/providers/ConfigContextProvider";
import { SettingsContextProvider } from "~/providers/SettingsContextProvider";

import { GlobalStyle } from "~/theme/globalstyle";

import { AccessibiliyHelpers } from "~/components/app/AccessibiliyHelpers";
import { HeaderContextProvider } from "~/providers/HeaderContextProvider";
import { MenuContextProvider } from "~/providers/MenuContextProvider";
import { PageStateContextProvider } from "~/providers/PageStateContextProvider";
import { withPasswordProtect } from "~/components/app/PasswordProtect";
import { AppDefaultHead } from "~/components/app/AppDefaultHead";
import { CssVarsContextProvider } from "~/providers/CssVarsContextProvider";
import { appConfig } from "~/config";

const SmoothScroll = dynamic(() => import("~/components/ui/SmoothScroll"));

type GetLayoutType = (page: ReactElement) => ReactNode;
type GetLayoutWithPropsType = (page: ReactElement, props: any) => ReactNode;

type NextPageWithLayout = NextPage & {
  getLayout?: GetLayoutType | GetLayoutWithPropsType;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const CustomErrorHandler = (error: Error, info: { componentStack: string }) => {
  if (appConfig.errorLogUrl.trim()) {
    fetch(appConfig.errorLogUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: error.name,
        message: error.message,
        stack: error.stack,
        navigator:
          typeof navigator !== "undefined"
            ? navigator.userAgent.toLowerCase()
            : "",
        detectIt: `${primaryInput}-${deviceType}`,
      }),
    });
  }
};

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div role="alert" style={{ padding: "20px" }}>
      <p style={{ marginBottom: "0px" }}>
        Something went unfortunately wrong. Please try again later!
      </p>
      <pre
        style={{
          fontSize: "8px",
        }}
      >
        {error.message}
      </pre>
    </div>
  );
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <>
      {typeof window !== "undefined" &&
        !("scrollBehavior" in document.documentElement.style) && (
          <SmoothScroll />
        )}
      <ConfigContextProvider>
        <ThemeProvider theme={theme}>
          <SettingsContextProvider
            frontendSettings={pageProps.frontendSettings}
          >
            <CssVarsContextProvider>
              <MenuContextProvider>
                <PageStateContextProvider>
                  <HeaderContextProvider>
                    <GlobalStyle />
                    <AccessibiliyHelpers />

                    <AppDefaultHead />
                    <ErrorBoundary
                      FallbackComponent={ErrorFallback}
                      onError={CustomErrorHandler}
                    >
                      {getLayout(<Component {...pageProps} />, pageProps)}
                    </ErrorBoundary>
                  </HeaderContextProvider>
                </PageStateContextProvider>
              </MenuContextProvider>
            </CssVarsContextProvider>
          </SettingsContextProvider>
        </ThemeProvider>
      </ConfigContextProvider>
    </>
  );
}

export default `${process.env.NEXT_PUBLIC_PREVIEW_LOCKED}` === "1"
  ? withPasswordProtect(MyApp)
  : MyApp;
