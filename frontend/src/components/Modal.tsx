import React from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  const stop = (e: React.MouseEvent) => e.stopPropagation();
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white rounded shadow-lg w-full max-w-lg" role="document" onClick={stop}>
        <div className="flex items-center justify-between border-b p-4">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button type="button" aria-label="Close" onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <div className="p-4">{children}</div>
        <div className="flex justify-end gap-2 border-t p-4">
          <button type="button" className="px-4 py-2 rounded bg-gray-200" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
