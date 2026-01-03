import { useState } from "react";
import ProfileImg from "./../assets/profile.png";
import UserMaleImg from "./../assets/profile-male.png";
import UserFemaleImg from "./../assets/profile-female.png";
import Button from "./../components/Button.jsx";
import HeadingOne from "./../components/HeadingOne.jsx";
import { useAuth } from "./../context/UserAuthContext.jsx";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "./../components/containers/Navbar.jsx";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { API_URL } from "./../configs/axiosConfigs.js";
import ProfileInfoCompo from "./../components/profile-components/ProfileInfoCompo.jsx";
import ChangePasswordCompo from "./../components/profile-components/ChangePasswordCompo.jsx";

function Profile() {
  const navigate = useNavigate();
  const { user, setUser, accessToken, setAccessToken } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);
  console.log(accessToken);

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

  const updateProfilePhoto = () => {};

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
        <div className="flex max-[400px]:flex-col items-center gap-6 mb-10">
          <div className="relative group w-32 h-32 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 via-violet-400 to-cyan-200 p-[4px]">
              <div className="w-full h-full rounded-full bg-white p-[4px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={
                      user?.avatarUrl || user?.gender === "male"
                        ? UserMaleImg
                        : user?.gender === "female"
                        ? UserFemaleImg
                        : ProfileImg
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={updateProfilePhoto}
              className="absolute cursor-pointer bottom-2 -right-1 w-10 h-10 border-3 border-white rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-sm group transition"
            >
              <Camera
                size={20}
                className="text-white group-hover:scale-110 duration-300"
              />
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
            <ChangePasswordCompo
              setShowChangePassword={setShowChangePassword}
              accessToken={accessToken}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
