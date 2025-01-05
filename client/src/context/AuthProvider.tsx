import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (newUser, collback) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    collback();
  };

  const logout = (collback) => {
    setUser(null);
    localStorage.removeItem("user");
    collback();
  };
  const value = {
    user,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
