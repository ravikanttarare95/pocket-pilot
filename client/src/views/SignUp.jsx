import React, { useState } from "react";
import Input from "./../components/Input";
import Button from "./../components/Button";
import { House } from "lucide-react";
import { useNavigate, Link } from "react-router";
import Label from "./../components/Label";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen p-3">
      {" "}
      <Button
        btnTitle={<House />}
        btnVariant="primary"
        size="sm"
        customStyle="px-2! py-2 rounded-full! fixed top-3 left-3"
        onBtnClick={() => {
          setTimeout(() => {
            navigate("/");
          }, 300);
        }}
      />
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Sign Up
        </h1>

        <form className="space-y-5">
          <div>
            <Label htmlFor="name" labelTitle="Full Name" />
            <Input type="text" id="name" placeholder="xyz" />
          </div>

          <div>
            <Label htmlFor="email" labelTitle="Email Address" />
            <Input type="email" id="email" placeholder="xyz@gmail.com" />
          </div>

          <div>
            <Label htmlFor="password" labelTitle="Password" />
            <Input type="password" id="password" placeholder="••••••••" />
          </div>

          <div>
            <Label htmlFor="confirmPassword" labelTitle="Confirm Password" />
            <Input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
            />
          </div>

          <Button
            type="submit"
            btnVariant="primary"
            btnTitle={" Create Account"}
            customStyle={"w-full"}
          />
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 px-4 rounded-lg hover:bg-cyan-50 transition cursor-pointer">
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-gray-700">Sign up with Google</span>
        </button>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
