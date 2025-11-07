import React from "react";

function AuthSuccess() {
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
