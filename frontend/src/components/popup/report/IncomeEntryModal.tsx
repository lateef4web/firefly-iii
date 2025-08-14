import React from 'react';
import Modal from '../../Modal';
import ListJournals, { Journal } from '../list/Journals';

export interface IncomeEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  journals: Journal[];
}

export const IncomeEntryModal: React.FC<IncomeEntryModalProps> = ({
  isOpen,
  onClose,
  title,
  journals,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <ListJournals journals={journals} hideSource hideBudget />
  </Modal>
);

export default IncomeEntryModal;
