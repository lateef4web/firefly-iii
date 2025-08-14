import Link from 'next/link';
import Layout from '../../components/Layout';

interface Tag { id: string; tag: string; }

async function getTags(): Promise<Tag[]> {
    return [
        { id: '1', tag: 'Groceries' },
        { id: '2', tag: 'Utilities' },
    ];
}

export default async function TagsIndex() {
    const tags = await getTags();
    return (
        <Layout title="Tags">
            <h1 className="text-2xl mb-4">Tags</h1>
            <div className="mb-4">
                <Link href="/tags/create" className="text-blue-500 underline">
                    Create Tag
                </Link>
            </div>
            <ul className="space-y-2">
                {tags.map((tag) => (
                    <li key={tag.id}>
                        <Link href={`/tags/${tag.id}`} className="text-blue-600 underline">
                            {tag.tag}
                        </Link>
                    </li>
                ))}
            </ul>
        </Layout>
    );
}
