import React, { useEffect } from "react";
import { Navigate } from "react-router";
import { useAuth } from "./../context/UserAuthContext.jsx";

function ProtectedRoute({ children }) {
  const { accessToken, loading } = useAuth();

  if (loading) return <p>Checking session...</p>;

  if (!accessToken) return <Navigate to="/login" replace />;

  return accessToken ? children : null;
}

export default ProtectedRoute;
