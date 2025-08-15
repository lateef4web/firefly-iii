import React from 'react';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className="flex gap-2">
      {pages.map(p => (
        <span
          key={p}
          className={`px-3 py-2 border border-gray-300 cursor-pointer ${p === page ? 'bg-blue-500 text-white' : ''}`}
          onClick={() => onChange(p)}
        >
          {p}
        </span>
      ))}
    </nav>
  );
};

export default Pagination;
