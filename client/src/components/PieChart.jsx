import React from "react";

function PieChart({ chart, chartHeading }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 transition-transform duration-300 w-[99%] px-2">
      {chart}
      <p className="mt-4 text-center text-slate-700 font-medium">
        {chartHeading}
      </p>
    </div>
  );
}

export default PieChart;
