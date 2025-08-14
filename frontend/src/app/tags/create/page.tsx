import Layout from '../../../components/Layout';
import TagForm from '../TagForm';

export default function CreateTagPage() {
    const handleSubmit = async (data: any) => {
        console.log('create tag', data);
    };

    return (
        <Layout title="Create Tag">
            <h1 className="text-2xl mb-4">Create Tag</h1>
            <TagForm onSubmit={handleSubmit} />
        </Layout>
    );
}
