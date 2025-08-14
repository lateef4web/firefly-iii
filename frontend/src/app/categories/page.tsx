'use client';
import React, { useState, useMemo } from 'react';

interface Category {
  id: number;
  name: string;
  lastActivity?: string;
}

const initialCategories: Category[] = [
  { id: 1, name: 'Groceries', lastActivity: '2024-12-31' },
  { id: 2, name: 'Utilities', lastActivity: '2024-12-25' },
  { id: 3, name: 'Uncategorized' },
];

export default function CategoriesPage() {
  const [query, setQuery] = useState('');
  const [onlyWithActivity, setOnlyWithActivity] = useState(false);

  const filtered = useMemo(() => {
    return initialCategories
      .filter(cat => cat.name.toLowerCase().includes(query.toLowerCase()))
      .filter(cat => (onlyWithActivity ? !!cat.lastActivity : true));
  }, [query, onlyWithActivity]);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Categories</h1>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search categories"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={onlyWithActivity}
            onChange={e => setOnlyWithActivity(e.target.checked)}
          />
          Only with activity
        </label>
      </div>
      <ul>
        {filtered.map(cat => (
          <li key={cat.id} className="py-1">
            {cat.name}
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="text-sm text-gray-500">No categories found.</p>
      )}
    </div>
  );
}
