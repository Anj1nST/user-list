import { useEffect, useState } from "react";

export const useAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
        
      setIsAuthenticated(!!cookieValue);
    }
  }, []);

  return isAuthenticated;
};
