import React from "react";

function TransPagination() {
  return (
    <div className="relative flex justify-between items-center bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 pr-5 sm:pr-7 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between gap-4 w-full">
        {/* Left section */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="max-sm:hidden h-12 w-12 rounded-full bg-gray-200" />

          {/* Text */}
          <div className="space-y-2">
            <div className="h-3.5 sm:h-4 w-24 md:w-36 rounded bg-gray-200" />{" "}
            {/* Date */}
            <div className="h-5 sm:h-5 w-36 md:w-52 rounded bg-gray-200" />{" "}
            {/* Title */}
            <div className="h-3.5 sm:h-4 w-40 md:w-64 rounded bg-gray-200" />{" "}
            {/* Subtitle */}
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-end gap-3">
          <div className="text-right space-y-2">
            <div className="h-4 sm:h-5 w-20 md:w-24 rounded bg-gray-200" />{" "}
            {/* Amount */}
            <div className="h-3 sm:h-4 w-14 md:w-16 rounded bg-gray-200 ml-auto" />
            {/* Type */}
          </div>

          {/* Menu dots */}
        </div>
      </div>
      <div className="absolute right-3.5 top-2 h-6 w-1 rounded bg-gray-200" />
    </div>
  );
}

export default TransPagination;
