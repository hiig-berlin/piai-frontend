import React from "react";
import { useConfigContext } from "~/providers/ConfigContextProvider";
import Head from "next/head";

export const AppDefaultHead = () => {
  const config = useConfigContext();

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=5.0"
      />
      <title>Public Interest AI</title>

      <link rel="shortcut icon" href={`${config.baseUrl}/TODO:_SET_FAVICON.png`} />
      <meta name="#000" />
      <link
        rel="icon"
        type="image/png"
        href={`${config.baseUrl}/TODO:_SET_FAVICON.png`}
        sizes="16x16"
      />
      <link rel="apple-touch-icon" href={`${config.baseUrl}/TODO:_SET_FAVICON.png`} />
      <link
        rel="icon"
        type="image/png"
        href={`${config.baseUrl}/TODO:_SET_FAVICON.png`}
        sizes="32x32"
      />
      {/* <link
        rel="preload"
        href="/fonts/TODO:/CUSTOM-FONT-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/fonts/TODO:/CUSTOM-FONT-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      /> */}
    </Head>
  );
};
