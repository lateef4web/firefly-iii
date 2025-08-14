'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function ChangeEmailForm() {
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/profile/change-email', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email}),
        });
        router.push('/profile');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block font-medium">New email address</label>
                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="border p-2 w-full" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Change Email</button>
        </form>
    );
}
