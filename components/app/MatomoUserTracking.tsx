import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Script from "next/script";

import { useRouter } from "next/router";

import { useConfigContext } from "~/providers/ConfigContextProvider";

let previousPathName = "";

export const MatomoUserTracking = () => {
  const config = useConfigContext();
  const router = useRouter();

  const prepareTrackView = useCallback(
    (path: any) => {
      console.log(1, path);

      if (
        config.matomoTrackingUrl &&
        config.matomoTrackingId &&
        typeof window !== "undefined" &&
        (window as any)._paq
      ) {
        const [pathname] = path.split("?");

        if (previousPathName) {
          (window as any)._paq.push(["setReferrerUrl", `${previousPathName}`]);
        }
        (window as any)._paq.push(["setCustomUrl", pathname]);
        (window as any)._paq.push(["deleteCustomVariables", "page"]);
        previousPathName = pathname;
      }
    },
    [config.matomoTrackingUrl, config.matomoTrackingId]
  );

  const trackView = useCallback(
    (path: any) => {
      console.log(2, path);

      if (
        config.matomoTrackingUrl &&
        config.matomoTrackingId &&
        typeof window !== "undefined" &&
        (window as any)._paq
      ) {
        setTimeout(() => {
          let doTrackUrl = true;

          if (path.indexOf("?") > -1) {
            const pathName = path.split("?")[0];
            if (pathName === previousPathName) {
              doTrackUrl = false;
            } else {
              previousPathName = pathName;
            }
          } else {
            previousPathName = path;
          }

          if (doTrackUrl) {
            (window as any)._paq.push(["setDocumentTitle", document.title]);
            (window as any)._paq.push(["trackPageView"]);
          }
        }, 0);
      }
    },
    [config.matomoTrackingUrl, config.matomoTrackingId]
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    router.events.on("routeChangeStart", prepareTrackView);
    router.events.on("routeChangeComplete", trackView);

    console.log(document.location);
    previousPathName = document.location.pathname;

    return () => {
      router.events.off("routeChangeStart", prepareTrackView);
      router.events.off("routeChangeComplete", trackView);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {config.matomoTrackingUrl && config.matomoTrackingId && (
        <>
          <Script id="tracking-code" strategy="afterInteractive">
            {`
              if (typeof window !== "undefined") {
                const _paq = window._paq = window._paq || [];
                _paq.push(['trackPageView']);
                _paq.push(['enableLinkTracking']);
                _paq.push(['setTrackerUrl', '${config.matomoTrackingUrl}/matomo.php']);
                _paq.push(['setSiteId', '${config.matomoTrackingId}']);
              }
            `}
          </Script>
          <Script
            strategy="afterInteractive"
            src={`${config.matomoTrackingUrl}/matomo.js`}
          />
        </>
      )}
    </>
  );
};
