import React from "react";

const Input = ({ type, id, placeholder }) => {
  return (
    <input
      type={type}
      id={id}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-400 focus:border-violet-400 outline-none"
    />
  );
};

export default Input;
