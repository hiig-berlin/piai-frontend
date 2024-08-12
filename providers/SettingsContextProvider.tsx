import React, { createContext, useContext, useState, useRef } from "react";

let currentSettingsInMemory: any = {};

// create context
const SettingsContext = createContext<any>(currentSettingsInMemory);

export const useSettingsContext = () => useContext(SettingsContext);

// context provider
export const SettingsContextProvider = ({
  frontendSettings,
  children,
}: {
  frontendSettings: any;
  children: React.ReactNode;
}) => {
  const settingsRef = useRef(currentSettingsInMemory);

  settingsRef.current = {
    options: {
      ...settingsRef.current?.options,
      ...frontendSettings?.options,
    },
    menus: {
      ...settingsRef.current?.menus,
      ...frontendSettings?.menus,
    },
    ticker: frontendSettings?.ticker ?? settingsRef.current?.ticker,
    taxonomies: {
      ...settingsRef.current?.taxonomies,
      ...frontendSettings?.taxonomies,
    },
  };

  return (
    <SettingsContext.Provider value={settingsRef.current}>
      {children}
    </SettingsContext.Provider>
  );
};
