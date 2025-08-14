import Layout from "@/components/Layout";
import TransactionForm, { TransactionData } from "@/components/TransactionForm";

export default function CreateTransactionPage() {
    const handleSubmit = async (data: TransactionData) => {
        await fetch("/api/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
    };

    return (
        <Layout title="Create Transaction">
            <h1 className="text-2xl mb-4">Create Transaction</h1>
            <TransactionForm onSubmit={handleSubmit} />
        </Layout>
    );
}
