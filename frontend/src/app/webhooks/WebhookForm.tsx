'use client';
import React, {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';

interface Webhook {
    title: string;
    url: string;
    trigger: string;
    response: string;
}

interface WebhookFormProps {
    initialData?: Webhook;
    webhookId?: string;
}

export default function WebhookForm({initialData, webhookId}: WebhookFormProps) {
    const [formData, setFormData] = useState<Webhook>(initialData ?? {title: '', url: '', trigger: '', response: ''});
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const method = webhookId ? 'PUT' : 'POST';
        const url = webhookId ? `/api/webhooks/${webhookId}` : '/api/webhooks';
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        router.push('/webhooks');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block font-medium">Title</label>
                <input id="title" name="title" className="border p-2 w-full" value={formData.title} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="url" className="block font-medium">URL</label>
                <input id="url" name="url" className="border p-2 w-full" value={formData.url} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="trigger" className="block font-medium">Trigger</label>
                <input id="trigger" name="trigger" className="border p-2 w-full" value={formData.trigger} onChange={handleChange} required />
            </div>
            <div>
                <label htmlFor="response" className="block font-medium">Response</label>
                <input id="response" name="response" className="border p-2 w-full" value={formData.response} onChange={handleChange} required />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
    );
}

