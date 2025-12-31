import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";

import {
  HiMiniArrowLeftStartOnRectangle,
  HiMiniArrowRightStartOnRectangle,
} from "react-icons/hi2";
import { SIDEBAR_LINKS } from "../../configs/sidebarLinksData.js";

function Sidebar() {
  const [isClose, setIsClose] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (window.innerWidth < 640) setIsClose(true);
  }, []);
  return (
    <aside
      className={`${isClose ? "min-w-11.5 sm:min-w-16" : " w-49"} ${
        !isClose && "max-sm:fixed max-sm:left-0 max-sm:h-full"
      } bg-slate-800 text-white p-0.5 sm:p-3 transition-all duration-300 z-45`}
    >
      <div className="fixed top-24">
        <ul className="space-y-3">
          {SIDEBAR_LINKS.map((linkObj) => {
            const { title, icon: Icon, path } = linkObj;

            const isActive =
              location.pathname === path ||
              (path !== "/dashboard" && location.pathname.startsWith(path));

            return (
              <li key={title}>
                <Link
                  to={path}
                  className={`${
                    isActive && "!bg-gray-700 border border-white/30"
                  } ${
                    isClose ? "" : " w-43"
                  }  bg-gray-950  p-2 rounded cursor-pointer flex gap-2 border border-white/20`}
                  onClick={() => {
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
                </Link>
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
  );
}

export default Sidebar;
