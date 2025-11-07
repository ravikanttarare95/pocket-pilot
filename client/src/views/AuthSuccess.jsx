import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";

function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const handleAuth = async () => {
    if (!token) return;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/me`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response?.data?.success) {
        localStorage.setItem("token", token);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response?.data?.user)
        );
        toast.success(response?.data?.message);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        `${error?.response?.data?.message}` || "Google Authentication failed"
      );
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  };

  useEffect(() => {
    handleAuth();
  }, [token]);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 text-gray-700">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="text-lg md:text-xl font-medium animate-pulse">
          Logging you in securely...
        </p>
      </div>
    </div>
  );
}

export default AuthSuccess;
