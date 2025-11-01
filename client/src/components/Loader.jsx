import React from "react";
import { Loader2 } from "lucide-react";

function Loader({ message = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
      <p className="text-slate-600 text-sm sm:text-base">{message}</p>
    </div>
  );
}

export default Loader;
