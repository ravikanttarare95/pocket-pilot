import React from "react";

function HeadingThree({ title, className }) {
  return (
    <h3
      className={`font-medium text-slate-500 text-sm sm:text-base ${className}`}
    >
      {title}
    </h3>
  );
}

export default HeadingThree;
