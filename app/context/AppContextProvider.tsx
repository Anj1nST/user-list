import React, { createContext, Dispatch, ReactNode, useState } from "react";

interface AppState {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<boolean>;
}

type AppContext = AppState | null;

export const AppContext = createContext<AppContext>(null);

const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
