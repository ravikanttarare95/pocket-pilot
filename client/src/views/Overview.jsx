import React from "react";
import DashboardTopBar from "../components/GreetingBar";
import { TrendingUp, TrendingDown } from "lucide-react";
import Button from "./../components/Button";

function Overview() {
  return (
    <>
      <DashboardTopBar greetingBarTitle="Overview" />
      <main className="px-1.5 py-6 sm:p-6 ">
        <div className="flex items-center justify-between bg-slate-100 p-5 rounded-xl mb-8 shadow-sm">
          <div className="flex gap-10 items-center">
            <div>
              <h2 className="text-slate-600 text-lg">Current Balance</h2>
              <p className="text-3xl font-bold text-slate-800 mt-1">
                ₹ 1,20,000
              </p>
            </div>
          </div>

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
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800 transition">
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="space-y-3">
              {/* Transaction Header */}
              <div className="hidden sm:grid sm:grid-cols-4 text-slate-500 text-sm font-medium uppercase bg-slate-100 rounded-lg p-3">
                <span>Date</span>
                <span>Category</span>
                <span>Description</span>
                <span className="text-right">Amount</span>
              </div>

              {/* Transaction Item */}
              <div className="flex flex-col sm:grid sm:grid-cols-4 sm:items-center bg-slate-50 hover:bg-slate-100 transition rounded-lg p-4">
                <span className="text-slate-700 font-medium">Oct 28</span>
                <span className="text-slate-700">Food</span>
                <span className="text-slate-600">Zomato Order</span>
                <span className="text-right font-semibold text-rose-600">
                  -₹320
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Overview;
