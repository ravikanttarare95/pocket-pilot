import React, { useContext } from "react";
import GreetingBar from "./../components/GreetingBar";
import TransactionCard from "./../components/TransactionCard";
import Button from "./../components/Button";
import { Plus } from "lucide-react";
import { useNavigate, Outlet } from "react-router";
import { TransactionsContext } from "../context/TransactionsContext";
import Loader from "./../components/Loader.jsx";
import ErrorState from "./../components/ErrorState.jsx";

function Transactions() {
  const navigate = useNavigate();
  const { transactions, loading, error } = useContext(TransactionsContext);

  return (
    <>
      <GreetingBar greetingBarTitle="Transactions" />
      <main className="relative px-1.5 py-6 sm:p-6 min-h-screen">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">
            All Transactions
          </h1>
        </div>
        <section className="space-y-3 sm:space-y-4 pb-10">
          {error && <ErrorState error={error} />}

          {/* ===== Loading State ===== */}
          {loading && !error && (
            <Loader message="Fetching your transactions..." />
          )}

          {!loading && !error && (
            <>
              {transactions &&
                transactions.map((txn, index) => {
                  const { date, category, description, amount, type } = txn;
                  return (
                    <div key={index}>
                      <TransactionCard
                        date={date}
                        category={category}
                        description={description}
                        amount={amount}
                        type={type}
                      />
                    </div>
                  );
                })}
            </>
          )}
        </section>
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6">
          <Button
            btnTitle={
              <span className="flex items-center gap-2">
                <span className="hidden sm:inline">Add Transactions</span>
                <Plus size={30} />
              </span>
            }
            btnVariant="primary"
            customStyle={"max-sm:!px-2.5"}
            onBtnClick={() => {
              navigate("add-trans");
            }}
          />
        </div>

        <Outlet />
      </main>
    </>
  );
}

export default Transactions;
