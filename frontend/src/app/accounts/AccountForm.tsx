'use client';
import React, {FormEvent, useState} from 'react';
import {useRouter} from 'next/navigation';

interface Account {
    name: string;
    iban?: string;
    bic?: string;
    accountNumber?: string;
    notes?: string;
}

interface AccountFormProps {
    initialData?: Account;
    accountId?: string;
}

export default function AccountForm({initialData, accountId}: AccountFormProps) {
    const [formData, setFormData] = useState<Account>(initialData ?? {
        name: '',
        iban: '',
        bic: '',
        accountNumber: '',
        notes: '',
    });
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const method = accountId ? 'PUT' : 'POST';
        const url = accountId ? `/api/accounts/${accountId}` : '/api/accounts';
        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        router.push('/accounts');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block font-medium">Name</label>
                <input
                    id="name"
                    name="name"
                    className="border p-2 w-full"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="iban" className="block font-medium">IBAN</label>
                <input
                    id="iban"
                    name="iban"
                    className="border p-2 w-full"
                    value={formData.iban}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="bic" className="block font-medium">BIC</label>
                <input
                    id="bic"
                    name="bic"
                    className="border p-2 w-full"
                    value={formData.bic}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="accountNumber" className="block font-medium">Account Number</label>
                <input
                    id="accountNumber"
                    name="accountNumber"
                    className="border p-2 w-full"
                    value={formData.accountNumber}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="notes" className="block font-medium">Notes</label>
                <textarea
                    id="notes"
                    name="notes"
                    className="border p-2 w-full"
                    value={formData.notes}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
    );
}

