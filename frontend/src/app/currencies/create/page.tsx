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
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="box box-primary">
                    <div className="box-body space-y-2">
                        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="form-control" />
                        <input name="symbol" value={form.symbol} onChange={handleChange} placeholder="Symbol" className="form-control" />
                        <input name="code" value={form.code} onChange={handleChange} placeholder="Code" className="form-control" />
                        <input name="decimal_places" type="number" value={form.decimal_places} onChange={handleChange} className="form-control" />
                    </div>
                    <div className="box-footer">
                        <button type="submit" className="btn btn-success pull-right">Store currency</button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
