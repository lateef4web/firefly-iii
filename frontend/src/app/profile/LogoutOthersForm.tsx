'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function LogoutOthersForm() {
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/profile/logout-others', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({password}),
        });
        router.push('/profile');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="password" className="block font-medium">Current password</label>
                <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="border p-2 w-full" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Logout Other Sessions</button>
        </form>
    );
}
