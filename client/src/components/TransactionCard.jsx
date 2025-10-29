import React from "react";

function TransactionCard({ transactions = [] }) {
  return (
    <>
      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((txn, index) => (
            <div
              key={index}
              className="flex justify-between items-start bg-white border border-slate-200 hover:border-slate-300 rounded-lg p-4 shadow-sm transition"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="hidden sm:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 rounded-full text-2xl sm:text-3xl">
                  {txn?.category === "food"
                    ? "🍔"
                    : txn?.category === "entertainment"
                    ? "🎬"
                    : txn?.category === "transport"
                    ? "🚗"
                    : txn?.category === "shopping"
                    ? "🛍️"
                    : txn?.category === "salary"
                    ? "💰"
                    : txn?.category === "health"
                    ? "💊"
                    : txn?.category === "education"
                    ? "📚"
                    : "💡"}
                </div>
                <div>
                  <p className="text-slate-700 text-xs sm:text-sm font-medium">
                    {txn.date}
                  </p>
                  <p className="text-slate-800 font-semibold uppercase tracking-wide text-sm mt-0.5">
                    {txn.category}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
                    {txn.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <p
                  className={`text-lg font-semibold ${
                    txn.type === "income" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  <div className=" flex gap-1">
                    <p>{txn.type === "income" ? "+" : "-"}</p>
                    <p>₹{txn.amount}</p>
                  </div>
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-slate-500 py-4">No transactions yet</p>
      )}
    </>
  );
}

export default TransactionCard;
