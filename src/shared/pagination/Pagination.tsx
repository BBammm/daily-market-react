import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";


interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center mt-10 gap-2 select-none">
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={page === 1}
        aria-label="이전 페이지"
        onClick={() => onPageChange(page - 1)}
      >
        <IoIosArrowBack />
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`w-8 h-8 rounded-full mx-[2px] border flex items-center justify-center text-sm
            ${num === page
              ? "bg-blue-500 border-blue-500 text-white shadow"
              : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:text-blue-600"} transition`}
          onClick={() => onPageChange(num)}
          disabled={num === page}
          aria-current={num === page ? "page" : undefined}
        >
          {num}
        </button>
      ))}
      <button
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 bg-white text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={page === totalPages || totalPages === 0}
        aria-label="다음 페이지"
        onClick={() => onPageChange(page + 1)}
      >
        <IoIosArrowForward />
      </button>
    </nav>
  );
}