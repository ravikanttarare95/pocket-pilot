import React from "react";

function FeaturesCard({ feature }) {
  return (
    <div className="bg-white w-full sm:w-[250px] md:w-72 rounded-2xl shadow-md p-4 sm:p-5 border-t-4 border-rose-500 hover:shadow-xl hover:-translate-y-2 hover:scale-105 duration-300">
      <p className="text-slate-800 font-medium text-base sm:text-lg md:text-xl">
        {feature}
      </p>
    </div>
  );
}

export default FeaturesCard;
