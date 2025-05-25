import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 12;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      const half = Math.floor(maxVisiblePages / 2);
      let start = Math.max(2, currentPage - half);
      let end = Math.min(totalPages - 1, currentPage + half);

      if (start <= 2) {
        start = 2;
        end = start + maxVisiblePages - 3;
      }

      if (end >= totalPages - 1) {
        end = totalPages - 1;
        start = end - maxVisiblePages + 3;
      }

      pages.push(1);
      if (start > 2) pages.push("...");

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex justify-center space-x-2 mt-6 items-center">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded hover:bg-gray-200 disabled:text-gray-400"
      >
        <FiChevronLeft />
      </button>

      {getPageNumbers().map((p, idx) => (
        <button
          key={idx}
          onClick={() => typeof p === "number" && onPageChange(p)}
          className={`px-4 py-2 rounded-lg text-sm transition-all duration-200
  ${
    p === currentPage
      ? "bg-blue-400 text-white font-semibold shadow-md ring-2 ring-blue-400"
      : "bg-white text-gray-700 hover:bg-gray-100"
  }
  ${p === "..." ? "cursor-default text-gray-500 bg-transparent hover:bg-transparent" : ""}
`}

          disabled={p === "..."}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded hover:bg-gray-200 disabled:text-gray-400"
      >
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
