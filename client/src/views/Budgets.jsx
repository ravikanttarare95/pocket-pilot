import { useContext } from "react";
import GreetingBar from "./../components/dashboard/GreetingBar.jsx";
import { Wallet, AlertTriangle } from "lucide-react";
import Label from "./../components/authentication/Label.jsx";
import Input from "./../components/authentication/Input.jsx";
import Button from "./../components/Button";
import { BudgetsContext } from "./../context/BudgetsContext";
import Loader from "./../components/Loader.jsx";
import ErrorState from "./../components/ErrorState.jsx";
import { TransactionsContext } from "./../context/TransactionsContext.jsx";
import HeadingOne from "./../components/HeadingOne.jsx";
import ProfitImg from "./../assets/profit.png";
import ProgressBar from "./../components/dashboard/ProgressBar.jsx";

function Budgets() {
  const { budgets, setBudgets, budgetLoading, error, saveBudgets } =
    useContext(BudgetsContext);

  const { currMonthTotalIncome, currMonthTotalExpense, currentMonthYear } =
    useContext(TransactionsContext);

  const remaining = budgets - currMonthTotalExpense;

  const handleSave = () => saveBudgets(budgets);

  if (budgetLoading)
    return (
      <>
        <GreetingBar greetingBarTitle="Monthly Budget" />
        <Loader message="Loading budgets..." />
      </>
    );
  if (error)
    return (
      <>
        <GreetingBar greetingBarTitle="Monthly Budget" />
        <ErrorState error={error} />
      </>
    );

  return (
    <div className="bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 min-h-screen">
      <GreetingBar greetingBarTitle="Monthly Budget" />

      <main className="px-2 sm:px-6 lg:px-10 py-6">
        <HeadingOne title="Track Your Monthly Budget" />

        <section className="gap-8 grid grid-cols-1 lg:grid-cols-2 bg-white shadow-lg mx-auto mt-8 p-6 sm:p-8 border border-slate-200 rounded-2xl max-w-4xl hover:scale-[1.01] transition-transform duration-300">
          <div className="hidden lg:flex justify-center items-center">
            <img
              src={ProfitImg}
              alt="Profit Illustration"
              className="rounded-xl w-[80%]"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-cyan-100 p-3 rounded-full text-cyan-700">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-slate-800 text-lg sm:text-xl">
                Budget ({currentMonthYear})
              </h3>
            </div>
            <ProgressBar
              budgets={budgets}
              currMonthTotalExpense={currMonthTotalExpense}
            />
            <div className="flex sm:flex-row flex-col sm:justify-between space-y-2 sm:space-y-0 mt-5 text-slate-700 text-sm">
              <p>
                <span className="font-semibold text-slate-900">Spent:</span> ₹
                {currMonthTotalExpense.toLocaleString("en-IN")}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Budget:</span> ₹
                {budgets?.toLocaleString("en-IN")}
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
              <div className="flex justify-center items-center gap-2 bg-rose-50 mt-5 p-2 border border-rose-200 rounded-md font-medium text-rose-600 text-sm animate-pulse">
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
