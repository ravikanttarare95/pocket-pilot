import React from "react";

function Label({ htmlFor, labelTitle, customStyle, isMandatory }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`${customStyle} block text-base font-medium text-gray-600 mb-1`}
    >
      {labelTitle}
      {isMandatory && <span className="text-rose-500">*</span>}
    </label>
  );
}

export default Label;
