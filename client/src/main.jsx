import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./views/App.jsx";
import SignUp from "./views/SignUp.jsx";
import Login from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import NotFound from "./views/NotFound.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Overview from "./views/Overview.jsx";
import Transactions from "./views/Transactions.jsx";
import Charts from "./views/Charts.jsx";
import Budgets from "./views/Budgets.jsx";
import AddTrans from "./views/AddTrans.jsx";
import { TransactionsProvider } from "./context/TransactionsContext.jsx";
const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      {/* Nested Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <TransactionsProvider>
              <Dashboard />
            </TransactionsProvider>
          </ProtectedRoute>
        }
      >
        <Route index element={<Overview />} />
        <Route path="transactions" element={<Transactions />}>
          <Route path="add-trans" element={<AddTrans />} />
        </Route>
        <Route path="charts" element={<Charts />} />
        <Route path="budgets" element={<Budgets />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
    <Toaster position="top-center" />
  </BrowserRouter>
);
