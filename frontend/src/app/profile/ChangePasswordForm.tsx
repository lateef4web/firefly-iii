'use client';
import React, {useState} from 'react';
import {useRouter} from 'next/navigation';

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/profile/change-password', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({current_password: currentPassword, new_password: newPassword, new_password_confirmation: confirmPassword}),
        });
        router.push('/profile');
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="currentPassword" className="block font-medium">Current password</label>
                <input id="currentPassword" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required className="border p-2 w-full" />
            </div>
            <div>
                <label htmlFor="newPassword" className="block font-medium">New password</label>
                <input id="newPassword" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required className="border p-2 w-full" />
            </div>
            <div>
                <label htmlFor="confirmPassword" className="block font-medium">Confirm new password</label>
                <input id="confirmPassword" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required className="border p-2 w-full" />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Change Password</button>
        </form>
    );
}
