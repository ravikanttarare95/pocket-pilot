import React from "react";

function HeadingTwo({ title, className }) {
  return (
    <h2
      className={`text-lg sm:text-xl font-semibold text-slate-600 tracking-tight mb-4 sm:mb-6 ${className}`}
    >
      {title}
    </h2>
  );
}

export default HeadingTwo;
