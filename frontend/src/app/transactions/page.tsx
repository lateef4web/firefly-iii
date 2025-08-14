import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";

interface Transaction {
    id: string;
    description: string;
    amount: number;
}

export default function TransactionsPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        fetch("/api/transactions")
            .then((res) => res.json())
            .then((data) => setTransactions(data.data || []))
            .catch(() => setTransactions([]));
    }, []);

    return (
        <Layout title="Transactions">
            <h1 className="text-2xl mb-4">Transactions</h1>
            <Link href="/transactions/create" className="text-blue-500 underline">
                Create Transaction
            </Link>
            <ul className="mt-4 space-y-2">
                {transactions.map((t) => (
                    <li key={t.id}>
                        <Link href={`/transactions/${t.id}`} className="text-blue-600">
                            {t.description} - {t.amount}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}

