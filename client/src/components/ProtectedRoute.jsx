import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "./../context/UserAuthContext.jsx";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { accessToken, loading } = useAuth();

  if (loading) return <p>Checking session...</p>;

  useEffect(() => {
    if (!accessToken) return navigate("/login", { replace: true });
  }, []);
  return accessToken ? children : null;
}

export default ProtectedRoute;
