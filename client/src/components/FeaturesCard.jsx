import React from "react";

function FeaturesCard({ featureText, featureIcon, colorObj }) {
  return (
    <div
      data-aos="zoom-in-up"
      tabIndex={0} //VERY IMPORTANT
      className={` group bg-white w-full sm:w-[300px] md:w-[350px] rounded-2xl shadow-md p-5 border-t-3 ${colorObj.border} hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] transition-all! duration-300! flex items-center gap-4`}
    >
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-full ${colorObj.bg} ${colorObj.text} text-2xl shadow-sm ${colorObj.hoverBg} ${colorObj.focusBg} group-hover:text-white group-focus:text-white transition-colors duration-300 shrink-0`}
      >
        {featureIcon}
      </div>

      <p className="text-slate-800 font-medium text-base sm:text-lg md:text-xl leading-snug  text-left">
        {featureText}
      </p>
    </div>
  );
}

export default FeaturesCard;
