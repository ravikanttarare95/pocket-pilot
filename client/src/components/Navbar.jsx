import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "./../../public/wallet-logo.png";
import { LogIn, UserPlus, Menu, X } from "lucide-react";
import Button from "./Button";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-md  px-3 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-around gap-4">
      <div className="flex items-center justify-between  md:w-auto">
        <Link to={"/"} className="flex items-center gap-3">
          <img
            src={Logo}
            alt="Logo"
            className="w-12 rounded-lg drop-shadow-xs drop-shadow-cyan-600"
          />
          <span className="text-2xl font-extrabold text-cyan-50">
            Pocket Pilot
          </span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="sm:hidden text-white focus:outline-none"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`sm:flex flex-col sm:flex-row gap-4 items-center max-sm:bg-slate-800/60 max-sm:py-4 max-sm:rounded-md max-sm:mx-1 max-sm:mb-1 max-sm:border border-slate-800 
          ${isOpen ? "flex" : "hidden"}
        `}
      >
        {isLogin ? (
          <>
            <Link
              to="/dashboard"
              className="text-md font-medium hover:text-cyan-400 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 border border-cyan-300 bg-slate-800 text-sm rounded-full font-extrabold text-cyan-200 hover:bg-cyan-300 hover:text-slate-950 transition-all duration-300">
              <LogIn className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </>
        ) : (
          <>
            <Button
              btnVariant={"secondary"}
              size="sm"
              onBtnClick={() => {
                navigate("/login");
              }}
              btnTitle={
                <>
                  <LogIn className="w-5 h-5" />
                  Login
                </>
              }
            />

            <Button
              btnVariant="primary"
              size="sm"
              onBtnClick={() => {
                navigate("/sign-up");
              }}
              btnTitle={
                <>
                  <UserPlus className="w-5 h-5" />
                  Sign Up
                </>
              }
            />
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
