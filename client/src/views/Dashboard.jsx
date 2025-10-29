import React, { useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router";
import Navbar from "./../components/Navbar.jsx";
import { getloggedInUser } from "./../utils.js";
import Sidebar from "./../components/Sidebar.jsx";

function Dashboard() {
  const navigate = useNavigate();
  const [user, _] = useState(getloggedInUser() || null);

  useEffect(() => {
    if (!user) return navigate("/login");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
