import React from 'react';

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className='todoPageNav'>
      <ul className='page-list'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button
              type='button'
              onClick={() => paginate(number)}
              className={`page-link ${currentPage===number && "active"}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;