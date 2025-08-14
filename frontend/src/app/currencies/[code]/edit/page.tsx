'use client';

import {useEffect, useState} from 'react';
import {useRouter, useParams} from 'next/navigation';
import Layout from '../../../../components/Layout';

export default function EditCurrency() {
    const router = useRouter();
    const params = useParams();
    const code = params?.code as string;
    const [form, setForm] = useState({name: '', symbol: '', code: '', decimal_places: 2});
    const [defaultCode, setDefaultCode] = useState('');
    const [rate, setRate] = useState<number|null>(null);

    useEffect(() => {
        async function load() {
            if (!code) {return;}
            const [defRes, curRes] = await Promise.all([
                fetch('/api/v1/currencies/default'),
                fetch(`/api/v1/currencies/${code}`)
            ]);
            if (defRes.ok) {
                const defJson = await defRes.json();
                setDefaultCode(defJson.data.attributes.code);
            }
            if (curRes.ok) {
                const curJson = await curRes.json();
                const attrs = curJson.data.attributes;
                setForm({name: attrs.name, symbol: attrs.symbol, code: attrs.code, decimal_places: attrs.decimal_places});
            }
            if (defaultCode) {
                const rRes = await fetch(`/api/v1/exchange-rates/rates/${code}/${defaultCode}`);
                if (rRes.ok) {
                    const rJson = await rRes.json();
                    setRate(rJson.data?.[0]?.attributes?.rate ?? null);
                }
            }
        }
        load();
    }, [code, defaultCode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch(`/api/v1/currencies/${code}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({data: {attributes: form}})
        });
        router.push('/currencies');
    };

    return (
        <Layout title={`Edit ${code}`}>
            <form onSubmit={handleSubmit} className="form-horizontal">
                <div className="box box-primary">
                    <div className="box-body space-y-2">
                        <input name="name" value={form.name} onChange={handleChange} className="form-control" />
                        <input name="symbol" value={form.symbol} onChange={handleChange} className="form-control" />
                        <input name="code" value={form.code} onChange={handleChange} className="form-control" />
                        <input name="decimal_places" type="number" value={form.decimal_places} onChange={handleChange} className="form-control" />
                        <p>Exchange rate vs {defaultCode}: {rate ?? 'N/A'}</p>
                    </div>
                    <div className="box-footer">
                        <button type="submit" className="btn btn-success pull-right">Update currency</button>
                    </div>
                </div>
            </form>
        </Layout>
    );
}
