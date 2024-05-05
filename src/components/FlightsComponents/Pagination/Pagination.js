import React from "react";

const Pagination = ({
  totalPages,
  currentPage,
  handlePaginationClick,
  isDarkMode,
}) => {
  return (
    <nav
      class={`d-flex justify-content-center ${
        isDarkMode ? "bg-dark" : "bg-light"
      }`}
    >
      <ul
        className={`pagination pagination-base pagination-boxed pagination-square mb-0 ${
          isDarkMode ? "bg-dark" : "bg-light"
        }`}
      >
        {/* <ul className="pagination"> */}
        {Array.from({ length: totalPages }, (_, i) => (
          <li
            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
            key={i + 1}
          >
            <button
              className="page-link no-border"
              onClick={() => handlePaginationClick(i + 1)}
            >
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
