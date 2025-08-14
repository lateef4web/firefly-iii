'use client';
import React from 'react';
import {useRouter} from 'next/navigation';

interface Props {
    webhookId: string;
}

export default function DeleteWebhookForm({webhookId}: Props) {
    const router = useRouter();
    const handleDelete = async () => {
        await fetch(`/api/webhooks/${webhookId}`, {method: 'DELETE'});
        router.push('/webhooks');
    };

    return (
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">
            Delete
        </button>
    );
}

