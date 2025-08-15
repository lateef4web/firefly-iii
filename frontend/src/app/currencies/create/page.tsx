'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import Layout from '../../../components/Layout';

export default function CreateCurrency() {
    const router = useRouter();
    const [form, setForm] = useState({name: '', symbol: '', code: '', decimal_places: 2});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/v1/currencies', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({data: {attributes: form}})
            });
            router.push('/currencies');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Layout title="Create currency">
            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
                <div className="space-y-2 bg-white p-4 rounded shadow">
                    <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border rounded px-2 py-1" />
                    <input name="symbol" value={form.symbol} onChange={handleChange} placeholder="Symbol" className="w-full border rounded px-2 py-1" />
                    <input name="code" value={form.code} onChange={handleChange} placeholder="Code" className="w-full border rounded px-2 py-1" />
                    <input name="decimal_places" type="number" value={form.decimal_places} onChange={handleChange} className="w-full border rounded px-2 py-1" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Store currency</button>
                </div>
            </form>
        </Layout>
    );
}
