import { deviceType, primaryInput } from "detect-it";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { ThemeProvider } from "styled-components";

import { AccessibiliyHelpers } from "~/components/app/AccessibiliyHelpers";
import { AppDefaultHead } from "~/components/app/AppDefaultHead";
import { ErrorLock } from "~/components/app/ErrorLock";
import { withPasswordProtect } from "~/components/app/PasswordProtect";
import { CssVarsStateController } from "~/components/state/CssVarsState";
import { PageStateController } from "~/components/state/PageState";
import { DevInfo } from "~/components/ui/DevInfo";
import { appConfig } from "~/config";
import { ConfigContextProvider } from "~/providers/ConfigContextProvider";
import { SettingsContextProvider } from "~/providers/SettingsContextProvider";
import { GlobalStyle } from "~/theme/globalstyle";
import { theme } from "~/theme/theme";

import "../styles/global.scss";

const SmoothScroll = dynamic(() => import("~/components/ui/SmoothScroll"));

type GetLayoutType = (page: ReactNode) => ReactNode;
type GetLayoutWithPropsType = (page: ReactNode, props: any) => ReactNode;

type MyAppPageProps = {
  children: React.ReactNode;
  frontendSettings: any;
  themeColorMode: typeof theme.colorMode;
};

type Page<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: GetLayoutType | GetLayoutWithPropsType;
};

type MyAppProps<P = {}> = AppProps<P> & {
  Component: Page<P>;
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

function MyApp({ Component, pageProps }: MyAppProps<MyAppPageProps>): JSX.Element {

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

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
