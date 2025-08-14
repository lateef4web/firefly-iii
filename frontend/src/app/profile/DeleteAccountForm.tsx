'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function DeleteAccountForm() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/profile/delete-account', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password}),
        });
        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="password" className="block font-medium">Password</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="border p-2 w-full" />
            </div>
            <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded">Delete Account</button>
        </form>
    );
}
