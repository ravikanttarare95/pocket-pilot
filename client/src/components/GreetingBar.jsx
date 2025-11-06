import React, { useEffect, useState } from "react";
import { getloggedInUser } from "./../utils";

function GreetingBar({ greetingBarTitle }) {
  const [user, setUser] = useState(null);
  const hour = new Date().getHours();
  let greet = "";
  let bgColor = "";
  let textColor = "";

  if (hour >= 0 && hour < 5) {
    greet = "The Night is Yours 🌌";
    bgColor = "bg-black";
    textColor = "text-slate-50";
  } else if (hour < 12) {
    greet = "Good Morning 🌻";
    bgColor = "bg-gradient-to-r from-cyan-400 to-cyan-500";
    textColor = "text-slate-900";
  } else if (hour < 17) {
    greet = "Good Afternoon 🌤️";
    bgColor = "bg-amber-300";
    textColor = "text-slate-900";
  } else if (hour < 20) {
    greet = "Good Evening 🌇";
    bgColor = "bg-gradient-to-r from-sky-500 to-blue-500";
    textColor = "text-slate-50";
  } else {
    greet = "Late Hustle 🔭";
    bgColor = "bg-black";
    textColor = "text-slate-50";
  }
  useEffect(() => {
    setUser(getloggedInUser());
  }, []);

  return (
    <header
      className={`sticky top-18 flex items-center justify-between px-2 sm:px-5 py-4 shadow-md transition-all duration-500 ${bgColor} ${textColor} z-43`}
    >
      <p className="tracking-wide">
        <span className="text-lg sm:text-xl ">{greet} </span>
        <span className="text-xl sm:text-2xl font-bold">
          {user && user.fullName}
        </span>
      </p>
      {greetingBarTitle && (
        <span className="hidden sm:block text-lg opacity-80 font-medium">
          {greetingBarTitle}
        </span>
      )}
    </header>
  );
}

export default GreetingBar;
