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
  userEmail: string;
  setUserEmail: Dispatch<string>;
};

export const AuthContext = createContext<null | AuthContextType>(null);

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>("");

  useEffect(() => {
    const authToken = getCookieValue("authToken");
    const email = getCookieValue("userEmail");

    if (authToken && email) {
      setIsAuthenticated(true);
      setUserEmail(email);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, userEmail, setUserEmail }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
