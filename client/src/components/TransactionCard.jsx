import React from "react";
import { TRANS_CATEGORY_META } from "../constants/transCategories.js";

function TransactionCard({ date, category, description, amount, type }) {
  const CategoryMeta = TRANS_CATEGORY_META[category];

  return (
    <div className="space-y-4">
      <div
        className="
          flex justify-between items-center
          bg-white border border-slate-200 hover:border-slate-300
          rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200
        "
      >
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div
            className={`
              hidden sm:flex items-center justify-center
              min-w-12 min-h-12 rounded-full border text-2xl
              ${
                CategoryMeta
                  ? "bg-slate-50 text-slate-700"
                  : "bg-gray-100 text-gray-400"
              }
            `}
          >
            {CategoryMeta && <CategoryMeta.icon />}
          </div>

          {/* Text Info */}
          <div className="space-y-0.5">
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {new Date(date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>

            <div className="flex items-center gap-2 text-slate-800 font-semibold capitalize">
              <span className="sm:hidden text-lg">
                {CategoryMeta && <CategoryMeta.icon />}
              </span>
              <span>{CategoryMeta?.label || "Uncategorized"}</span>
            </div>

            <p className="text-sm text-slate-600 line-clamp-2">
              {description || "No description provided"}
            </p>
          </div>
        </div>

        {/* Right Section (Amount) */}
        <div
          className={`
            flex flex-col items-end text-right font-semibold
            ${type === "income" ? "text-emerald-500" : "text-rose-500"}
          `}
        >
          <div className="text-lg sm:text-xl ml-2 flex">
            <p>{type === "income" ? "+" : "-"}</p>
            <p>₹{amount}</p>
          </div>
          <span className="text-xs text-slate-400 capitalize">{type}</span>
        </div>
      </div>
    </div>
  );
}

export default TransactionCard;
