'use client';
import React from 'react';
import {useRouter} from 'next/navigation';

interface Props {
    accountId: string;
}

export default function DeleteAccountForm({accountId}: Props) {
    const router = useRouter();
    const handleDelete = async () => {
        await fetch(`/api/accounts/${accountId}`, {method: 'DELETE'});
        router.push('/accounts');
    };

    return (
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
        </button>
    );
}

