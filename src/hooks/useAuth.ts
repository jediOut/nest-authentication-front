import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = () => {
      const token = Cookies.get("access_token");  
      if (token !== undefined) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();

    const storageListener = () => {
      checkAuthStatus();
    };

    window.addEventListener("storage", storageListener);

    return () => {
      window.removeEventListener("storage", storageListener);
    };
  }, []);

  const logout = () => {
    Cookies.remove("access_token");  
    setIsAuthenticated(false);
  };

  return { isAuthenticated, logout };
};

export default useAuth;
