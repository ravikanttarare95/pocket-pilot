import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "./../context/UserAuthContext.jsx";
import AuthLoading from "./authentication/AuthLoading.jsx";

function ProtectedRoute({ children }) {
  const { accessToken, authLoading } = useAuth();

  if (authLoading) return <AuthLoading loadingDesc={"Verifying session..."} />;

  if (!accessToken) return <Navigate to="/login" replace />;

  return accessToken ? children : null;
}

export default ProtectedRoute;
