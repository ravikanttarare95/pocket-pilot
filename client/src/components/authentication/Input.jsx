import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  type = "text",
  id,
  name,
  placeholder,
  onInputChange,
  value,
  customStyle,
  checked,
  min,
  max,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputType = type === "password" && isPasswordVisible ? "text" : type; //--IMPORTANT--//
  return (
    <div className="relative">
      <input
        tabIndex={0}
        type={inputType}
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        className={`${customStyle} w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-2 outline-cyan-400`}
        onChange={onInputChange}
        checked={checked}
        min={min}
        max={max}
      />
      {type === "password" && (
        <div
          className="absolute right-0 top-1/2 -translate-1/2 cursor-pointer w-fit opacity-50 hover:opacity-80 transition-opacity duration-300"
          onClick={() => {
            setIsPasswordVisible(!isPasswordVisible);
          }}
        >
          {isPasswordVisible ? <Eye size={20} /> : <EyeOff size={20} />}
        </div>
      )}
    </div>
  );
};

export default Input;
