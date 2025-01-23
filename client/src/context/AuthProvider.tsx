import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContextType, User } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);
interface AuthProviderProps {
  children: ReactNode;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData: string | null = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const login = (newUser: User, collback: () => void) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    collback();
  };

  const logout = (collback: () => void) => {
    localStorage.removeItem("user");
    setUser(null);
    collback();
  };
  const value = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
