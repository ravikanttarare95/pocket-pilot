import React from "react";
import GreetingBar from "./../components/GreetingBar";
import { Wallet, AlertTriangle } from "lucide-react";
import Button from "./../components/Button";

function Budgets() {
  return (
    <>
      <GreetingBar greetingBarTitle="Budgets" />
      <main className="px-1.5 py-6 sm:p-6">
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

export default Budgets;
