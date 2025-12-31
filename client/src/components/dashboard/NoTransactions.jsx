import React from "react";
import { Wallet } from "lucide-react";

function NoTransactions() {
  return (
    <div className="flex flex-col items-center justify-center h-40 text-center ">
      <div className="flex items-center justify-center w-16 h-16 bg-rose-100 text-slate-400 rounded-full mb-4">
        <Wallet size={38} strokeWidth={1.5} className="text-rose-500" />
      </div>

      <p className="text-slate-600 text-base sm:text-xl font-medium">
        No transactions found
      </p>
      <span className="text-slate-400 text-sm sm:text-base mt-2">
        Start by adding your first income or expense
      </span>
    </div>
  );
}

export default NoTransactions;
