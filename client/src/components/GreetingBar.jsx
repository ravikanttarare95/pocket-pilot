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

    if (hour >= 0 && hour < 5) {
      greet = "The Night is Yours 🌌";
      color = "bg-black";
      text = "text-slate-50";
    } else if (hour < 12) {
      greet = "Good Morning 🌻";
      color = "bg-gradient-to-r from-teal-400 to-teal-500";
      text = "text-slate-900";
    } else if (hour < 17) {
      greet = "Good Afternoon 🌤️";
      color = "bg-amber-300";
      text = "text-slate-900";
    } else if (hour < 20) {
      greet = "Good Evening 🌇";
      color = "bg-gradient-to-r from-sky-500 to-blue-500";
      text = "text-slate-50";
    } else {
      greet = "Late Hustle 🔭";
      color = "bg-black";
      text = "text-slate-50";
    }

    setBgColor(color);
    setTextColor(text);
    setGreeting(greet);
  }, []);

  return (
    <header
      className={`sticky top-18 flex items-center justify-between px-2 sm:px-5 py-4 shadow-md transition-all duration-500 ${bgColor} ${textColor}`}
    >
      <p className="tracking-wide">
        <span className="text-lg sm:text-xl ">{greeting} </span>
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
