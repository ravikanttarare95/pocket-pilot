import Input from "./../authentication/Input.jsx";
import Label from "./../authentication/Label.jsx";
import HeadingTwo from "./../HeadingTwo.jsx";
import Button from "./../Button.jsx";
import { X } from "lucide-react";
import { useState } from "react";

function ChangePasswordCompo({ setShowChangePassword }) {
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdatePassword = () => {};

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
        <Button btnTitle="Update Password" btnVariant="primary" size="md" />
      </div>
    </div>
  );
}

export default ChangePasswordCompo;
