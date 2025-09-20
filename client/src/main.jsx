import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./views/App.jsx";
import SignUp from "./views/SignUp.jsx";
import Login from "./views/Login.jsx";
import Dashboard from "./views/Dashboard.jsx";
import NotFound from "./views/NotFound.jsx";
import { BrowserRouter, Routes, Route } from "react-router";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/:id" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
