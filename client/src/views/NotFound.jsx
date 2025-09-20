import React from "react";
import { Link, useNavigate } from "react-router";
import Button from "./../components/Button";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 px-4">
      <h1 className="text-8xl font-extrabold text-rose-600 mb-6">404</h1>
      <h2 className="text-3xl font-semibold text-slate-800 mb-4">
        Oops! Page Not Found
      </h2>
      <p className="text-slate-600 mb-8 text-center max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Button
        btnTitle={"Go Back Home"}
        onBtnClick={() => {
          setTimeout(() => {
            navigate("/");
          }, 300);
        }}
      />
    </div>
  );
}

export default NotFound;
