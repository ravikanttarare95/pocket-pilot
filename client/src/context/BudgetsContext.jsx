import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "./UserAuthContext";
import { API_URL } from "./../configs/axiosConfigs.js";

const BudgetsContext = createContext();

function BudgetsProvider({ children }) {
  const { accessToken } = useAuth();
  const [budgets, setBudgets] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); ///////////

  const currentMonth = new Date().toISOString().slice(0, 7);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await API_URL.get(`/api/budgets/${currentMonth}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response) {
        setBudgets(response?.data?.budgets);
      } else {
        setBudgets(0);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        ///
        setBudgets(0);
      } else {
        setError(error.response?.data?.message || "Error fetching budgets");
      }
    } finally {
      setLoading(false);
    }
  };

  const saveBudgets = async (newBudgets) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/budgets`,
        { month: currentMonth, budgets: newBudgets },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response) {
        setBudgets(response?.data?.data?.budgets);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error saving budgets");
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <BudgetsContext.Provider
      value={{ budgets, setBudgets, saveBudgets, loading, error }}
    >
      {children}
    </BudgetsContext.Provider>
  );
}

export { BudgetsProvider, BudgetsContext };
