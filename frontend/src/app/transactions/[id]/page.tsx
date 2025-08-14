import { useEffect, useState } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { TransactionData } from "@/components/TransactionForm";

interface Props {
    params: { id: string };
}

export default function ShowTransactionPage({ params }: Props) {
    const [transaction, setTransaction] = useState<TransactionData | null>(null);

    useEffect(() => {
        fetch(`/api/transactions/${params.id}`)
            .then((res) => res.json())
            .then((data) => setTransaction(data.data))
            .catch(() => setTransaction(null));
    }, [params.id]);

    if (!transaction) {
        return (
            <Layout title="Transaction">
                <p>Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout title="Transaction">
            <h1 className="text-2xl mb-4">{transaction.description}</h1>
            <p className="mb-4">Amount: {transaction.amount}</p>
            <Link
                href={`/transactions/${params.id}/edit`}
                className="text-blue-500 underline"
            >
                Edit
            </Link>
        </Layout>
    );
}
