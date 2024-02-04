import React, { startTransition, useCallback, useRef } from "react";
import { create } from "zustand";

import useIsMounted from "~/hooks/useIsMounted";

export type MainMenuState = {
  isOpen: boolean;
};

export type MainMenuStateActions = {
  getMainMenuState: () => MainMenuState;
  setMainMenuState: (state: MainMenuState) => void;
  updateMainMenuState: (state: Partial<MainMenuState>) => void;
};

export type MainMenuStateStore = MainMenuState & MainMenuStateActions;

export const useMainMenuStateStore = create<MainMenuStateStore>((set, get) => ({
  isOpen: false,
  getMainMenuState: () => get(),
  setMainMenuState: (state: MainMenuState) =>
    set(() => ({
      ...state,
    })),
  updateMainMenuState: (state: Partial<MainMenuState>) =>
    set(() => ({
      ...state,
    })),
}));

export const useMainMenuStateStoreActions = () => {
  return useMainMenuStateStore(
    (state) =>
      Object.keys(state).reduce(
        (carry: Partial<MainMenuStateStore>, key: string) => {
          if (
            key.startsWith("get") ||
            key.startsWith("set") ||
            key.startsWith("update")
          ) {
            carry = {
              ...carry,
              [key]: state[key as keyof MainMenuStateStore],
            };
          }
          return carry;
        },
        {}
      ) as MainMenuStateActions
  );
};

export const useMainMenuStateIsOpenState = () =>
  useMainMenuStateStore((state) => state.isOpen);

// context provider
export const useMainMenuActions = () => {
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const currentScrollbarWidthRef = useRef(0);

  const isMounted = useIsMounted();

  const { updateMainMenuState, getMainMenuState } =
    useMainMenuStateStoreActions();

  const open = useCallback(
    (button: React.MutableRefObject<HTMLButtonElement>) => {
      if (isMounted) {
        buttonRef.current = button.current;
        if (animationTimeoutRef.current)
          clearTimeout(animationTimeoutRef.current);

        startTransition(() => updateMainMenuState({ isOpen: true }));

        currentScrollbarWidthRef.current =
          window.innerWidth - document.body.offsetWidth;

        document.body.style.overflow = "hidden";
        document.documentElement.style.setProperty(
          "--sbw",
          `${currentScrollbarWidthRef.current}px`
        );

        if (currentScrollbarWidthRef.current > 0) {
          document.body.style.borderRight = `var(--sbw) solid var(--color-bg, #fff)`;
        }
      }
    },
    [isMounted, updateMainMenuState]
  );

  const close = useCallback(() => {
    if (isMounted) {
      startTransition(() => updateMainMenuState({ isOpen: false }));

      document.body.style.overflow = "";

      if (currentScrollbarWidthRef.current > 0) {
        document.body.style.borderRight = "";
      }

      if (buttonRef.current) {
        setTimeout(() => {
          if (buttonRef.current) buttonRef.current.focus();
        }, 100);
      }
    }
  }, [isMounted, updateMainMenuState]);

  const getIsOpen = useCallback(
    () => getMainMenuState().isOpen,
    [getMainMenuState]
  );

  return {
    getIsOpen,
    open,
    close,
  };
};
