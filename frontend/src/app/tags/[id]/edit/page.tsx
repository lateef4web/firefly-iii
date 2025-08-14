import Layout from '../../../../components/Layout';
import TagForm from '../../TagForm';

interface Props {
    params: { id: string };
}

async function getTag(id: string) {
    return { tag: `Tag ${id}`, date: '2024-01-01', description: 'Demo tag' };
}

export default async function EditTagPage({ params }: Props) {
    const tag = await getTag(params.id);
    const handleSubmit = async (data: any) => {
        console.log('update tag', params.id, data);
    };

    return (
        <Layout title={`Edit ${tag.tag}`}>
            <h1 className="text-2xl mb-4">Edit Tag</h1>
            <TagForm initialData={tag} onSubmit={handleSubmit} />
        </Layout>
    );
}
