import React from "react";
import DashboardTopBar from "./../components/DashboardTopBar";
import { TrendingUp, TrendingDown, Wallet, AlertTriangle } from "lucide-react";
import Button from "./../components/Button";

function Overview() {
  return (
    <>
      <DashboardTopBar dashTopBarTitle="Overview" />
      <main className="p-4 sm:p-6">
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

        {/* Budget & Overspend */}
        <section className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <article className="text-center flex flex-col items-center">
              <Wallet className="w-10 h-10 text-violet-500 mb-2" />
              <p className="text-2xl font-bold text-violet-600">₹ 000000</p>
              <h3 className="text-slate-600 font-medium mt-1">
                Monthly Budget
              </h3>
            </article>

            <article className="text-center flex flex-col items-center">
              <AlertTriangle className="w-10 h-10 text-cyan-500 mb-2" />
              <p className="text-2xl font-bold text-cyan-600">₹ 000000</p>
              <h3 className="text-slate-600 font-medium mt-1">Overspend</h3>
            </article>
          </div>

          <div className="flex justify-center">
            <Button btnTitle={"Edit Budget"} btnVariant={"primary"} size="sm" />
          </div>
        </section>
      </main>
    </>
  );
}

export default Overview;
