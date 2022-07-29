import React, { createContext, useCallback, useContext, useState } from "react";

type HeaderContextType = {
  observeScroll: boolean;
  fadeOut: boolean;
  setObserveScroll: Function;
  setFadeOut: Function;
};
// create context
const HeaderContext = createContext<HeaderContextType>({
  observeScroll: true,
  fadeOut: false,
  setObserveScroll: () => {},
  setFadeOut: () => {},
});

export const useHeaderContext = () => useContext(HeaderContext);

// context provider
export const HeaderContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [observeScroll, setObserveScrollState] = useState<boolean>(true);
  const [fadeOut, setFadeOutState] = useState<boolean>(false);

  const setFadeOut = useCallback((flag: boolean) => {
    setObserveScrollState(flag);
  }, []);

  const setObserveScroll = useCallback((flag: boolean) => {
    setFadeOutState(flag);
  }, []);

  return (
    <HeaderContext.Provider
      value={{
        observeScroll,
        fadeOut,
        setObserveScroll,
        setFadeOut,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};
