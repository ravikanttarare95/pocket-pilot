import React, { useState } from "react";
import { Link } from "react-router";

import {
  HiMiniArrowLeftStartOnRectangle,
  HiMiniArrowRightStartOnRectangle,
} from "react-icons/hi2";
import { SIDEBAR_LINKS } from "./../configs/sidebarLinksData.js";

function Sidebar() {
  const [isClose, setIsClose] = useState(false);
  return (
    <aside
      className={`${isClose ? "w-fit" : "w-64"} ${
        !isClose && "max-sm:fixed max-sm:left-0 max-sm:h-full"
      } bg-gradient-to-br from-slate-900 to-slate-800 text-white p-0.5 sm:p-3 transition-all duration-300 z-40`}
    >
      <div className="sticky top-3">
        <ul className="space-y-2">
          {SIDEBAR_LINKS.map((linkObj) => {
            const { title, icon: Icon, path } = linkObj;
            return (
              <li key={title}>
                <Link
                  to={path}
                  className="hover:bg-gray-700 p-2 rounded cursor-pointer flex gap-2"
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
