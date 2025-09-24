import React from "react";

function Button({
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
      ? "bg-gradient-to-b from-cyan-500 to-cyan-600 text-white hover:from-cyan-600 hover:to-cyan-700 [text-shadow:_0_1px_4px_rgba(0,0,0,0.4)]"
      : btnVariant === "secondary"
      ? "border border-cyan-300 bg-slate-900 hover:bg-gradient-to-b hover:from-cyan-500 hover:to-cyan-600 text-cyan-200 hover:text-white"
      : "bg-slate-200 text-slate-900 hover:bg-slate-300";

  return (
    <button
      className={`${customStyle} ${sizeClasses} ${variantClasses} 
        cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 font-semibold flex justify-center items-center gap-2`}
      onClick={onBtnClick}
    >
      {btnTitle}
    </button>
  );
}

export default Button;
