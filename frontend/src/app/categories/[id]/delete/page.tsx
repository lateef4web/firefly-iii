'use client';
import React from 'react';

interface Props {
  params: { id: string };
}

export default function DeleteCategoryPage({ params }: Props) {
  function handleDelete() {
    alert(`Deleted category ${params.id}`);
  }

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl">Delete Category {params.id}</h1>
      <p>Are you sure you want to delete this category?</p>
      <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
        Delete
      </button>
    </div>
  );
}
