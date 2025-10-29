import React from "react";
import DashboardTopBar from "./../components/DashboardTopBar";
import { TrendingUp, TrendingDown, Wallet, AlertTriangle } from "lucide-react";
import Button from "./../components/Button";

function Overview() {
  return (
    <>
      <DashboardTopBar dashTopBarTitle="Overview" />
      <main className="px-1.5 py-6 sm:p-6 ">
        <div className="flex items-center justify-between bg-slate-100 p-5 rounded-xl mb-8 shadow-sm">
          <div className="flex gap-10 items-center">
            <div>
              <h2 className="text-slate-600 font-semibold text-lg">
                Current Balance
              </h2>
              <p className="text-3xl font-bold text-slate-800 mt-1">
                ₹ 1,20,000
              </p>
            </div>
            <Wallet className="w-10 h-10 text-emerald-500" />
          </div>

          <article className="text-center flex flex-col items-center">
            <AlertTriangle className="w-10 h-10 text-cyan-500 mb-2" />
            <p className="text-2xl font-bold text-cyan-600">₹ 000000</p>
            <h3 className="text-slate-600 font-medium mt-1">Overspend</h3>
          </article>
        </div>

        {/* Income & Expenses */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <article className="bg-white rounded-xl shadow-md p-5 border-l-4 border-emerald-500 flex items-center justify-between">
            <div>
              <h2 className="text-slate-600 font-semibold text-lg mb-1">
                TOTAL INCOME
              </h2>
              <p className="text-2xl font-bold text-emerald-600">₹ 000000</p>
            </div>
            <TrendingUp className="w-10 h-10 text-emerald-500" />
          </article>

          <article className="bg-white rounded-xl shadow-md p-5 border-l-4 border-rose-500 flex items-center justify-between">
            <div>
              <h2 className="text-slate-600 font-semibold text-lg mb-1">
                TOTAL EXPENSES
              </h2>
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
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-600 text-sm uppercase">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Date</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Description</th>
                  <th className="py-3 px-4 text-right rounded-tr-lg">Amount</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr className="hover:bg-slate-50 transition">
                  <td className="py-3 px-4">Oct 28</td>
                  <td className="py-3 px-4">Food</td>
                  <td className="py-3 px-4">Zomato Order</td>
                  <td className="py-3 px-4 text-right font-semibold text-red-500">
                    -₹320
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Overview;
