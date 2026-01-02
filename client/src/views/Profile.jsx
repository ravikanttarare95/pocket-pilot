import React, { useState } from "react";
import Button from "./../components/Button.jsx";
import HeadingTwo from "./../components/HeadingTwo.jsx";
import HeadingOne from "./../components/HeadingOne.jsx";
import { useAuth } from "./../context/UserAuthContext.jsx";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router";
import Input from "./../components/authentication/Input.jsx";
import Label from "./../components/authentication/Label.jsx";
import Navbar from "./../components/containers/Navbar.jsx";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { API_URL } from "./../configs/axiosConfigs.js";
import ProfileInfoCompo from "../components/profile-components/ProfileInfoCompo.jsx";

function Profile() {
  const navigate = useNavigate();
  const { user, setUser, accessToken, setAccessToken } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handleLogout = async () => {
    try {
      await API_URL.post("/api/users/logout");
      setUser(null);
      setAccessToken(null);
      toast.success("Logout Successfull");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Something went wrong, Logout failed");
    }
  };

  return (
    <>
      <Navbar />
      {/* ============ */}
      <div className="sticky top-0 z-40 bg-amber-50 border-b border-amber-200">
        <div className="max-w-3xl mx-auto px-4 py-2 text-center">
          <p className="text-sm font-medium text-amber-700">
            ⚠️ This page is under maintenance. Some features may be unavailable.
          </p>
        </div>
      </div>

      {/* ============ */}
      <div className="max-w-3xl mx-auto md:my-6 p-6 sm:p-8 bg-white border border-gray-200 md:rounded-2xl shadow-sm">
        <div className="flex items-center gap-4 sm:gap-6 mb-10">
          <div className="relative group">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-400 to-cyan-500 p-[3px]">
              <div className="w-full h-full rounded-full bg-white overflow-hidden">
                <img
                  src={user?.avatarUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <button
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition cursor-pointer"
              onClick={() => {}}
            >
              <Camera size={26} className="text-white" />
            </button>
          </div>

          <div>
            <HeadingOne title={user?.fullName} customStyle={"!mb-3"} />
            <p className="text-sm text-gray-500 mt-1">{user?.email}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 mb-8" />

        <ProfileInfoCompo
          user={user}
          setUser={setUser}
          accessToken={accessToken}
        />

        {/* Divider */}
        <div className="border-t border-gray-200 my-10" />

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <Button
            type="button"
            btnTitle={
              <span className="flex items-center justify-center gap-2">
                <LogIn className="w-5 h-5" /> Logout
              </span>
            }
            btnVariant="secondary"
            size="md"
            onBtnClick={handleLogout}
            customStyle="w-full sm:w-auto !border-rose-300 hover:!border-rose-400 !text-rose-400 hover:!text-rose-500 transition"
          />
          <Button
            btnTitle="Change Password"
            btnVariant="primary"
            size="md"
            onBtnClick={() => setShowChangePassword(true)}
            customStyle="w-full sm:w-auto"
          />
        </div>

        {showChangePassword && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs px-4">
            <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
              <HeadingTwo title="Change Password" />

              <div>
                <Label
                  htmlFor="current-password"
                  labelTitle="Current Password"
                />
                <Input type="password" id="current-password" />
              </div>

              <div>
                <Label htmlFor="new-password" labelTitle="New Password" />
                <Input type="password" id="new-password" />
              </div>

              <div>
                <Label
                  htmlFor="confirm-new-password"
                  labelTitle="Confirm New Password"
                />
                <Input type="password" id="confirm-new-password" />
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                <Button
                  btnTitle="Cancel"
                  btnVariant="secondary"
                  size="md"
                  onBtnClick={() => setShowChangePassword(false)}
                  customStyle="w-full sm:w-auto !border-rose-300 hover:!border-rose-400 !text-rose-400 hover:!text-rose-500 transition"
                />
                <Button
                  btnTitle="Update Password"
                  btnVariant="primary"
                  size="md"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
