import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

function TransPagination({ currentPage, totalPages, onPageChange }) {
  const [value, setValue] = useState(String(currentPage).padStart(2, "0"));

  useEffect(() => {
    setValue(String(currentPage).padStart(2, "0"));
  }, [currentPage]);

  const commitChange = () => {
    let next = Number(value);
    if (Number.isNaN(next))
      return setValue(String(currentPage).padStart(2, "0"));

    next = Math.max(1, Math.min(totalPages, next));
    onPageChange(next);
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
        <input
          type="text"
          inputMode="numeric"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, ""))} // \D: Not a digit
          onBlur={commitChange}
          onKeyDown={(e) => e.key === "Enter" && commitChange()}
          className="w-12 px-2 py-2 text-center text-sm font-medium outline-none"
        />

        <div className="h-8 w-px bg-gray-200" />

        <div className="px-3 text-sm text-gray-500">of {totalPages} pages</div>

        <div className="h-8 w-px bg-gray-200" />

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="h-8 w-px bg-gray-200" />

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default TransPagination;
