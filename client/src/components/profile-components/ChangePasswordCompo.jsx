import Input from "./../authentication/Input.jsx";
import Label from "./../authentication/Label.jsx";
import HeadingTwo from "./../HeadingTwo.jsx";
import Button from "./../Button.jsx";
import { X } from "lucide-react";

function ChangePasswordCompo({ setShowChangePassword }) {
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
        <Label htmlFor="current-password" labelTitle="Current Password" />
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
        <Button btnTitle="Update Password" btnVariant="primary" size="md" />
      </div>
    </div>
  );
}

export default ChangePasswordCompo;
