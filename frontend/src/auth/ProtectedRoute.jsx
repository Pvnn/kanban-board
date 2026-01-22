import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";

export const ProtectedRute = () => {
  const { loading, authenticated } = useContext(AuthContext);

  if (loading) {
    return;
  }
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
