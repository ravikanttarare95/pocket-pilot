import React, { useState, useContext } from "react";
import DashboardTopBar from "./../components/GreetingBar";
import { TrendingUp, TrendingDown } from "lucide-react";
import TransactionCard from "./../components/TransactionCard";
import { Link, useNavigate } from "react-router";
import { TransactionsContext } from "./../context/TransactionsContext.jsx";
import Loader from "./../components/Loader.jsx";
import ErrorState from "./../components/ErrorState.jsx";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { BudgetsContext } from "./../context/BudgetsContext.jsx";
import NoTransactions from "./../components/NoTransactions.jsx";
import FinanceCard from "./../components/FinanceCard.jsx";
import HeadingTwo from "./../components/HeadingTwo.jsx";
import HeadingThree from "./../components/HeadingThree.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

function Overview() {
  const currentMonthYear = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  const { budgets } = useContext(BudgetsContext);
  const {
    transactions,
    loading,
    error,
    currMonthTotalIncome,
    currMonthTotalExpense,
    deleteTransaction,
  } = useContext(TransactionsContext);
  const recentTransactions = transactions.slice(0, 3);

  const totalIncome = transactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  const totalExpense = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Monthly Transactions",
        data: [currMonthTotalIncome, currMonthTotalExpense],
        backgroundColor: ["#10B981", "#F43F5E"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
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
        <main className="px-2 py-6 sm:px-6 lg:px-10 bg-slate-50 min-h-screen">
          {/* ===== Current Balance & Overspend ===== */}

          <div className="flex flex-col max-sm:items-center md:flex-row md:justify-between gap-8 mb-8">
            <div className="flex w-full flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-emerald-50 to-white px-6 py-5 rounded-2xl  shadow-md border border-slate-200">
              <article className="flex flex-col gap-1">
                <HeadingThree title={"Current Balance"} />

                <p className="text-2xl sm:text-4xl font-extrabold text-slate-800">
                  ₹{currentBalance.toLocaleString("en-IN")}
                </p>
              </article>

              <article className="flex flex-col ">
                <HeadingThree title={`Overspend (${currentMonthYear})`} />

                <p
                  className={`text-xl sm:text-3xl font-bold ${
                    currMonthTotalExpense > budgets
                      ? "text-rose-600"
                      : "text-slate-500"
                  }`}
                >
                  ₹
                  {currMonthTotalExpense > budgets
                    ? (currMonthTotalExpense - budgets).toLocaleString()
                    : 0}
                </p>
              </article>
            </div>
            <div className="flex flex-col justify-center items-center shadow-md border border-slate-200 p-4 rounded-2xl w-60 h-60 md:w-50 md:h-50 px-10">
              <Doughnut data={chartData} options={chartOptions} />

              <p className="text-xs text-slate-500 mt-1">{currentMonthYear}</p>
            </div>
          </div>
          {/* ===== Income & Expense Summary ===== */}

          <HeadingTwo title={"This Month’s Summary"} />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
            <FinanceCard
              title={`Income (${currentMonthYear})`}
              amount={currMonthTotalIncome}
              type={"income"}
            />
            <FinanceCard
              title={`Expense (${currentMonthYear})`}
              amount={currMonthTotalExpense}
              type={"expense"}
            />
          </section>

          <HeadingTwo title={"Overall Summary"} />

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-10">
            <FinanceCard
              title={`Total Income`}
              amount={totalIncome}
              type={"income"}
            />
            <FinanceCard
              title={` Total Expense`}
              amount={totalExpense}
              type={"expense"}
            />
          </section>

          {/* ===== Recent Transactions ===== */}
          <div className="flex items-center justify-between">
            <HeadingTwo title={"Recent Transactions"} />

            <Link
              to="/dashboard/transactions"
              className="text-xs sm:text-sm font-medium text-cyan-600 hover:text-cyan-800 transition-colors"
            >
              View All →
            </Link>
          </div>
          {recentTransactions && recentTransactions.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {recentTransactions.map((txn, index) => (
                <TransactionCard
                  key={txn._id}
                  id={txn._id}
                  date={txn.date}
                  category={txn.category}
                  description={txn.description}
                  amount={txn.amount}
                  type={txn.type}
                  handleDelete={() => {
                    deleteTransaction(txn._id);
                  }}
                />
              ))}
            </div>
          ) : (
            <NoTransactions />
          )}
        </main>
      </>
    );
}

export default Overview;
