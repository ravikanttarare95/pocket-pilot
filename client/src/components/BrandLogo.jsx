import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import Logo from "./../../public/logo.svg";
function BrandLogo({ customLinkStyle, customNameStyle }) {
  const [isClose, setIsClose] = useState(false);
  // useEffect(() => {
  //   if (location.pathname === "/") return;
  //   if (window.innerWidth < 640) setIsClose(true);
  // }, []);
  return (
    <Link to={"/"} className={`flex items-center gap-3 ${customLinkStyle}`}>
      <img src={Logo} alt="Logo" className={`w-12`} />
      <span
        className={`text-2xl font-extrabold text-cyan-50 ${customNameStyle}`}
      >
        Pocket Pilot
      </span>
    </Link>
  );
}

export default BrandLogo;
