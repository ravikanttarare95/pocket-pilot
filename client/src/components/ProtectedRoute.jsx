import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { getloggedInUser } from "./../utils";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const user = getloggedInUser();

  useEffect(() => {
    if (!user) return navigate("/login", { replace: true });
  }, []);
  return user ? children : null;
}

export default ProtectedRoute;
