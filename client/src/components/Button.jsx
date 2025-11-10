import React from "react";

function Button({
  type,
  btnTitle,
  onBtnClick,
  btnVariant,
  customStyle = "",
  size = "md",
}) {
  const sizeClasses =
    size === "lg"
      ? "text-lg sm:text-xl px-8 py-3 rounded-lg"
      : size === "sm"
      ? "text-sm sm:text-base px-3 py-1.5 rounded-md"
      : "text-base sm:text-lg px-5 py-2.5 rounded-lg";

  const variantClasses =
    btnVariant === "primary"
      ? "bg-gradient-to-b from-cyan-400 to-cyan-600 text-white [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)]"
      : btnVariant === "secondary"
      ? "border border-slate-300 text-slate-600 shadow-xs hover:shadow-sm"
      : "bg-slate-200 text-slate-900 hover:bg-slate-300";

  return (
    <button
      type={type}
      className={`${customStyle} ${sizeClasses} ${variantClasses} 
        cursor-pointer transition-all duration-300 font-semibold flex justify-center items-center gap-2`}
      onClick={onBtnClick}
    >
      {btnTitle}
    </button>
  );
}

export default Button;
