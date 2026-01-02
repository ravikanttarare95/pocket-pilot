import { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useAuth } from "./UserAuthContext";
import { API_URL } from "./../configs/axiosConfigs.js";
import { TransactionsContext } from "./TransactionsContext.jsx";

const BudgetsContext = createContext();

function BudgetsProvider({ children }) {
  const { accessToken } = useAuth();
  const [budgets, setBudgets] = useState(0);
  const [budgetLoading, setbudgetLoading] = useState(true);
  const [error, setError] = useState(null); ///////////
  const { currentDate } = useContext(TransactionsContext);

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");

  const currentMonthYear = `${year}-${month}`;

  const fetchBudgets = async () => {
    try {
      setbudgetLoading(true);
      const response = await API_URL.get(`/api/budgets/${currentMonthYear}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response?.data?.data?.budgets) {
        setBudgets(response.data.data.budgets);
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
      setbudgetLoading(false);
    }
  };

  const saveBudgets = async (newBudgets) => {
    try {
      const response = await API_URL.post(
        `/api/budgets`,
        { monthYear: currentMonthYear, budgets: newBudgets },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error saving budgets");
    }
  };

  useEffect(() => {
    if (!accessToken) return;
    fetchBudgets();
  }, [currentDate, accessToken]);

  return (
    <BudgetsContext.Provider
      value={{ budgets, setBudgets, saveBudgets, budgetLoading, error }}
    >
      {children}
    </BudgetsContext.Provider>
  );
}

export { BudgetsProvider, BudgetsContext };
