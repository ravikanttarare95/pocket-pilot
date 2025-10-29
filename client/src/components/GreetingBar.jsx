import React, { useEffect, useState } from "react";
import { getloggedInUser } from "./../utils";

function GreetingBar({ greetingBarTitle }) {
  const [greeting, setGreeting] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [textColor, setTextColor] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getloggedInUser());
    const hour = new Date().getHours();
    let greet = "";
    let color = "";
    let text = "";

    if (hour < 12) {
      greet = "Good Morning 🌼";
      color = "bg-gradient-to-r from-emerald-400 to-teal-500";
      text = "text-slate-900";
    } else if (hour < 17) {
      greet = "Good Afternoon 🌤️";
      color = "bg-amber-400";
      text = "text-slate-900";
    } else if (hour < 20) {
      greet = "Good Evening 🌇";
      color = "bg-gradient-to-r from-sky-400 to-blue-500";
      text = "text-slate-50";
    } else {
      greet = "Burning the Midnight Oil 🔭";
      color = "bg-gradient-to-r from-slate-800 to-slate-900";
      text = "text-slate-50";
    }

    setBgColor(color);
    setTextColor(text);
    setGreeting(greet);
  }, []);

  return (
    <header
      className={`flex items-center justify-between px-2 sm:px-5 py-3 shadow-md transition-all duration-500 ${bgColor} ${textColor}`}
    >
      <p className="text-xl sm:text-2xl tracking-wide">
        {greeting} <span className="font-bold">{user && user.fullName}</span>
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
