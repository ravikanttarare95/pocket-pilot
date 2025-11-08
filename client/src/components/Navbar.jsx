import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "./../../public/logo.svg";
import { LogIn, UserPlus, Menu, X } from "lucide-react";
import Button from "./Button";
import BrandLogo from "./BrandLogo.jsx";
import { getloggedInUser } from "./../utils.js";
import toast from "react-hot-toast";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(getloggedInUser() || null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    setUser(null);
    toast.success("Logout Successful");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-md px-3 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-around gap-4 w-full">
      <div className="flex items-center justify-between  md:w-auto">
        <BrandLogo />
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
        {user ? (
          <>
            <Link
              to="/"
              className="text-md font-medium hover:text-cyan-300 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-md font-medium hover:text-cyan-300 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <img
                src={user?.avtarUrl}
                alt="Profile"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white shadow-md object-cover hover:scale-105 transition-transform duration-300"
              />
              <span className="hidden sm:block font-semibold text-white">
                {user?.fullName?.split(" ")[0]}
              </span>
              <button
                className="flex items-center gap-2 text-md font-extrabold hover:text-cyan-300 transition-all duration-300 cursor-pointer"
                onClick={handleLogout}
              >
                <LogIn className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <Button
              btnVariant={"secondary"}
              size="sm"
              customStyle="text-white"
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
