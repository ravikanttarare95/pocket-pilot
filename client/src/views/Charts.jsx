import React, { useContext } from "react";
import GreetingBar from "./../components/GreetingBar";
import { TransactionsContext } from "./../context/TransactionsContext";
import Loader from "./../components/Loader.jsx";
import ErrorState from "./../components/ErrorState.jsx";

function Charts() {
  const { transactions, loading, error } = useContext(TransactionsContext);
  const totalIncome = transactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  const totalExpense = transactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  /* ===== Error State ===== */
  if (error)
    return (
      <>
        <GreetingBar greetingBarTitle="Overview" />
        <ErrorState error={error} />
      </>
    );

  /* ===== Loading State ===== */

  if (loading && !error)
    return (
      <>
        <GreetingBar greetingBarTitle="Overview" />
        <Loader message="Fetching your transactions..." />
      </>
    );
  if (!loading && !error)
    return (
      <div className="">
        <GreetingBar greetingBarTitle="Charts" />
        <main className="px-1.5 py-6 sm:p-6">Charts</main>
      </div>
    );
}

export default Charts;
