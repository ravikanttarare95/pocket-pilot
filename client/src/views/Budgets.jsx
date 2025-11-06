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

function Budgets() {
  const { budgets, setBudgets, loading, error, saveBudgets } =
    useContext(BudgetsContext);

  const { transactions, currMonthTotalIncome, currMonthTotalExpense } =
    useContext(TransactionsContext);

  const remaining = budgets - currMonthTotalExpense;
  const percent = budgets
    ? Math.min((currMonthTotalExpense / budgets) * 100, 100)
    : 0; ///

  const handleSave = () => saveBudgets(budgets);

  if (loading) return <Loader message="Loading budgets..." />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <GreetingBar greetingBarTitle="Monthly Budget" />

      <main className="px-2 py-8 sm:px-8 lg:px-12">
        <h2 className="text-3xl font-bold mb-8 text-slate-800 text-center">
          Track Your Monthly Budget
        </h2>

        <div className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 transition-transform hover:scale-[1.01] duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-cyan-100 text-cyan-700 rounded-full">
              <Wallet className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">
              Budget (
              {new Date().toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
              )
            </h3>
          </div>

          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-3 transition-all duration-700 ${
                currMonthTotalExpense > budgets
                  ? "bg-gradient-to-r from-rose-400 to-rose-600"
                  : "bg-gradient-to-r from-emerald-400 to-emerald-600"
              }`}
              style={{ width: `${percent}%` }}
            ></div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-slate-700">
            <p>
              <span className="font-semibold text-slate-900">Spent:</span> ₹
              {currMonthTotalExpense.toLocaleString()}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Budget:</span> ₹
              {budgets.toLocaleString()}
            </p>
          </div>

          <p
            className={`mt-3 text-center font-medium ${
              remaining >= 0 ? "text-emerald-500" : "text-red-600"
            }`}
          >
            {remaining >= 0 ? "Remaining" : "Overspent"} ₹
            {Math.abs(remaining).toLocaleString()}
          </p>

          <div className="mt-6">
            <Label
              htmlFor="input-budget"
              labelTitle="Set Monthly Budget (₹)"
              customStyle={"!text-sm"}
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
            <div className="mt-5 flex items-center justify-center gap-2 text-red-600 text-sm font-medium bg-red-50 border border-red-200 p-2 rounded-md">
              <AlertTriangle size={16} />
              You’ve exceeded your monthly budget!
            </div>
          )}

          {/* Save button */}
          <div className="mt-8 flex justify-center">
            <Button
              btnTitle="Save Budget"
              btnVariant="primary"
              size="lg"
              onBtnClick={handleSave}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Budgets;
