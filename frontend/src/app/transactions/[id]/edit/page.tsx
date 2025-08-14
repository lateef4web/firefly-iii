import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import TransactionForm, { TransactionData } from "@/components/TransactionForm";

interface Props {
    params: { id: string };
}

export default function EditTransactionPage({ params }: Props) {
    const [transaction, setTransaction] = useState<TransactionData | null>(null);

    useEffect(() => {
        fetch(`/api/transactions/${params.id}`)
            .then((res) => res.json())
            .then((data) => setTransaction(data.data))
            .catch(() => setTransaction(null));
    }, [params.id]);

    const handleSubmit = async (data: TransactionData) => {
        await fetch(`/api/transactions/${params.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    };

    if (!transaction) {
        return (
            <Layout title="Edit Transaction">
                <p>Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout title="Edit Transaction">
            <h1 className="text-2xl mb-4">Edit Transaction</h1>
            <TransactionForm initialData={transaction} onSubmit={handleSubmit} />
        </Layout>
    );
}
