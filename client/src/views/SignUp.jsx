import React, { useState, useEffect } from "react";
import Input from "./../components/Input";
import Button from "./../components/Button";
import BrandLogo from "./../components/BrandLogo";
import { House } from "lucide-react";
import { useNavigate, Link } from "react-router";
import Label from "./../components/Label";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e) => {
    // const { id, value } = e.target;
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/register`,

        formData
      );
      if (response) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-3">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
          <BrandLogo customNameStyle={`text-slate-700 `} />
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegistration();
          }}
          className="space-y-5"
        >
          <div>
            <Label htmlFor="name" labelTitle="Full Name" />
            <Input
              type="text"
              id="fullName"
              placeholder="xyz"
              value={formData?.fullName}
              onInputChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="email" labelTitle="Email Address" />
            <Input
              type="email"
              id="email"
              placeholder="xyz@gmail.com"
              value={formData?.email}
              onInputChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="password" labelTitle="Password" />
            <Input
              type="password"
              id="password"
              placeholder="••••••••"
              value={formData?.password}
              onInputChange={handleInputChange}
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" labelTitle="Confirm Password" />
            <Input
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              value={formData?.confirmPassword}
              onInputChange={handleInputChange}
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
              Sign up with Google
            </>
          }
        />

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <Link to="/login" className="text-cyan-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
