import React, { useContext } from "react";
import GreetingBar from "./../components/GreetingBar";
import { TransactionsContext } from "./../context/TransactionsContext";
import Loader from "./../components/Loader.jsx";
import ErrorState from "./../components/ErrorState.jsx";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { TRANS_CATEGORIES_SELECT } from "./../constants/transCategories.js";
import PieChart from "./../components/PieChart.jsx";
import HeadingOne from "./../components/HeadingOne.jsx";

ChartJS.register(ArcElement, Tooltip, Legend);

function Charts() {
  const { transactions, loading, error } = useContext(TransactionsContext);

  const incomeTransactions = transactions.filter(
    (txn) => txn.type === "income"
  );

  const expenseTransactions = transactions.filter(
    (txn) => txn.type === "expense"
  );

  const totalIncome = incomeTransactions.reduce(
    (sum, currTxn) => sum + currTxn.amount,
    0
  );

  const totalExpense = expenseTransactions.reduce(
    (sum, currTxn) => sum + currTxn.amount,
    0
  );

  const chartData = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Monthly Transactions",
        data: [totalIncome, totalExpense],
        backgroundColor: ["#10B981", "#F43F5E"],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 10,
      },
    ],
  };

  // === Group by category ===
  const groupByCategory = (txns) =>
    txns.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {}); // {} is initial value of acc

  const incomeCategories = TRANS_CATEGORIES_SELECT["income"].map(
    (cate) => cate.value
  );

  const expenseCategories = TRANS_CATEGORIES_SELECT["expense"].map(
    (cate) => cate.value
  );

  const incomeByCategory = groupByCategory(incomeTransactions);
  const expenseByCategory = groupByCategory(expenseTransactions);

  const incomeData = {
    labels: incomeCategories,
    datasets: [
      {
        label: "Income",
        data: incomeCategories.map((cat) => incomeByCategory[cat] || 0),
        backgroundColor: [
          "#10B981",
          "#3b82f6",
          "#facc15",
          "#ec4899",
          "#8b5cf6",
          "#f97316",
          "#64748b",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  const expenseData = {
    labels: expenseCategories,
    datasets: [
      {
        label: "Expense",
        data: expenseCategories.map((cat) => expenseByCategory[cat] || 0),
        backgroundColor: [
          "#ef4444",
          "#f97316",
          "#facc15",
          "#22d3ee",
          "#3b82f6",
          "#8b5cf6",
          "#ec4899",
          "#64748b",
        ],
        borderColor: "#ffffff",
        borderWidth: 1,
        hoverOffset: 10,
      },
    ],
  };

  /* ===== Error State ===== */
  if (error)
    return (
      <>
        <GreetingBar greetingBarTitle="Overview" />
        <ErrorState error={error} />
      </>
    );

  /* ===== Loading State ===== */

  if (loading && !error)
    return (
      <>
        <GreetingBar greetingBarTitle="Overview" />
        <Loader message="Fetching your transactions..." />
      </>
    );
  if (!loading && !error)
    return (
      <div className="min-h-screen bg-gray-50">
        <GreetingBar greetingBarTitle="Charts" />

        <main className="px-2 py-6 sm:px-6 lg:px-10">
          <HeadingOne title={"Charts Overview"} />

          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center items-center gap-8">
            <PieChart
              chart={<Pie data={chartData} />}
              chartHeading={"Income vs Expense"}
            />

            <PieChart
              chart={<Pie data={incomeData} />}
              chartHeading={"Income Distribution"}
            />
            <PieChart
              chart={<Pie data={expenseData} />}
              chartHeading={"Expense Breakdown"}
            />
          </div>
        </main>
      </div>
    );
}

export default Charts;
