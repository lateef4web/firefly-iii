import React from 'react';

export interface MessageProps {
  type: 'success' | 'error' | 'info';
  text: string;
}

const typeClasses: Record<MessageProps['type'], string> = {
  success: 'bg-green-100 text-green-800',
  error: 'bg-red-100 text-red-800',
  info: 'bg-blue-100 text-blue-800',
};

export const Message: React.FC<MessageProps> = ({ type, text }) => (
  <div className={`p-4 rounded ${typeClasses[type]}`}>
    {text}
  </div>
);

export default Message;
