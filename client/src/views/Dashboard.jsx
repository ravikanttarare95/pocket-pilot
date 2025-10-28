import React, { useEffect, useState } from "react";
import Button from "./../components/Button";
import BrandLogo from "./../components/BrandLogo.jsx";
import {
  HiMiniArrowLeftStartOnRectangle,
  HiMiniArrowRightStartOnRectangle,
} from "react-icons/hi2";
import Overview from "./Overview";
import Transactions from "./Transactions";
import Charts from "./Charts";
import Budgets from "./Budgets";
import NotFound from "./NotFound.jsx";
import { SIDEBAR_LINKS } from "./../configs/sidebarLinksData";

import { useNavigate, Link } from "react-router";
import Navbar from "./../components/Navbar.jsx";
import { getloggedInUser } from "./../utils.js";

function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(getloggedInUser || null);
  const [isClose, setIsClose] = useState(false);
  const [mainContent, setMainContent] = useState("overview");

  useEffect(() => {
    if (!user) return navigate("/login");
    if (window.innerWidth < 640) setIsClose(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <aside
          className={`${isClose ? "w-fit" : "w-64"} ${
            !isClose && "max-sm:fixed max-sm:left-0 max-sm:h-full"
          } bg-slate-900 text-white p-0.5 sm:p-3 transition-all duration-300 z-40`}
        >
          <div className="sticky top-3">
            <ul className="space-y-2">
              {SIDEBAR_LINKS.map((linkObj) => {
                const { title, icon: Icon } = linkObj;
                return (
                  <li
                    key={title}
                    className="hover:bg-gray-700 p-2 rounded cursor-pointer flex gap-2"
                    onClick={() => {
                      setMainContent(title);
                      if (window.innerWidth < 640) {
                        setIsClose(true);
                      }
                    }}
                  >
                    <Icon />
                    <span
                      className={`${isClose ? "hidden" : "block capitalize"}`}
                    >
                      {title}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div
              className="mt-30 flex justify-end mr-2 top-89 cursor-pointer"
              onClick={() => {
                setIsClose(!isClose);
              }}
            >
              {isClose ? (
                <HiMiniArrowRightStartOnRectangle size={30} />
              ) : (
                <HiMiniArrowLeftStartOnRectangle size={30} />
              )}
            </div>
          </div>
        </aside>
        <main className="flex-1 bg-gray-100">
          {mainContent === "overview" ? (
            <Overview />
          ) : mainContent === "transactions" ? (
            <Transactions />
          ) : mainContent === "charts" ? (
            <Charts />
          ) : mainContent === "budgets" ? (
            <Budgets />
          ) : (
            <NotFound />
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
