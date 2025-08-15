import React from 'react';
import TransactionForm, { TransactionData } from '../components/TransactionForm';
import { apiFetch } from '../lib/bootstrap';

interface Props {
    id: string;
    initialData: TransactionData;
}

/**
 * Entry point for editing a transaction using React. This replaces the
 * legacy edit_transaction.js Vue script.
 */
export default function EditTransaction({ id, initialData }: Props) {
    const handleSubmit = async (data: TransactionData) => {
        await apiFetch(`/api/transactions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    };

    return <TransactionForm initialData={initialData} onSubmit={handleSubmit} />;
}
