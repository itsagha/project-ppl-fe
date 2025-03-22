import React from "react";

export default function PaginationButton({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex gap-2 justify-center items-center mt-8">
      {/* Tombol Previous */}
      <button
        className="p-2 cursor-pointer flex items-center justify-center rounded-full border border-gray-600 bg-white disabled:opacity-50 duration-500 ease-in-out hover:bg-sky-500 hover:text-white hover:border-sky-500"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
          <path
            fill="currentColor"
            d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42"
          ></path>
        </svg>
      </button>

      {totalPages > 5 && currentPage > 3 && (
        <button
          className="py-2 px-3.5 text-xs flex items-center justify-center rounded-full border border-gray-600 bg-white cursor-pointer duration-500 ease-in-out hover:bg-sky-500 hover:text-white hover:border-sky-500"
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      )}
      {totalPages > 5 && currentPage > 3 && <span className="text-gray-600">...</span>}

      {Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter((page) => {
          if (totalPages <= 5) return true;
          if (currentPage <= 3) return page <= 5;
          if (currentPage >= totalPages - 2) return page >= totalPages - 4;
          return Math.abs(currentPage - page) <= 2;
        })
        .map((page) => (
          <button
            key={page}
            className={`py-2 px-3.5 text-xs cursor-pointer flex items-center justify-center rounded-full border border-gray-600 duration-500 ease-in-out hover:bg-sky-500 hover:text-white hover:border-sky-500 ${
              currentPage === page ? "bg-sky-500 text-white border-sky-500" : "bg-white"
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

      {totalPages > 5 && currentPage < totalPages - 2 && <span className="text-gray-600">...</span>}

      {totalPages > 5 && currentPage < totalPages - 2 && (
        <button
          className="py-2 px-3.5 text-xs flex items-center justify-center rounded-full border border-gray-600 bg-white cursor-pointer duration-500 ease-in-out hover:bg-sky-500 hover:text-white hover:border-sky-500"
          onClick={() => onPageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      {/* Tombol Next */}
      <button
        className="p-2 cursor-pointer flex items-center justify-center rounded-full border border-gray-600 bg-white disabled:opacity-50 duration-500 ease-in-out hover:bg-sky-500 hover:text-white hover:border-sky-500"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="1em" height="1em">
          <path
            fill="currentColor"
            d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42"
          ></path>
        </svg>
      </button>
    </div>
  );
}
