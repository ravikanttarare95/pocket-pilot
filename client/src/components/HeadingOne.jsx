import React from "react";

function HeadingOne({ title }) {
  return (
    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
      {title}
    </h1>
  );
}

export default HeadingOne;
