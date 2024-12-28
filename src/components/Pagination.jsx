import React from 'react';
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onNextPage, onPrevPage }) => {
  return (
    <div className="flex justify-center items-center my-4">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="px-4 text-black rounded-md mr-4 disabled:opacity-50"
      >
        <FaChevronLeft />
      </button>
      <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="px-4 text-black rounded-md ml-4 disabled:opacity-50"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
