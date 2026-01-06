import { useState, useRef, useEffect } from "react";
import ProfileImg from "./../assets/profile.png";
import UserMaleImg from "./../assets/profile-male.png";
import UserFemaleImg from "./../assets/profile-female.png";
import Button from "./../components/Button.jsx";
import HeadingOne from "./../components/HeadingOne.jsx";
import { useAuth } from "./../context/UserAuthContext.jsx";
import { Camera, X } from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "./../components/containers/Navbar.jsx";
import { LogIn } from "lucide-react";
import toast from "react-hot-toast";
import { API_URL } from "./../configs/axiosConfigs.js";
import ProfileInfoCompo from "./../components/profile-components/ProfileInfoCompo.jsx";
import ChangePasswordCompo from "./../components/profile-components/ChangePasswordCompo.jsx";
import { IKContext, IKUpload } from "imagekitio-react";

function Profile() {
  const uploadImageRef = useRef(null);
  const navigate = useNavigate();
  const { user, setUser, accessToken, setAccessToken, refreshUser } = useAuth();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const photoMenuRef = useRef(null);

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

  const imagekitAuthenticator = async () => {
    const response = await API_URL.get(`/api/imagekit/auth`);

    if (response) {
      return response?.data;
    }
  };

  const onUploadProgress = (evt) => {
    console.log(evt);
    toast.loading("Image Uploading...", { id: "img-uploading" });
  };
  const onError = (err) => {
    console.log(typeof err);
    toast.error("Error uploading image");
  };

  const onSuccess = async (res) => {
    try {
      if (!res?.url) return;
      const response = await API_URL.put(
        "/api/users/change-profile-image",
        {
          avtarUrl: res?.url,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response?.data?.success) {
        setUser((prev) => ({
          ...prev,
          avtarUrl: response.data.userAvtarUrl,
        }));

        toast.dismiss("img-uploading");
        toast.success(response?.data?.message || "Image updated");
      }
    } catch (error) {
      console.error("Update profile image error:", error);

      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong while updating profile image";

      toast.dismiss("img-uploading");
      toast.error(errorMessage);
    }
  };

  const removeProfilePhoto = async () => {
    try {
      const response = await API_URL.put(
        "/api/users/change-profile-image",
        { avtarUrl: "" },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response?.data?.success) {
        setUser((prev) => ({
          ...prev,
          avtarUrl: "",
        }));
        toast.success("Profile photo removed");
      }
    } catch (error) {
      console.error("Remove photo error:", error);
      toast.error("Failed to remove profile photo");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showPhotoMenu &&
        photoMenuRef.current &&
        !photoMenuRef.current.contains(event.target)
      ) {
        setShowPhotoMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPhotoMenu]);

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto md:my-6 p-6 sm:p-8 bg-white border border-gray-200 md:rounded-2xl shadow-sm">
        <div className="flex max-[400px]:flex-col items-center gap-6 mb-10">
          <div className="relative group w-32 h-32 flex items-center justify-center">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 via-violet-400 to-cyan-200 p-[4px]">
              <div className="w-full h-full rounded-full bg-white p-[4px]">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={
                      user?.avtarUrl
                        ? user?.avtarUrl
                        : user?.gender === "male"
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

            <div className="relative">
              <button
                type="button"
                aria-label="Change profile photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPhotoMenu((prev) => !prev);
                }}
                className="absolute cursor-pointer bottom-2 -right-1 w-10 h-10 border-3 border-white rounded-full bg-gradient-to-br from-cyan-400 to-cyan-500 flex items-center justify-center shadow-md transition"
              >
                {showPhotoMenu ? (
                  <X
                    size={22}
                    className="text-white transition-transform duration-300 hover:scale-110"
                  />
                ) : (
                  <Camera
                    size={20}
                    className="text-white transition-transform duration-300 hover:scale-110"
                  />
                )}
              </button>

              {showPhotoMenu && (
                <div
                  ref={photoMenuRef}
                  className="absolute right-6 -bottom-20 w-20 rounded-md overflow-hidden z-50"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    type="button"
                    btnTitle="Update"
                    size="sm"
                    btnVariant="primary"
                    onBtnClick={() => {
                      setShowPhotoMenu(false);
                      uploadImageRef.current?.click();
                    }}
                    customStyle="!w-full !font-light"
                  />

                  <Button
                    type="button"
                    btnTitle="Remove"
                    size="sm"
                    btnVariant="secondary"
                    onBtnClick={() => {
                      setShowPhotoMenu(false);
                      removeProfilePhoto();
                    }}
                    customStyle="!w-full !font-light !bg-white !text-rose-400 !border-rose-200"
                  />
                </div>
              )}
            </div>
          </div>
          <IKContext
            publicKey={import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY}
            urlEndpoint={import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT}
            authenticator={imagekitAuthenticator}
          >
            <IKUpload
              ref={uploadImageRef}
              onError={onError}
              onSuccess={onSuccess}
              onUploadProgress={onUploadProgress}
              useUniqueFileName={true}
              checks={`"file.size" < "1mb"`}
              className="hidden"
            />
          </IKContext>

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
          refreshUser={refreshUser}
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
