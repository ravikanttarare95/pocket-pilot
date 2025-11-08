import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

function FinanceCard({ title, amount, type }) {
  const isIncome = type === "income";
  return (
    <article
      className={`${
        isIncome
          ? "bg-gradient-to-r from-emerald-50 to-white border-l-4 border-emerald-500"
          : "bg-gradient-to-r from-rose-50 to-white border-l-4 border-rose-500"
      }  rounded-xl shadow-sm p-4 sm:p-5  flex items-center justify-between hover:shadow-md transition-shadow duration-200`}
    >
      <div>
        <h2 className="text-slate-600 text-sm sm:text-base font-medium mb-1">
          {title}
        </h2>
        <p
          className={`text-xl sm:text-3xl font-bold 4 ${
            isIncome ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          ₹{amount.toLocaleString("en-IN")}
        </p>
      </div>
      <div
        className={`${
          isIncome
            ? "bg-emerald-100 text-emerald-600"
            : "bg-rose-100 text-rose-600"
        }  p-2 sm:p-3 rounded-full`}
      >
        {isIncome ? (
          <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 " />
        ) : (
          <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 " />
        )}
      </div>
    </article>
  );
}

export default FinanceCard;
