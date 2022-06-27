import React from "react";
import propTypes from "prop-types";

function Pagination(props) {
  const { movies, currentPage, paginate } = props;
  const pageCount = Math.ceil(movies.length / 3);
  if (pageCount === 1) return null;
  const pageNumbers = [];
  for (var i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {pageNumbers.map((index) => {
          return (
            <li
              className={
                index === currentPage ? "page-item active" : "page-item"
              }
              key={index}
            >
              <a onClick={() => paginate(index)} className="page-link" href="#">
                {index}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  movies: propTypes.array.isRequired,
  currentPage: propTypes.number.isRequired,
  paginate: propTypes.func.isRequired,
};

export default Pagination;
