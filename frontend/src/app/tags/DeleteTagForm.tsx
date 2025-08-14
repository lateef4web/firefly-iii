import { FormEvent } from 'react';

interface Props {
    tagId: string;
}

export default function DeleteTagForm({ tagId }: Props) {
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log('delete tag', tagId);
    };

    return (
        <form onSubmit={handleSubmit}>
            <button type="submit" className="bg-red-500 text-white px-4 py-2">Confirm</button>
        </form>
    );
}
