import React, { createContext, useContext, useState } from "react";

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
  const [observeScroll, setObserveScroll] = useState<boolean>(true);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
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
