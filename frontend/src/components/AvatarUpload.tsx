'use client';
import React, {useState} from 'react';

interface AvatarUploadProps {
    onUploaded?: (url: string) => void;
}

export default function AvatarUpload({onUploaded}: AvatarUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files?.[0] ?? null;
        setFile(f);
        if (f) {
            setPreview(URL.createObjectURL(f));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            return;
        }
        const formData = new FormData();
        formData.append('avatar', file);
        const response = await fetch('/api/profile/avatar', {
            method: 'POST',
            body: formData,
        });
        if (response.ok && onUploaded) {
            const {url} = await response.json();
            onUploaded(url);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {preview && <img src={preview} alt="avatar preview" className="h-24 w-24 rounded-full" />}
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={!file}>Upload</button>
        </form>
    );
}
