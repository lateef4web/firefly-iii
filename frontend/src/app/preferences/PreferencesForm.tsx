'use client';
import React, {useState} from 'react';
import AvatarUpload from '../../components/AvatarUpload';

interface Preferences {
    language: string;
    avatarUrl?: string;
}

const languages = [
    {value: 'en_US', label: 'English'},
    {value: 'fr_FR', label: 'Français'},
];

export default function PreferencesForm() {
    const [prefs, setPrefs] = useState<Preferences>({language: 'en_US'});

    const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPrefs({...prefs, language: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/preferences', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(prefs),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="language" className="block font-medium">Language</label>
                <select id="language" name="language" value={prefs.language} onChange={handleLanguageChange} className="border p-2 w-full">
                    {languages.map(lang => (
                        <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                </select>
            </div>
            <div>
                <p className="font-medium">Avatar</p>
                <AvatarUpload onUploaded={(url) => setPrefs({...prefs, avatarUrl: url})} />
            </div>
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save Preferences</button>
        </form>
    );
}
