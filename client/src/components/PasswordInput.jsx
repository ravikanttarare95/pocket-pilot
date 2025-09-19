import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({ id, placeholder }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={isPasswordVisible ? "text" : "password"}
        id={id}
        placeholder={placeholder}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400  outline-none"
      />

      <div className="absolute right-0 top-1/2 -translate-1/2 cursor-pointer w-fit opacity-60 hover:opacity-100 transition-opacity duration-300">
        <div>
          {isPasswordVisible ? (
            <EyeOff
              onClick={() => {
                setIsPasswordVisible(false);
              }}
            />
          ) : (
            <Eye
              onClick={() => {
                setIsPasswordVisible(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordInput;
