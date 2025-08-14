import React from 'react';
import Modal from '../../Modal';
import ListJournals, { Journal } from '../list/Journals';

export interface ExpenseEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  journals: Journal[];
}

export const ExpenseEntryModal: React.FC<ExpenseEntryModalProps> = ({
  isOpen,
  onClose,
  title,
  journals,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <ListJournals journals={journals} hideDestination />
  </Modal>
);

export default ExpenseEntryModal;
