import React from 'react';
import Modal from '../../Modal';
import ListJournals, { Journal } from '../list/Journals';

export interface BudgetSpentAmountModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  journals: Journal[];
}

export const BudgetSpentAmountModal: React.FC<BudgetSpentAmountModalProps> = ({
  isOpen,
  onClose,
  title,
  journals,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <ListJournals journals={journals} hideBudget />
  </Modal>
);

export default BudgetSpentAmountModal;
