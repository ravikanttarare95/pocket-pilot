import React, { useEffect, useState } from "react";
import Button from "./../components/Button";
import { House } from "lucide-react";
import {
  HiMiniArrowLeftStartOnRectangle,
  HiMiniArrowRightStartOnRectangle,
} from "react-icons/hi2";
import Overview from "./Overview";
import Transactions from "./Transactions";
import Charts from "./Charts";
import { SIDEBAR_LINKS } from "./../configs/sidebarLinksData";

import { useNavigate } from "react-router";

function Dashboard() {
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(false);
  const [mainContent, setMainContent] = useState("overview");
  useEffect(() => {
    if (window.innerWidth < 640) setIsClose(true);
  }, []);
  return (
    <div className="flex min-h-screen">
      <aside
        className={`relative ${
          isClose ? "w-fit" : "w-64 max-sm:fixed left-0 top-0 bottom-0"
        } bg-slate-900 text-white p-1 sm:p-3 transition-width duration-300 z-49`}
      >
        <div className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer">
          {isClose ? (
            <HiMiniArrowRightStartOnRectangle
              size={30}
              onClick={() => {
                setIsClose(false);
              }}
            />
          ) : (
            <HiMiniArrowLeftStartOnRectangle
              size={30}
              onClick={() => {
                setIsClose(true);
              }}
            />
          )}
        </div>
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
                <span className={`${isClose ? "hidden" : "block capitalize"}`}>
                  {title}
                </span>
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="flex-1 bg-gray-100">
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
