import React from 'react';
import styles from '../styles/Message.module.css';

export interface MessageProps {
  type: 'success' | 'error' | 'info';
  text: string;
}

export const Message: React.FC<MessageProps> = ({ type, text }) => (
  <div className={`${styles.message} ${styles[type]}`}>
    {text}
  </div>
);

export default Message;
