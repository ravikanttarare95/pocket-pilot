import React, { useState, useContext } from "react";
import DashboardTopBar from "./../components/GreetingBar";
import { TrendingUp, TrendingDown } from "lucide-react";
import TransactionCard from "./../components/TransactionCard";
import { Link } from "react-router";
import { TransactionsContext } from "./../context/TransactionsContext.jsx";
import Loader from "./../components/Loader.jsx";
import ErrorState from "./../components/ErrorState.jsx";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function Overview() {
  const [budget, setBudget] = useState("5000");
  const { transactions, loading, error } = useContext(TransactionsContext);
  const recentTransactions = transactions.slice(0, 3);

  const totalIncome = transactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  const totalExpense = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyTransactions = transactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return (
      txnDate.getMonth() === currentMonth &&
      txnDate.getFullYear() === currentYear
    );
  });

  const currMonthTotalIncome = monthlyTransactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  const currMonthTotalExpense = monthlyTransactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Monthly Transactions",
        data: [currMonthTotalIncome, currMonthTotalExpense],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 1,
      },
    ],
  };

  /* ===== Error State ===== */

  if (error)
    return (
      <>
        <DashboardTopBar greetingBarTitle="Overview" />
        <ErrorState error={error} />
      </>
    );

  /* ===== Loading State ===== */

  if (loading && !error)
    return (
      <>
        <DashboardTopBar greetingBarTitle="Overview" />
        <Loader message="Fetching your transactions..." />
      </>
    );

  if (!loading && !error)
    return (
      <>
        <DashboardTopBar greetingBarTitle="Overview" />
        <main className="px-2 sm:px-6 py-6 bg-slate-50 min-h-screen">
          {/* ===== Current Balance & Overspend ===== */}
          <div className="flex flex-wrap items-center justify-center sm:justify-between gap-4 bg-white p-4 sm:p-6 rounded-2xl mb-8 shadow-md border border-slate-200">
            <article className="flex flex-col gap-1">
              <h2 className="text-slate-500 text-sm sm:text-base font-medium">
                Current Balance
              </h2>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-800">
                ₹{currentBalance.toLocaleString("en-IN")}
              </p>
            </article>

            <div className="flex flex-col justify-center items-center w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48">
              <Doughnut
                data={chartData}
                options={{
                  plugins: {
                    legend: {
                      display: true,
                      position: "top",
                      labels: {
                        color: "#334155",
                        font: { size: 13, weight: "500" },
                        boxWidth: 12,
                      },
                    },
                    tooltip: { enabled: true },
                  },
                  cutout: "70%",
                  responsive: true,
                  maintainAspectRatio: false,
                }}
              />
              <p className="text-xs text-slate-500 mt-1">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <article className="flex flex-col sm:items-end sm:text-right">
              <h2 className="text-slate-500 text-sm sm:text-base font-medium">
                Overspend
              </h2>
              <p className="text-xl sm:text-3xl font-bold text-rose-600">
                ₹
                {currMonthTotalExpense > budget
                  ? currMonthTotalExpense - budget
                  : 0}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {currentDate.toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
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
                  ₹{totalIncome.toLocaleString("en-IN")}
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
                  ₹{totalExpense.toLocaleString("en-IN")}
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
