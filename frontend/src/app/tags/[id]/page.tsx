import Link from 'next/link';
import Layout from '../../../components/Layout';

interface Props {
    params: { id: string };
}

async function getTag(id: string) {
    return { id, tag: `Tag ${id}`, date: '2024-01-01', description: 'Demo tag' };
}

export default async function ShowTagPage({ params }: Props) {
    const tag = await getTag(params.id);
    return (
        <Layout title={tag.tag}>
            <h1 className="text-2xl mb-4">{tag.tag}</h1>
            {tag.description && <p className="mb-2">{tag.description}</p>}
            {tag.date && <p className="mb-2">Date: {tag.date}</p>}
            <div className="mt-4 space-x-4">
                <Link href={`/tags/${tag.id}/edit`} className="text-blue-500 underline">Edit</Link>
                <Link href={`/tags/${tag.id}/delete`} className="text-red-500 underline">Delete</Link>
            </div>
        </Layout>
    );
}
