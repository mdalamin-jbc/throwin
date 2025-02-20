import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ 
  currentPage = 1,
  totalPages = 1,
  onPageChange = () => {},
  className = ''
}) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 'dots', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, 'dots', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, 'dots', currentPage - 1, currentPage, currentPage + 1, 'dots', totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className={`flex justify-center items-center space-x-2 ${className}`}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 h-10 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous Page</span>
      </button>

      <div className="flex items-center space-x-2">
        {getPageNumbers().map((page, index) => (
          page === 'dots' ? (
            <MoreHorizontal key={`dots-${index}`} className="h-4 w-4 text-gray-400" />
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              disabled={currentPage === page}
              className={`inline-flex items-center justify-center rounded-lg px-3.5 h-10 text-sm font-medium transition-colors
                ${currentPage === page ? 
                  'bg-[#4EBDF3] text-white' : 
                  'border border-gray-300 hover:bg-gray-100'
                }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-3 h-10 text-sm font-medium transition-colors hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next Page</span>
      </button>
    </nav>
  );
};

export default Pagination;