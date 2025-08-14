import React from 'react';
import styles from '../styles/Pagination.module.css';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return (
    <nav className={styles.pagination}>
      {pages.map(p => (
        <span
          key={p}
          className={`${styles.page} ${p === page ? styles.active : ''}`}
          onClick={() => onChange(p)}
        >
          {p}
        </span>
      ))}
    </nav>
  );
};

export default Pagination;
