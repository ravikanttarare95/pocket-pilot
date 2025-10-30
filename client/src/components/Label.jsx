import React from "react";

function Label({ htmlFor, labelTitle, customStyle }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${customStyle} block text-base font-medium text-gray-600 mb-1`}
    >
      {labelTitle}
    </label>
  );
}

export default Label;
