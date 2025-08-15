import React from 'react';
import TransactionForm, { TransactionData } from '../components/TransactionForm';
import { apiFetch } from '../lib/bootstrap';

/**
 * Entry point for creating a transaction using React. This replaces the
 * legacy create_transaction.js Vue script.
 */
export default function CreateTransaction() {
    const handleSubmit = async (data: TransactionData) => {
        await apiFetch('/api/transactions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
    };

    return <TransactionForm onSubmit={handleSubmit} />;
}
