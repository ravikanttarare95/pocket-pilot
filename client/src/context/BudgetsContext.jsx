import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BudgetsContext = createContext();
function BudgetsProvider({ children }) {
  const [budget, setBudget] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); ///////////

  //   const currentMonth = new Date().toISOString().slice(0, 7);

  return (
    <BudgetsContext.Provider value={{}}>{children}</BudgetsContext.Provider>
  );
}

export { BudgetsContext, BudgetsContext };
