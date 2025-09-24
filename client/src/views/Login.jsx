import React, { useState } from "react";
import Button from "./../components/Button";
import { House } from "lucide-react";
import { useNavigate, Link } from "react-router";
import Input from "./../components/Input";
import Label from "./../components/Label";

const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen p-3">
      <Button
        btnTitle={<House />}
        btnVariant={"primary"}
        size="sm"
        customStyle="px-2! py-2 rounded-full! fixed top-3 left-3"
        onBtnClick={() => {
          setTimeout(() => {
            navigate("/");
          }, 300);
        }}
      />
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
            <Input type="password" id={"password"} placeholder="••••••••" />
          </div>

          <Button
            type="submit"
            btnTitle={"Login"}
            btnVariant={"primary"}
            customStyle={"w-full"}
          />
        </form>

        <div className="flex items-center my-5">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Button
          btnVariant={"secondary"}
          customStyle="w-full"
          btnTitle={
            <>
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Continue with Google
            </>
          }
        />

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="text-indigo-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
