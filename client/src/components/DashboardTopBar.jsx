import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";

function DashboardTopBar({ dashTopBarTitle }) {
  const [showLogOut, setShowLogOut] = useState(false);
  return (
    <div className="flex items-center justify-between sticky top-0 right-0 left-0 px-2 sm:px-5 py-2 bg-slate-800 text-slate-50">
      <p className="text-2xl font-bold">{dashTopBarTitle}</p>
      <EllipsisVertical
        className="cursor-pointer -mr-2"
        onClick={() => {
          setShowLogOut(!showLogOut);
        }}
      />
      <div
        className={`${
          showLogOut ? "block" : "hidden"
        } fixed right-3 sm:right-6 top-30 py-1 px-3 border rounded-md text-rose-700 cursor-pointer bg-rose-200 border-rose-700 font-bold`}
      >
        Logout
      </div>
    </div>
  );
}

export default DashboardTopBar;
