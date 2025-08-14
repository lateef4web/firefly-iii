'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { Pagination } from '../../components/Pagination';

interface Transaction {
  id: number;
  description: string;
  amount: number;
}

const generateTransactions = (count: number): Transaction[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    description: `Transaction ${i + 1}`,
    amount: Math.round(Math.random() * 10000) / 100,
  }));
};

const allTransactions = generateTransactions(50);

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    return allTransactions.filter(tx =>
      tx.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Search</h1>
      <input
        type="text"
        placeholder="Search transactions"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="border rounded px-2 py-1 mb-4 w-full"
      />
      <ul>
        {paginated.map(tx => (
          <li key={tx.id} className="py-1 border-b flex justify-between">
            <span>{tx.description}</span>
            <span>{tx.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
      {totalPages > 1 && (
        <div className="mt-4">
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      )}
    </div>
  );
}
