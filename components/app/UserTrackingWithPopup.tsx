import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import Script from "next/script";

import { useRouter } from "next/router";

import { useConfigContext } from "~/providers/ConfigContextProvider";

import styled from "styled-components";
import Link from "next/link";
import { Button } from "../styled/Button";

const COOKIE_NAME = "site-cookie-shown";

const CloseButton = styled(Button)`
  display: flex;
  align-items: center;
  background-color: #000;
  color: #fff;
  transition: background-color 0.3s;
  @media (any-pointer: fine) {
    &:hover {
      background-color: var(--color-link-hover);
    }
  }

  ${({ theme }) => theme.textStyle("h3")};
  padding: var(--size-1) var(--size-2);
`;

const Aside = styled.aside<{ opacity: number }>`
  position: fixed;
  background: #fff;
  transition: opacity 0.5s;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  opacity: ${({ opacity }) => opacity};
  background-color: var(--color-hl, #ff0);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  ${({ theme }) => theme.textStyle("body")};

  height: var(--size-6);
  width: var(--size-9);
  left: var(--size-2);
  bottom: var(--size-2);
  padding: var(--size-2);
  column-gap: var(--size-2);
`;

export const UserTracking = () => {
  const config = useConfigContext();
  const [showPopup, setShowPopup] = useState(false);
  const [fadingOut, setFadeingOut] = useState(false);
  const router = useRouter();

  const trackView = useCallback(
    (url: any) => {
      if ((window as any)?.ga || (window as any)?.gtag) {
        if ((window as any)?.ga) {
          (window as any)?.ga("send", "pageview", {
            page: url,
            title: document.title,
          });
        }

        if ((window as any)?.gtag) {
          (window as any)?.gtag("event", "page_view", {
            page_title: document.title,
            page_location: url,
            send_to: config.matomoTrackingUrl,
          });
        }
      }

      try {
        const trackUser = Cookies.get(COOKIE_NAME);

        if (trackUser !== "yes" && trackUser !== "no") {
          setShowPopup(true);
        }
      } catch (e) {
        setShowPopup(true);
      }
    },
    [config.matomoTrackingUrl]
  );

  const fadeOut = () => {
    setFadeingOut(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 750);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const tEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowPopup(false);
      }
    };

    if (typeof document !== "undefined") {
      document.body.addEventListener("keyup", tEscape);
    }

    router.events.on("routeChangeComplete", trackView);
    return () => {
      if (typeof document !== "undefined") {
        document.body.removeEventListener("keyup", tEscape);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    try {
      const trackUser = Cookies.get(COOKIE_NAME);

      if (trackUser !== "yes" && trackUser !== "no") {
        setShowPopup(true);
      }
    } catch (e) {
      setShowPopup(true);
    }
  }, [setShowPopup]);

  return (
    <>
      {config.matomoTrackingUrl && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${config.matomoTrackingUrl}`}
          />
          <Script id="google-ga4-tag" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${config.matomoTrackingUrl}', {});
          `}
          </Script>
        </>
      )}

      {config.matomoTrackingUrl && showPopup && (
        <Aside
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="cpopup_label"
          aria-describedby="cpopup_desc"
          opacity={fadingOut ? 0 : 1}
        >
          <div>
            This site uses cookies.
            <br />
            Find out more in our{" "}
            <Link href="/privacy-policy" passHref>
              <a>privacy policy</a>
            </Link>
            .
          </div>
          <CloseButton
            onClick={() => {
              try {
                Cookies.set(COOKIE_NAME, "yes", { expires: 365 });
              } catch (e) {
                // don't do anything ...
              }
              fadeOut();
            }}
          >
            Close
          </CloseButton>
        </Aside>
      )}
    </>
  );
};
