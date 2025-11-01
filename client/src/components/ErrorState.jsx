import React from "react";
import { AlertTriangle } from "lucide-react";

function ErrorState({ error }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="bg-rose-100 p-4 rounded-full mb-4">
        <AlertTriangle className="text-rose-600 w-10 h-10" />
      </div>
      <h2 className="text-lg sm:text-xl font-semibold text-rose-700 mb-1">
        Something went wrong
      </h2>
      <p className="text-slate-600 text-sm sm:text-base max-w-md text-center">
        {error || "An unexpected error occurred while fetching data."}
      </p>
    </div>
  );
}

export default ErrorState;
