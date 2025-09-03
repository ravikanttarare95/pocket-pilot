import React from "react";

function Button({ btnTitle }) {
  return (
    <button className="cursor-pointer bg-gradient-to-r from-cyan-600 to-rose-600 text-white text-base sm:text-lg md:text-xl px-6 sm:px-8 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl duration-300 font-semibold">
      {btnTitle}
    </button>
  );
}

export default Button;
