import React, { useState } from "react";
import Button from "./../components/Button";
import { House } from "lucide-react";
import { useNavigate } from "react-router";
import Input from "./../components/Input";
import PasswordInput from "./../components/PasswordInput";
import Label from "./../components/Label";
import Logo from "./../../public/wallet-logo.png";
import { Link } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Button
        btnTitle={<House />}
        size="sm"
        customStyle="px-2! py-2 rounded-full! fixed top-3 left-3"
        onBtnClick={() => {
          setTimeout(() => {
            navigate("/");
          }, 300);
        }}
      />
      {/* <Link to="/">
        <img src={Logo} alt="" className="w-17 fixed top-0 left-0" />
      </Link> */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Login
        </h1>

        <form className="space-y-5">
          <div>
            <Label htmlFor="email" labelTitle={"Email Address"} />
            <Input type="email" id="email" placeholder="abcd123@gmail.com" />
          </div>

          <div>
            <Label htmlFor="password" labelTitle={"Password"} />
            <PasswordInput id={"password"} placeholder="••••••••" />
          </div>

          <Button type="submit" btnTitle={"Login"} customStyle={"w-full"} />
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 transition  cursor-pointer">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700">Continue with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/sign-up" className="text-indigo-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
