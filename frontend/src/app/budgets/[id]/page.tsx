'use client';

import Layout from '../../../components/Layout';
import { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface ApiCategory {
    name: string;
    amount: number;
}

interface ApiBudgetDetail {
    id: string;
    attributes?: {
        name?: string;
        categories?: ApiCategory[];
    };
}

interface CategoryAllocation {
    name: string;
    value: number;
}

interface Budget {
    id: string;
    name: string;
    categories: CategoryAllocation[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#aa65cc'];

export default function BudgetDetail({ params }: { params: { id: string } }) {
    const { id } = params;
    const [budget, setBudget] = useState<Budget | null>(null);

    useEffect(() => {
        fetch(`/api/v1/budgets/${id}`)
            .then(response => response.json())
            .then(json => {
                const data = json.data as ApiBudgetDetail;
                const attr = data.attributes || {};
                const rawCategories = attr.categories || [];
                const categories: CategoryAllocation[] = (rawCategories as ApiCategory[]).map(c => ({
                    name: c.name,
                    value: c.amount,
                }));
                setBudget({
                    id: data.id,
                    name: attr.name || 'Budget',
                    categories,
                });
            })
            .catch(() => {
                // ignore errors for now
            });
    }, [id]);

    if (!budget) {
        return (
            <Layout title="Budget">
                <p>Loading…</p>
            </Layout>
        );
    }

    return (
        <Layout title={budget.name}>
            <h1 className="text-2xl mb-4">{budget.name}</h1>
            <div className="h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={budget.categories} dataKey="value" nameKey="name" label>
                            {budget.categories.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <ul className="mt-4 list-disc list-inside">
                {budget.categories.map(cat => (
                    <li key={cat.name}>{cat.name}: {cat.value}</li>
                ))}
            </ul>
        </Layout>
    );
}

