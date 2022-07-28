import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  startTransition,
} from "react";
import useIsMounted from "~/hooks/useIsMounted";
import { useRouter } from "next/router";

import { useMenuContext } from "~/providers/MenuContextProvider";

type PageState = {
  isLoading: boolean;
  getWasBack: Function;
  getCurrentPath: Function;
  getIsLoading: Function;
  getPreviousPath: Function;
};

// create context
const PageStateContext = createContext<PageState>({
  isLoading: true,
  getWasBack: () => false,
  getIsLoading: () => false,
  getPreviousPath: () => "/",
  getCurrentPath: () => "/",
});

export const usePageStateContext = () => useContext(PageStateContext);

// context provider
export const PageStateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isMounted = useIsMounted();
  const { close } = useMenuContext();
  const router = useRouter();

  const currentPathRef = useRef("");
  const previousPathRef = useRef("");
  const isLoadingRef = useRef<boolean>(true);
  const isBackRef = useRef<boolean>(false);
  const wasBackRef = useRef<boolean>(false);
  const fontLoadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isFontsAreLoaded, setIsFontsAreLoaded] = useState(false);
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);

  const getIsLoading = useCallback(() => isLoadingRef.current, []);
  const getWasBack = useCallback(() => wasBackRef.current, []);
  const getPreviousPath = useCallback(() => previousPathRef.current, []);
  const getCurrentPath = useCallback(() => currentPathRef.current, []);

  const setCurrentPath = useCallback((path: string) => {
    if (path && currentPathRef.current !== path) {
      previousPathRef.current = `${currentPathRef.current}`;
      currentPathRef.current = `${path}`;
    }
  }, []);

  const onLoadStart = useCallback(() => {
    wasBackRef.current = isBackRef.current;
    close();
    setIsLoading(true);
    isLoadingRef.current = true;
    if (typeof document !== "undefined") {
      document.body.setAttribute("tabindex", "-1");
    }
  }, [close]);

  const onLoadEnd = useCallback(
    (url = null) => {
      setIsLoading(false);
      isLoadingRef.current = false;

      if (typeof window !== "undefined") {
        if (!isBackRef.current) {
          setTimeout(() => {
            if (!isBackRef.current) {
              window.scrollTo(0, 0);
            }
          }, 60);
        }
      }
      isBackRef.current = false;

      if (typeof url === "string") setCurrentPath(url);

      if (typeof window !== "undefined") {
        document.body.removeAttribute("tabindex");
        document.body.classList.remove("tabbed");
        document.body.focus();
      }
    },
    [setCurrentPath]
  );

  useEffect(() => {
    startTransition(() => {
      setIsLoading(true);
    });

    router.beforePopState((state) => {
      isBackRef.current = true;
      return true;
    });
    router.events.on("routeChangeStart", onLoadStart);
    router.events.on("routeChangeComplete", onLoadEnd);
    router.events.on("routeChangeError", onLoadEnd);

    const tabPressed = (e: KeyboardEvent) => {
      if (isMounted && e.key === "Tab") {
        document.body.classList.add("tabbed");
      }
    };

    if (typeof document !== "undefined") {
      document.body.addEventListener("keyup", tabPressed);
    }

    if (typeof window === "undefined") return;

    if ("fonts" in document) {
      fontLoadTimeoutRef.current = setTimeout(() => {
        fontLoadTimeoutRef.current = null;
        if (isMounted) {
          startTransition(() => {
            setIsFontsAreLoaded(true);
          });
        }
      }, 1000);

      document.fonts.ready.then(() => {
        if (fontLoadTimeoutRef.current)
          clearTimeout(fontLoadTimeoutRef.current);
        if (isMounted) {
          startTransition(() => {
            setIsFontsAreLoaded(true);
          });
        }
      });
    } else {
      startTransition(() => {
        setIsFontsAreLoaded(true);
      });
    }

    return () => {
      router.events.off("routeChangeStart", onLoadStart);
      router.events.off("routeChangeComplete", onLoadEnd);
      router.events.off("routeChangeError", onLoadEnd);

      if (typeof document !== "undefined") {
        document.body.removeEventListener("keyup", tabPressed);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInitiallyLoaded && isLoading && isFontsAreLoaded) {
      startTransition(() => {
        setIsLoading(false);
        isLoadingRef.current = false;
        setIsInitiallyLoaded(true);
      });
    }
  }, [isInitiallyLoaded, isLoading, isFontsAreLoaded]);

  return (
    <PageStateContext.Provider
      value={{
        isLoading: isLoading || !isFontsAreLoaded,
        getWasBack,
        getIsLoading,
        getPreviousPath,
        getCurrentPath,
      }}
    >
      {children}
    </PageStateContext.Provider>
  );
};
