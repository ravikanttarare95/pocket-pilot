import React from "react";
import { TRANS_CATEGORY_META } from "./../constants/transCategories.js";
function TransactionCard({ date, category, description, amount, type }) {
  const CategoryMeta = TRANS_CATEGORY_META[category];
  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-start bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-3 shadow-sm transition my-3">
          <div className="flex items-center justify-center gap-3">
            <div className="hidden sm:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-full text-2xl sm:text-3xl">
              {<CategoryMeta.icon />}
            </div>
            <div>
              <p className="text-slate-700 text-sm sm:text-base font-medium">
                {date}
              </p>
              <div className="text-slate-800 font-semibold capitalize tracking-wide mt-0.5">
                <div className={` flex gap-2 items-center text-slate-800`}>
                  <span className="sm:hidden">
                    {CategoryMeta && <CategoryMeta.icon />}
                  </span>
                  {CategoryMeta?.label}
                </div>
              </div>
              <p className="text-slate-600 text-sm sm:text-base mt-0.5">
                {description}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <div
              className={`text-lg font-semibold ${
                type === "income" ? "text-emerald-500" : "text-rose-500"
              }`}
            >
              <div className=" flex gap-1">
                <p>{type === "income" ? "+" : "-"}</p>
                <p>₹{amount}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransactionCard;
