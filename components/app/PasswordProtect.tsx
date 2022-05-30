import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("./Login"));

export const withPasswordProtect = (App: any) => {
  const ProtectedApp = ({ Component, pageProps, ...props }: AppProps) => {
    const [isAuthenticated, setAuthenticated] = useState<undefined | boolean>(
      undefined
    );

    useEffect(() => {
      try {
        setAuthenticated(Cookies.get("preview") === "yes");
      } catch (e) {
        setAuthenticated(false);
      }
    }, []);

    if (isAuthenticated === undefined) {
      return null;
    }

    if (isAuthenticated) {
      return <App Component={Component} pageProps={pageProps} {...props} />;
    }

    return <Login />;
  };

  return ProtectedApp;
};
