import { useEffect, useState } from "react";

export const useAuthenticated = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthToken = () => {
      const cookieValue = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="))
        ?.split("=")[1];
      setIsAuthenticated(!!cookieValue);
    };

    checkAuthToken();

    window.addEventListener("storage", checkAuthToken);

    return () => {
      window.removeEventListener("storage", checkAuthToken);
    };
  }, []);


  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("authToken="))
      ?.split("=")[1];
    setIsAuthenticated(!!cookieValue);
  }, []);

  if (isAuthenticated === null) {
    return false;
  }

  return isAuthenticated;
};
