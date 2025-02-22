import React from 'react';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="pagination">
      <button 
        onClick={() => setCurrentPage(1)} 
        disabled={currentPage === 1}
      >
        First
      </button>
      <button 
        onClick={() => setCurrentPage(prev => prev - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          className={currentPage === idx + 1 ? 'active' : ''}
          onClick={() => setCurrentPage(idx + 1)}
        >
          {idx + 1}
        </button>
      ))}
      
      <button 
        onClick={() => setCurrentPage(prev => prev + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      <button 
        onClick={() => setCurrentPage(totalPages)} 
        disabled={currentPage === totalPages}
      >
        Last
      </button>
    </div>
  );
};

export default Pagination;