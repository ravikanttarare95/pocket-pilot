import React, { useEffect, useState } from "react";
import Button from "./../components/Button";
import BrandLogo from "./../components/BrandLogo.jsx";
import { useNavigate, Link } from "react-router";
import Input from "./../components/Input";
import Label from "./../components/Label";
import axios from "axios";
import toast from "react-hot-toast";
import { getloggedInUser } from "./../utils.js";

const Login = () => {
  const [user, setUser] = useState(getloggedInUser() || null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        formData
      );

      if (response?.data?.success) {
        toast.success(response?.data?.message || "Login Successful");
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify(response?.data?.user)
        );
        localStorage.setItem("token", JSON.stringify(response?.data?.token));
        setFormData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) return navigate("/");
  }, []);

  return (
    <div className="flex items-center justify-evenly min-h-screen p-3 gap-10">
      <div className="hidden md:flex flex-col">
        <h1 className="text-4xl lg:text-5xl text-slate-700 font-extrabold mb-4 leading-tight drop-shadow-md">
          Welcome Back 👋
        </h1>

        <p className="text-base lg:text-lg  text-slate-500 max-w-md leading-relaxed">
          Login to track your spending, control your future, and take charge of
          your finances today.
        </p>
      </div>

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10 mx-auto ">
          <BrandLogo customNameStyle={`text-slate-700 `} />
        </h1>

        <form
          className="space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div>
            <Label htmlFor="email" labelTitle={"Email Address"} />
            <Input
              type="email"
              id="email"
              placeholder="abcd123@gmail.com"
              value={formData?.email}
              onInputChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="password" labelTitle={"Password"} />
            <Input
              type="password"
              id={"password"}
              placeholder="••••••••"
              value={formData?.password}
              onInputChange={handleInputChange}
            />
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
          Don’t have an account?
          <Link to="/sign-up" className="text-cyan-500  hover:underline ml-1">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
