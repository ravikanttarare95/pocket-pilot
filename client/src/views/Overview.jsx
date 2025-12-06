import React, { useState, useContext } from "react";
import DashboardTopBar from "./../components/GreetingBar";
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
  const navigate = useNavigate();
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

  const navigateToEdit = (id) => {
    navigate(`transactions/edit-trans/${id}`);
  };

  if (error)
    return (
      <>
        <DashboardTopBar greetingBarTitle="Overview" />
        <ErrorState error={error} />
      </>
    );

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
        <main className="bg-slate-50 px-2 sm:px-6 lg:px-10 py-6 min-h-screen">
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 mb-10">
            <article className="bg-gradient-to-r from-emerald-50 to-white shadow-md px-6 py-5 border border-slate-200 rounded-2xl w-full">
              <HeadingThree title={"Current Balance"} />
              <p className="font-extrabold text-slate-800 text-2xl sm:text-4xl">
                ₹{currentBalance.toLocaleString("en-IN")}
              </p>
            </article>

            <div className="flex flex-col justify-center items-center shadow-md p-4 border border-slate-200 rounded-2xl h-full min-h-[200px] overflow-hidden">
              <div className="w-32 sm:w-40 h-32 sm:h-40">
                <Doughnut data={chartData} options={chartOptions} />
              </div>
              <p className="mt-2 text-slate-500 text-xs">{currentMonthYear}</p>
            </div>

            <article className="bg-gradient-to-r from-rose-50 to-white shadow-md px-6 py-5 border border-slate-200 rounded-2xl w-full">
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

          <HeadingTwo title={"This Month’s Summary"} />

          <section className="gap-5 sm:gap-6 grid grid-cols-1 md:grid-cols-2 mb-10">
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

          <section className="gap-5 sm:gap-6 grid grid-cols-1 md:grid-cols-2 mb-10">
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

          <div className="flex justify-between items-center">
            <HeadingTwo title={"Recent Transactions"} />

            <Link
              to="/dashboard/transactions"
              className="font-medium text-cyan-600 hover:text-cyan-800 text-xs sm:text-sm transition-colors"
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
                  navigateEdit={(id) => navigateToEdit(id)}
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
