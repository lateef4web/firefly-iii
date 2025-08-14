import { useState } from 'react';

export interface PopupControls {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export function usePopup(initialState = false): PopupControls {
  const [isOpen, setOpen] = useState(initialState);

  return {
    isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(prev => !prev)
  };
}
