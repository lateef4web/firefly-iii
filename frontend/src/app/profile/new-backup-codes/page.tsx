'use client';
import Layout from '../../../components/Layout';
import React, {useEffect, useState} from 'react';

export default function NewBackupCodesPage() {
    const [codes, setCodes] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/profile/backup-codes').then(async r => {
            if (r.ok) {
                const data = await r.json();
                setCodes(data.codes ?? []);
            }
        });
    }, []);

    return (
        <Layout title="Backup Codes">
            <h1 className="text-2xl mb-4">Backup Codes</h1>
            <p>Store these codes somewhere safe:</p>
            <pre className="bg-gray-100 p-4 whitespace-pre-wrap">{codes.join('\n')}</pre>
        </Layout>
    );
}
