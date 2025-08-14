'use client';

import Layout from '../../components/Layout';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

interface ApiBudget {
    id: string;
    attributes?: {
        name?: string;
        spent?: number;
        budgeted?: number;
    };
}

interface Budget {
    id: string;
    name: string;
    spent: number;
    budgeted: number;
}

export default function BudgetsPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);

    useEffect(() => {
        fetch('/api/v1/budgets')
            .then(response => response.json())
            .then(json => {
                const list: Budget[] = ((json.data || []) as ApiBudget[]).map(b => ({
                    id: b.id,
                    name: b.attributes?.name || 'Unnamed budget',
                    spent: b.attributes?.spent ?? 0,
                    budgeted: b.attributes?.budgeted ?? 0,
                }));
                setBudgets(list);
            })
            .catch(() => {
                // ignore errors for now
            });
    }, []);

    return (
        <Layout title="Budgets">
            <h1 className="text-2xl mb-4">Budgets</h1>
            <div className="space-y-6">
                {budgets.map(budget => (
                    <div key={budget.id} className="p-4 border rounded">
                        <h2 className="text-lg font-bold mb-2">
                            <Link href={`/budgets/${budget.id}`}>{budget.name}</Link>
                        </h2>
                        <div className="h-40">
                            <ResponsiveContainer>
                                <BarChart data={[{name: 'Spent', value: budget.spent}, {name: 'Budgeted', value: budget.budgeted}] }>
                                    <XAxis dataKey="name" hide />
                                    <YAxis hide />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="#8884d8" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="mt-2 text-sm">Spent {budget.spent} of {budget.budgeted}</p>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

