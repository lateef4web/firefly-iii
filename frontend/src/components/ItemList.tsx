import React from 'react';

export interface ItemListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function ItemList<T>({ items, renderItem }: ItemListProps<T>) {
  return (
    <ul className="list-none p-0 m-0">
      {items.map((item, idx) => (
        <li key={idx} className="p-2 border-b border-gray-200">
          {renderItem(item, idx)}
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
