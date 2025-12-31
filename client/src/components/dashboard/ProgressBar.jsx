import React from "react";

function ProgressBar({ budgets, currMonthTotalExpense }) {
  const percent = budgets
    ? Math.min((currMonthTotalExpense / budgets) * 100, 100)
    : 0;
  return (
    <div className="bg-gray-200 shadow-inner rounded-full h-2 overflow-hidden">
      <div
        className={`h-full transition-all duration-700 ${
          currMonthTotalExpense > budgets
            ? "bg-gradient-to-r from-rose-400 to-rose-600"
            : "bg-gradient-to-r from-emerald-400 to-emerald-600"
        }`}
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}

export default ProgressBar;
