"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { getCookieValue } from "../utils/сookies";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: Dispatch<boolean>;
};

export const AuthContext = createContext<null | AuthContextType>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (getCookieValue("authToken")) setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
