import { useState, FormEvent } from "react";
import Layout from "@/components/Layout";

interface Props {
    params: { id: string };
}

export default function ConvertTransactionPage({ params }: Props) {
    const [type, setType] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await fetch(`/api/transactions/${params.id}/convert`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type }),
        });
    };

    return (
        <Layout title="Convert Transaction">
            <h1 className="text-2xl mb-4">Convert Transaction</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="type" className="block">Type</label>
                    <input
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Convert
                </button>
            </form>
        </Layout>
    );
}
