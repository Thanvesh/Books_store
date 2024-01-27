import React from 'react';
import PropTypes from 'prop-types';
import "./index.css"

const Pagination = ({ currentPage, onPageChange }) => {
  const totalPages = 8



  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? 'active' : 'page-number'}>
          <button type="button" className={i === currentPage ? 'btn-active' : ''} onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <ul className="pagination">
      {renderPageNumbers()}
    </ul>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
