import React from "react";
import DashboardTopBar from "./../components/DashboardTopBar";
import { TrendingUp, TrendingDown } from "lucide-react";
import Button from "./../components/Button";

function Overview() {
  return (
    <>
      <DashboardTopBar dashTopBarTitle="Overview" />
      <main className="px-1.5 py-6 sm:p-6 ">
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
      </main>
    </>
  );
}

export default Overview;
