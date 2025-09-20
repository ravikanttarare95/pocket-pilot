import React, { useState } from "react";
import Button from "../components/Button";
import { House, LayoutDashboard, HandCoins, ChartPie } from "lucide-react";
import Overview from "./Overview";
import Transactions from "./Transactions";
import Charts from "./Charts";

import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const [mainContent, setMainContent] = useState("overview");
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-3">
        <Button
          btnTitle={<House />}
          size="sm"
          customStyle="px-2! py-2 rounded-full!"
          onBtnClick={() => {
            setTimeout(() => {
              navigate("/");
            }, 300);
          }}
        />

        <ul className="space-y-2 mt-5">
          <li
            className="hover:bg-gray-700 p-2 rounded cursor-pointer flex gap-2"
            onClick={() => {
              setMainContent("overview");
            }}
          >
            <LayoutDashboard />
            Overview
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded cursor-pointer flex gap-2"
            onClick={() => {
              setMainContent("transactions");
            }}
          >
            <HandCoins />
            Transactions
          </li>
          <li
            className="hover:bg-gray-700 p-2 rounded cursor-pointer flex gap-2"
            onClick={() => {
              setMainContent("Charts");
            }}
          >
            <ChartPie />
            Charts
          </li>
        </ul>
      </aside>
      <main className="flex-1 bg-gray-100 p-8">
        {mainContent === "overview" ? (
          <Overview />
        ) : mainContent === "transactions" ? (
          <Transactions />
        ) : (
          <Charts />
        )}
      </main>
    </div>
  );
}

export default Dashboard;
