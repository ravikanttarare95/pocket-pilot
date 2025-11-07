import React, { useContext } from "react";
import GreetingBar from "./../components/GreetingBar";
import { Wallet, AlertTriangle } from "lucide-react";
import Label from "./../components/Label.jsx";
import Input from "./../components/Input.jsx";
import Button from "./../components/Button";
import { BudgetsContext } from "./../context/BudgetsContext";
import Loader from "./../components/Loader.jsx";
import ErrorState from "./../components/ErrorState.jsx";
import { TransactionsContext } from "./../context/TransactionsContext.jsx";
import HeadingOne from "./../components/HeadingOne.jsx";
import ProfitImg from "./../assets/profit.png";

function Budgets() {
  const { budgets, setBudgets, loading, error, saveBudgets } =
    useContext(BudgetsContext);

  const { currMonthTotalIncome, currMonthTotalExpense } =
    useContext(TransactionsContext);

  const remaining = budgets - currMonthTotalExpense;
  const percent = budgets
    ? Math.min((currMonthTotalExpense / budgets) * 100, 100)
    : 0;

  const handleSave = () => saveBudgets(budgets);

  if (loading) return <Loader message="Loading budgets..." />;
  if (error) return <ErrorState error={error} />;

  const currentMonthYear = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200">
      <GreetingBar greetingBarTitle="Monthly Budget" />

      <main className="px-3 sm:px-6 lg:px-12 py-10">
        <HeadingOne title="Track Your Monthly Budget" />

        <section className="max-w-4xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 transition-transform hover:scale-[1.01] duration-300">
          <div className="hidden lg:flex items-center justify-center">
            <img
              src={ProfitImg}
              alt="Profit Illustration"
              className="rounded-xl w-[80%]"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-cyan-100 text-cyan-700 rounded-full">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-800">
                Budget ({currentMonthYear})
              </h3>
            </div>

            <div className="h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className={`h-3 transition-all duration-700 ${
                  currMonthTotalExpense > budgets
                    ? "bg-gradient-to-r from-rose-400 to-rose-600"
                    : "bg-gradient-to-r from-emerald-400 to-emerald-600"
                }`}
                style={{ width: `${percent}%` }}
              ></div>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row sm:justify-between text-sm text-slate-700 space-y-2 sm:space-y-0">
              <p>
                <span className="font-semibold text-slate-900">Spent:</span> ₹
                {currMonthTotalExpense.toLocaleString("en-IN")}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Budget:</span> ₹
                {budgets.toLocaleString("en-IN")}
              </p>
            </div>

            <p
              className={`mt-3 text-center font-medium ${
                remaining >= 0 ? "text-emerald-600" : "text-rose-600"
              }`}
            >
              {remaining >= 0 ? "Remaining" : "Overspent"} ₹
              {Math.abs(remaining).toLocaleString("en-IN")}
            </p>

            <div className="mt-6">
              <Label
                htmlFor="input-budget"
                labelTitle="Set Monthly Budget (₹)"
                customStyle="!text-sm"
              />
              <Input
                type="number"
                name="input-budget"
                id="input-budget"
                value={budgets}
                onInputChange={(e) => setBudgets(Number(e.target.value))}
                placeholder="Enter your total monthly budget"
              />
            </div>

            {currMonthTotalExpense > budgets && (
              <div className="mt-5 flex items-center justify-center gap-2 text-rose-600 text-sm font-medium bg-rose-50 border border-rose-200 p-2 rounded-md animate-pulse">
                <AlertTriangle size={16} />
                You’ve exceeded your monthly budget!
              </div>
            )}

            <Button
              btnTitle="Save Budget"
              btnVariant="primary"
              size="md"
              onBtnClick={handleSave}
              customStyle="!w-full !mt-6 sm:!mt-8"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default Budgets;
