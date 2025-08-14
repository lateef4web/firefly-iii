import React from 'react';
import styles from '../styles/ItemList.module.css';

export interface ItemListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function ItemList<T>({ items, renderItem }: ItemListProps<T>) {
  return (
    <ul className={styles.list}>
      {items.map((item, idx) => (
        <li key={idx} className={styles.item}>
          {renderItem(item, idx)}
        </li>
      ))}
    </ul>
  );
}

export default ItemList;
