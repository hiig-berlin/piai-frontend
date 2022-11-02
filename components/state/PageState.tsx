import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  startTransition,
} from "react";
import create from "zustand";
import useIsMounted from "~/hooks/useIsMounted";
import { useRouter } from "next/router";

import { useMainMenuActions } from "~/components/state/MainMenuState";
import { scrollToHash } from "~/utils/scrollToHash";

export type PageState = {
  isLoading: boolean;
  wasBack: boolean;
  currentPath: string;
  previousPath: string;
};

export type PageStateActions = {
  getPageState: () => PageState;
  setPageState: (state: PageState) => void;
  updatePageState: (state: Partial<PageState>) => void;
  getWasBack: () => boolean;
  getCurrentPath: () => string;
  setCurrentPath: (path: string) => void;
  getIsLoading: () => boolean;
  getPreviousPath: () => string;
};

export type PageStateStore = PageState & PageStateActions;

export const usePageStateStore = create<PageStateStore>((set, get) => ({
  isLoading: true,
  wasBack: false,
  currentPath: "/",
  previousPath: "/",
  getPageState: () => get(),
  setPageState: (state: PageState) =>
    set(() => ({
      ...state,
    })),
  updatePageState: (state: Partial<PageState>) =>
    set(() => ({
      ...state,
    })),
  getWasBack: () => get().wasBack,
  getIsLoading: () => get().isLoading,
  getCurrentPath: () => get().currentPath,
  setCurrentPath: (path: string) => {
    if (path && get().currentPath !== path) {
      set({
        previousPath: get().currentPath,
        currentPath: path,
      });
    }
  },
  getPreviousPath: () => get().previousPath,
}));

export const usePageStateStoreActions = () => {
  return usePageStateStore(
    (state) =>
      Object.keys(state).reduce(
        (carry: Partial<PageStateStore>, key: string) => {
          if (
            key.startsWith("get") ||
            key.startsWith("set") ||
            key.startsWith("update")
          ) {
            carry = {
              ...carry,
              [key]: state[key as keyof PageStateStore],
            };
          }
          return carry;
        },
        {}
      ) as PageStateActions
  );
};

export const usePageStateIsLoadingState = () =>
  usePageStateStore((state) => state.isLoading);

// page state controller
export const PageStateController = () => {
  const isMounted = useIsMounted();
  const { close } = useMainMenuActions();
  const router = useRouter();

  const isBackRef = useRef<boolean>(false);
  const fontLoadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isFontsAreLoaded, setIsFontsAreLoaded] = useState(false);
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);

  const isLoading = usePageStateStore((state) => state.isLoading);
  const { updatePageState, getCurrentPath } = usePageStateStoreActions();

  const onLoadStart = useCallback(() => {
    close();

    startTransition(
      () => updatePageState({
        wasBack: isBackRef.current,
        isLoading: true,
      })
    );

    if (typeof document !== "undefined") {
      document.body.setAttribute("tabindex", "-1");
    }
  }, [close, updatePageState]);

  const onLoadEnd = useCallback(
    (url = null) => {
      let newState: Partial<PageState> = {
        isLoading: false,
      };

      if (typeof url === "string") {
        newState = {
          ...newState,
          previousPath: getCurrentPath(),
          currentPath: url,
        };
      }
      startTransition(() => updatePageState(newState));

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

      if (typeof window !== "undefined") {
        document.body.removeAttribute("tabindex");
        document.body.classList.remove("tabbed");
        document.body.focus();
      }

      scrollToHash(document.location.hash);
    },
    [getCurrentPath, updatePageState]
  );

  useEffect(() => {
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

    scrollToHash(document.location.hash);

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
        updatePageState({
          isLoading: false,
        });
        setIsInitiallyLoaded(true);
      });
    }
  }, [isInitiallyLoaded, isLoading, isFontsAreLoaded, updatePageState]);

  return <></>;
};
