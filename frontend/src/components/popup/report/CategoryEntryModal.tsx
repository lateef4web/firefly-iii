import React from 'react';
import Modal from '../../Modal';
import ListJournals, { Journal } from '../list/Journals';

export interface CategoryEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  journals: Journal[];
}

export const CategoryEntryModal: React.FC<CategoryEntryModalProps> = ({
  isOpen,
  onClose,
  title,
  journals,
}) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title}>
    <ListJournals journals={journals} hideCategory />
  </Modal>
);

export default CategoryEntryModal;
