import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BudgetsContext = createContext();
function BudgetsProvider({ children }) {
  const [budget, setBudget] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); ///////////

  const currentMonth = new Date().toISOString().slice(0, 7);

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/budgets/${currentMonth}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      if (response) {
        setBudget(response?.data?.data);
        console.log(response?.data);
      }
    } catch (error) {
      setError(err.response?.data?.message || "Error fetching budgets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  return (
    <BudgetsContext.Provider value={{}}>{children}</BudgetsContext.Provider>
  );
}

export { BudgetsContext, BudgetsContext };
