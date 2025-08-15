'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout';

interface Currency {
    id: number;
    code: string;
    name: string;
    symbol: string;
    decimal_places: number;
}

interface ApiCurrency {
    id: string;
    attributes: {
        code: string;
        name: string;
        symbol: string;
        decimal_places: number;
    };
}

export default function CurrencyIndex() {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [defaultCode, setDefaultCode] = useState<string>('');
    const [rates, setRates] = useState<Record<string, number>>({});

    useEffect(() => {
        async function load() {
            try {
                const [defRes, curRes] = await Promise.all([
                    fetch('/api/v1/currencies/default'),
                    fetch('/api/v1/currencies')
                ]);
                if (defRes.ok) {
                    const defJson = await defRes.json();
                    setDefaultCode(defJson.data.attributes.code);
                }
                if (curRes.ok) {
                    const curJson = await curRes.json();
                    const list: Currency[] = (curJson.data as ApiCurrency[]).map((c) => ({
                        id: parseInt(c.id, 10),
                        code: c.attributes.code,
                        name: c.attributes.name,
                        symbol: c.attributes.symbol,
                        decimal_places: c.attributes.decimal_places
                    }));
                    setCurrencies(list);
                    // fetch exchange rates for each currency vs default
                    const ratePromises = list.map(async (c) => {
                        if (!defaultCode || c.code === defaultCode) {
                            return [c.code, 1];
                        }
                        try {
                            const r = await fetch(`/api/v1/exchange-rates/rates/${c.code}/${defaultCode}`);
                            if (r.ok) {
                                const rJson = await r.json();
                                const rate = rJson.data?.[0]?.attributes?.rate;
                                return [c.code, rate ?? null];
                            }
                        } catch (e) {
                            console.error(e);
                        }
                        return [c.code, null];
                    });
                    const results = await Promise.all(ratePromises);
                    const rateMap: Record<string, number> = {};
                    results.forEach(([code, rate]) => {
                        if (rate !== null) {
                            rateMap[code as string] = rate as number;
                        }
                    });
                    setRates(rateMap);
                }
            } catch (e) {
                console.error(e);
            }
        }
        load();
    }, [defaultCode]);

    return (
        <Layout title="Currencies">
            <div className="rounded border border-gray-200">
                <div className="flex items-center justify-between border-b p-4">
                    <h3 className="text-lg font-semibold">Currencies</h3>
                    <Link
                        href="/currencies/create"
                        className="rounded bg-green-600 px-3 py-2 text-white hover:bg-green-700"
                    >
                        Create currency
                    </Link>
                </div>
                <div className="p-4">
                    <table className="w-full border-collapse">
                        <thead>
                        <tr>
                            <th>Code</th>
                            <th>Name</th>
                            <th>Decimals</th>
                            <th>Exchange rate vs {defaultCode}</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {currencies.map(c => (
                            <tr key={c.id} className="hover:bg-gray-50">
                                <td>{c.code}</td>
                                <td>{c.name} ({c.symbol})</td>
                                <td>{c.decimal_places}</td>
                                <td>{rates[c.code] ?? 'N/A'}</td>
                                <td>
                                    <Link
                                        href={`/currencies/${c.code}/edit`}
                                        className="mr-2 rounded bg-gray-200 px-2 py-1 text-xs text-gray-800 hover:bg-gray-300"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/currencies/${c.code}/delete`}
                                        className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
                                    >
                                        Delete
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}

