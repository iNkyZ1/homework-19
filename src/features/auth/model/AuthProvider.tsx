import { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  LOCAL_STORAGE_KEYS,
  storageGet,
  storageRemove,
  storageSet,
} from "@/shared/lib/storage";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAuth = storageGet<boolean>(LOCAL_STORAGE_KEYS.IS_AUTH);

    if (storedAuth) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    storageSet(LOCAL_STORAGE_KEYS.IS_AUTH, true);
    setIsAuthenticated(true);
    navigate("/");
  };

  const logout = () => {
    storageRemove(LOCAL_STORAGE_KEYS.IS_AUTH);
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
