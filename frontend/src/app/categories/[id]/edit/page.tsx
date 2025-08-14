'use client';
import React, { useState } from 'react';

interface Props {
  params: { id: string };
}

export default function EditCategoryPage({ params }: Props) {
  const [name, setName] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert(`Updated category ${params.id} to ${name}`);
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl">Edit Category {params.id}</h1>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        className="border rounded px-2 py-1"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Save
      </button>
    </form>
  );
}
