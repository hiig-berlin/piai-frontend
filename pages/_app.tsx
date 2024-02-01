import "../styles/global.scss";

import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { primaryInput, deviceType } from "detect-it";

import { theme } from "~/theme/theme";
import { ThemeProvider } from "styled-components";

import { ConfigContextProvider } from "~/providers/ConfigContextProvider";
import { SettingsContextProvider } from "~/providers/SettingsContextProvider";

import { GlobalStyle } from "~/theme/globalstyle";

import { AccessibiliyHelpers } from "~/components/app/AccessibiliyHelpers";
import { withPasswordProtect } from "~/components/app/PasswordProtect";
import { AppDefaultHead } from "~/components/app/AppDefaultHead";
import { CssVarsStateController } from "~/components/state/CssVarsState";
import { appConfig } from "~/config";
import { ErrorLock } from "~/components/app/ErrorLock";
import { DevInfo } from "~/components/ui/DevInfo";
import { PageStateController } from "~/components/state/PageState";

const SmoothScroll = dynamic(() => import("~/components/ui/SmoothScroll"));

type GetLayoutType = (page: ReactElement) => ReactNode;
type GetLayoutWithPropsType = (page: ReactElement, props: any) => ReactNode;

type NextPageWithLayout = NextPage & {
  getLayout?: GetLayoutType | GetLayoutWithPropsType;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const CustomErrorHandler = (
  error: Error /* , info: { componentStack: string } */
) => {
  if (typeof window === "undefined" || process.env.NODE_ENV === "development")
    return;

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

function MyApp({ Component, pageProps }: any) {
  const getLayout = Component.getLayout ?? ((page: ReactElement) => page);

  return (
    <>
      {typeof window !== "undefined" &&
        !("scrollBehavior" in document.documentElement.style) && (
          <SmoothScroll />
        )}
      <ConfigContextProvider>
        <ThemeProvider
          theme={{ ...theme, colorMode: pageProps?.themeColorMode ?? "dark" }}
        >
          <SettingsContextProvider
            frontendSettings={pageProps.frontendSettings}
          >
            <GlobalStyle />
            
            <CssVarsStateController />
            <PageStateController />

            <AccessibiliyHelpers />

            <AppDefaultHead />
            <ErrorLock onError={CustomErrorHandler}>
              {getLayout(<Component {...pageProps} />, pageProps)}
            </ErrorLock>
            {process.env.NODE_ENV === "development" && <DevInfo />}
          </SettingsContextProvider>
        </ThemeProvider>
      </ConfigContextProvider>
    </>
  );
}

export default `${process.env.NEXT_PUBLIC_PREVIEW_LOCKED}` === "1"
  ? withPasswordProtect(MyApp)
  : MyApp;
