import React, { useContext } from "react";
import DashboardTopBar from "./../components/GreetingBar";
import { TrendingUp, TrendingDown } from "lucide-react";
import TransactionCard from "./../components/TransactionCard";
import { Link } from "react-router";
// import { transactions } from "../utils";
import { TransactionsContext } from "./../context/TransactionsContext.jsx";

function Overview() {
  const { transactions, loading, error } = useContext(TransactionsContext);
  const recentTransactions = transactions.slice(0, 3);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <>
      <DashboardTopBar greetingBarTitle="Overview" />
      <main className="px-2 sm:px-6 py-6 bg-slate-50 min-h-screen">
        {/* ===== Current Balance & Overspend ===== */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl mb-8 shadow-md border border-slate-200">
          <article className="flex flex-col gap-1">
            <h2 className="text-slate-500 text-sm sm:text-base font-medium">
              Current Balance
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-slate-800">
              ₹ 1,20,000
            </p>
          </article>

          <article className="flex flex-col sm:items-end sm:text-right">
            <h2 className="text-slate-500 text-sm sm:text-base font-medium">
              Overspend
            </h2>
            <p className="text-xl sm:text-3xl font-bold text-rose-600">
              ₹ 12,500
            </p>
          </article>
        </div>

        {/* ===== Income & Expense Summary ===== */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-10">
          <article className="bg-gradient-to-r from-emerald-50 to-white rounded-xl shadow-sm p-4 sm:p-5 border-l-4 border-emerald-500 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
            <div>
              <h2 className="text-slate-600 text-sm sm:text-base font-medium mb-1">
                Total Income
              </h2>
              <p className="text-xl sm:text-3xl font-bold text-emerald-600">
                ₹ 00,000
              </p>
            </div>
            <div className="bg-emerald-100 p-2 sm:p-3 rounded-full">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
            </div>
          </article>

          <article className="bg-gradient-to-r from-rose-50 to-white rounded-xl shadow-sm p-4 sm:p-5 border-l-4 border-rose-500 flex items-center justify-between hover:shadow-md transition-shadow duration-200">
            <div>
              <h2 className="text-slate-600 text-sm sm:text-base font-medium mb-1">
                Total Expense
              </h2>
              <p className="text-xl sm:text-3xl font-bold text-rose-600">
                ₹ 00,000
              </p>
            </div>
            <div className="bg-rose-100 p-2 sm:p-3 rounded-full">
              <TrendingDown className="w-6 h-6 sm:w-8 sm:h-8 text-rose-600" />
            </div>
          </article>
        </section>

        {/* ===== Recent Transactions ===== */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-lg sm:text-2xl font-semibold text-slate-800 tracking-tight">
            Recent Transactions
          </h3>
          <Link
            to="/dashboard/transactions"
            className="text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            View All →
          </Link>
        </div>

        {recentTransactions && recentTransactions.length > 0 ? (
          <div className="space-y-3 sm:space-y-4">
            {recentTransactions.map((txn, index) => (
              <TransactionCard
                key={index}
                date={txn.date}
                category={txn.category}
                description={txn.description}
                amount={txn.amount}
                type={txn.type}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 py-6 text-sm sm:text-base">
            No transactions yet 🪶
          </p>
        )}
      </main>
    </>
  );
}

export default Overview;
