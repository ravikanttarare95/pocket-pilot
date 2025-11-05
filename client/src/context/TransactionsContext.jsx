import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const TransactionsContext = createContext();

function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      setTransactions(response.data.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyTransactions = transactions.filter((txn) => {
    const txnDate = new Date(txn.date);
    return (
      txnDate.getMonth() + 1 === currentMonth + 1 &&
      txnDate.getFullYear() === currentYear
    );
  });

  const currMonthTotalIncome = monthlyTransactions
    .filter((txn) => txn.type === "income")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  const currMonthTotalExpense = monthlyTransactions
    .filter((txn) => txn.type === "expense")
    .reduce((sum, currTxn) => sum + currTxn.amount, 0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        loading,
        error,
        fetchTransactions,
        currMonthTotalIncome,
        currMonthTotalExpense,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export { TransactionsProvider, TransactionsContext };
