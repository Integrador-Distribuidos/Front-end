import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onNext, onPrev, onPageChange }) => {
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Caso com poucas páginas: mostrar todas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Sempre mostra a 1ª, 3 próximas, último, e ...
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return <h2 key={index} className="pontos">...</h2>;
      }

      return (
        <div
          key={index}
          className={`page_box ${currentPage === page ? 'atual_page_box' : ''}`}
          onClick={() => onPageChange(page)}
        >
          <h2 className="num_page">{page}</h2>
        </div>
      );
    });
  };

  return (
    <div className="pagination">
      <button className="button_left" onClick={onPrev} disabled={currentPage === 1}>
        ◀ Voltar
      </button>

      {renderPageNumbers()}

      <button className="button_hight" onClick={onNext} disabled={currentPage === totalPages}>
        Próximo ▶
      </button>
    </div>
  );
};

export default Pagination;