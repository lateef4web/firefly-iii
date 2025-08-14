import { FormEvent, useState } from "react";

export interface TransactionData {
    description: string;
    amount: number;
}

interface Props {
    initialData?: Partial<TransactionData>;
    onSubmit: (data: TransactionData) => Promise<void>;
}

export default function TransactionForm({ initialData = {}, onSubmit }: Props) {
    const [description, setDescription] = useState(initialData.description || "");
    const [amount, setAmount] = useState<number>(initialData.amount ?? 0);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onSubmit({ description, amount });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="description" className="block">Description</label>
                <input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label htmlFor="amount" className="block">Amount</label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                    className="border p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                Submit
            </button>
        </form>
    );
}
