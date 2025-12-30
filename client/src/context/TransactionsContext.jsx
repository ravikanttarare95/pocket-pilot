import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "./UserAuthContext";
import { API_URL } from "./../configs/axiosConfigs.js";

const TransactionsContext = createContext();

function TransactionsProvider({ children }) {
  const { accessToken } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await API_URL.get(`/api/transactions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const sortedTrans = response.data.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setTransactions(sortedTrans);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const handleNextMonth = () => {
    const next = new Date(currentDate);
    next.setMonth(next.getMonth() + 1);
    setCurrentDate(next);
  };

  const handlePreviousMonth = () => {
    const prev = new Date(currentDate);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentDate(prev);
  };

  const currentMonthYear = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

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

  const deleteTransaction = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#10B981",
      cancelButtonColor: "#F43F5E",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await API_URL.delete(`/api/transactions/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response) {
        Swal.fire({
          title: "Deleted!",
          text: "Transaction deleted successfully",
          icon: "success",
        });
        await fetchTransactions();
      }
    } catch (error) {
      console.log(error?.response);
      Swal.fire({
        title: "Deleted!",
        text: "Failed to delete transaction",
        icon: "error",
      });
    }
  };

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
        deleteTransaction,
        currentMonthYear,
        handlePreviousMonth,
        handleNextMonth,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export { TransactionsProvider, TransactionsContext };
