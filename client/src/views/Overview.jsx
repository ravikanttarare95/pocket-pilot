import React from "react";
import DashboardTopBar from "../components/GreetingBar";
import { TrendingUp, TrendingDown } from "lucide-react";
import TransactionCard from "./../components/TransactionCard";
import { Link } from "react-router";

const transactions = [
  {
    date: "29-10-2025  9:57:55",
    category: "salary",
    description:
      "Job Salary sdkb aashdkba sdbkba kabdkb bkbqwdh sdkjb sdjnbsd kjjnsdd ",
    amount: 751,
    type: "income",
  },
  {
    date: "28-10-2025  17:30:00",
    category: "education",
    description: "Dinner with friends",
    amount: 420,
    type: "expense",
  },
  {
    date: "28-10-2025  17:30:00",
    category: "food",
    description: "Dinner with friends",
    amount: 420,
    type: "income",
  },
  {
    date: "28-10-2025  17:30:00",
    category: "shopping",
    description: "Dinner with friends",
    amount: 420,
    type: "expense",
  },
];
function Overview() {
  return (
    <>
      <DashboardTopBar greetingBarTitle="Overview" />
      <main className="px-1.5 py-6 sm:p-6 ">
        <div className="flex items-center flex-wrap justify-between bg-slate-100 p-5 rounded-xl mb-8 shadow-sm">
          <article className="items-center justify-between">
            <h2 className="text-slate-600 text-lg">Current Balance</h2>
            <p className="text-3xl font-bold text-slate-800 mt-1">₹ 1,20,000</p>
          </article>

          <article className="text-center flex flex-col items-center">
            <h2 className="text-slate-600 text-lg">Overspend</h2>
            <p className="text-2xl font-bold text-rose-600">₹ 12,500</p>
          </article>
        </div>

        {/* Income & Expenses */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <article className="bg-white rounded-xl shadow-md p-5 border-l-4 border-emerald-500 flex items-center justify-between">
            <div>
              <h2 className="text-slate-600 text-lg mb-1">Total Income</h2>
              <p className="text-2xl font-bold text-emerald-600">₹ 000000</p>
            </div>
            <TrendingUp className="w-10 h-10 text-emerald-500" />
          </article>

          <article className="bg-white rounded-xl shadow-md p-5 border-l-4 border-rose-500 flex items-center justify-between">
            <div>
              <h2 className="text-slate-600 text-lg mb-1">Total Expense</h2>
              <p className="text-2xl font-bold text-rose-600">₹ 000000</p>
            </div>
            <TrendingDown className="w-10 h-10 text-rose-500" />
          </article>
        </section>
        <div className="bg-white rounded-2xl shadow-2xl p-6 mt-6 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-700">
              Recent Transactions
            </h3>
            <Link
              to={"/dashboard/transactions"}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 transition"
            >
              View All
            </Link>
          </div>
          <TransactionCard transactions={transactions} />
        </div>
      </main>
    </>
  );
}

export default Overview;
export { transactions };
