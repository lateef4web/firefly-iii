import Layout from "@/components/Layout";
import { useRouter } from "next/navigation";

interface Props {
    params: { id: string };
}

export default function DeleteTransactionPage({ params }: Props) {
    const router = useRouter();

    const handleDelete = async () => {
        await fetch(`/api/transactions/${params.id}`, { method: "DELETE" });
        router.push("/transactions");
    };

    return (
        <Layout title="Delete Transaction">
            <h1 className="text-2xl mb-4">Delete Transaction</h1>
            <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2"
            >
                Confirm Delete
            </button>
        </Layout>
    );
}
