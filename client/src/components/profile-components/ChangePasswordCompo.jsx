import Input from "./../authentication/Input.jsx";
import Label from "./../authentication/Label.jsx";
import HeadingTwo from "./../HeadingTwo.jsx";
import Button from "./../Button.jsx";
import { X } from "lucide-react";
import { useState } from "react";
import { API_URL } from "./../../configs/axiosConfigs.js";
import toast from "react-hot-toast";

function ChangePasswordCompo({ setShowChangePassword, accessToken }) {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = async () => {
    if (loading) return;

    const { oldPassword, newPassword, confirmNewPassword } = passwordData;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword.length < 8) {
      return toast.error("Password must be at least 8 characters");
    }

    if (newPassword !== confirmNewPassword) {
      return toast.error("New password and confirm password do not match");
    }

    try {
      setLoading(true);
      const response = await API_URL.put(
        "/api/users/change-password",
        {
          oldPassword,
          newPassword,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (response?.data?.success) {
        toast.success(
          response?.data?.message || "Password updated successfully"
        );
        setPasswordData({
          oldPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setTimeout(() => {
          setShowChangePassword(false);
        }, 2000);
      }
    } catch (error) {
      return toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8 space-y-5 shadow-lg">
      <div className="flex justify-between">
        <HeadingTwo title="Change Password" />
        <X
          className="h-8 w-8 text-rose-500 cursor-pointer"
          onClick={() => setShowChangePassword(false)}
        />
      </div>

      <div>
        <Label htmlFor="old-password" labelTitle="Old Password" />
        <Input
          name="oldPassword"
          type="password"
          id="old-password"
          value={passwordData?.oldPassword}
          onInputChange={handleInputChange}
        />
      </div>

      <div>
        <Label htmlFor="new-password" labelTitle="New Password" />
        <Input
          name="newPassword"
          type="password"
          id="new-password"
          value={passwordData?.newPassword}
          onInputChange={handleInputChange}
        />
      </div>

      <div>
        <Label
          htmlFor="confirm-new-password"
          labelTitle="Confirm New Password"
        />
        <Input
          name="confirmNewPassword"
          type="password"
          id="confirm-new-password"
          value={passwordData?.confirmNewPassword}
          onInputChange={handleInputChange}
        />
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
          isDisabled={loading}
          customStyle="relative"
          btnTitle={
            <>
              <span className="invisible">Changing Password</span>

              <span className="absolute inset-0 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Changing Password</span>
                  </>
                ) : (
                  <span>Update Password</span>
                )}
              </span>
            </>
          }
          btnVariant="primary"
          size="md"
          onBtnClick={handleUpdatePassword}
        />
      </div>
    </div>
  );
}

export default ChangePasswordCompo;
