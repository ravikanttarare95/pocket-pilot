import React from "react";

function Button({ btnTitle, onBtnClick, customStyle = "", size = "md" }) {
  const sizeClasses =
    size === "lg"
      ? "text-lg sm:text-xl px-8 py-3 rounded-lg"
      : size === "sm"
      ? "text-sm sm:text-base px-3 py-1 rounded-md"
      : "text-base sm:text-lg px-5 py-2 rounded-md";

  return (
    <button
      className={`${customStyle} ${sizeClasses} 
        cursor-pointer bg-gradient-to-br from-cyan-300 to-violet-500 
        text-white shadow-lg hover:shadow-xl duration-300 font-semibold`}
      onClick={onBtnClick}
    >
      {btnTitle}
    </button>
  );
}

export default Button;
