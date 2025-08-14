import { FormEvent, useState } from 'react';

export interface TagData {
    tag: string;
    date: string;
    description: string;
}

interface Props {
    initialData?: Partial<TagData>;
    onSubmit: (data: TagData) => Promise<void>;
}

export default function TagForm({ initialData = {}, onSubmit }: Props) {
    const [tag, setTag] = useState(initialData.tag || '');
    const [date, setDate] = useState(initialData.date || '');
    const [description, setDescription] = useState(initialData.description || '');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onSubmit({ tag, date, description });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="tag" className="block">Tag</label>
                <input
                    id="tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label htmlFor="date" className="block">Date</label>
                <input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label htmlFor="description" className="block">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
        </form>
    );
}
