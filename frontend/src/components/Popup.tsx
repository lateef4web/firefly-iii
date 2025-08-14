import React from 'react';
import styles from '../styles/Popup.module.css';

export interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Popup;
