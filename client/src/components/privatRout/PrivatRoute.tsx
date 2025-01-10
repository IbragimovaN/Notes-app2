import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { ReactNode } from "react";

interface PrivatRouteProps {
  children: ReactNode;
}
export const PrivatRoute = ({ children }: PrivatRouteProps) => {
  const auth = useAuth();

  if (auth.user === null) {
    return <Navigate to="/signIn" replace />;
  }

  return <>{children}</>;
};
