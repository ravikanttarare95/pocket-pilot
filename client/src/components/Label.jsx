import React from "react";

function Label({ htmlFor, labelTitle }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-base font-medium text-gray-600 mb-1"
    >
      {labelTitle}
    </label>
  );
}

export default Label;
