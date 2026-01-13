import { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import {
  LOCAL_STORAGE_KEYS,
  storageGet,
  storageRemove,
  storageSet,
} from "@/shared/lib/storage";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return Boolean(storageGet<boolean>(LOCAL_STORAGE_KEYS.IS_AUTH));
  });

  const navigate = useNavigate();

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
