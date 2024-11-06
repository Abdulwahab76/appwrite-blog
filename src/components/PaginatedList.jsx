import React, { useState } from 'react';

const Pagination = ({ totalItems, itemsPerPage, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Navigate to a specific page
    const goToPage = (page) => {
        setCurrentPage(page);
        onPageChange(page);  // Call the callback with the new page number
    };

    // Go to the next page
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    // Go to the previous page
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    return (
        <div className="pagination flex justify-between px-10 py-10">
            <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="pagination-button"
            >
                Previous
            </button>

            {/* Page number buttons */}
            <div>

            
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => goToPage(index + 1)}
                    className={`pagination-button p-2  px-4  ${currentPage === index + 1 ? 'active !text-text-purple !bg-text-purple/10 !font-normal'  : ''}`}
                >
                    {index + 1}
                </button>
            ))}
</div>
            <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="pagination-button"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
