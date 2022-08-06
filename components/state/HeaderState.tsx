import { useCallback } from "react";
import create from "zustand";

export type HeaderState = {
  observeScroll: boolean;
  fadeOut: boolean;
};

export type HeaderStateActions = {
  getHeaderState: () => HeaderState;
  setHeaderState: (state: HeaderState) => void;
  updateHeaderState: (state: Partial<HeaderState>) => void;
};

export type HeaderStateStore = HeaderState & HeaderStateActions;

export const useHeaderStateStore = create<HeaderStateStore>((set, get) => ({
  observeScroll: true,
  fadeOut: false,
  getHeaderState: () => get(),
  setHeaderState: (state: HeaderState) =>
    set(() => ({
      ...state,
    })),
  updateHeaderState: (state: Partial<HeaderState>) =>
    set(() => ({
      ...state,
    })),
}));

export const useHeaderStateStoreActions = () => {
  return useHeaderStateStore(
    (state) =>
      Object.keys(state).reduce(
        (carry: Partial<HeaderStateStore>, key: string) => {
          if (
            key.startsWith("get") ||
            key.startsWith("set") ||
            key.startsWith("update")
          ) {
            carry = {
              ...carry,
              [key]: state[key as keyof HeaderStateStore],
            };
          }
          return carry;
        },
        {}
      ) as HeaderStateActions
  );
};

export const useHeaderStateObserveScrollState = () =>
  useHeaderStateStore((state) => state.observeScroll);

export const useHeaderStateFadeOutlState = () =>
  useHeaderStateStore((state) => state.observeScroll);

// context provider
export const useHeaderActions = () => {
  const { updateHeaderState } = useHeaderStateStoreActions();

  const setFadeOut = useCallback(
    (flag: boolean) => {
      updateHeaderState({
        fadeOut: flag,
      });
    },
    [updateHeaderState]
  );

  const setObserveScroll = useCallback(
    (flag: boolean) => {
      updateHeaderState({
        observeScroll: flag,
      });
    },
    [updateHeaderState]
  );

  return {
    setObserveScroll,
    setFadeOut,
  };
};
