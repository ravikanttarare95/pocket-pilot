import React, { useState } from "react";
import Button from "./../components/Button";
import Input from "./../components/Input";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [inputType, setInputType] = useState("password");
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Login
        </h1>

        <form className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Email Address
            </label>
            <Input type="email" id="email" placeholder="abcd123@gmail.com" />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Input type={inputType} id="password" placeholder="••••••••" />

              <div className="absolute right-0 top-1/2 -translate-1/2 cursor-pointer w-fit opacity-60 hover:opacity-100 transition-opacity duration-300">
                {inputType === "password" ? (
                  <Eye
                    onClick={() => {
                      setInputType("text");
                    }}
                  />
                ) : (
                  <EyeOff
                    onClick={() => {
                      setInputType("password");
                    }}
                  />
                )}
              </div>
            </div>
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
